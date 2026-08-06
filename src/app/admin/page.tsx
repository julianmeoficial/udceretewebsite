import Link from "next/link";
import { AdminPageHeader } from "@/features/admin/components/AdminPageHeader";
import { Button } from "@/components/ui/Button";
import { readCmsEvents, readCmsPosts } from "@/lib/cms/read";
import { formatShortDate } from "@/lib/utils/format";
import styles from "./page.module.css";

export default async function AdminDashboardPage() {
  const posts = await readCmsPosts();
  const events = await readCmsEvents();

  const drafts = posts
    .filter((post) => post.status === "draft")
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .slice(0, 5);

  const publishedCount = posts.filter((post) => post.status === "published").length;

  const upcoming = [...events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 5);

  return (
    <div>
      <AdminPageHeader
        kicker="Panel"
        title="Resumen editorial"
        description="Borradores pendientes y accesos al contenido del portal."
        action={<Button href="/admin/articulos/nuevo">Nuevo artículo</Button>}
      />

      <p className={styles.stats}>
        <span>
          <strong>{drafts.length}</strong> borradores
        </span>
        <span className={styles.statsSep} aria-hidden>
          ·
        </span>
        <span>
          <strong>{publishedCount}</strong> publicados
        </span>
      </p>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>Borradores recientes</h2>
          <Link href="/admin/articulos" className={styles.textLink}>
            Ver todos
          </Link>
        </div>
        {drafts.length === 0 ? (
          <p className={styles.muted}>No hay borradores pendientes.</p>
        ) : (
          <ul className={styles.list}>
            {drafts.map((post) => (
              <li key={post.id}>
                <Link href={`/admin/articulos/${post.id}/editar`} className={styles.listLink}>
                  <span>{post.title}</span>
                  <span className={styles.meta}>{formatShortDate(post.updatedAt)}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>Próximos eventos</h2>
          <Link href="/admin/calendario" className={styles.textLink}>
            Calendario
          </Link>
        </div>
        {upcoming.length === 0 ? (
          <p className={styles.muted}>No hay eventos adicionales registrados.</p>
        ) : (
          <ul className={styles.list}>
            {upcoming.map((event) => (
              <li key={event.id}>
                <span className={styles.listLink}>
                  <span>{event.title}</span>
                  <span className={styles.meta}>{formatShortDate(event.date)}</span>
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <nav className={styles.quick} aria-label="Accesos rápidos">
        <Link href="/admin/articulos" className={styles.quickLink}>
          Artículos
        </Link>
        <Link href="/admin/recursos" className={styles.quickLink}>
          Recursos
        </Link>
        <Link href="/admin/bienestar" className={styles.quickLink}>
          Bienestar
        </Link>
      </nav>
    </div>
  );
}
