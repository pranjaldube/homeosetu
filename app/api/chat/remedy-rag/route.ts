import { NextRequest, NextResponse } from "next/server";
import { queryMedicalRag } from "@/lib/medical-query";

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 },
      );
    }

    const result = await queryMedicalRag(message);

    return NextResponse.json({ 
        response: result.answer,
        sources: result.sources 
    });
  } catch (error: any) {
    console.error("Medical Chat API Error:", error);
    return NextResponse.json(
      { error: "Failed to generate response", details: error.message },
      { status: 500 },
    );
  }
}
