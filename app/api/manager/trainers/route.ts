import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/manager/prisma";
import { getResourceData } from "@/lib/manager/data";
import { trainerSchema } from "@/lib/manager/validation";
import { requireManager, routeError } from "../_shared";

export async function GET(request: NextRequest) {
  const auth = await requireManager(request);
  if (auth.error) return auth.error;
  return NextResponse.json({ rows: await getResourceData("trainers") });
}

export async function POST(request: NextRequest) {
  const auth = await requireManager(request);
  if (auth.error) return auth.error;

  try {
    const body = await request.json();
    if (body.action === "delete") {
      await prisma.trainer.delete({ where: { id: body.id } });
      return NextResponse.json({ ok: true });
    }

    const data = trainerSchema.parse(body.data);
    if (body.action === "update") {
      await prisma.trainer.update({ where: { id: body.id }, data });
    } else {
      await prisma.trainer.create({ data });
    }

    return NextResponse.json({ ok: true, rows: await getResourceData("trainers") });
  } catch (error) {
    return routeError(error);
  }
}
