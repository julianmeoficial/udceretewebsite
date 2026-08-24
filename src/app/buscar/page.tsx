import { calendarEvents } from "@/data/calendar";
import { SearchPageContent } from "@/features/blog/components/SearchPageContent";
import { getAllPosts } from "@/features/blog/lib/posts";
import { readCmsResources } from "@/lib/cms/read";

export default async function SearchPage() {
  const [posts, resources] = await Promise.all([getAllPosts(), readCmsResources()]);

  return (
    <SearchPageContent posts={posts} resources={resources} events={calendarEvents} />
  );
}
