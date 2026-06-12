import { notFound } from "next/navigation";
import { MemberProfileView } from "@/components/manager/MemberProfileView";
import { getMemberProfile } from "@/lib/manager/data";

export const dynamic = "force-dynamic";

export default async function MemberProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const profile = await getMemberProfile(id);
  if (!profile) notFound();
  return <MemberProfileView profile={profile} />;
}
