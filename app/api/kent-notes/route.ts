import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"; // Clerk auth
import { db } from "@/lib/db"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const chapterId = searchParams.get("chapterId") || undefined

  try {
    const notes = await db.kentNote.findMany({
      where: {
        ...(chapterId ? { chapterId } : {}),
      },
      // newest first
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json({ notes })
  } catch (error) {
    console.error("[KENT_NOTES_GET]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function POST(req: Request) {
  const { userId } = await auth()

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  try {
    const { rubricId, text, chapterId, userName } = await req.json()

    if (!rubricId || !chapterId || !text || typeof text !== "string") {
      return new NextResponse("Invalid payload", { status: 400 })
    }

    const note = await db.kentNote.create({
      data: {
        userId,
        rubricId: String(rubricId),
        text: text.trim(),
        chapterId,        // required, depends on Prisma schema
        userName,
      },
    })

    return NextResponse.json({ note })
  } catch (error) {
    console.error("[KENT_NOTES_POST]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

