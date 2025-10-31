import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { sendSurveyEmail } from "@/lib/email";

const prisma = new PrismaClient();

// Zod schema for validating the request
const surveySchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email required"),
  selectiveOne: z.string().min(1, "This field is required"),
  selectiveTwo: z.string().min(1, "This field is required"),
  descriptiveOne: z.string().min(5, "Required, more than 5 characters"),
  descriptiveTwo: z.string().min(5, "Required, more than 5 characters"),
  descriptiveThree: z.string().min(5, "Required, more than 5 characters"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = surveySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
    }

    const response = await prisma.survey.create({
      data: parsed.data,
    });

    try {
        await sendSurveyEmail(parsed.data)
      } catch (emailError) {
        console.error("Failed to send contact us email:", emailError);
      }
    return NextResponse.json({ success: true,  message: "Form submitted successfully" });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error or invalid request." }, { status: 500 });
  }
}
