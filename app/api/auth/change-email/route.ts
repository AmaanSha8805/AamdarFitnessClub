import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/manager/prisma";
import { getManagerSessionFromRequest, SESSION_COOKIE, signManagerToken } from "@/lib/manager/auth";
import { changeEmailSchema } from "@/lib/manager/validation";

export async function POST(request: NextRequest) {
  const session = await getManagerSessionFromRequest(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const data = changeEmailSchema.parse(body);
    const newEmail = data.newEmail.toLowerCase();

    const manager = await prisma.manager.findUnique({ where: { id: session.sub } });
    if (!manager) {
      return NextResponse.json({ error: "Manager not found." }, { status: 404 });
    }

    const valid = await bcrypt.compare(data.currentPassword, manager.passwordHash);
    if (!valid) {
      return NextResponse.json({ error: "Current password is incorrect." }, { status: 400 });
    }

    const existing = await prisma.manager.findUnique({ where: { email: newEmail } });
    if (existing && existing.id !== manager.id) {
      return NextResponse.json({ error: "That email is already in use." }, { status: 409 });
    }

    const updated = await prisma.manager.update({
      where: { id: manager.id },
      data: { email: newEmail },
    });

    const token = await signManagerToken({
      sub: updated.id,
      email: updated.email,
      name: updated.name,
      role: "MANAGER",
    });

    const response = NextResponse.json({ ok: true, email: updated.email });
    response.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 8,
      path: "/",
    });

    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to change email.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
