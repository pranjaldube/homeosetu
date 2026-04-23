import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  try {
    const user = await currentUser();
    const { message, email } = await req.json();

    if (!user || !user.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!message) {
      return new NextResponse("Message is required", { status: 400 });
    }

    const feedback = await db.feedback.create({
      data: {
        userId: user.id || null,
        email: email || user.emailAddresses?.[0]?.emailAddress || null,
        message,
      },
    });

    return NextResponse.json(feedback);
  } catch (error) {
    console.log("[FEEDBACK_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
