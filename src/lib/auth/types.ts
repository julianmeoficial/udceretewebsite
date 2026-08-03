/**
 * Tipos y constantes de sesión.
 *
 * `SessionUser` y `SESSION_*` son el contrato a conservar.
 * `DEMO_USERS` es solo para el acceso simulado del MVP: eliminar al
 * integrar auth institucional real.
 */
import type { UserRole } from "@/data/types";

export const SESSION_COOKIE = "udc_session";

export type SessionUser = {
  email: string;
  name: string;
  role: UserRole;
  expiresAt: number;
};

/** @mvp Credenciales de demostración. No usar en producción. */
export const DEMO_USERS: Record<UserRole, SessionUser> = {
  superadmin: {
    email: "superadmin@unicartagena.edu.co",
    name: "Coordinación institucional",
    role: "superadmin",
    expiresAt: 0,
  },
  centro_admin: {
    email: "admin.cerete@unicartagena.edu.co",
    name: "Admin Centro Tutorial Cereté",
    role: "centro_admin",
    expiresAt: 0,
  },
};

export const SESSION_MAX_AGE_MS = 24 * 60 * 60 * 1000;
