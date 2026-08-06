"use client";

import { useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";
import { CategoryPills } from "@/components/ui/CategoryPills";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/Input";
import type { CitationMetadata } from "@/data/types";
import {
  demoCitations,
  formatCitation,
  resolveDemoDoi,
  type CitationStyle,
} from "@/features/citations/lib/citation";
import styles from "./CitationTool.module.css";

const emptyMeta: CitationMetadata = {
  authors: [""],
  title: "",
  year: "",
  journal: "",
  doi: "",
  url: "",
};

const styleOptions = [
  { value: "apa7", label: "APA 7" },
  { value: "vancouver", label: "Vancouver" },
];

type Props = {
  idPrefix?: string;
  compact?: boolean;
};

export function CitationTool({ idPrefix = "citation", compact = false }: Props) {
  const [style, setStyle] = useState<CitationStyle>("apa7");
  const [doi, setDoi] = useState("");
  const [meta, setMeta] = useState<CitationMetadata>(emptyMeta);
  const [copied, setCopied] = useState(false);
  const [message, setMessage] = useState("");

  const formatted = useMemo(() => {
    if (!meta.title || !meta.year || !meta.authors[0]) return "";
    return formatCitation(
      {
        ...meta,
        authors: meta.authors.filter(Boolean),
      },
      style,
    );
  }, [meta, style]);

  function applyDoi() {
    const found = resolveDemoDoi(doi);
    if (!found) {
      setMessage(
        "DOI no encontrado en el catálogo demo. Usa uno de los ejemplos o completa los campos manualmente.",
      );
      return;
    }
    setMeta(found);
    setMessage("Metadatos cargados desde el catálogo demo.");
  }

  async function copyOutput() {
    if (!formatted) return;
    const plain = formatted.replace(/<\/?em>/g, "");
    await navigator.clipboard.writeText(plain);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className={`${styles.tool} ${compact ? styles.compact : ""}`.trim()}>
      <CategoryPills
        options={styleOptions}
        value={style}
        onChange={(next) => setStyle(next as CitationStyle)}
        ariaLabel="Estilo de cita"
        className={styles.stylePills}
      />

      <div className={styles.layout}>
        <section className={styles.panel}>
          <h3 className={styles.panelTitle}>Entrada</h3>
          <div className={styles.form}>
            <TextField
              id={`${idPrefix}-doi`}
              label="DOI"
              hint="Prueba con un DOI demo"
              value={doi}
              onChange={(event) => setDoi(event.target.value)}
              placeholder="10.1016/j.compedu.2023.104812"
            />
            <div className={styles.demos}>
              {Object.keys(demoCitations).map((key) => (
                <button
                  key={key}
                  type="button"
                  className={styles.demoBtn}
                  onClick={() => {
                    setDoi(key);
                    setMeta(demoCitations[key]);
                    setMessage("Metadatos cargados desde el catálogo demo.");
                  }}
                >
                  {key}
                </button>
              ))}
            </div>
            <Button type="button" variant="secondary" onClick={applyDoi}>
              Resolver DOI
            </Button>

            <TextField
              id={`${idPrefix}-authors`}
              label="Autores"
              hint="Separados por coma"
              value={meta.authors.join(", ")}
              onChange={(event) =>
                setMeta((prev) => ({
                  ...prev,
                  authors: event.target.value.split(",").map((part) => part.trim()),
                }))
              }
            />
            <TextField
              id={`${idPrefix}-title`}
              label="Título"
              value={meta.title}
              onChange={(event) => setMeta((prev) => ({ ...prev, title: event.target.value }))}
            />
            <TextField
              id={`${idPrefix}-year`}
              label="Año"
              value={meta.year}
              onChange={(event) => setMeta((prev) => ({ ...prev, year: event.target.value }))}
            />
            <TextField
              id={`${idPrefix}-journal`}
              label="Revista / editorial"
              value={meta.journal ?? ""}
              onChange={(event) =>
                setMeta((prev) => ({ ...prev, journal: event.target.value }))
              }
            />
          </div>
          {message ? <p className={styles.note}>{message}</p> : null}
        </section>

        <section className={styles.panel}>
          <h3 className={styles.panelTitle}>Salida</h3>
          <div
            className={styles.output}
            dangerouslySetInnerHTML={{
              __html: formatted || "Completa los campos para ver la cita formateada.",
            }}
          />
          <div className={styles.actions}>
            <Button type="button" onClick={copyOutput} disabled={!formatted}>
              {copied ? <Check size={16} aria-hidden /> : <Copy size={16} aria-hidden />}
              {copied ? "Copiado" : "Copiar"}
            </Button>
          </div>
          <p className={styles.note}>
            Prototipo con catálogo demo local. La versión final usará Citation.js / citeproc-js
            con estilos CSL oficiales.
          </p>
        </section>
      </div>
    </div>
  );
}
