import { AdminPageHeader } from "@/features/admin/components/AdminPageHeader";
import { WellbeingEditor } from "@/features/wellbeing/components/WellbeingEditor";
import { getWellbeingData, updateWellbeing } from "@/features/wellbeing/actions";

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
