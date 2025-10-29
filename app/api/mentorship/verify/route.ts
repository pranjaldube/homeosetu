import { currentUser } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import crypto from "crypto"
import axios from "axios"
import { db } from "@/lib/db"

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-GB").split("/").join("-")
}

export async function POST(req: Request) {
  try {
    const user = await currentUser()
    if (!user || !user.id || !user.emailAddresses?.[0]?.emailAddress) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, type } = body

    const ALLOWED_TYPES = ["acute", "chronic", "chatbot"] as const
    if (!type || !ALLOWED_TYPES.includes(type)) {
      return NextResponse.json({ message: "Invalid payment type" }, { status: 400 })
    }

    // Verify signature
    const toVerify = razorpay_order_id + "|" + razorpay_payment_id
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(toVerify.toString())
      .digest("hex")
    const isAuthentic = expectedSignature === razorpay_signature
    if (!isAuthentic) {
      return NextResponse.json({ message: "Payment could not be verified. Please contact support if amount was deducted." }, { status: 400 })
    }

    const userAddress = await db.userAddress.findUnique({ where: { userId: user.id } })

    const isIndia = !userAddress || userAddress.country === "India"
    let baseAmount = 0
    if (type === "acute") baseAmount = 253
    else if (type === "chronic") baseAmount = 1271
    else if (type === "chatbot") {
      const chatbotInr = process.env.CHATBOT_INR_PRICE ? Number(process.env.CHATBOT_INR_PRICE) : undefined
      const chatbotUsd = process.env.CHATBOT_USD_PRICE ? Number(process.env.CHATBOT_USD_PRICE) : undefined
      baseAmount = isIndia ? (chatbotInr ?? 0) : (chatbotUsd ?? 0)
      if (!baseAmount || Number.isNaN(baseAmount)) {
        return NextResponse.json({ message: "Chatbot payment configuration missing. Please try again later." }, { status: 400 })
      }
    }
    let tax_rate_value = 0
    let course_price_with_tax = baseAmount
    if (isIndia) {
      tax_rate_value = 18
      course_price_with_tax = baseAmount + (baseAmount / 100) * tax_rate_value
    }

    const now = new Date()
    const date = formatDate(now)

    const invoicePayload: any = {
      document_type: "invoice",
      document_date: date,
      due_date: date,
      round_off: isIndia,
      party: {
        id: user.id,
        type: "customer",
        name: userAddress?.fullName || `${user?.firstName} ${user?.lastName}`,
        email: user.emailAddresses?.[0]?.emailAddress,
      },
      items: [
        {
          id: (type === "acute" || type === "chronic") ? `mentorship-${type}` : `chatbot` ,
          name: (type === "acute")
            ? "Mentorship - Acute Consultation"
            : (type === "chronic")
              ? "Mentorship - Chronic Consultation"
              : "Chatbot Consultation",
          quantity: 1,
          unit_price: baseAmount,
          tax_rate: tax_rate_value,
          price_with_tax: course_price_with_tax,
          net_amount: baseAmount,
          total_amount: course_price_with_tax,
          item_type: "Service",
        },
      ],
    }

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
      }
    } else {
      invoicePayload.is_multi_currency = true
      invoicePayload.export_invoice_details = {
        export_type: "Export with IGST",
        conversion_factor: 1,
        country_id: "United States",
        currency_id: "USD",
      }
    }

    let swipeHashId: string | null = null
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
      )
      swipeHashId = invoiceResponse.data.data.hash_id
    } catch (error) {
      console.error("Failed to generate invoice:", error)
    }

    // Store a record. We will keep using MentorshipPurchase for simplicity
    const client: any = db
    await client.mentorshipPurchase.create({
      data: {
        userId: user.id,
        type, // stores "acute" | "chronic" | "chatbot"
        swipeHashId: swipeHashId || null,
        userEmail: user.emailAddresses?.[0]?.emailAddress,
      },
    })

    return NextResponse.json({ message: "Payment verified successfully. Invoice will be sent to your email." }, { status: 200 })
  } catch (error) {
    console.log("[MENTORSHIP_PAYMENT_VERIFICATION]", error)
    return NextResponse.json({ message: "Something went wrong while verifying the payment. Please try again." }, { status: 500 })
  }
}


