// /app/api/schedule/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { sendEmail } from '@/lib/email';
import path from 'path';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email} = body;
    if (!name || !email) {
      return NextResponse.json({ error: 'name, email and sendAt are required' }, { status: 400 });
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
      data: { name, email },
    });

    const pdfPath = path.join(process.cwd(), 'public', 'files', 'report.pdf');
    

    await sendEmail({
            to: email,
            subject: 'Clinical Resources PDF : Observations Compiled by Homeosetu',
            text: `Dear Dr ${name},
    
    In homeopathic case taking, non-verbal clues are often as revealing as spoken words. These subtle signals help the practitioner perceive the patient's inner state, temperament, and even the peculiarities that guide remedy selection. 
    
    Attached PDF shall give you a structured overview.
    
    We also have some Video Study Courses Published on our website : www.homeosetu.com
    You can Use PDF300 for an instant discount valid for next 48 hours on all our video courses.
    
    Regards
    Team Homeosetu`,
            html: `
        <p>Dear Dr ${name},</p>
    
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

    return NextResponse.json(record);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'server error' }, { status: 500 });
  }
}
