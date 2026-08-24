"use server";

/**
 * Server actions de autenticación.
 *
 * Conservar: `signOut`.
 * Descartar en producción: `signInDemo*` (entrada sin verificación).
 */

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { UserRole } from "@/data/types";
import { SESSION_COOKIE } from "./types";
import { buildSession } from "./session";

async function signInDemo(role: UserRole, next = "/admin") {
  const session = buildSession(role);
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, JSON.stringify(session), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24,
  });
  redirect(next);
}

export async function signOut() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  redirect("/acceso");
}

/** @mvp */
export async function signInDemoSuperadmin() {
  return signInDemo("superadmin");
}

/** @mvp */
export async function signInDemoCentroAdmin() {
  return signInDemo("centro_admin");
}
