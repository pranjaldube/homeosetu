import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { couponCode } = body;

        if (!couponCode) {
            return new NextResponse("Missing couponCode", { status: 200 });
        }

        const coupon = await db.couponPercentage.findFirst({
            where: {
                codes: couponCode,    // direct string comparison
            },
        });

        if (!coupon) {
            return new NextResponse("Invalid Coupon Code", { status: 200 });
        }

        if (coupon.count && coupon.count <= 0) {
            return new NextResponse("Coupon limit exceeded", { status: 200 });
        }

        return NextResponse.json({ discount: coupon.discount, couponId: coupon.id }, { status: 200 });

    } catch (error) {
        console.error("[COUPON_POST]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function PATCH(req: Request) {
    try {
        const body = await req.json();
        const { couponId } = body;

        if (!couponId) {
            return new NextResponse("Unauthorized", { status: 200 });
        }

        const coupon = await db.couponPercentage.findUnique({
            where: { id: couponId },
        });

        if (!coupon) {
            return new NextResponse("Coupon not found", { status: 200 });
        }

        if (coupon.count && coupon.count <= 0) {
            return new NextResponse("Coupon limit exceeded", { status: 200 });
        }

        const updatedCoupon = await db.couponPercentage.update({
            where: { id: couponId },
            data: {
                count: {
                    decrement: 1,
                },
            },
        });

        return NextResponse.json("Coupon count decremented", { status: 200 });
    } catch (error) {
        console.error("[COUPON_PATCH]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}