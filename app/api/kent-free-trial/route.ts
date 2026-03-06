import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Check if a free trial record exists for the user
    let trialRecord = await db.kentAccess.findFirst({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // If not, create one
    if (!trialRecord) {
      trialRecord = await db.kentAccess.create({
        data: {
          userId: userId,
        },
      });
    }

    const now = Date.now();
    const startTimeStamp = new Date(trialRecord.accessStartTime).getTime();
    const diffInDays = (now - startTimeStamp) / (1000 * 3600 * 12);
    const kentTrialPeriod =
      Number(process.env.NEXT_PUBLIC_KENT_TRIAL_PERIOD) || 9;
    const kentAccessTime =
      Number(process.env.NEXT_PUBLIC_KENT_ACCESS_TIME) || 30;

    const isExpired =
      (!trialRecord.isPaid && diffInDays > kentTrialPeriod) ||
      (trialRecord.isPaid && diffInDays > kentAccessTime);

    return NextResponse.json({
      isExpired,
    });
  } catch (error) {
    console.log("[KENT_FREE_TRIAL]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
