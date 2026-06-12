import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/manager/prisma";
import { getResourceData } from "@/lib/manager/data";
import { maintenanceSchema } from "@/lib/manager/validation";
import { requireManager, routeError } from "../_shared";

export async function GET(request: NextRequest) {
  const auth = await requireManager(request);
  if (auth.error) return auth.error;
  return NextResponse.json({ rows: await getResourceData("maintenance") });
}

export async function POST(request: NextRequest) {
  const auth = await requireManager(request);
  if (auth.error) return auth.error;

  try {
    const body = await request.json();
    if (body.action === "delete") {
      await prisma.equipmentMaintenance.delete({ where: { id: body.id } });
      return NextResponse.json({ ok: true, rows: await getResourceData("maintenance") });
    }

    const data = maintenanceSchema.parse(body.data);
    const payload = {
      ...data,
      nextServiceDate: data.nextServiceDate || null,
      cost: data.cost ?? null,
      notes: data.notes || null,
    };

    if (body.action === "update") {
      await prisma.equipmentMaintenance.update({ where: { id: body.id }, data: payload });
    } else {
      await prisma.equipmentMaintenance.create({ data: payload });
    }

    await prisma.equipment.update({
      where: { id: data.equipmentId },
      data: { status: data.status },
    });

    return NextResponse.json({ ok: true, rows: await getResourceData("maintenance") });
  } catch (error) {
    return routeError(error);
  }
}
