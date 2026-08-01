import Link from "next/link";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminTable } from "@/components/admin/AdminTable";
import { Button } from "@/components/ui/Button";
import { readCmsEvents } from "@/lib/cms/read";
import { formatShortDate } from "@/lib/format";
import styles from "../articulos/page.module.css";

export default async function AdminCalendarPage() {
  const events = await readCmsEvents();

  return (
    <div>
      <AdminPageHeader
        kicker="Agenda"
        title="Eventos adicionales"
        description="Eventos puntuales editables. Las tablas oficiales 2026-2 permanecen en código."
        action={<Button href="/admin/calendario/nuevo">Nuevo evento</Button>}
      />
      <AdminTable
        rows={events}
        getRowKey={(row) => row.id}
        emptyMessage="Sin eventos adicionales"
        columns={[
          {
            key: "title",
            header: "Título",
            render: (row) => (
              <Link href={`/admin/calendario/${row.id}/editar`} className={styles.link}>
                {row.title}
              </Link>
            ),
          },
          {
            key: "date",
            header: "Fecha",
            render: (row) => <span className={styles.date}>{formatShortDate(row.date)}</span>,
          },
          { key: "category", header: "Categoría", render: (row) => row.category },
          {
            key: "actions",
            header: "Acciones",
            render: (row) => (
              <Link href={`/admin/calendario/${row.id}/editar`} className={styles.actionLink}>
                Editar
              </Link>
            ),
          },
        ]}
      />
    </div>
  );
}
