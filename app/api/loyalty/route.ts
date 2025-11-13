import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server"; // Clerk auth
import { db } from "@/lib/db"; // your Prisma client

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch loyalty record
    const loyalty = await db.loyaltyPoints.findFirst({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      points: loyalty?.points ?? 0,
    });
  } catch (error) {
    console.error("Error fetching loyalty points:", error);
    return NextResponse.json(
      { error: "Failed to fetch loyalty points" },
      { status: 500 }
    );
  }
}

// ✅ PATCH: Update user's loyalty points (add or subtract)
export async function PATCH(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { points } = await req.json();

    if (typeof points !== "number") {
      return NextResponse.json(
        { error: "Invalid points value" },
        { status: 400 }
      );
    }

    // Upsert ensures record exists
    const updated = await db.loyaltyPoints.upsert({
      where: { userId },
      update: { points: { increment: points } }, // add or subtract
      create: { userId, points },
    });

    return NextResponse.json({
      message: "Loyalty points updated successfully",
      points: updated.points,
    });
  } catch (error) {
    console.error("Error updating loyalty points:", error);
    return NextResponse.json(
      { error: "Failed to update loyalty points" },
      { status: 500 }
    );
  }
}