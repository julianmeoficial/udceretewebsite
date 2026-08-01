import { readFile } from "fs/promises";
import path from "path";
import { posts as fallbackPosts } from "@/data/posts";
import { resources as fallbackResources } from "@/data/resources";
import { supportRoutes, testimonials } from "@/data/wellbeing";
import { siteConfig } from "@/data/site";
import type {
  CalendarEvent,
  CmsPost,
  CmsUser,
  CmsWellbeing,
  Resource,
} from "@/data/types";
import { CMS_DIR, CMS_FILES } from "./paths";
import { todayISO } from "@/lib/dates";

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
  const fallback: CmsPost[] = fallbackPosts.map((post, index) => ({
    id: `post-${index + 1}`,
    ...post,
    status: "published",
    updatedAt: post.publishedAt,
    createdBy: post.author,
  }));
  return readJsonFile(CMS_FILES.posts, fallback);
}

export async function readCmsResources(): Promise<Resource[]> {
  const raw = await readJsonFile<Array<Resource & { program?: string }>>(
    CMS_FILES.resources,
    fallbackResources,
  );
  return raw.map((item) => {
    const { program, ...rest } = item;
    const existing = Array.isArray(rest.programs) ? rest.programs : [];
    const programs =
      existing.length > 0
        ? existing
        : program
          ? [program as Resource["programs"][number]]
          : (["General"] as Resource["programs"]);
    return { ...rest, programs };
  });
}

export async function readCmsEvents(): Promise<CalendarEvent[]> {
  return readJsonFile<CalendarEvent[]>(CMS_FILES.events, []);
}

export async function readCmsWellbeing(): Promise<CmsWellbeing> {
  return readJsonFile(CMS_FILES.wellbeing, {
    supportRoutes,
    testimonials,
  });
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

export function toPublicPost(post: CmsPost) {
  const {
    id: _id,
    status: _status,
    updatedAt: _updatedAt,
    createdBy: _createdBy,
    ...publicFields
  } = post;
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

export async function getCmsPostBySlugAny(slug: string) {
  const all = await readCmsPosts();
  return all.find((post) => post.slug === slug);
}
