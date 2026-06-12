import { ResourcePage } from "@/components/manager/ResourcePage";
import { getManagerOptions, getResourceData } from "@/lib/manager/data";

export const dynamic = "force-dynamic";

export default async function PaymentsPage() {
  const [rows, options] = await Promise.all([getResourceData("payments"), getManagerOptions()]);
  return <ResourcePage resource="payments" initialRows={rows} options={options} />;
}
