import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/manager/prisma";
import { getResourceData } from "@/lib/manager/data";
import { generateMemberCode } from "@/lib/manager/member-id";
import { memberSchema } from "@/lib/manager/validation";
import { requireManager, routeError } from "../_shared";

export async function GET(request: NextRequest) {
  const auth = await requireManager(request);
  if (auth.error) return auth.error;
  return NextResponse.json({ rows: await getResourceData("members") });
}

export async function POST(request: NextRequest) {
  const auth = await requireManager(request);
  if (auth.error) return auth.error;

  try {
    const body = await request.json();
    if (body.action === "delete") {
      await prisma.member.delete({ where: { id: body.id } });
      return NextResponse.json({ ok: true, rows: await getResourceData("members") });
    }

    const data = memberSchema.parse(body.data);
    const { memberCode: inputCode, ...rest } = data;
    const payload = {
      ...rest,
      planId: data.planId || null,
      branchId: data.branchId || null,
      trainerId: data.trainerId || null,
    };

    if (body.action === "update") {
      await prisma.member.update({
        where: { id: body.id },
        data: inputCode ? { ...payload, memberCode: inputCode } : payload,
      });
    } else {
      const member = await prisma.member.create({
        data: { ...payload, memberCode: inputCode || (await generateMemberCode()) },
      });
      await prisma.membershipHistory.create({
        data: {
          memberId: member.id,
          planId: member.planId,
          action: "NEW",
          startDate: member.joiningDate,
          endDate: member.expiryDate,
        },
      });
    }

    return NextResponse.json({ ok: true, rows: await getResourceData("members") });
  } catch (error) {
    return routeError(error);
  }
}
