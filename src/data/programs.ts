/** Programas académicos del Centro Tutorial Cereté (orden de UI). */
export const ACADEMIC_PROGRAMS = [
  "Ingeniería de Software",
  "Administración Financiera",
  "Administración de Empresas",
  "Administración Pública",
  "Administración de los Servicios de la Salud",
  "Seguridad y Salud en el Trabajo",
  "Tecnología Agroindustrial",
  "General",
] as const;

export type Program = (typeof ACADEMIC_PROGRAMS)[number];
