import { AttendanceCenter } from "@/components/manager/AttendanceCenter";
import { ManagerResourcePage } from "@/components/manager/ManagerResourcePage";
import { getAttendanceAnalytics, getManagerOptions } from "@/lib/manager/data";

export const dynamic = "force-dynamic";

export default async function AttendancePage() {
  const [analytics, options] = await Promise.all([getAttendanceAnalytics(), getManagerOptions()]);

  return (
    <div className="space-y-8">
      <AttendanceCenter analytics={analytics} branches={options.branches} />
      <ManagerResourcePage resource="attendance" />
    </div>
  );
}
