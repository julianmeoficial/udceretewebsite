"use server";

import type { UserRole } from "@/data/types";
import { requireSession } from "@/lib/auth/session";
import { readCmsUsers } from "@/lib/cms/read";
import { writeCmsUsers } from "@/lib/cms/write";

async function assertSuperadmin() {
  const session = await requireSession();
  if (session.role !== "superadmin") throw new Error("No autorizado");
  return session;
}

export async function updateUser(id: string, data: { role: UserRole; active: boolean }) {
  await assertSuperadmin();
  const users = await readCmsUsers();
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) return { error: "Usuario no encontrado." };

  users[index] = { ...users[index], role: data.role, active: data.active };
  await writeCmsUsers(users);
  return { success: true };
}

export async function getUsers() {
  return readCmsUsers();
}
