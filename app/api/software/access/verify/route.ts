import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import crypto from "crypto";
import axios from "axios";
import { db } from "@/lib/db";

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-GB").split("/").join("-"); // dd-mm-yyyy
}

export async function POST(req: Request) {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
      await req.json();
    const user = await currentUser();

    if (!user || !user.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const text = `${razorpay_order_id}|${razorpay_payment_id}`;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(text.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return new NextResponse("Invalid Signature", { status: 400 });
    }

    let swipeHashId = null;

    // Attempt to create invoice securely without failing verification
    try {
      const userAddress = await db.userAddress.findUnique({
        where: {
          userId: user.id,
        },
      });

      const now = new Date();
      const date = formatDate(now);
      const isIndia = !userAddress || userAddress?.country === "India";

      const course_price = isIndia
        ? Number(process.env.NEXT_PUBLIC_KENT_PRICE_INR)
        : Number(process.env.NEXT_PUBLIC_KENT_PRICE_USD);
      let tax_rate_value = 0;
      let course_price_with_tax = course_price;

      if (isIndia) {
        tax_rate_value = 18;
        course_price_with_tax =
          course_price + (course_price / 100) * tax_rate_value;
      }

      const invoicePayload: any = {
        document_type: "invoice",
        document_date: date,
        due_date: date,
        round_off: isIndia,
        party: {
          id: user.id,
          type: "customer",
          name:
            userAddress?.fullName ||
            `${user?.firstName || "Customer"} ${user?.lastName || ""}`.trim() ||
            user.emailAddresses?.[0]?.emailAddress ||
            "Guest",
          email: user.emailAddresses?.[0]?.emailAddress,
        },
        items: [
          {
            id: "kent-access",
            name: "Homeosetu WebApp - 1 Month Subscription",
            quantity: 1,
            unit_price: course_price,
            tax_rate: tax_rate_value,
            price_with_tax: course_price_with_tax,
            net_amount: course_price,
            total_amount: course_price_with_tax,
            hsn_code: "998431",
            item_type: "Product",
          },
        ],
      };

      if (isIndia) {
        invoicePayload.party.billing_address = {
          addr_id_v2: "addr1",
          address_line1: userAddress?.address1 || "123 street",
          address_line2: userAddress?.country || "India",
          city: userAddress?.city || "Unknown City",
          state: userAddress?.state || "Maharashtra",
          country: userAddress?.country || "India",
          pincode:
            userAddress?.pinCode && userAddress.pinCode.toString().length >= 6
              ? userAddress.pinCode.toString().slice(0, 6)
              : "123456",
        };
      } else {
        invoicePayload.is_multi_currency = true;
        invoicePayload.export_invoice_details = {
          export_type: "Export with IGST",
          conversion_factor: 1,
          country_id: "United States",
          currency_id: "USD",
        };
      }

      const invoiceResponse = await axios.post(
        "https://app.getswipe.in/api/partner/v2/doc",
        invoicePayload,
        {
          headers: {
            Authorization: `Bearer ${process.env.SWIPE_INVOICE_KEY}`,
            "Content-Type": "application/json",
          },
        },
      );

      swipeHashId = invoiceResponse.data?.data?.hash_id || null;
    } catch (invoiceError) {
      console.error("Failed to generate swipe invoice:", invoiceError);
    }

    const kentAccessTime =
      Number(process.env.NEXT_PUBLIC_KENT_ACCESS_TIME) || 30;

    // convert to ms (keep your 12hr unit if intentional)
    const planMs = kentAccessTime * 24 * 60 * 60 * 1000;

    // 1️⃣ Get existing record
    const existing = await db.kentAccess.findUnique({
      where: {
        userId: user.id,
      },
    });

    // 2️⃣ Decide base time
    let baseTime = Date.now();

    if (existing?.accessEndTime) {
      const currentEnd = new Date(existing.accessEndTime).getTime();

      // 🔥 KEY LOGIC
      // If still active → extend from current end
      // If expired → start from now
      baseTime = currentEnd > Date.now() ? currentEnd : Date.now();
    }

    // 3️⃣ Final new expiry
    const newEndTime = new Date(baseTime + planMs);

    // 4️⃣ Upsert
    await db.kentAccess.upsert({
      where: {
        userId: user.id,
      },
      update: {
        isPaid: true,
        swipeHashId: swipeHashId || undefined,
        accessStartTime: new Date(), // optional (tracking)
        accessEndTime: newEndTime, // ✅ FIXED
        userEmail: user.emailAddresses?.[0]?.emailAddress,
      },
      create: {
        userId: user.id,
        isPaid: true,
        swipeHashId: swipeHashId,
        userEmail: user.emailAddresses?.[0]?.emailAddress,
        accessStartTime: new Date(),
        accessEndTime: newEndTime,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log("[KENT_ACCESS_VERIFY_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
