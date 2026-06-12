import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/manager/prisma";
import { getReminderData } from "@/lib/manager/data";
import { reminderMessage } from "@/lib/manager/reminders";
import { requireManager, routeError } from "../_shared";

export async function GET(request: NextRequest) {
  const auth = await requireManager(request);
  if (auth.error) return auth.error;
  return NextResponse.json({ rows: await getReminderData() });
}

export async function POST(request: NextRequest) {
  const auth = await requireManager(request);
  if (auth.error) return auth.error;

  try {
    const body = await request.json();
    const members = await prisma.member.findMany({
      where: { id: { in: body.memberIds || [] } },
      include: { payments: true },
    });

    await prisma.reminderLog.createMany({
      data: members
        .map((member) => ({
          memberId: member.id,
          type: body.type || "PENDING_PAYMENT",
          channel: body.channel || "WHATSAPP",
          message: reminderMessage(member),
        }))
        .filter((item) => item.memberId),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    return routeError(error);
  }
}
