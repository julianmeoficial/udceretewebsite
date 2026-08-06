import Link from "next/link";
import { AdminEmptyState } from "@/features/admin/components/AdminEmptyState";
import { AdminPageHeader } from "@/features/admin/components/AdminPageHeader";
import { AdminTable } from "@/features/admin/components/AdminTable";
import { Button } from "@/components/ui/Button";
import type { CmsPost } from "@/data/types";
import { isFutureDate, todayISO } from "@/lib/utils/dates";
import { formatShortDate } from "@/lib/utils/format";
import { getAllPostsForAdmin } from "@/features/blog/lib/posts";
import styles from "./page.module.css";

function statusLabel(post: CmsPost): string {
  if (post.status === "published" && isFutureDate(post.publishedAt, todayISO())) {
    return "Programado";
  }
  if (post.status === "draft") return "Borrador";
  if (post.status === "published") return "Publicado";
  return "Archivado";
}

function statusClass(post: CmsPost): string {
  if (post.status === "published" && isFutureDate(post.publishedAt, todayISO())) {
    return styles.status_scheduled;
  }
  return styles[`status_${post.status}`];
}

export default async function AdminArticlesPage() {
  const posts = await getAllPostsForAdmin();

  return (
    <div>
      <AdminPageHeader
        kicker="Contenido"
        title="Artículos"
        description="Gestiona avisos, trámites y novedades del blog institucional."
        action={<Button href="/admin/articulos/nuevo">Nuevo artículo</Button>}
      />

      {posts.length === 0 ? (
        <AdminEmptyState
          title="Sin artículos"
          description="Crea el primer artículo para el blog del centro."
          action={<Button href="/admin/articulos/nuevo">Nuevo artículo</Button>}
        />
      ) : (
        <AdminTable
          rows={posts}
          getRowKey={(row) => row.id}
          emptyMessage="Sin artículos"
          columns={[
            {
              key: "title",
              header: "Título",
              render: (row) => (
                <Link href={`/admin/articulos/${row.id}/editar`} className={styles.link}>
                  {row.title}
                </Link>
              ),
            },
            {
              key: "category",
              header: "Categoría",
              render: (row) => row.category,
            },
            {
              key: "status",
              header: "Estado",
              render: (row) => (
                <span className={statusClass(row)}>{statusLabel(row)}</span>
              ),
            },
            {
              key: "publishedAt",
              header: "Publicación",
              render: (row) => (
                <span className={styles.date}>{formatShortDate(row.publishedAt)}</span>
              ),
            },
            {
              key: "actions",
              header: "Acciones",
              render: (row) => (
                <Link href={`/admin/articulos/${row.id}/editar`} className={styles.actionLink}>
                  Editar
                </Link>
              ),
            },
          ]}
        />
      )}
    </div>
  );
}
