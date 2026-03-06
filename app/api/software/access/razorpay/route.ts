import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import crypto from "crypto";
import { db } from "@/lib/db";

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: Request) {
  try {
    const user = await currentUser();

    if (!user || !user.id || !user.emailAddresses?.[0]?.emailAddress) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const userAddress = await db.userAddress.findUnique({
      where: { userId: user.id },
    });

    const isIndia = !userAddress || userAddress.country === "India";
    const currency = isIndia ? "INR" : "USD";

    let finalAmount = 0;
    if (isIndia) {
      const kentPriceInr =
        Number(process.env.NEXT_PUBLIC_KENT_PRICE_INR) || 429;
      finalAmount = Math.round(kentPriceInr + (kentPriceInr * 18) / 100);
    } else {
      finalAmount = Number(process.env.NEXT_PUBLIC_KENT_PRICE_USD) || 5;
    }

    const receiptRaw = `${user.id}_${Date.now()}_kent_access`;
    const receipt = crypto
      .createHash("sha1")
      .update(receiptRaw)
      .digest("hex")
      .slice(0, 40);

    const options = {
      amount: finalAmount * 100, // amount in smallest currency unit (paise/cents)
      currency: currency,
      receipt,
      notes: {
        userId: user.id,
        paymentType: "kent-access",
        simplePayment: true,
      },
    } as any;

    const order = await razorpay.orders.create(options);

    return NextResponse.json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    console.log("[KENT_ACCESS_RAZORPAY_ORDER]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
