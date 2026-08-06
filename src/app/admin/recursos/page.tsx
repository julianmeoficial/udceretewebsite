import Link from "next/link";
import { AdminPageHeader } from "@/features/admin/components/AdminPageHeader";
import { AdminTable } from "@/features/admin/components/AdminTable";
import { Button } from "@/components/ui/Button";
import { readCmsResources } from "@/lib/cms/read";
import { formatShortDate } from "@/lib/utils/format";
import styles from "../articulos/page.module.css";

export default async function AdminResourcesPage() {
  const resources = await readCmsResources();

  return (
    <div>
      <AdminPageHeader
        kicker="Contenido"
        title="Recursos"
        description="Guías, formatos y plantillas disponibles en el portal."
        action={<Button href="/admin/recursos/nuevo">Nuevo recurso</Button>}
      />
      <AdminTable
        rows={resources}
        getRowKey={(row) => row.id}
        emptyMessage="Sin recursos"
        columns={[
          {
            key: "title",
            header: "Título",
            render: (row) => (
              <Link href={`/admin/recursos/${row.id}/editar`} className={styles.link}>
                {row.title}
              </Link>
            ),
          },
          { key: "type", header: "Tipo", render: (row) => row.type },
          {
            key: "programs",
            header: "Programas",
            render: (row) => row.programs.join(", "),
          },
          {
            key: "format",
            header: "Archivo",
            render: (row) => row.fileFormat ?? "—",
          },
          {
            key: "size",
            header: "Tamaño",
            render: (row) => <span className={styles.date}>{row.size}</span>,
          },
          {
            key: "updated",
            header: "Actualizado",
            render: (row) => <span className={styles.date}>{formatShortDate(row.updatedAt)}</span>,
          },
          {
            key: "actions",
            header: "Acciones",
            render: (row) => (
              <Link href={`/admin/recursos/${row.id}/editar`} className={styles.actionLink}>
                Editar
              </Link>
            ),
          },
        ]}
      />
    </div>
  );
}
