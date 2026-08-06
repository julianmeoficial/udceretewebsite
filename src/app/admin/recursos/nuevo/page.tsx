import { AdminPageHeader } from "@/features/admin/components/AdminPageHeader";
import { ResourceForm } from "@/features/resources/components/ResourceForm";
import { createResource } from "@/features/resources/actions";

export default function NewResourcePage() {
  return (
    <div>
      <AdminPageHeader kicker="Recursos" title="Nuevo recurso" />
      <ResourceForm onSave={createResource} />
    </div>
  );
}
