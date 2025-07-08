import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const userId = searchParams.get("userId")

  if (!userId) {
    return new NextResponse("Missing userId", { status: 400 })
  }

  const address = await db.userAddress.findUnique({
    where: { userId },
  })

  return NextResponse.json({ exists: !!address })
}
