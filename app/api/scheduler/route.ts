// /app/api/scheduler/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { sendEmail } from '@/lib/email';
import path from 'path';

export const runtime = 'nodejs';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const key = req.headers.get('x-scheduler-key') ?? url.searchParams.get('key');
  if (key !== process.env.SCHEDULER_SECRET) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const now = new Date();
  const due = await db.scheduledEmail.findMany({
    where: { sent: false, createdAt: { lte: now } },
    orderBy: { createdAt: 'asc' },
  });

  const pdfPath = path.join(process.cwd(), 'public', 'files', 'report.pdf');

  for (const item of due) {
    try {
      // Example PDF in /public/files/report.pdf
      await sendEmail({
        to: item.email,
        subject: 'Clinical Resources PDF : Observations Compiled by Homeosetu',
        text: `Dear Dr ${item.name},

In homeopathic case taking, non-verbal clues are often as revealing as spoken words. These subtle signals help the practitioner perceive the patient's inner state, temperament, and even the peculiarities that guide remedy selection. 

Attached PDF shall give you a structured overview.

We also have some Video Study Courses Published on our website : www.homeosetu.com
You can Use PDF300 for an instant discount valid for next 48 hours on all our video courses.

Regards
Team Homeosetu`,
        html: `
    <p>Dear Dr ${item.name},</p>

    <p>In homeopathic case taking, <strong>non-verbal clues</strong> are often as revealing as spoken words. These subtle signals help the practitioner perceive the patient's inner state, temperament, and even the peculiarities that guide remedy selection.</p>

    <p>Attached PDF shall give you a structured overview.</p>

    <p>We also have some <strong>Video Study Courses</strong> published on our website: 
      <a href="https://www.homeosetu.com" target="_blank">www.homeosetu.com</a>.
    </p>

    <p>You can use <strong>PDF300</strong> for an instant discount valid for the next <strong>48 hours</strong> on all our video courses.</p>

    <p>Regards,<br/>
    Team Homeosetu</p>
  `,
        pdfFilePath: pdfPath,
      });

      await db.scheduledEmail.update({
        where: { id: item.id },
        data: { sent: true },
      });

    } catch (err: any) {
      console.error('[Scheduler Error]', err);
    }
  }

  return NextResponse.json({ processed: due.length });
}
