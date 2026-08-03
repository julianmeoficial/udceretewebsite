/**
 * Lectura y construcción de sesión.
 *
 * Conservar: `getSession` / `requireSession` (parseo + expiración).
 * Descartar en producción: `buildSession` (emite sesión demo sin identidad).
 */
import { cookies } from "next/headers";
import type { UserRole } from "@/data/types";
import {
  DEMO_USERS,
  SESSION_COOKIE,
  SESSION_MAX_AGE_MS,
  type SessionUser,
} from "./types";

export async function getSession(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(SESSION_COOKIE)?.value;
  if (!raw) return null;

  try {
    const session = JSON.parse(raw) as SessionUser;
    if (!session.expiresAt || session.expiresAt < Date.now()) return null;
    if (!session.role || !session.email) return null;
    return session;
  } catch {
    return null;
  }
}

export async function requireSession(): Promise<SessionUser> {
  const session = await getSession();
  if (!session) {
    throw new Error("No autorizado");
  }
  return session;
}

/** @mvp Emite una sesión demo a partir del rol. Sustituir por login real. */
export function buildSession(role: UserRole): SessionUser {
  const demo = DEMO_USERS[role];
  return {
    ...demo,
    expiresAt: Date.now() + SESSION_MAX_AGE_MS,
  };
}
