import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/manager/prisma";
import { loginSchema } from "@/lib/manager/validation";
import { SESSION_COOKIE, signManagerToken } from "@/lib/manager/auth";
import { ensureManagerAccount } from "@/lib/manager/bootstrap";

export async function POST(request: Request) {
  const parsed = loginSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid email or password." }, { status: 400 });
  }

  const email = parsed.data.email.toLowerCase();

  try {
    let manager = await prisma.manager.findUnique({ where: { email } });

    if (!manager) {
      const count = await prisma.manager.count();
      if (count === 0) {
        await ensureManagerAccount();
        manager = await prisma.manager.findUnique({ where: { email } });
      }
    }

    if (!manager || !(await bcrypt.compare(parsed.data.password, manager.passwordHash))) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    const token = await signManagerToken({
      sub: manager.id,
      email: manager.email,
      name: manager.name,
      role: "MANAGER",
    });

    const response = NextResponse.json({ ok: true });
    response.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 8,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("[auth/login]", error);
    return NextResponse.json(
      {
        error:
          "Unable to connect to the database. Ensure DATABASE_URL is set and PostgreSQL is running, then run: npm run db:migrate && npm run db:seed",
      },
      { status: 503 }
    );
  }
}
