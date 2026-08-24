/**
 * Orquestación de posts públicos sobre el CMS.
 * Conservar como capa de dominio al cambiar el backend de lectura.
 */
import type { Post } from "@/data/types";
import {
  getPublishedPostBySlug,
  getPublishedPosts,
  readCmsPosts,
} from "@/lib/cms/read";

export async function getAllPosts(): Promise<Post[]> {
  const posts = await getPublishedPosts();
  return posts.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  return getPublishedPostBySlug(slug);
}

export async function getFeaturedPost(): Promise<Post | undefined> {
  const posts = await getAllPosts();
  return posts.find((post) => post.featured) ?? posts[0];
}

export async function getRelatedPosts(post: Post, limit = 3): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts
    .filter((item) => item.slug !== post.slug && item.category === post.category)
    .slice(0, limit);
}

export async function getAllPostsForAdmin() {
  const posts = await readCmsPosts();
  return posts.sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );
}
