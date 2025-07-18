import { currentUser } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import axios from "axios"
import crypto from "crypto"

import { db } from "@/lib/db"

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-GB").split("/").join("-"); // dd-mm-yyyy
}

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const user = await currentUser()

    if (!user || !user.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = body

    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        isPublished: true,
      },
    })

    if (!course) {
      return new NextResponse("Not found", { status: 404 })
    }

    // Verify the payment signature
    const toVerify = razorpay_order_id + "|" + razorpay_payment_id
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(toVerify.toString())
      .digest("hex")

    const isAuthentic = expectedSignature === razorpay_signature

    if (!isAuthentic) {
      return new NextResponse("Invalid signature", { status: 400 })
    }

    const purchase = await db.purchase.create({
      data: {
        courseId: params.courseId,
        userId: user.id,
        swipeHashId: null,
        userEmail: user.emailAddresses?.[0]?.emailAddress
      },
    })

    const userAddress = await db.userAddress.findUnique({
      where: {
        userId: user.id
      },
    })

    const now = new Date();
    const date = formatDate(now);

    const isIndia = !userAddress || userAddress?.country === "India";
    const round_off_value = isIndia; 
    const course_price = isIndia ? course?.price : course?.usdPrice;
    let tax_rate_value = 0;
    let course_price_with_tax = course_price;

    if (isIndia) {
      tax_rate_value = 18;
      course_price_with_tax = course.price! + ((course.price! / 100) * tax_rate_value);
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
        email: user.emailAddresses?.[0]?.emailAddress
      },
      items: [
        {
          id: params.courseId,
          name: course.title,
          quantity: 1,
          unit_price: course_price,
          tax_rate: tax_rate_value,
          price_with_tax: course_price_with_tax,
          net_amount: course_price,
          total_amount: course_price_with_tax,
          item_type: "Product"
        }
      ]
    };

    if (isIndia) {
      invoicePayload.party.billing_address = {
        addr_id_v2: "addr1",
        address_line1: userAddress?.address1 || "123 street",
        address_line2: userAddress?.country,
        city: userAddress?.city,
        state: userAddress?.state,
        country: userAddress?.country,
        pincode: userAddress?.pinCode || "123456"
      };
    }

    if (!isIndia) {
      invoicePayload.is_multi_currency = true;
      invoicePayload.export_invoice_details = {
        export_type: "Multi Currency",
        conversion_factor: 1,
        country_id: "United States",
        currency_id: "USD"
      };
    }


    const invoiceResponse = await axios.post("https://app.getswipe.in/api/partner/v2/doc",
      invoicePayload,
      {
        headers: {
          Authorization: `Bearer ${process.env.SWIPE_INVOICE_KEY}`,
          "Content-Type": "application/json"
        }
      },
    )

    const swipeHashId = invoiceResponse.data.data.hash_id
    // Create the purchase record
    await db.purchase.update({
      where: {
        id: purchase.id,
      },
      data: {
        swipeHashId: swipeHashId,
      },
    });

    return new NextResponse("Payment verified", { status: 200 })
  } catch (error) {
    console.log("[PAYMENT_VERIFICATION]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
