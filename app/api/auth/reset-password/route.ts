import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/manager/prisma";
import { verifyPasswordResetToken } from "@/lib/manager/auth";
import { resetPasswordSchema } from "@/lib/manager/validation";

export async function POST(request: Request) {
  const parsed = resetPasswordSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid reset request." }, { status: 400 });
  }

  const payload = await verifyPasswordResetToken(parsed.data.token);
  if (!payload) {
    return NextResponse.json({ error: "Reset link is invalid or expired." }, { status: 400 });
  }

  try {
    const manager = await prisma.manager.findUnique({ where: { id: payload.sub } });
    if (!manager || manager.email !== payload.email) {
      return NextResponse.json({ error: "Reset link is invalid or expired." }, { status: 400 });
    }

    const passwordHash = await bcrypt.hash(parsed.data.newPassword, 12);
    await prisma.manager.update({
      where: { id: manager.id },
      data: { passwordHash },
    });

    return NextResponse.json({ ok: true, message: "Password updated. You can sign in now." });
  } catch (error) {
    console.error("[auth/reset-password]", error);
    return NextResponse.json(
      { error: "Unable to reset password. Check database connectivity." },
      { status: 503 }
    );
  }
}
