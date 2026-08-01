import type { CalendarEvent, Post, Resource } from "@/data/types";

function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function matchesQuery(haystack: string, query: string): boolean {
  if (!query.trim()) return false;
  return normalize(haystack).includes(normalize(query.trim()));
}

export function searchPosts(posts: Post[], query: string): Post[] {
  if (!query.trim()) return [];
  return posts.filter((post) =>
    matchesQuery(
      [post.title, post.excerpt, post.category, post.tags.join(" "), post.author].join(" "),
      query,
    ),
  );
}

export function searchResources(resources: Resource[], query: string) {
  if (!query.trim()) return [];
  return resources.filter((resource) =>
    matchesQuery(
      [
        resource.title,
        resource.description,
        resource.programs.join(" "),
        resource.type,
        resource.tags.join(" "),
      ].join(" "),
      query,
    ),
  );
}

export function searchEvents(events: CalendarEvent[], query: string): CalendarEvent[] {
  if (!query.trim()) return [];
  return events.filter((event) =>
    matchesQuery(
      [event.title, event.description, event.category, event.location ?? ""].join(" "),
      query,
    ),
  );
}

export function searchTramites(posts: Post[], query: string): Post[] {
  if (!query.trim()) return [];
  const tramitePosts = posts.filter(
    (post) =>
      post.category === "Trámites" ||
      post.tags.some((tag) =>
        ["matrícula", "financiación", "legalización", "SMA", "tramite", "trámite"].some((k) =>
          normalize(tag).includes(normalize(k)),
        ),
      ),
  );
  return tramitePosts.filter((post) =>
    matchesQuery(
      [post.title, post.excerpt, post.category, post.tags.join(" ")].join(" "),
      query,
    ),
  );
}

export function highlightMatch(text: string, query: string): string {
  if (!query.trim()) return text;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${escaped})`, "gi");
  return text.replace(regex, "<mark>$1</mark>");
}

function extensionFromType(type: string): string {
  if (type === "formato") return "PDF";
  if (type === "plantilla") return "DOCX";
  return "PDF";
}

export function resourceFileLabel(type: string): string {
  return extensionFromType(type);
}
