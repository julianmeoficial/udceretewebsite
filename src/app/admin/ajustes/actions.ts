"use server";

import { siteConfig } from "@/data/site";
import { requireSession } from "@/lib/auth/session";
import { readCmsSite } from "@/lib/cms/read";
import { writeCmsSite } from "@/lib/cms/write";
import { revalidatePath } from "next/cache";

async function assertSuperadmin() {
  const session = await requireSession();
  if (session.role !== "superadmin") throw new Error("No autorizado");
  return session;
}

export async function updateSiteSettings(data: typeof siteConfig) {
  await assertSuperadmin();
  await writeCmsSite(data);
  revalidatePath("/");
  return { success: true };
}

export async function getSiteSettings() {
  return readCmsSite();
}
