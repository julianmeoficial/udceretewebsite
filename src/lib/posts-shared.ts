import type { Category, Post } from "@/data/types";
import { matchesQuery } from "@/lib/search";

export const BLOG_CATEGORIES: Category[] = [
  "Académico",
  "Trámites",
  "Institucional",
  "Beneficios",
  "Tecnología y productividad",
  "Recursos",
  "Bienestar",
];

export const FEATURED_TAGS = [
  "2026-2",
  "matrícula",
  "SMA",
  "habilitaciones",
  "calendario",
  "homologación",
] as const;

export function getCategories(): Category[] {
  return BLOG_CATEGORIES;
}

export function getFeaturedTags(): string[] {
  return [...FEATURED_TAGS];
}

export function getPostTags(): string[] {
  return getFeaturedTags();
}

export type PostSort = "recent" | "title";

export function filterPostsList(
  posts: Post[],
  options: {
    category?: string;
    month?: string;
    tag?: string;
    query?: string;
    sort?: PostSort;
  },
): Post[] {
  let results = posts.filter((post) => {
    if (options.category && options.category !== "all" && post.category !== options.category) {
      return false;
    }
    if (options.month && options.month !== "all") {
      const key = post.publishedAt.slice(0, 7);
      if (key !== options.month) return false;
    }
    if (options.tag && options.tag !== "all") {
      const normalizedTag = options.tag.toLowerCase();
      const hasTag = post.tags.some((t) => t.toLowerCase() === normalizedTag);
      if (!hasTag) return false;
    }
    if (options.query?.trim()) {
      const haystack = [
        post.title,
        post.excerpt,
        post.category,
        post.tags.join(" "),
        post.author,
      ].join(" ");
      if (!matchesQuery(haystack, options.query)) return false;
    }
    return true;
  });

  if (options.sort === "title") {
    results = [...results].sort((a, b) => a.title.localeCompare(b.title, "es"));
  }

  return results;
}
