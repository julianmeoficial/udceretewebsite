import { AdminPageHeader } from "@/features/admin/components/AdminPageHeader";
import { SiteSettingsForm } from "@/features/admin/components/SiteSettingsForm";
import { getSiteSettings, updateSiteSettings } from "@/features/admin/actions/settings";

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div>
      <AdminPageHeader
        kicker="Sistema"
        title="Ajustes del sitio"
        description="Metadatos básicos del portal (demo local en JSON)."
      />
      <SiteSettingsForm initial={settings} onSave={updateSiteSettings} />
    </div>
  );
}
