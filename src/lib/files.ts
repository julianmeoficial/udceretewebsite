export function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return "0 B";
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb < 10 ? kb.toFixed(1) : Math.round(kb)} KB`;
  const mb = kb / 1024;
  return `${mb < 10 ? mb.toFixed(1) : Math.round(mb)} MB`;
}

const EXT_LABELS: Record<string, string> = {
  pdf: "PDF",
  doc: "DOC",
  docx: "DOCX",
  xls: "XLS",
  xlsx: "XLSX",
  ppt: "PPT",
  pptx: "PPTX",
  txt: "TXT",
  rtf: "RTF",
  odt: "ODT",
  ods: "ODS",
  zip: "ZIP",
  rar: "RAR",
  png: "PNG",
  jpg: "JPG",
  jpeg: "JPEG",
  webp: "WEBP",
};

export function detectFileFormat(fileName: string, mimeType?: string): string {
  const ext = fileName.includes(".")
    ? fileName.split(".").pop()?.toLowerCase() ?? ""
    : "";

  if (ext && EXT_LABELS[ext]) return EXT_LABELS[ext];

  if (mimeType) {
    if (mimeType.includes("pdf")) return "PDF";
    if (mimeType.includes("word") || mimeType.includes("msword")) return "DOCX";
    if (mimeType.includes("sheet") || mimeType.includes("excel")) return "XLSX";
    if (mimeType.includes("presentation") || mimeType.includes("powerpoint")) return "PPTX";
    if (mimeType.startsWith("image/")) return mimeType.replace("image/", "").toUpperCase();
  }

  return ext ? ext.toUpperCase() : "Archivo";
}

export function sanitizeFileName(name: string): string {
  return name
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}
