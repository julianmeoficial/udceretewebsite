import { readCmsWellbeing } from "@/lib/cms/read";
import { WellbeingPageContent } from "./WellbeingPageContent";

export default async function WellbeingPage() {
  const { supportRoutes, testimonials } = await readCmsWellbeing();
  return (
    <WellbeingPageContent supportRoutes={supportRoutes} testimonials={testimonials} />
  );
}
