/**
 * Utilidades CMS compartidas.
 * `slugify` es reutilizable en producción; `createId` debería pasar a UUID.
 */
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** @deprecated Preferir `crypto.randomUUID()` en producción. */
export function createId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}`;
}
