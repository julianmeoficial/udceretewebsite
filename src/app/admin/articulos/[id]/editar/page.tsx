import { notFound } from "next/navigation";
import { AdminPageHeader } from "@/features/admin/components/AdminPageHeader";
import { PostForm } from "@/features/blog/components/PostForm";
import { deletePost, getPostForEdit, updatePost } from "@/features/blog/actions";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditArticlePage({ params }: Props) {
  const { id } = await params;
  const post = await getPostForEdit(id);
  if (!post) notFound();

  return (
    <div>
      <AdminPageHeader
        kicker="Artículos"
        title="Editar artículo"
        description={post.title}
      />
      <PostForm
        post={post}
        onSave={updatePost.bind(null, id)}
        onDelete={deletePost.bind(null, id)}
      />
    </div>
  );
}
