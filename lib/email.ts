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
  serial,
  fullName,
  phone,
  email,
  city,
  currentStatus,
  currentStatusOther,

  practiceTypes,
  practiceOther,

  experience,

  timeConsumption,
  timeConsumptionOther,

  softwareUsed,
  helpfulLaptop,
  helpfulMobile,

  repertoryUsed,
  rubricSource,
  materiaMedica,

  frustrationLaptop,
  frustrationMobile,

  learningSources,
  cmePlatforms,

  toolPhrasing,
  toolRepertory,
  toolDifferential,
  featureSuggestions,

  paymentModel,

  earlyAccess,
  contactPermission
}: {
  serial: BigInteger
  fullName: string;
  phone: string;
  email: string;
  city: string;
  currentStatus: string;
  currentStatusOther: string;

  practiceTypes: string[];
  practiceOther: string;

  experience: string;

  timeConsumption: string[];
  timeConsumptionOther: string;

  softwareUsed: string;
  helpfulLaptop: string;
  helpfulMobile: string;

  repertoryUsed: string;
  rubricSource: string;
  materiaMedica: string;

  frustrationLaptop: string;
  frustrationMobile: string;

  learningSources: string[];
  cmePlatforms: string;

  toolPhrasing: string;
  toolRepertory: string;
  toolDifferential: string;
  featureSuggestions: string;

  paymentModel: string;

  earlyAccess: string;
  contactPermission: string;
}) {
  const t = getTransporter();

  // Send notification email to admin
  const adminEmail = {
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_FROM,
    subject: `New Survey Submission from ${fullName || "Unknown User"}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto;">
        <h2 style="color: #333;">New Survey Submission</h2>

        <div style="background: #f5f5f5; padding: 20px; border-radius: 6px;">
          <h3>Personal Details</h3>
          <p><strong>Serial No:</strong>${serial}</p>
          <p><strong>Name:</strong> ${fullName}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>City:</strong> ${city}</p>

          <hr />

          <h3>Current Status</h3>
          <p><strong>Status:</strong> ${currentStatus}</p>
          <p><strong>Other:</strong> ${currentStatusOther}</p>

          <hr />

          <h3>Please suggest type(s)/method of your homeopathic practice</h3>
          <p><strong>Types:</strong> ${practiceTypes?.join(", ")}</p>
          <p><strong>Other:</strong> ${practiceOther}</p>

          <hr />

          <h3>Please select years of your clinical experience</h3>
          <p>${experience}</p>

          <hr />

          <h3>Which case-work parts consume most time?</h3>
          <p><strong>Selected:</strong> ${timeConsumption?.join(", ")}</p>
          <p><strong>Other:</strong> ${timeConsumptionOther}</p>

          <hr />

          <h3>Software Usage</h3>
          <p><strong>Which homeopathy apps/software do you use?:</strong> ${softwareUsed}</p>
          <p><strong>Most Helpful Features (Laptop):</strong> ${helpfulLaptop}</p>
          <p><strong>Most Helpful Features (Mobile):</strong> ${helpfulMobile}</p>

          <hr />

          <h3>Repertory & Materia Medica</h3>
          <p><strong>Which repertory do you use most?:</strong> ${repertoryUsed}</p>
          <p><strong>Do you check the source/author when choosing a rubric?:</strong> ${rubricSource}</p>
          <p><strong>Which Materia medica do you consult when finalizing
                        prescription?:</strong> ${materiaMedica}</p>

          <hr />

          <h3>Frustrations</h3>
          <p><strong>Biggest frustration – Laptop:</strong> ${frustrationLaptop}</p>
          <p><strong>Biggest frustration – Mobile:</strong> ${frustrationMobile}</p>

          <hr />

          <h3>Learning Preferences</h3>
          <p><strong>How do you enhance daily knowledge?:</strong> ${learningSources?.join(", ")}</p>
          <p><strong>Which online platforms do you use for Continued Medical
                      Education?:</strong> ${cmePlatforms}</p>

          <hr />

          <h3>Tool Feedback</h3>
          <p><strong>Tool that suggests patient-version phrasing and mapped
                      rubrics from case input:</strong> ${toolPhrasing}</p>
          <p><strong>Tool that recommends which repertory to use based on the
                      case:</strong> ${toolRepertory}</p>
          <p><strong>Tool that suggests differential diagnoses and differential
                      remedy choices:</strong> ${toolDifferential}</p>
          <p><strong>If you could name some features in the new Homeosetu app,
                      what would it be:</strong> ${featureSuggestions}</p>

          <hr />

          <h3>Which payment model would you prefer for a homeopathy app
                      that meets your needs?</h3>
          <p>${paymentModel}</p>

          <hr />

          <h3>Permissions</h3>
          <p><strong>Would you like early access to test Homeosetu?:</strong> ${earlyAccess}</p>
          <p><strong>May we contact you for collaboration?:</strong> ${contactPermission}</p>
        </div>

        <p style="margin-top: 20px;">Submitted by: <strong>${email}</strong></p>
      </div>
    `,
  };

  // Send both emails
  await t.sendMail(adminEmail);
}