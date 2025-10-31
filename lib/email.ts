// /lib/sendEmail.ts
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (transporter) return transporter;
  transporter = nodemailer.createTransport({
    service:'gmail',
    // host: process.env.SMTP_HOST,
    // port: Number(process.env.SMTP_PORT),
    secure: true, // Gmail uses true for 465
    auth: {
      user: process.env.SMTP_USER,
      pass: 'drom zaxy neqv llkx',
    },
  });
  return transporter;
}

export async function sendEmail({
  to,
  subject,
  text,
  html,
  pdfFilePath, // new param
}: {
  to: string;
  subject: string;
  text?: string;
  html?: string;
  pdfFilePath?: string; // optional
}) {
  const t = getTransporter();

  const attachments = pdfFilePath
    ? [
        {
          filename: path.basename(pdfFilePath),
          content: fs.createReadStream(pdfFilePath),
          contentType: 'application/pdf',
        },
      ]
    : [];

  return t.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject,
    text,
    html,
    attachments,
  });
}

export async function sendContactUsEmail({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) {
  const t = getTransporter();

  // Send notification email to admin
  const adminEmail = {
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_FROM, // Send to admin email
    subject: `New Contact Us Message from ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">New Contact Us Message</h2>
        <div style="background: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
          <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
          <p style="margin: 10px 0;"><strong>Message:</strong></p>
          <p style="margin: 10px 0; line-height: 1.6; color: #333;">${message}</p>
        </div>
        <p style="color: #666;">
          <strong>Reply to:</strong> ${email}
        </p>
      </div>
    `,
  };

  // Send both emails
  await t.sendMail(adminEmail);
}

export async function sendSurveyEmail({
  name,
  email,
  selectiveOne,
  selectiveTwo,
  descriptiveOne,
  descriptiveTwo,
  descriptiveThree,
}: {
  name: string;
  email: string;
  selectiveOne: string;
  selectiveTwo: string;
  descriptiveOne: string;
  descriptiveTwo: string;
  descriptiveThree: string;
}) {
  const t = getTransporter();

  // Send notification email to admin
  const adminEmail = {
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_FROM, // Send to admin email
    subject: `New Contact Us Message from ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">New Contact Us Message</h2>
        <div style="background: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
          <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
          <p style="margin: 10px 0;"><strong>Message:</strong></p>
          <p style="margin: 10px 0; line-height: 1.6; color: #333;">${selectiveOne}</p>
          <p style="margin: 10px 0; line-height: 1.6; color: #333;">${selectiveTwo}</p>
          <p style="margin: 10px 0; line-height: 1.6; color: #333;">${descriptiveOne}</p>
          <p style="margin: 10px 0; line-height: 1.6; color: #333;">${descriptiveTwo}</p>
          <p style="margin: 10px 0; line-height: 1.6; color: #333;">${descriptiveThree}</p>
        </div>
        <p style="color: #666;">
          <strong>Reply to:</strong> ${email}
        </p>
      </div>
    `,
  };

  // Send both emails
  await t.sendMail(adminEmail);
}