"use server";

import { writeFile } from "fs/promises";
import path from "path";
import type {
  CalendarEvent,
  CmsPost,
  CmsUser,
  CmsWellbeing,
  Resource,
} from "@/data/types";
import { siteConfig } from "@/data/site";
import { CMS_DIR, CMS_FILES } from "./paths";

async function writeJsonFile<T>(filename: string, data: T): Promise<void> {
  const filePath = path.join(CMS_DIR, filename);
  await writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}

export async function writeCmsPosts(posts: CmsPost[]) {
  await writeJsonFile(CMS_FILES.posts, posts);
}

export async function writeCmsResources(resources: Resource[]) {
  await writeJsonFile(CMS_FILES.resources, resources);
}

export async function writeCmsEvents(events: CalendarEvent[]) {
  await writeJsonFile(CMS_FILES.events, events);
}

export async function writeCmsWellbeing(data: CmsWellbeing) {
  await writeJsonFile(CMS_FILES.wellbeing, data);
}

export async function writeCmsUsers(users: CmsUser[]) {
  await writeJsonFile(CMS_FILES.users, users);
}

export async function writeCmsSite(data: typeof siteConfig) {
  await writeJsonFile(CMS_FILES.site, data);
}
