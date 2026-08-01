import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { WellbeingEditor } from "@/components/admin/WellbeingEditor";
import { getWellbeingData, updateWellbeing } from "./actions";

export default async function AdminWellbeingPage() {
  const data = await getWellbeingData();

  return (
    <div>
      <AdminPageHeader
        kicker="Bienestar"
        title="Rutas y testimonios"
        description="Edita las rutas de apoyo y testimonios mostrados en la sección Bienestar."
      />
      <WellbeingEditor initialData={data} onSave={updateWellbeing} />
    </div>
  );
}
