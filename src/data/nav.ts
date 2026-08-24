import type { NavItem } from "./types";

/** Navegación principal. Ajustar tras hallazgos de IA/navegación en pruebas UX. */
export const mainNav: NavItem[] = [
  { label: "Inicio", href: "/" },
  { label: "Blog", href: "/archivo" },
  { label: "Calendario", href: "/calendario" },
  { label: "Recursos", href: "/recursos" },
  { label: "Bienestar", href: "/bienestar" },
];

export const mobileNav: NavItem[] = [
  { label: "Inicio", href: "/" },
  { label: "Blog", href: "/archivo" },
  { label: "Buscar", href: "/buscar" },
  { label: "Calendario", href: "/calendario" },
  { label: "Más", href: "/recursos" },
];

export const quickLinks = [
  {
    label: "Calendario académico",
    href: "/calendario",
    description: "Fechas y periodos",
    icon: "calendar",
  },
  {
    label: "Buscar en el sitio",
    href: "/buscar",
    description: "Artículos, recursos y fechas",
    icon: "search",
  },
  {
    label: "Generador de citas",
    href: "/citas",
    description: "APA 7 y Vancouver",
    icon: "citation",
  },
  {
    label: "Repositorio",
    href: "/recursos",
    description: "Guías y plantillas",
    icon: "folder",
  },
  {
    label: "Bienestar",
    href: "/bienestar",
    description: "Rutas de apoyo",
    icon: "heart",
  },
];
