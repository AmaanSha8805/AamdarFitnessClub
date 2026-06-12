import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/manager/prisma";
import { getResourceData } from "@/lib/manager/data";
import { expenseSchema } from "@/lib/manager/validation";
import { requireManager, routeError } from "../_shared";

export async function GET(request: NextRequest) {
  const auth = await requireManager(request);
  if (auth.error) return auth.error;
  return NextResponse.json({ rows: await getResourceData("expenses") });
}

export async function POST(request: NextRequest) {
  const auth = await requireManager(request);
  if (auth.error) return auth.error;

  try {
    const body = await request.json();
    if (body.action === "delete") {
      await prisma.expense.delete({ where: { id: body.id } });
      return NextResponse.json({ ok: true });
    }

    const data = expenseSchema.parse(body.data);
    if (body.action === "update") {
      await prisma.expense.update({ where: { id: body.id }, data });
    } else {
      await prisma.expense.create({ data });
    }

    return NextResponse.json({ ok: true, rows: await getResourceData("expenses") });
  } catch (error) {
    return routeError(error);
  }
}
