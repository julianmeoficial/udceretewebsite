import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/content/posts";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://ctcerete.udec.edu.co";
  const staticRoutes = [
    "",
    "/archivo",
    "/buscar",
    "/calendario",
    "/recursos",
    "/citas",
    "/bienestar",
    "/acceso",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date("2026-07-31"),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const posts = await getAllPosts();
  const articles = posts.map((post) => ({
    url: `${base}/articulos/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...articles];
}
