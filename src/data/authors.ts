/** Autores disponibles en el panel editorial (MVP). */
export const EDITORIAL_AUTHORS = ["Icela López Administrativo"] as const;

export type EditorialAuthor = (typeof EDITORIAL_AUTHORS)[number];

export const DEFAULT_AUTHOR: EditorialAuthor = "Icela López Administrativo";
