"use server";

import { redirect } from "next/navigation";
import type { Category, CmsPost, PostStatus } from "@/data/types";
import { canManageContent } from "@/lib/auth/permissions";
import { requireSession } from "@/lib/auth/session";
import {
  getCmsPostById,
  readCmsPosts,
} from "@/lib/cms/read";
import { revalidatePublicPosts } from "@/lib/cms/revalidate";
import { createId, slugify } from "@/lib/cms/utils";
import { writeCmsPosts } from "@/lib/cms/write";
import { FEATURED_TAGS } from "@/features/blog/lib/posts-shared";
import { DEFAULT_AUTHOR } from "@/data/authors";

type PostInput = {
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  category: Category;
  tags: string[];
  author: string;
  publishedAt: string;
  coverImage?: string;
  featured?: boolean;
  status: PostStatus;
};

function validateInput(input: PostInput): string | null {
  if (!input.title.trim()) return "El título es obligatorio.";
  if (!input.excerpt.trim()) return "El extracto es obligatorio.";
  if (!input.category) return "La categoría es obligatoria.";
  if (!input.slug.trim()) return "El slug es obligatorio.";
  if (input.tags.length > 2) return "Solo puedes elegir hasta 2 temas.";
  const invalidTag = input.tags.find((tag) => !FEATURED_TAGS.includes(tag as typeof FEATURED_TAGS[number]));
  if (invalidTag) return `Tema no permitido: ${invalidTag}`;
  return null;
}

async function assertCanEdit() {
  const session = await requireSession();
  if (!canManageContent(session.role)) {
    throw new Error("No autorizado");
  }
  return session;
}

export async function createPost(input: PostInput) {
  const session = await assertCanEdit();
  const error = validateInput(input);
  if (error) return { error };

  const posts = await readCmsPosts();
  const slug = slugify(input.slug || input.title);
  if (posts.some((post) => post.slug === slug)) {
    return { error: "Ya existe un artículo con ese slug." };
  }

  const post: CmsPost = {
    id: createId("post"),
    slug,
    title: input.title.trim(),
    excerpt: input.excerpt.trim(),
    body: input.body,
    category: input.category as Category,
    tags: input.tags,
    author: input.author.trim() || DEFAULT_AUTHOR,
    publishedAt: input.publishedAt,
    coverImage: input.coverImage?.trim() || undefined,
    featured: input.featured ?? false,
    status: input.status,
    updatedAt: new Date().toISOString().slice(0, 10),
    createdBy: session.email,
  };

  await writeCmsPosts([post, ...posts]);
  revalidatePublicPosts(post.status === "published" ? post.slug : undefined);
  redirect(`/admin/articulos/${post.id}/editar`);
}

export async function updatePost(id: string, input: PostInput) {
  await assertCanEdit();
  const error = validateInput(input);
  if (error) return { error };

  const posts = await readCmsPosts();
  const index = posts.findIndex((post) => post.id === id);
  if (index === -1) return { error: "Artículo no encontrado." };

  const slug = slugify(input.slug || input.title);
  const duplicate = posts.find((post) => post.slug === slug && post.id !== id);
  if (duplicate) return { error: "Ya existe un artículo con ese slug." };

  const previous = posts[index];
  const updated: CmsPost = {
    ...previous,
    slug,
    title: input.title.trim(),
    excerpt: input.excerpt.trim(),
    body: input.body,
    category: input.category as Category,
    tags: input.tags,
    author: input.author.trim() || DEFAULT_AUTHOR,
    publishedAt: input.publishedAt,
    coverImage: input.coverImage?.trim() || undefined,
    featured: input.featured ?? false,
    status: input.status,
    updatedAt: new Date().toISOString().slice(0, 10),
  };

  posts[index] = updated;
  await writeCmsPosts(posts);
  revalidatePublicPosts(
    updated.status === "published" || previous.status === "published"
      ? updated.slug
      : undefined,
  );
  if (previous.slug !== updated.slug && previous.status === "published") {
    revalidatePublicPosts(previous.slug);
  }

  return { success: true };
}

export async function deletePost(id: string) {
  await assertCanEdit();
  const posts = await readCmsPosts();
  const target = posts.find((post) => post.id === id);
  if (!target) return { error: "Artículo no encontrado." };

  await writeCmsPosts(posts.filter((post) => post.id !== id));
  if (target.status === "published") {
    revalidatePublicPosts(target.slug);
  }
  redirect("/admin/articulos");
}

export async function getPostForEdit(id: string) {
  return getCmsPostById(id);
}
