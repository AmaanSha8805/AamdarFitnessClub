import { ReminderCenter } from "@/components/manager/ReminderCenter";
import { getReminderData } from "@/lib/manager/data";

export const dynamic = "force-dynamic";

export default async function RemindersPage() {
  const rows = await getReminderData();
  return <ReminderCenter rows={rows} />;
}
