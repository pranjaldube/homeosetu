// /app/api/schedule/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email} = body;
    if (!name || !email) {
      return NextResponse.json({ error: 'name, email and sendAt are required' }, { status: 400 });
    }

    const record = await db.scheduledEmail.create({
      data: { name, email },
    });

    return NextResponse.json(record);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'server error' }, { status: 500 });
  }
}
