import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/manager/prisma";
import { assignDietSchema, assignLockerSchema, assignWorkoutSchema } from "@/lib/manager/validation";
import { requireManager, routeError } from "../_shared";

export async function POST(request: NextRequest) {
  const auth = await requireManager(request);
  if (auth.error) return auth.error;

  try {
    const body = await request.json();

    if (body.type === "workout") {
      const data = assignWorkoutSchema.parse(body);
      await prisma.memberWorkout.updateMany({
        where: { memberId: data.memberId, active: true },
        data: { active: false },
      });
      const assignment = await prisma.memberWorkout.create({ data });
      return NextResponse.json({ ok: true, assignment });
    }

    if (body.type === "diet") {
      const data = assignDietSchema.parse(body);
      await prisma.memberDiet.updateMany({
        where: { memberId: data.memberId, active: true },
        data: { active: false },
      });
      const assignment = await prisma.memberDiet.create({ data });
      return NextResponse.json({ ok: true, assignment });
    }

    if (body.type === "locker") {
      const data = assignLockerSchema.parse(body);
      await prisma.lockerAssignment.updateMany({
        where: { lockerId: data.lockerId, releasedAt: null },
        data: { releasedAt: new Date() },
      });
      const assignment = await prisma.lockerAssignment.create({ data });
      await prisma.locker.update({ where: { id: data.lockerId }, data: { status: "OCCUPIED" } });
      return NextResponse.json({ ok: true, assignment });
    }

    return NextResponse.json({ error: "Invalid assignment type." }, { status: 400 });
  } catch (error) {
    return routeError(error);
  }
}
