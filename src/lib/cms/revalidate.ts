import { revalidatePath } from "next/cache";

export function revalidatePublicPosts(slug?: string) {
  revalidatePath("/");
  revalidatePath("/archivo");
  revalidatePath("/buscar");
  revalidatePath("/sitemap.xml");
  if (slug) {
    revalidatePath(`/articulos/${slug}`);
  }
}

export function revalidatePublicResources() {
  revalidatePath("/recursos");
  revalidatePath("/buscar");
}

export function revalidatePublicEvents() {
  revalidatePath("/calendario");
  revalidatePath("/buscar");
}

export function revalidatePublicWellbeing() {
  revalidatePath("/bienestar");
}
