import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { courseId, userId, userEmail } = body

    const purchase = await db.purchase.create({
        data:{
            courseId,
            userId,
            userEmail
        }
    })

    return NextResponse.json(purchase)
  } catch (error) {
    console.error("[PURCHASE_POST]", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
