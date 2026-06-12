import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/manager/prisma";
import { getGymSettings } from "@/lib/manager/data";
import { gymSettingsSchema } from "@/lib/manager/validation";
import { requireManager, routeError } from "../_shared";

export async function GET(request: NextRequest) {
  const auth = await requireManager(request);
  if (auth.error) return auth.error;
  return NextResponse.json({ settings: await getGymSettings() });
}

export async function POST(request: NextRequest) {
  const auth = await requireManager(request);
  if (auth.error) return auth.error;

  try {
    const body = await request.json();
    const data = gymSettingsSchema.parse(body.data);
    const settings = await prisma.gymSettings.upsert({
      where: { id: "default" },
      update: data,
      create: { id: "default", ...data },
    });
    return NextResponse.json({ ok: true, settings });
  } catch (error) {
    return routeError(error);
  }
}
