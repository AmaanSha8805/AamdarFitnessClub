import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/manager/prisma";
import { getResourceData } from "@/lib/manager/data";
import { leadSchema } from "@/lib/manager/validation";
import { requireManager, routeError } from "../_shared";

export async function GET(request: NextRequest) {
  const auth = await requireManager(request);
  if (auth.error) return auth.error;
  return NextResponse.json({ rows: await getResourceData("leads") });
}

export async function POST(request: NextRequest) {
  const auth = await requireManager(request);
  if (auth.error) return auth.error;

  try {
    const body = await request.json();
    if (body.action === "delete") {
      await prisma.lead.delete({ where: { id: body.id } });
      return NextResponse.json({ ok: true });
    }

    const data = leadSchema.parse(body.data);
    if (body.action === "update") {
      await prisma.lead.update({ where: { id: body.id }, data });
    } else {
      await prisma.lead.create({ data });
    }

    return NextResponse.json({ ok: true, rows: await getResourceData("leads") });
  } catch (error) {
    return routeError(error);
  }
}
