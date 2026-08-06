import { AdminPageHeader } from "@/features/admin/components/AdminPageHeader";
import { PostForm } from "@/features/blog/components/PostForm";
import { createPost } from "@/features/blog/actions";

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
