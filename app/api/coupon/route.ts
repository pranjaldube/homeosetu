import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { courseId, couponCode } = body;

        if (!couponCode) {
            return new NextResponse("Missing couponCode", { status: 200 });
        }

        if(!courseId){
            return new NextResponse("Unauthorized", { status: 200 });
        }

        const course = await db.course.findUnique({
            where: { id: courseId },
        });

        if (!course) {
            // course does not exist, treat as unauthorized
            return new NextResponse("Unauthorized", { status: 200 });
        }

        const anyCouponForCourse = await db.coupon.findFirst({
            where: {
                courseId: courseId,
            },
        });

        if (!anyCouponForCourse) {
            return new NextResponse("No coupons available for this course", { status: 200 });
        }

        const coupon = await db.coupon.findFirst({
            where: {
                courseId: courseId,   // filter by course
                codes: {
                    has: couponCode,    // filter by array element
                },
            },
        });

        if (!coupon) {
            return new NextResponse("Invalid Coupon Code", { status: 200 });
        }

        if (coupon.count === 0) {
            return new NextResponse("Coupon limit exceeded", { status: 200 });
        }

        const updatedCoupon = await db.coupon.update({
            where: { id: coupon.id },
            data: {
                count: {
                    decrement: 1, // atomic decrement
                },
            },
        });

        return NextResponse.json({ discount: coupon.discount }, { status: 200 });

    } catch (error) {
        console.error("[COUPON_POST]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}


// export async function GET(req: Request) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const userId = searchParams.get("userId");

//     if (!userId) {
//       return new NextResponse("Missing userId", { status: 400 });
//     }

//     const userAddress = await db.userAddress.findUnique({
//       where: { userId },
//     });

//     if (!userAddress) {
//       return new NextResponse("User address not found", { status: 404 });
//     }

//     return NextResponse.json(userAddress);
//   } catch (error) {
//     console.error("[USER_ADDRESS_GET]", error);
//     return new NextResponse("Internal Server Error", { status: 500 });
//   }
// }
