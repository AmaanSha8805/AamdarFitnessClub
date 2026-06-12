import { NextResponse } from "next/server";
import { prisma } from "@/lib/manager/prisma";
import { signPasswordResetToken } from "@/lib/manager/auth";
import { forgotPasswordSchema } from "@/lib/manager/validation";
import { GYM } from "@/lib/constants";

export async function POST(request: Request) {
  const parsed = forgotPasswordSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const email = parsed.data.email.toLowerCase();

  try {
    const manager = await prisma.manager.findUnique({ where: { email } });
    if (!manager) {
      // Do not reveal whether the account exists
      return NextResponse.json({
        ok: true,
        message: "If that email is registered, password reset instructions have been sent.",
      });
    }

    const token = await signPasswordResetToken(manager.id, manager.email);
    const resetUrl = `${GYM.siteUrl}/manager-reset-password?token=${encodeURIComponent(token)}`;

    const host = process.env.SMTP_HOST;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASSWORD;

    if (host && user && pass) {
      const nodemailer = await import("nodemailer");
      const transporter = nodemailer.default.createTransport({
        host,
        port: Number(process.env.SMTP_PORT || 587),
        secure: process.env.SMTP_SECURE === "true",
        auth: { user, pass },
      });

      await transporter.sendMail({
        from: process.env.SMTP_FROM || user,
        to: manager.email,
        subject: "Reset your Aamdar Fitness Club manager password",
        html: `
          <p>Hi ${manager.name},</p>
          <p>Use the link below to reset your manager portal password. This link expires in 1 hour.</p>
          <p><a href="${resetUrl}">${resetUrl}</a></p>
          <p>If you did not request this, you can ignore this email.</p>
        `,
      });

      return NextResponse.json({
        ok: true,
        message: "Password reset link sent to your email.",
      });
    }

    return NextResponse.json({
      ok: true,
      message: "SMTP is not configured. Use this one-time reset link:",
      resetUrl: process.env.NODE_ENV === "development" ? resetUrl : undefined,
    });
  } catch (error) {
    console.error("[auth/forgot-password]", error);
    return NextResponse.json(
      { error: "Unable to process password reset. Check database connectivity." },
      { status: 503 }
    );
  }
}
