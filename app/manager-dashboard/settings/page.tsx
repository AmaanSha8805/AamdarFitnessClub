import { SettingsPanel } from "@/components/manager/SettingsPanel";
import { getGymSettings } from "@/lib/manager/data";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const settings = await getGymSettings();
  return <SettingsPanel settings={settings} />;
}
