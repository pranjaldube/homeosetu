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
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    // Accepted payment types
    const ALLOWED_TYPES = ["acute", "chronic", "chatbot"] as const
    if (!type || !ALLOWED_TYPES.includes(type)) {
      return NextResponse.json({ message: "Invalid payment type" }, { status: 400 })
    }

    const userAddress = await db.userAddress.findUnique({
      where: { userId: user.id },
    })

    const currency = (!userAddress || userAddress.country === "India") ? "INR" : "USD"

    // Determine base amount depending on type and currency
    let baseAmount = 0
    if (type === "acute") {
      baseAmount = 253
    } else if (type === "chronic") {
      baseAmount = 1271
    } else if (type === "chatbot") {
      // Use environment-configured pricing for chatbot to avoid hardcoding
      const chatbotInr = process.env.CHATBOT_INR_PRICE ? Number(process.env.CHATBOT_INR_PRICE) : undefined
      const chatbotUsd = process.env.CHATBOT_USD_PRICE ? Number(process.env.CHATBOT_USD_PRICE) : undefined
      baseAmount = currency === "INR" ? (chatbotInr ?? 0) : (chatbotUsd ?? 0)
      if (!baseAmount || Number.isNaN(baseAmount)) {
        return NextResponse.json({ message: "Chatbot payment temporarily unavailable. Please try again later." }, { status: 400 })
      }
    }

    // Apply GST for INR payments
    let finalAmount = baseAmount
    if (currency === "INR") {
      finalAmount = Math.round(baseAmount + (baseAmount * 18) / 100)
    }

    const paymentCategory = (type === "acute" || type === "chronic") ? "mentorship" : "chatbot"
    const receiptRaw = `${user.id}_${Date.now()}_${paymentCategory}`
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
        paymentType: paymentCategory,
        simplePayment: true,
        mentorshipType: (type === "acute" || type === "chronic") ? type : undefined,
        chatbotType: type === "chatbot" ? "chatbot" : undefined,
      },
    } as any

    const order = await razorpay.orders.create(options)

    return NextResponse.json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      message: "Order created successfully. Proceed to payment.",
      type,
      category: paymentCategory,
    })
  } catch (error) {
    console.log("[MENTORSHIP_RAZORPAY_ORDER]", error)
    return NextResponse.json({ message: "Something went wrong while creating the order. Please try again." }, { status: 500 })
  }
}


