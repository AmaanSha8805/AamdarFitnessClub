import { ResourcePage } from "@/components/manager/ResourcePage";
import { getManagerOptions, getResourceData } from "@/lib/manager/data";

export const dynamic = "force-dynamic";

export default async function PlansPage() {
  const [rows, options] = await Promise.all([getResourceData("plans"), getManagerOptions()]);
  return <ResourcePage resource="plans" initialRows={rows} options={options} />;
}
