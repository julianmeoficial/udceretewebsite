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
  return formatDate(iso, { day: "numeric", month: "short", year: "numeric" });
}
