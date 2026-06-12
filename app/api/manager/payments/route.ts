import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/manager/prisma";
import { getResourceData } from "@/lib/manager/data";
import { generateReceiptNumber } from "@/lib/manager/member-id";
import { paymentSchema } from "@/lib/manager/validation";
import { requireManager, routeError } from "../_shared";

export async function GET(request: NextRequest) {
  const auth = await requireManager(request);
  if (auth.error) return auth.error;
  return NextResponse.json({ rows: await getResourceData("payments") });
}

export async function POST(request: NextRequest) {
  const auth = await requireManager(request);
  if (auth.error) return auth.error;

  try {
    const body = await request.json();
    if (body.action === "delete") {
      await prisma.payment.delete({ where: { id: body.id } });
      return NextResponse.json({ ok: true, rows: await getResourceData("payments") });
    }

    const data = paymentSchema.parse(body.data);
    const receiptNumber = data.receiptNumber || (await generateReceiptNumber());
    const payload = { ...data, receiptNumber, notes: data.notes || null };

    if (body.action === "update") {
      await prisma.payment.update({ where: { id: body.id }, data: payload });
    } else {
      await prisma.payment.create({ data: payload });
    }

    return NextResponse.json({ ok: true, rows: await getResourceData("payments") });
  } catch (error) {
    return routeError(error);
  }
}
