/**
 * Modelo de dominio canónico del portal.
 * Preservar estas shapes al migrar CMS/auth; son el contrato entre capas.
 */
export type Category =
  | "Académico"
  | "Trámites"
  | "Institucional"
  | "Beneficios"
  | "Tecnología y productividad"
  | "Recursos"
  | "Bienestar";

export type ResourceType = "guía" | "formato" | "plantilla";

import type { Program } from "./programs";
export type { Program };

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  category: Category;
  tags: string[];
  author: string;
  publishedAt: string;
  coverImage?: string;
  featured?: boolean;
}

export interface NavItem {
  label: string;
  href: string;
  icon?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  endDate?: string;
  category: Category;
  description: string;
  location?: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  /** Programas a los que aplica el recurso (selección múltiple). */
  programs: Program[];
  type: ResourceType;
  size: string;
  updatedAt: string;
  tags: string[];
  /** Nombre original del adjunto */
  fileName?: string;
  /** Ruta pública del adjunto, p. ej. /uploads/resources/... */
  fileUrl?: string;
  /** Formato detectado: PDF, DOCX, etc. */
  fileFormat?: string;
}

export interface CitationMetadata {
  authors: string[];
  title: string;
  year: string;
  journal?: string;
  volume?: string;
  issue?: string;
  pages?: string;
  doi?: string;
  url?: string;
}

export interface SupportRoute {
  id: string;
  title: string;
  description: string;
  contact: string;
  contactName?: string;
  schedule: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  program: string;
}

export type PostStatus = "draft" | "published" | "archived";
export type UserRole = "superadmin" | "centro_admin";

export interface CmsPost extends Post {
  id: string;
  status: PostStatus;
  updatedAt: string;
  createdBy: string;
}

export interface CmsUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  active: boolean;
}

export interface CmsWellbeing {
  supportRoutes: SupportRoute[];
  testimonials: Testimonial[];
}
