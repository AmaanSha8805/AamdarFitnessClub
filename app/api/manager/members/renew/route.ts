import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/manager/prisma";
import { generateReceiptNumber } from "@/lib/manager/member-id";
import { renewalSchema } from "@/lib/manager/validation";
import { requireManager, routeError } from "../../_shared";

export async function POST(request: NextRequest) {
  const auth = await requireManager(request);
  if (auth.error) return auth.error;

  try {
    const data = renewalSchema.parse(await request.json());
    const plan = await prisma.membershipPlan.findUniqueOrThrow({ where: { id: data.planId } });
    const member = await prisma.member.findUniqueOrThrow({ where: { id: data.memberId } });
    const baseDate = member.expiryDate > new Date() ? member.expiryDate : new Date();
    const expiryDate = new Date(baseDate);
    expiryDate.setDate(expiryDate.getDate() + plan.duration);

    const receiptNumber = await generateReceiptNumber();
    const previousPlanId = member.planId;
    let action: "RENEWAL" | "UPGRADE" | "DOWNGRADE" = "RENEWAL";
    if (previousPlanId && previousPlanId !== data.planId) {
      const previousPlan = await prisma.membershipPlan.findUnique({ where: { id: previousPlanId } });
      if (previousPlan) {
        action = Number(plan.price) > Number(previousPlan.price) ? "UPGRADE" : "DOWNGRADE";
      }
    }

    await prisma.$transaction([
      prisma.member.update({
        where: { id: data.memberId },
        data: { planId: data.planId, expiryDate, status: "ACTIVE" },
      }),
      prisma.payment.create({
        data: {
          memberId: data.memberId,
          amount: data.amount,
          method: data.method,
          date: data.date,
          notes: data.notes || `Renewal for ${plan.name}`,
          status: "PAID",
          receiptNumber,
        },
      }),
      prisma.membershipHistory.create({
        data: {
          memberId: data.memberId,
          planId: data.planId,
          action,
          startDate: baseDate,
          endDate: expiryDate,
          amount: data.amount,
          notes: data.notes || `Renewal for ${plan.name}`,
        },
      }),
    ]);

    return NextResponse.json({ ok: true });
  } catch (error) {
    return routeError(error);
  }
}
