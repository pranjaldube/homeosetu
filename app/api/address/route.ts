import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { fullName, userId, address1, pinCode, city, state, country } = body

    const existing = await db.userAddress.findUnique({
      where: { userId },
    })

    let userAddress
    if (existing) {
      // update existing
      userAddress = await db.userAddress.update({
        where: { userId },
        data: { fullName, address1, pinCode, city, state, country },
      })
    } else {
      // create new
      userAddress = await db.userAddress.create({
        data: { userId, fullName, address1, pinCode, city, state, country },
      })
    }

    return NextResponse.json(userAddress)
  } catch (error) {
    console.error("[ADDRESS_POST]", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return new NextResponse("Missing userId", { status: 400 });
    }

    const userAddress = await db.userAddress.findUnique({
      where: { userId },
    });

    if (!userAddress) {
      return new NextResponse("User address not found", { status: 404 });
    }

    return NextResponse.json(userAddress);
  } catch (error) {
    console.error("[USER_ADDRESS_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
