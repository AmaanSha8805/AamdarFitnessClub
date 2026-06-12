import nodemailer from "nodemailer";

type EmailTemplate = "welcome" | "renewal" | "payment" | "expiry";

const subjects: Record<EmailTemplate, string> = {
  welcome: "Welcome to Aamdar Fitness Club",
  renewal: "Membership renewal reminder",
  payment: "Payment confirmation",
  expiry: "Membership expiry alert",
};

export function renderEmailTemplate(template: EmailTemplate, name: string, detail?: string) {
  const intro: Record<EmailTemplate, string> = {
    welcome: "Welcome to Aamdar Fitness Club. Your membership is active and our team is ready to support your fitness journey.",
    renewal: "Your membership renewal is coming up. Renew on time to keep your training routine uninterrupted.",
    payment: "We have received your membership payment. Thank you for choosing Aamdar Fitness Club.",
    expiry: "Your membership has reached its expiry date. Please renew to continue access.",
  };

  return `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111">
      <h2 style="color:#e50914">Aamdar Fitness Club</h2>
      <p>Hi ${name},</p>
      <p>${intro[template]}</p>
      ${detail ? `<p><strong>${detail}</strong></p>` : ""}
      <p>Team Aamdar Fitness Club</p>
    </div>
  `;
}

export async function sendManagerEmail({
  to,
  template,
  name,
  detail,
}: {
  to: string;
  template: EmailTemplate;
  name: string;
  detail?: string;
}) {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;

  if (!host || !user || !pass) {
    throw new Error("SMTP_HOST, SMTP_USER, and SMTP_PASSWORD are required to send email.");
  }

  const transporter = nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: { user, pass },
  });

  await transporter.sendMail({
    from: process.env.SMTP_FROM || user,
    to,
    subject: subjects[template],
    html: renderEmailTemplate(template, name, detail),
  });
}
