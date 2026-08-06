import { Suspense } from "react";
import { getAllPosts } from "@/features/blog/lib/posts";
import { ArchivePageContent } from "@/features/blog/components/ArchivePageContent";
import styles from "@/features/blog/components/ArchivePageContent.module.css";

export default async function ArchivePage() {
  const posts = await getAllPosts();

  return (
    <Suspense
      fallback={
        <div className={styles.page}>
          <div className="container">
            <p className={styles.subtitle}>Cargando publicaciones…</p>
          </div>
        </div>
      }
    >
      <ArchivePageContent initialPosts={posts} />
    </Suspense>
  );
}
