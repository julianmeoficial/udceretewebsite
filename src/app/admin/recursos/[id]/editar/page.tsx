import { notFound } from "next/navigation";
import { AdminPageHeader } from "@/features/admin/components/AdminPageHeader";
import { ResourceForm } from "@/features/resources/components/ResourceForm";
import { getResourceById, updateResource, deleteResource } from "@/features/resources/actions";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditResourcePage({ params }: Props) {
  const { id } = await params;
  const resource = await getResourceById(id);
  if (!resource) notFound();

  async function save(formData: FormData) {
    "use server";
    return updateResource(id, formData);
  }

  async function remove() {
    "use server";
    return deleteResource(id);
  }

  return (
    <div>
      <AdminPageHeader kicker="Recursos" title="Editar recurso" description={resource.title} />
      <ResourceForm resource={resource} onSave={save} onDelete={remove} />
    </div>
  );
}
