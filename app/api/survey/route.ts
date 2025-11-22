import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { sendSurveyEmail } from "@/lib/email";
import { auth } from "@clerk/nextjs/server"; // Clerk auth

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId } = await auth();

    const total = await prisma.survey.count();
    const response = await prisma.survey.create({
      data: { ...body, serial: total + 1 },
    });

    if (!userId) {
      return NextResponse.json({
        success: true,
        message: "Form submitted successfully (no user logged in)",
      });
    }

    try {
      await sendSurveyEmail({...body, serial:total + 1});
      await prisma.loyaltyPoints.upsert({
        where: { userId },
        update: { points: { increment: 2 } },
        create: { userId, points: 2 },
      });
    } catch (emailError) {
      console.error("Failed to send contact us email:", emailError);
    }
    return NextResponse.json({
      success: true,
      message: "Form submitted successfully",
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Server error or invalid request." },
      { status: 500 }
    );
  }
}
