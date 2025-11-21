import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import axios from "axios";
import crypto from "crypto";

import { db } from "@/lib/db";

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-GB").split("/").join("-"); // dd-mm-yyyy
}

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const user = await currentUser();

    if (!user || !user.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      couponApplied,
      discountedPrice,
    } = body;

    const cartItems = await db.cart.findMany({
      where: { userId: user.id },
      include: {
        course: true, // joins Course table
      },
    });

    if (!cartItems || cartItems.length === 0) {
      return new NextResponse("No items in cart", { status: 404 });
    }

    if (!cartItems) {
      return new NextResponse("Not found", { status: 404 });
    }

    cartItems.forEach(async (item) => {
      const price = item.course?.price;
      let loyalty_points;
      if (price && price >= 1599) {
        loyalty_points = 15;
      } else if (price && price >= 1199) {
        loyalty_points = 11;
      } else if (price && price >= 799) {
        loyalty_points = 7;
      } else if (price && price >= 599) {
        loyalty_points = 5;
      }
      await db.loyaltyPoints.upsert({
        where: { userId: user.id },
        update: { points: { increment: loyalty_points } }, // add or subtract
        create: { userId: user.id, points: loyalty_points },
      });
    });

    // Verify the payment signature
    const toVerify = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(toVerify.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (!isAuthentic) {
      return new NextResponse("Invalid signature", { status: 400 });
    }

    const purchases = await Promise.all(
      cartItems.map((item: any) =>
        db.purchase.create({
          data: {
            courseId: item.course.id,
            userId: user.id,
            swipeHashId: null,
            userEmail: user.emailAddresses?.[0]?.emailAddress,
          },
          select: { id: true }, // 👈 only fetch purchase id (faster)
        })
      )
    );

    // const purchase = await db.purchase.create({
    //   data: {
    //     courseId: params.courseId,
    //     userId: user.id,
    //     swipeHashId: null,
    //     userEmail: user.emailAddresses?.[0]?.emailAddress
    //   },
    // })

    const userAddress = await db.userAddress.findUnique({
      where: {
        userId: user.id,
      },
    });

    let totalValue = 0;
    if (userAddress && userAddress.country === "India") {
      cartItems.forEach((item: any) => {
        const price = item.course?.price || 0;
        totalValue += price;
      });
    } else {
      cartItems.forEach((item: any) => {
        const price = item.course?.usdPrice || 0;
        totalValue += price;
      });
    }

    const courseNames = cartItems
      .map(
        (item: any, index: number) =>
          `${index + 1}. ${item.course?.title || "Unknown Course"}`
      )
      .join(", ");

    const now = new Date();
    const date = formatDate(now);

    const isIndia = !userAddress || userAddress?.country === "India";
    const round_off_value = isIndia;
    let course_price = totalValue;
    let tax_rate_value = 0;
    let course_price_with_tax = course_price;

    if (
      couponApplied &&
      discountedPrice !== undefined &&
      discountedPrice >= 0
    ) {
      course_price = discountedPrice;
    }

    if (isIndia) {
      tax_rate_value = 18;
      course_price_with_tax =
        course_price + (course_price / 100) * tax_rate_value;
    }

    const invoicePayload: any = {
      document_type: "invoice",
      document_date: date,
      due_date: date,
      round_off: round_off_value,
      party: {
        id: user.id,
        type: "customer",
        name: userAddress?.fullName || `${user?.firstName} ${user?.lastName}`,
        email: user.emailAddresses?.[0]?.emailAddress,
      },
      items: [
        {
          id: params.courseId,
          name: courseNames || "Homeosetu Course Purchase",
          quantity: 1,
          unit_price: course_price,
          tax_rate: tax_rate_value,
          price_with_tax: course_price_with_tax,
          net_amount: course_price,
          total_amount: course_price_with_tax,
          hsn_code: "999259",
          item_type: "Product",
        },
      ],
    };

    if (isIndia) {
      invoicePayload.party.billing_address = {
        addr_id_v2: "addr1",
        address_line1: userAddress?.address1 || "123 street",
        address_line2: userAddress?.country || "India",
        city: userAddress?.city || "Virar",
        state: userAddress?.state || "Maharashtra",
        country: userAddress?.country || "India",
        pincode:
          userAddress?.pinCode && userAddress.pinCode.toString().length >= 6
            ? userAddress.pinCode.toString().slice(0, 6)
            : "123456",
      };
    }

    if (!isIndia) {
      invoicePayload.is_multi_currency = true;
      invoicePayload.export_invoice_details = {
        export_type: "Export with IGST",
        conversion_factor: 1,
        country_id: "United States",
        currency_id: "USD",
      };
    }

    let swipeHashId: string | null = null;

    try {
      const invoiceResponse = await axios.post(
        "https://app.getswipe.in/api/partner/v2/doc",
        invoicePayload,
        {
          headers: {
            Authorization: `Bearer ${process.env.SWIPE_INVOICE_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      swipeHashId = invoiceResponse.data.data.hash_id;
    } catch (error) {
      console.error("Failed to generate invoice:", error);
      // Continue without invoice - don't fail the entire transaction
    }

    // Update purchase records with invoice hash
    try {
      if (swipeHashId) {
        await Promise.all(
          purchases.map((item: any) =>
            db.purchase.update({
              where: { id: item.id },
              data: { swipeHashId },
            })
          )
        );
      }
    } catch (error) {
      console.error("Failed to update purchases with invoice hash:", error);
      // Continue - purchases are still valid
    }

    // Clear cart after successful purchase
    try {
      await db.cart.deleteMany({
        where: { userId: user.id },
      });
    } catch (error) {
      console.error("Failed to clear cart:", error);
      // Continue - purchases are still valid
    }
    // await db.purchase.update({
    //   where: {
    //     id: purchase.id,
    //   },
    //   data: {
    //     swipeHashId: swipeHashId,
    //   },
    // });

    return new NextResponse("Payment verified", { status: 200 });
  } catch (error) {
    console.log("[PAYMENT_VERIFICATION]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
