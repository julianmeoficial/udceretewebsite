import type { NavItem } from "./types";

export const mainNav: NavItem[] = [
  { label: "Inicio", href: "/" },
  { label: "Blog", href: "/archivo" },
  { label: "Calendario", href: "/calendario" },
  { label: "Recursos", href: "/recursos" },
  { label: "Bienestar", href: "/bienestar" },
];

export const footerNav: NavItem[] = [
  { label: "Buscar", href: "/buscar" },
  { label: "Acceso", href: "/acceso" },
  { label: "Archivo", href: "/archivo" },
  { label: "Calendario", href: "/calendario" },
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
    label: "Preguntar a la IA",
    href: "/buscar",
    description: "Respuestas con fuentes",
    icon: "ai",
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
