import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const trialDays = Number(process.env.NEXT_PUBLIC_KENT_TRIAL_PERIOD) || 9;

    const trialMs = trialDays * 24 * 60 * 60 * 1000;

    const existing = await db.kentAccess.findUnique({
      where: { userId },
    });

    let record;

    if (!existing) {
      // ✅ Create trial only once
      record = await db.kentAccess.create({
        data: {
          userId,
          isPaid: false,
          accessStartTime: new Date(),
          accessEndTime: new Date(Date.now() + trialMs),
        },
      });
    } else {
      record = existing;
    }

    const now = Date.now();
    const endTime = new Date(record.accessEndTime!).getTime();

    const isExpired = now > endTime;

    return NextResponse.json({
      isExpired,
      accessEndTime: record.accessEndTime,
    });
  } catch (error) {
    console.log("[KENT_FREE_TRIAL]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
