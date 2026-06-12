import { NextRequest, NextResponse } from "next/server";
import { sendManagerEmail } from "@/lib/manager/email";
import { requireManager, routeError } from "../_shared";

export async function POST(request: NextRequest) {
  const auth = await requireManager(request);
  if (auth.error) return auth.error;

  try {
    const body = await request.json();
    await sendManagerEmail(body);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return routeError(error);
  }
}
