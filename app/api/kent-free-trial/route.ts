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
    let trialRecord = await db.kentFreeTrial.findUnique({
      where: {
        userId: userId,
      },
    });

    // If not, create one
    if (!trialRecord) {
      trialRecord = await db.kentFreeTrial.create({
        data: {
          userId: userId,
        },
      });
    }

    const now = Date.now();
    const startTimeStamp = new Date(trialRecord.trialStartTime).getTime();
    const diffInDays = (now - startTimeStamp) / (1000 * 3600 * 12);

    const isExpired = diffInDays > 1;

    return NextResponse.json({
      isExpired,
    });
  } catch (error) {
    console.log("[KENT_FREE_TRIAL]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
