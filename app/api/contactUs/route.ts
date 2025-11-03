import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendContactUsEmail } from "@/lib/email";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    if (message.trim().length > 5000) {
      return NextResponse.json(
        { error: "Message must not exceed 5000 characters" },
        { status: 400 }
      );
    }

    // Get IP address and user agent from headers
    const forwarded = req.headers.get("x-forwarded-for");
    const ipAddress = forwarded ? forwarded.split(",")[0] : req.headers.get("x-real-ip") || "unknown";
    const userAgent = req.headers.get("user-agent") || "unknown";

    // Create record in database
    const contactRecord = await db.contactUs.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        message: message.trim(),
      },
    });

    // Send email notifications to ADMin
    try {
      await sendContactUsEmail({
        name,
        email,
        message,
      });
    } catch (emailError) {
      console.error("Failed to send contact us email:", emailError);
    }
    return NextResponse.json(
      { 
        success: true,
        message: "Form submitted successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact Us Error:", error);
    
    // Handle specific Prisma errors
    if (error instanceof Error && error.message.includes("Unique constraint")) {
      return NextResponse.json(
        { error: "A contact record with this information already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
