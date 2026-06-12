import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/manager/prisma";
import { getManagerSessionFromRequest } from "@/lib/manager/auth";
import { changePasswordSchema } from "@/lib/manager/validation";

export async function POST(request: NextRequest) {
  const session = await getManagerSessionFromRequest(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const data = changePasswordSchema.parse(body);
    const manager = await prisma.manager.findUnique({ where: { id: session.sub } });
    if (!manager) {
      return NextResponse.json({ error: "Manager not found." }, { status: 404 });
    }

    const valid = await bcrypt.compare(data.currentPassword, manager.passwordHash);
    if (!valid) {
      return NextResponse.json({ error: "Current password is incorrect." }, { status: 400 });
    }

    const passwordHash = await bcrypt.hash(data.newPassword, 12);
    await prisma.manager.update({ where: { id: manager.id }, data: { passwordHash } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to change password.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
