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
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, type } = body

    if (!type || (type !== "acute" && type !== "chronic")) {
      return new NextResponse("Invalid mentorship type", { status: 400 })
    }

    // Verify signature
    const toVerify = razorpay_order_id + "|" + razorpay_payment_id
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(toVerify.toString())
      .digest("hex")
    const isAuthentic = expectedSignature === razorpay_signature
    if (!isAuthentic) {
      return new NextResponse("Invalid signature", { status: 400 })
    }

    const userAddress = await db.userAddress.findUnique({ where: { userId: user.id } })

    const isIndia = !userAddress || userAddress.country === "India"
    const baseAmount = type === "acute" ? 253 : 1271
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
          id: `mentorship-${type}`,
          name: type === "acute" ? "Mentorship - Acute Consultation" : "Mentorship - Chronic Consultation",
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

    await db.mentorshipPurchase.create({
      data: {
        userId: user.id,
        type,
        swipeHashId: swipeHashId || null,
        userEmail: user.emailAddresses?.[0]?.emailAddress,
      },
    })

    return new NextResponse("Payment verified", { status: 200 })
  } catch (error) {
    console.log("[MENTORSHIP_PAYMENT_VERIFICATION]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}


