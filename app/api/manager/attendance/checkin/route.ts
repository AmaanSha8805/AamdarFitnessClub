import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/manager/prisma";
import { getResourceData } from "@/lib/manager/data";
import { checkInSchema } from "@/lib/manager/validation";
import { requireManager, routeError } from "../../_shared";

export async function POST(request: NextRequest) {
  const auth = await requireManager(request);
  if (auth.error) return auth.error;

  try {
    const body = await request.json();
    const data = checkInSchema.parse(body);

    const member = await prisma.member.findUnique({
      where: { memberCode: data.memberCode },
    });

    if (!member) {
      return NextResponse.json({ error: "Member not found." }, { status: 404 });
    }

    if (member.status !== "ACTIVE") {
      return NextResponse.json({ error: "Member membership is not active." }, { status: 400 });
    }

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const openAttendance = await prisma.attendance.findFirst({
      where: {
        memberId: member.id,
        checkIn: { gte: todayStart, lte: todayEnd },
        checkOut: null,
      },
    });

    if (openAttendance) {
      const updated = await prisma.attendance.update({
        where: { id: openAttendance.id },
        data: { checkOut: new Date() },
      });
      return NextResponse.json({
        ok: true,
        action: "checkout",
        member: member.fullName,
        attendance: updated,
        rows: await getResourceData("attendance"),
      });
    }

    const attendance = await prisma.attendance.create({
      data: {
        memberId: member.id,
        branchId: data.branchId || member.branchId,
        checkIn: new Date(),
        type: data.type,
      },
    });

    return NextResponse.json({
      ok: true,
      action: "checkin",
      member: member.fullName,
      attendance,
      rows: await getResourceData("attendance"),
    });
  } catch (error) {
    return routeError(error);
  }
}
