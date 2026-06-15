import SettingsForm from "@/components/Admin/SettingsForm";
import { getSettings } from "@/services/settings.service";

export default async function SettingsPage() {
  const settings =
    await getSettings();

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header section */}
      <div>
        <h1 className="text-2xl md:text-3xl font-black text-text-primary tracking-tight">
          Business Settings
        </h1>
        <p className="text-sm text-text-secondary mt-1">
          Configure business profile details, operating hours, and booking constraints.
        </p>
      </div>

      <SettingsForm
        initialData={settings}
      />
    </div>
  );
}