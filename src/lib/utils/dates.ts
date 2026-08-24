/**
 * Fechas académicas en zona local (ISO `YYYY-MM-DD`).
 * Evita desfases UTC al comparar periodos y publicaciones.
 */

/** Fecha local YYYY-MM-DD (sin UTC). */
export function todayISO(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function isFutureDate(iso: string, relativeTo = todayISO()): boolean {
  return iso > relativeTo;
}

export function formatLongDate(iso: string): string {
  const date = new Date(`${iso}T12:00:00`);
  return date.toLocaleDateString("es-CO", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatMonthYear(year: number, month: number): string {
  const date = new Date(year, month, 1);
  return date.toLocaleDateString("es-CO", { month: "long", year: "numeric" });
}
