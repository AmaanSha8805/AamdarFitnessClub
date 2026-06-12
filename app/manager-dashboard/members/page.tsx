import { ResourcePage } from "@/components/manager/ResourcePage";
import { RenewalPanel } from "@/components/manager/RenewalPanel";
import { getManagerOptions, getResourceData } from "@/lib/manager/data";

export const dynamic = "force-dynamic";

export default async function MembersPage() {
  const [rows, options] = await Promise.all([getResourceData("members"), getManagerOptions()]);

  return (
    <div className="space-y-6">
      <RenewalPanel members={options.members} plans={options.plans} />
      <ResourcePage resource="members" initialRows={rows} options={options} />
    </div>
  );
}
