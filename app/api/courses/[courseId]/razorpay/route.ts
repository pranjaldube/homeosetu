import { currentUser } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import Razorpay from "razorpay"
import crypto from "crypto"
import { db } from "@/lib/db"

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const {couponApplied,discountedPrice} = await req.json()
    const user = await currentUser()

    if (!user || !user.id || !user.emailAddresses?.[0]?.emailAddress) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const cartItems = await db.cart.findMany({
      where: { userId: user.id },
      include: {
        course: true, // joins Course table
      },
    });

    // const course = await db.course.findUnique({
    //   where: {
    //     id: params.courseId,
    //     isPublished: true,
    //   },
    // })

    // const purchase = await db.purchase.findFirst({
    //   where: {
    //     userId: user.id,
    //     courseId: params.courseId,
    //   },
    //   orderBy: {
    //     createdAt: 'desc', // sort latest first
    //   },
    // })
    

    // let isPurchaseExpired = false;
    // const EXPIRY_DAYS = course?.courseTimeLimit || 0;
    // if (purchase && purchase.createdAt && EXPIRY_DAYS !== 0) {
    //   const now = new Date();
    //   const createdAt = new Date(purchase.createdAt);
    //   const diffTime = Math.abs(now.getTime() - createdAt.getTime());
    //   const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    //   isPurchaseExpired = diffDays > EXPIRY_DAYS;
    // }

    // if (purchase && !isPurchaseExpired) {
    //   return new NextResponse("Already purchased", { status: 400 })
    // }

    if (cartItems.length === 0) {
      return new NextResponse("Items Not found", { status: 404 })
    }

    const userAddress = await db.userAddress.findUnique({
      where: { userId: user.id },
    })

    let totalValue = 0;

if (userAddress && userAddress.country === 'India') {
  cartItems.forEach((item: any) => {
    totalValue += item.course.price; // ✅ if course is joined
  });
} else {
  cartItems.forEach((item: any) => {
    totalValue += item.course.usdPrice; // ✅ if course is joined
  });
}
    
    const receiptRaw = `${user.id}_${Date.now()}`
    const receipt = crypto
      .createHash("sha1")
      .update(receiptRaw)
      .digest("hex")
      .slice(0, 40)

    const currency = (!userAddress || userAddress.country === "India") ? "INR" : "USD";

    let final_price: number;
    let coursePrice = totalValue!
    if(couponApplied){
      coursePrice = discountedPrice
    }
    if (currency === "INR") {
      const tax = Math.round((coursePrice * 18) / 100); // 18% GST
      final_price = coursePrice + tax;
    } else {
      final_price = totalValue;
    }

    const options = {
      amount: final_price * 100, // amount in smallest currency unit
      currency,
      receipt,
      notes: {
        userId: user.id,
      },
    }

    const order = await razorpay.orders.create(options)

    return NextResponse.json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
    })
  } catch (error) {
    console.log("[RAZORPAY_ORDER]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
