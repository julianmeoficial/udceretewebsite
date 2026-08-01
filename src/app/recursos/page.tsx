import { readCmsResources } from "@/lib/cms/read";
import { ResourcesPageContent } from "./ResourcesPageContent";

export default async function ResourcesPage() {
  const resources = await readCmsResources();
  return <ResourcesPageContent resources={resources} />;
}
