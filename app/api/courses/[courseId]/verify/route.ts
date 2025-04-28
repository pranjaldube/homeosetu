import { currentUser } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import crypto from "crypto"

import { db } from "@/lib/db"

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

    // Create the purchase record
    await db.purchase.create({
      data: {
        courseId: params.courseId,
        userId: user.id,
      },
    })

    return new NextResponse("Payment verified", { status: 200 })
  } catch (error) {
    console.log("[PAYMENT_VERIFICATION]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
