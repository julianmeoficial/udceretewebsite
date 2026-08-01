"use server";

import type { CmsWellbeing } from "@/data/types";
import { canManageContent } from "@/lib/auth/permissions";
import { requireSession } from "@/lib/auth/session";
import { readCmsWellbeing } from "@/lib/cms/read";
import { revalidatePublicWellbeing } from "@/lib/cms/revalidate";
import { writeCmsWellbeing } from "@/lib/cms/write";

async function assertCanEdit() {
  const session = await requireSession();
  if (!canManageContent(session.role)) throw new Error("No autorizado");
  return session;
}

export async function updateWellbeing(data: CmsWellbeing) {
  await assertCanEdit();
  await writeCmsWellbeing(data);
  revalidatePublicWellbeing();
  return { success: true };
}

export async function getWellbeingData() {
  return readCmsWellbeing();
}
