"use client";

import { useMemo, useState } from "react";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { CitationTool } from "@/features/citations/components/CitationTool";
import { CategoryPills } from "@/components/ui/CategoryPills";
import { Button } from "@/components/ui/Button";
import type { Resource, ResourceType } from "@/data/types";
import { formatShortDate } from "@/lib/utils/format";
import styles from "./ResourcesPageContent.module.css";

const typeLabels: Record<ResourceType, string> = {
  guía: "Guías",
  formato: "Formatos",
  plantilla: "Plantillas",
};

type Props = {
  resources: Resource[];
};

export function ResourcesPageContent({ resources }: Props) {
  const [type, setType] = useState<ResourceType | "all">("all");

  const filtered = useMemo(
    () =>
      resources.filter((item) => {
        if (type !== "all" && item.type !== type) return false;
        return true;
      }),
    [resources, type],
  );

  const typeOptions = [
    { value: "all", label: "Todos" },
    { value: "guía", label: "Guías" },
    { value: "formato", label: "Formatos" },
    { value: "plantilla", label: "Plantillas" },
  ];

  return (
    <div className={styles.page}>
      <div className="container">
        <header className={styles.header}>
          <p className={styles.kicker}>REPOSITORIO</p>
          <h1 className={styles.title}>Repositorio de recursos</h1>
          <p className={styles.subtitle}>
            Guías, formatos y plantillas del Centro Tutorial Cereté.
          </p>
        </header>

        <CategoryPills
          options={typeOptions}
          value={type}
          onChange={(next) => setType(next as ResourceType | "all")}
          ariaLabel="Tipo de recurso"
          className={styles.typePills}
        />

        <p className={styles.count} aria-live="polite">
          {filtered.length} {filtered.length === 1 ? "recurso" : "recursos"}
        </p>

        {filtered.length === 0 ? (
          <p className={styles.empty}>No hay recursos con esos filtros.</p>
        ) : (
          <ul className={styles.list}>
            {filtered.map((resource) => (
              <li key={resource.id} className={styles.item}>
                <div className={styles.itemBody}>
                  <p className={styles.itemType}>{typeLabels[resource.type]}</p>
                  <h2 className={styles.itemTitle}>{resource.title}</h2>
                  <p className={styles.itemDesc}>{resource.description}</p>
                  <p className={styles.itemMeta}>
                    {resource.programs.join(" · ")}
                    {resource.fileFormat ? ` · ${resource.fileFormat}` : ""}
                    {" · "}
                    {resource.size}
                    {" · "}
                    {formatShortDate(resource.updatedAt)}
                  </p>
                </div>
                {resource.fileUrl ? (
                  <Button
                    href={resource.fileUrl}
                    variant="ghost"
                    className={styles.download}
                  >
                    <ArrowDownTrayIcon width={16} height={16} aria-hidden />
                    Descargar
                  </Button>
                ) : (
                  <Button href="#" variant="ghost" className={styles.download}>
                    <ArrowDownTrayIcon width={16} height={16} aria-hidden />
                    Descargar
                  </Button>
                )}
              </li>
            ))}
          </ul>
        )}

        <section id="citas" className={styles.toolsSection} aria-labelledby="citas-heading">
          <header className={styles.toolsHeader}>
            <p className={styles.kicker}>HERRAMIENTAS</p>
            <h2 id="citas-heading" className={styles.toolsTitle}>
              Generador de citas APA 7 y Vancouver
            </h2>
            <p className={styles.toolsSubtitle}>
              Asistente de citación con catálogo demo. No conecta a APIs externas en este
              prototipo.
            </p>
          </header>
          <CitationTool idPrefix="recursos-citation" compact />
        </section>
      </div>
    </div>
  );
}
