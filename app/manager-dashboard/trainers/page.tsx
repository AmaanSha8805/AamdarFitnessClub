import Link from "next/link";
import { ResourcePage } from "@/components/manager/ResourcePage";
import { getManagerOptions, getResourceData } from "@/lib/manager/data";

export const dynamic = "force-dynamic";

export default async function TrainersPage() {
  const [rows, options] = await Promise.all([getResourceData("trainers"), getManagerOptions()]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3">
        <Link href="/manager-dashboard/trainers/attendance" className="rounded-lg border border-white/10 px-4 py-2 text-sm hover:bg-white/10">
          Trainer Attendance
        </Link>
        <Link href="/manager-dashboard/trainers/salaries" className="rounded-lg border border-white/10 px-4 py-2 text-sm hover:bg-white/10">
          Salary Tracking
        </Link>
      </div>
      <ResourcePage resource="trainers" initialRows={rows} options={options} />
    </div>
  );
}
