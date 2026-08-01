import type { CitationMetadata } from "@/data/types";

export type CitationStyle = "apa7" | "vancouver";

export const demoCitations: Record<string, CitationMetadata> = {
  "10.1037/0000165-000": {
    authors: ["American Psychological Association"],
    title: "Publication manual of the American Psychological Association",
    year: "2020",
    journal: "American Psychological Association",
    doi: "10.1037/0000165-000",
  },
  "10.1016/j.compedu.2023.104812": {
    authors: ["García López", "M.", "Restrepo", "A."],
    title: "Digital learning tools in distance education in Colombia",
    year: "2023",
    journal: "Computers & Education",
    volume: "201",
    pages: "104812",
    doi: "10.1016/j.compedu.2023.104812",
  },
};

function formatAuthorsApa(authors: string[]): string {
  if (authors.length === 0) return "Autor desconocido";
  if (authors.length === 1) return authors[0];
  if (authors.length === 2) return `${authors[0]} & ${authors[1]}`;
  return `${authors.slice(0, -1).join(", ")}, & ${authors[authors.length - 1]}`;
}

function formatAuthorsVancouver(authors: string[]): string {
  if (authors.length === 0) return "Autor desconocido";
  if (authors.length <= 6) return authors.join(", ");
  return `${authors.slice(0, 6).join(", ")}, et al`;
}

export function formatApa7(meta: CitationMetadata): string {
  const authors = formatAuthorsApa(meta.authors);
  const journalPart = meta.journal
    ? ` <em>${meta.journal}</em>${meta.volume ? `, ${meta.volume}` : ""}${meta.issue ? `(${meta.issue})` : ""}${meta.pages ? `, ${meta.pages}` : ""}.`
    : ".";
  const doiPart = meta.doi
    ? ` https://doi.org/${meta.doi}`
    : meta.url
      ? ` ${meta.url}`
      : "";
  return `${authors}. (${meta.year}). ${meta.title}.${journalPart}${doiPart}`;
}

export function formatVancouver(meta: CitationMetadata): string {
  const authors = formatAuthorsVancouver(meta.authors);
  const journalPart = meta.journal
    ? ` ${meta.journal}.${meta.volume ? ` ${meta.volume}` : ""}${meta.issue ? `(${meta.issue})` : ""}${meta.pages ? `:${meta.pages}` : ""}.`
    : ".";
  const doiPart = meta.doi ? ` doi:${meta.doi}` : meta.url ? ` Available from: ${meta.url}` : "";
  return `${authors}. ${meta.title}. ${meta.year}.${journalPart}${doiPart}`;
}

export function formatCitation(meta: CitationMetadata, style: CitationStyle): string {
  return style === "apa7" ? formatApa7(meta) : formatVancouver(meta);
}

export function resolveDemoDoi(doi: string): CitationMetadata | null {
  const key = doi.replace(/^https?:\/\/(dx\.)?doi\.org\//i, "").trim();
  return demoCitations[key] ?? null;
}
