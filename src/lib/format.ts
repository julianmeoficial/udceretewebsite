/**
 * Formateo de fechas para UI pública (locale es-CO).
 * Reutilizable tal cual en producción.
 */
export function formatDate(iso: string, options?: Intl.DateTimeFormatOptions): string {
  const date = new Date(`${iso}T12:00:00`);
  return new Intl.DateTimeFormat("es-CO", {
    day: "numeric",
    month: "long",
    year: "numeric",
    ...options,
  }).format(date);
}

export function formatShortDate(iso: string): string {
  // Node and browsers disagree on abbreviated months ("jul" vs "jul.").
  // Strip trailing dots so SSR and client hydration always match.
  return formatDate(iso, { day: "numeric", month: "short", year: "numeric" }).replace(
    /\./g,
    "",
  );
}
