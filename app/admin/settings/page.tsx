import SettingsForm from "@/components/Admin/SettingsForm";
import { getSettings } from "@/services/settings.service";

export default async function SettingsPage() {
  const settings =
    await getSettings();

  return (
    <div>

      <h1 className="text-3xl font-bold mb-6">
        Business Settings
      </h1>

      <SettingsForm
        initialData={settings}
      />

    </div>
  );
}