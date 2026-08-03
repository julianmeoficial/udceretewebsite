"use server";

import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { redirect } from "next/navigation";
import type { Program, Resource, ResourceType } from "@/data/types";
import { canManageContent } from "@/lib/auth/permissions";
import { requireSession } from "@/lib/auth/session";
import { readCmsResources } from "@/lib/cms/read";
import { revalidatePublicResources } from "@/lib/cms/revalidate";
import { createId } from "@/lib/cms/utils";
import { writeCmsResources } from "@/lib/cms/write";
import { detectFileFormat, formatBytes, sanitizeFileName } from "@/lib/utils/files";

function parseTags(raw: string): string[] {
  return raw
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

async function assertCanEdit() {
  const session = await requireSession();
  if (!canManageContent(session.role)) throw new Error("No autorizado");
  return session;
}

async function saveUpload(file: File, resourceId: string) {
  const safeName = sanitizeFileName(file.name) || "documento";
  const relative = `/uploads/resources/${resourceId}-${safeName}`;
  const absoluteDir = path.join(process.cwd(), "public", "uploads", "resources");
  await mkdir(absoluteDir, { recursive: true });
  const absolutePath = path.join(process.cwd(), "public", relative);
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(absolutePath, buffer);

  return {
    fileName: file.name,
    fileUrl: relative,
    fileFormat: detectFileFormat(file.name, file.type),
    size: formatBytes(file.size),
  };
}

function parsePrograms(raw: string): Program[] {
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (Array.isArray(parsed)) {
      return parsed.filter((item): item is Program => typeof item === "string");
    }
  } catch {
    // fallback comma-separated
  }
  return raw
    .split(",")
    .map((item) => item.trim())
    .filter((item): item is Program => Boolean(item));
}

function readFields(formData: FormData) {
  return {
    title: String(formData.get("title") ?? ""),
    description: String(formData.get("description") ?? ""),
    programs: parsePrograms(String(formData.get("programs") ?? "[]")),
    type: String(formData.get("type") ?? "guía") as ResourceType,
    size: String(formData.get("size") ?? ""),
    tags: parseTags(String(formData.get("tags") ?? "")),
    removeFile: String(formData.get("removeFile") ?? "") === "1",
    file: formData.get("file"),
  };
}

export async function createResource(formData: FormData) {
  await assertCanEdit();
  const fields = readFields(formData);
  if (!fields.title.trim()) return { error: "El título es obligatorio." };
  if (fields.programs.length === 0) return { error: "Selecciona al menos un programa." };

  const resources = await readCmsResources();
  const id = createId("res");

  let fileMeta: Partial<Resource> = {};
  if (fields.file instanceof File && fields.file.size > 0) {
    fileMeta = await saveUpload(fields.file, id);
  }

  const resource: Resource = {
    id,
    title: fields.title.trim(),
    description: fields.description.trim(),
    programs: fields.programs,
    type: fields.type,
    size: fileMeta.size || fields.size.trim() || "—",
    updatedAt: new Date().toISOString().slice(0, 10),
    tags: fields.tags,
    fileName: fileMeta.fileName,
    fileUrl: fileMeta.fileUrl,
    fileFormat: fileMeta.fileFormat,
  };

  await writeCmsResources([resource, ...resources]);
  revalidatePublicResources();
  redirect("/admin/recursos");
}

export async function updateResource(id: string, formData: FormData) {
  await assertCanEdit();
  const fields = readFields(formData);
  if (!fields.title.trim()) return { error: "El título es obligatorio." };
  if (fields.programs.length === 0) return { error: "Selecciona al menos un programa." };

  const resources = await readCmsResources();
  const index = resources.findIndex((item) => item.id === id);
  if (index === -1) return { error: "Recurso no encontrado." };

  const previous = resources[index];
  let fileMeta: Partial<Resource> = {
    fileName: previous.fileName,
    fileUrl: previous.fileUrl,
    fileFormat: previous.fileFormat,
    size: previous.size,
  };

  if (fields.removeFile && !(fields.file instanceof File && fields.file.size > 0)) {
    fileMeta = {
      fileName: undefined,
      fileUrl: undefined,
      fileFormat: undefined,
      size: "—",
    };
  }

  if (fields.file instanceof File && fields.file.size > 0) {
    fileMeta = await saveUpload(fields.file, id);
  }

  resources[index] = {
    ...previous,
    title: fields.title.trim(),
    description: fields.description.trim(),
    programs: fields.programs,
    type: fields.type,
    size: fileMeta.size || fields.size.trim() || "—",
    updatedAt: new Date().toISOString().slice(0, 10),
    tags: fields.tags,
    fileName: fileMeta.fileName,
    fileUrl: fileMeta.fileUrl,
    fileFormat: fileMeta.fileFormat,
  };

  await writeCmsResources(resources);
  revalidatePublicResources();
  return { success: true };
}

export async function deleteResource(id: string) {
  await assertCanEdit();
  const resources = await readCmsResources();
  await writeCmsResources(resources.filter((item) => item.id !== id));
  revalidatePublicResources();
  redirect("/admin/recursos");
}

export async function getResourceById(id: string) {
  const resources = await readCmsResources();
  return resources.find((item) => item.id === id);
}
