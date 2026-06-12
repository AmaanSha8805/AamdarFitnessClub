import { redirect } from "next/navigation";
import { ManagerShell } from "@/components/manager/ManagerShell";
import { getManagerSession } from "@/lib/manager/auth";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getManagerSession();
  if (!session) redirect("/manager-login");

  return <ManagerShell>{children}</ManagerShell>;
}
