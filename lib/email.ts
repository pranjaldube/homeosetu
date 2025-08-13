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
