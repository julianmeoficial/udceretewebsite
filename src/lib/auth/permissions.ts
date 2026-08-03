/**
 * Matriz de permisos del panel admin.
 * Modelo simple (2 roles) migrable a un motor de ACL más fino.
 */
import type { UserRole } from "@/data/types";

export type AdminSection =
  | "dashboard"
  | "articulos"
  | "recursos"
  | "calendario"
  | "bienestar"
  | "usuarios"
  | "ajustes";

const SUPERADMIN_ONLY: AdminSection[] = ["usuarios", "ajustes"];

export function canAccessSection(role: UserRole, section: AdminSection): boolean {
  if (role === "superadmin") return true;
  return !SUPERADMIN_ONLY.includes(section);
}

export function canManageContent(role: UserRole): boolean {
  return role === "superadmin" || role === "centro_admin";
}

export function roleLabel(role: UserRole): string {
  return role === "superadmin" ? "Superadmin" : "Admin del centro";
}
