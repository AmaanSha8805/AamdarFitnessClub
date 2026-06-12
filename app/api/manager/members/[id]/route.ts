import { NextRequest, NextResponse } from "next/server";
import { getMemberProfile } from "@/lib/manager/data";
import { requireManager } from "../../_shared";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireManager(request);
  if (auth.error) return auth.error;

  const { id } = await params;
  const profile = await getMemberProfile(id);
  if (!profile) {
    return NextResponse.json({ error: "Member not found." }, { status: 404 });
  }
  return NextResponse.json({ profile });
}
