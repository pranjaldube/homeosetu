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
    const { id, abbr, grade, fullForm, description } = body;

    if (!id || !abbr || typeof grade !== 'number') {
      return new NextResponse("Missing required fields (id, abbr, grade)", { status: 400 });
    }

    // Update the remedy
    const updatedRemedy = await db.remedy.update({
      where: {
        id: id,
      },
      data: {
        abbr,
        grade,
        fullForm: fullForm || null,
        description: description || null,
      },
    });

    return NextResponse.json(updatedRemedy);
  } catch (error) {
    console.error("[KENT_REPERTORY_REMEDY_PUT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    // Check if the user is authorized to edit
    const editorId = process.env.NEXT_PUBLIC_KENT_EDITOR_USER_ID || process.env.KENT_EDITOR_USER_ID;

    if (!userId || userId !== editorId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { rubricId, abbr, grade, fullForm, description } = body;

    if (!rubricId || !abbr || typeof grade !== 'number') {
      return new NextResponse("Missing required fields (rubricId, abbr, grade)", { status: 400 });
    }

    // Create the remedy
    const newRemedy = await db.remedy.create({
      data: {
        rubricId,
        abbr,
        grade,
        fullForm: fullForm || null,
        description: description || null,
      },
    });

    return NextResponse.json(newRemedy);
  } catch (error) {
    console.error("[KENT_REPERTORY_REMEDY_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { userId } = await auth();

    // Check if the user is authorized to edit
    const editorId = process.env.NEXT_PUBLIC_KENT_EDITOR_USER_ID || process.env.KENT_EDITOR_USER_ID;

    if (!userId || userId !== editorId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return new NextResponse("Missing required field (id)", { status: 400 });
    }

    // Delete the remedy
    const deletedRemedy = await db.remedy.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json(deletedRemedy);
  } catch (error) {
    console.error("[KENT_REPERTORY_REMEDY_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
