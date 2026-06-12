import { DashboardOverview } from "@/components/manager/DashboardOverview";
import { getDashboardData } from "@/lib/manager/data";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Manager Dashboard | Aamdar Fitness Club",
};

export default async function DashboardPage() {
  const data = await getDashboardData();
  return <DashboardOverview data={data} />;
}
