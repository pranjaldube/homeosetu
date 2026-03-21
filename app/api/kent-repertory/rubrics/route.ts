import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function PUT(req: Request) {
  try {
    const { userId } = await auth();

    // Check if the user is authorized to edit
    const editorId = process.env.NEXT_PUBLIC_KENT_EDITOR_USER_ID || process.env.KENT_EDITOR_USER_ID;

    if (!userId || userId !== editorId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { id, name, meaning } = body;

    if (!id || !name) {
      return new NextResponse("Missing required fields (id, name)", { status: 400 });
    }

    // Update the rubric
    const updatedRubric = await db.rubric.update({
      where: {
        id: id,
      },
      data: {
        name,
        meaning: meaning || null,
      },
    });

    return NextResponse.json(updatedRubric);
  } catch (error) {
    console.error("[KENT_REPERTORY_RUBRIC_PUT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
