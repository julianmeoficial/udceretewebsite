import { Suspense } from "react";
import { getAllPosts } from "@/lib/posts";
import { ArchivePageContent } from "./ArchivePageContent";
import styles from "./page.module.css";

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
