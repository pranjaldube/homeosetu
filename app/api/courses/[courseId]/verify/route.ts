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

    const now = new Date()
    const date = formatDate(now);
    const course_price = course.price
    const course_price_with_tax = course_price + Math.round((course_price/100) * 18)
    
    const invoicePayload = {
      document_type: "invoice",
      document_date: date,
      due_date: date,
      party:{
        id: user.id,
        type: "customer",
        name: `${user?.firstName} ${user?.lastName}`,
        email: user.emailAddresses?.[0]?.emailAddress
      },
      items:[
        {
          id: params.courseId,
          name: course.title,
          quantity: 1,
          unit_price: course_price,
          tax_rate: 18,
          price_with_tax: course_price_with_tax,
          net_amount: course_price,
          total_amount: course_price_with_tax,
          item_type: "Product"
        }
      ]
    }

    const invoiceResponse = await axios.post("https://app.getswipe.in/api/partner/v2/doc",
      invoicePayload,
      {
        headers:{
          Authorization: `Bearer ${process.env.SWIPE_INVOICE_KEY}`,
          "Content-Type": "application/json"
        }
      },
    )

    const swipeHashId = invoiceResponse.data.data.hash_id
    // Create the purchase record
    await db.purchase.create({
      data: {
        courseId: params.courseId,
        userId: user.id,
        swipeHashId,
      },
    })  

    return new NextResponse("Payment verified", { status: 200 })
  } catch (error) {
    console.log("[PAYMENT_VERIFICATION]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
