import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { PostForm } from "@/components/admin/PostForm";
import { createPost } from "../actions";

export default function NewArticlePage() {
  return (
    <div>
      <AdminPageHeader
        kicker="Artículos"
        title="Nuevo artículo"
        description="Completa los campos y guarda como borrador o publica directamente."
      />
      <PostForm onSave={createPost} />
    </div>
  );
}
