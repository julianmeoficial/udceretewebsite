import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { SiteSettingsForm } from "@/components/admin/SiteSettingsForm";
import { getSiteSettings, updateSiteSettings } from "./actions";

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
