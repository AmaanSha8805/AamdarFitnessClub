import { ResourcePage } from "@/components/manager/ResourcePage";
import { getManagerOptions, getResourceData } from "@/lib/manager/data";

export const dynamic = "force-dynamic";

export default async function LeadsPage() {
  const [rows, options] = await Promise.all([getResourceData("leads"), getManagerOptions()]);
  return <ResourcePage resource="leads" initialRows={rows} options={options} />;
}
