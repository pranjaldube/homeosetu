// /app/api/schedule/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { sendEmail } from '@/lib/email';
import path from 'path';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, filePath, phone, sent} = body;
    if (!name || !email) {
      return NextResponse.json({ error: 'name, email, phone and sendAt are required' }, { status: 400 });
    }

    const existingEmail = await db.scheduledEmail.findUnique({
      where:{
        email
      }
    })

    if(existingEmail){
      return  NextResponse.json('Already Subscribed')
    }

    const record = await db.scheduledEmail.create({
      data: { name, email, phone, sent },
    });

    const pdfPath = path.join(process.cwd(), 'public', 'files', filePath);
    

    await sendEmail({
            to: email,
            subject: 'Clinical Resources PDF : Freedom from Prejudices-Compiled by Homeosetu',
            text: `Dear Dr Alpesh ,

A Homeopath always gets prejudiced in Case taking through reference of a single repertory / MM / Method.

Attached PDF shall give you a structured overview for breaking your prejudices.

We also have some Video Study Courses published on our website: www.homeosetu.com.

You can use PDF300 for an instant discount valid for the next 48 hours on all our video courses.

Regards,
Team Homeosetu`,
            html: `
    <p>Dear Dr Alpesh,</p>

    <p>
      A Homeopath always gets prejudiced in Case taking through reference of a
      single repertory / MM / Method.
    </p>

    <p>
      Attached PDF shall give you a structured overview for breaking your
      prejudices.
    </p>

    <p>
      We also have some <strong>Video Study Courses</strong> published on our
      website:
      <a href="https://www.homeosetu.com" target="_blank">www.homeosetu.com</a>.
    </p>

    <p>
      You can use <strong>PDF300</strong> for an instant discount valid for the
      next <strong>48 hours</strong> on all our video courses.
    </p>

    <p>Regards,<br/>Team Homeosetu</p>
  `,
            pdfFilePath: pdfPath,
          });

    return NextResponse.json(record);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'server error' }, { status: 500 });
  }
}
