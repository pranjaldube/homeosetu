import { currentUser } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import Razorpay from "razorpay"
import crypto from "crypto"
import { db } from "@/lib/db"

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

export async function POST(req: Request) {
  try {
    const { type } = await req.json()
    const user = await currentUser()

    if (!user || !user.id || !user.emailAddresses?.[0]?.emailAddress) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    if (!type || (type !== "acute" && type !== "chronic")) {
      return new NextResponse("Invalid mentorship type", { status: 400 })
    }

    const userAddress = await db.userAddress.findUnique({
      where: { userId: user.id },
    })

    const currency = (!userAddress || userAddress.country === "India") ? "INR" : "USD"

    const baseAmount = type === "acute" ? 253 : 1271
    let finalAmount = baseAmount
    if (currency === "INR") {
      finalAmount = Math.round(baseAmount + (baseAmount * 18) / 100)
    }

    const receiptRaw = `${user.id}_${Date.now()}_mentorship`
    const receipt = crypto
      .createHash("sha1")
      .update(receiptRaw)
      .digest("hex")
      .slice(0, 40)

    const options = {
      amount: finalAmount * 100,
      currency,
      receipt,
      notes: {
        userId: user.id,
        paymentType: "mentorship",
        simplePayment: true,
        mentorshipType: type,
      },
    } as any

    const order = await razorpay.orders.create(options)

    return NextResponse.json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
    })
  } catch (error) {
    console.log("[MENTORSHIP_RAZORPAY_ORDER]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}


