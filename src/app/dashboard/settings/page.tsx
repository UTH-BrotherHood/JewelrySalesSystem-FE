import { AppearanceForm } from "@/app/dashboard/settings/appearance-form";

export default function SettingsAppearancePage() {
  return (
    <div className="space-y-6 ml-[10rem]">
      <div>
        <h3 className="text-lg font-medium">Appearance</h3>
        <p className="text-sm text-muted-foreground">
          Customize the appearance of the app. Automatically switch between day
          and night themes.
        </p>
      </div>
      <AppearanceForm />
    </div>
  );
}
