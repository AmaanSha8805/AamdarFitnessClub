import { ResourcePage } from "@/components/manager/ResourcePage";
import { getManagerOptions, getResourceData, type ResourceName } from "@/lib/manager/data";

export async function ManagerResourcePage({ resource }: { resource: ResourceName }) {
  const [rows, options] = await Promise.all([getResourceData(resource), getManagerOptions()]);
  return <ResourcePage resource={resource} initialRows={rows} options={options} />;
}
