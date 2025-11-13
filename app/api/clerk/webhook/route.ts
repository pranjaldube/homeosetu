import { Webhook } from "svix";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const payload = await req.text();
  const heads = headers();

  const whSecret = process.env.CLERK_WEBHOOK_SECRET;
  if (!whSecret) {
    console.error("❌ Missing Clerk Webhook secret");
    return new NextResponse("Server misconfiguration", { status: 500 });
  }

  const svix_id = heads.get("svix-id");
  const svix_timestamp = heads.get("svix-timestamp");
  const svix_signature = heads.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new NextResponse("Missing svix headers", { status: 400 });
  }

  const wh = new Webhook(whSecret);
  let evt: any;
  try {
    evt = wh.verify(payload, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    console.error("❌ Webhook verification failed:", err);
    return new NextResponse("Invalid signature", { status: 400 });
  }

  const eventType = evt.type;
  let userId: string | null = null;

  if (eventType.startsWith("user.")) {
    userId = evt.data.id;
  } else if (eventType.startsWith("session.")) {
    userId = evt.data.user_id;
  }

  if (!userId) {
    console.error("❌ Could not determine userId from event:", eventType);
    return new NextResponse("Invalid event data", { status: 400 });
  }

  // 🪙 Add 5 points on every login
  try {
    await db.loyaltyPoints.upsert({
      where: { userId },
      update: { points: { increment: 5 } },
      create: { userId, points: 5 },
    });
    console.log(`✅ Added 5 loyalty points for user ${userId}`);
  } catch (err) {
    console.log("Error in updating loyal points in clerk webhook", err);
  }

  return NextResponse.json({ success: true });
}
