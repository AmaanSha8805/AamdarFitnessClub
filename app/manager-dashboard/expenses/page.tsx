import { ResourcePage } from "@/components/manager/ResourcePage";
import { getManagerOptions, getResourceData } from "@/lib/manager/data";

export const dynamic = "force-dynamic";

export default async function ExpensesPage() {
  const [rows, options] = await Promise.all([getResourceData("expenses"), getManagerOptions()]);
  return <ResourcePage resource="expenses" initialRows={rows} options={options} />;
}
