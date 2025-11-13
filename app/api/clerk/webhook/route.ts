import { Webhook } from "svix";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const payload = await req.text();
  const heads = headers();

  const whSecret = process.env.CLERK_WEBHOOK_SECRET!;
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

  const userId = evt.data.id;

  // 🪙 Add 5 points on every login
  try {
    await db.loyaltyPoints.upsert({
      where: { userId },
      update: { points: { increment: 5 } },
      create: { userId, points: 5 },
    });
  } catch (err) {
    console.log("Error in updating loyal points in clerk webhook", err);
  }

  console.log(`✅ Added 5 loyalty points for user ${userId}`);

  return NextResponse.json({ success: true });
}
