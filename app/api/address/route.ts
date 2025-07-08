import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { userId, address1, pinCode, city, state, country } = body

    if (!userId || !address1 || !city || !state || !country || !pinCode) {
      return new NextResponse("Missing required fields", { status: 400 })
    }

    const existing = await db.userAddress.findUnique({
      where: { userId },
    })

    let userAddress
    if (existing) {
      // update existing
      userAddress = await db.userAddress.update({
        where: { userId },
        data: { address1, pinCode, city, state, country },
      })
    } else {
      // create new
      userAddress = await db.userAddress.create({
        data: { userId, address1, pinCode, city, state, country },
      })
    }

    return NextResponse.json(userAddress)
  } catch (error) {
    console.error("[ADDRESS_POST]", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
