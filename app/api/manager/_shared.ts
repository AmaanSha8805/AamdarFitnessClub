import { NextRequest, NextResponse } from "next/server";
import { getManagerSessionFromRequest } from "@/lib/manager/auth";

export async function requireManager(request: NextRequest) {
  const session = await getManagerSessionFromRequest(request);
  if (!session) {
    return {
      session: null,
      error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }

  return { session, error: null };
}

export function routeError(error: unknown) {
  const message = error instanceof Error ? error.message : "Something went wrong.";
  return NextResponse.json({ error: message }, { status: 500 });
}
