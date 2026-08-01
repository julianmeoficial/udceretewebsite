import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ResourceForm } from "@/components/admin/ResourceForm";
import { createResource } from "../actions";

export default function NewResourcePage() {
  return (
    <div>
      <AdminPageHeader kicker="Recursos" title="Nuevo recurso" />
      <ResourceForm onSave={createResource} />
    </div>
  );
}
