/**
 * CMS file-based (MVP).
 *
 * Persistencia JSON bajo `src/data/cms/`. El contrato de lectura
 * (`readCms*`, `toPublicPost`, `getPublishedPosts`) es reutilizable:
 * en producción sustituye el cuerpo por un adaptador a BD/CMS real
 * manteniendo las mismas firmas hacia `lib/posts` y las pages.
 */
import { readFile } from "fs/promises";
import path from "path";
import { siteConfig } from "@/data/site";
import type {
  CalendarEvent,
  CmsPost,
  CmsUser,
  CmsWellbeing,
  Resource,
} from "@/data/types";
import { CMS_DIR, CMS_FILES } from "./paths";
import { todayISO } from "@/lib/utils/dates";

const EMPTY_WELLBEING: CmsWellbeing = {
  supportRoutes: [],
  testimonials: [],
};

async function readJsonFile<T>(filename: string, fallback: T): Promise<T> {
  try {
    const filePath = path.join(CMS_DIR, filename);
    const raw = await readFile(filePath, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export async function readCmsPosts(): Promise<CmsPost[]> {
  return readJsonFile<CmsPost[]>(CMS_FILES.posts, []);
}

export async function readCmsResources(): Promise<Resource[]> {
  return readJsonFile<Resource[]>(CMS_FILES.resources, []);
}

export async function readCmsEvents(): Promise<CalendarEvent[]> {
  return readJsonFile<CalendarEvent[]>(CMS_FILES.events, []);
}

export async function readCmsWellbeing(): Promise<CmsWellbeing> {
  return readJsonFile<CmsWellbeing>(CMS_FILES.wellbeing, EMPTY_WELLBEING);
}

export async function readCmsUsers(): Promise<CmsUser[]> {
  return readJsonFile<CmsUser[]>(CMS_FILES.users, [
    {
      id: "u1",
      email: "superadmin@unicartagena.edu.co",
      name: "Coordinación institucional",
      role: "superadmin",
      active: true,
    },
    {
      id: "u2",
      email: "admin.cerete@unicartagena.edu.co",
      name: "Admin Centro Tutorial Cereté",
      role: "centro_admin",
      active: true,
    },
  ]);
}

export async function readCmsSite(): Promise<typeof siteConfig> {
  return readJsonFile(CMS_FILES.site, siteConfig);
}

/** Proyecta un registro CMS a la forma pública `Post` del front. */
export function toPublicPost(post: CmsPost) {
  const { id, status, updatedAt, createdBy, ...publicFields } = post;
  void id;
  void status;
  void updatedAt;
  void createdBy;
  return publicFields;
}

export async function getPublishedPosts(): Promise<
  ReturnType<typeof toPublicPost>[]
> {
  const today = todayISO();
  const all = await readCmsPosts();
  return all
    .filter(
      (post) =>
        post.status === "published" && post.publishedAt.slice(0, 10) <= today,
    )
    .map(toPublicPost);
}

export async function getPublishedPostBySlug(slug: string) {
  const today = todayISO();
  const all = await readCmsPosts();
  const found = all.find(
    (post) =>
      post.slug === slug &&
      post.status === "published" &&
      post.publishedAt.slice(0, 10) <= today,
  );
  return found ? toPublicPost(found) : undefined;
}

export async function getCmsPostById(id: string) {
  const all = await readCmsPosts();
  return all.find((post) => post.id === id);
}
