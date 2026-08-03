import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { ArticleComments } from "@/components/blog/ArticleComments";
import { ReadingProgress } from "@/components/blog/ReadingProgress";
import { TagList } from "@/components/blog/TagList";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { siteConfig } from "@/data/site";
import { formatDate } from "@/lib/utils/format";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/content/posts";
import { getReadingTime } from "@/lib/content/reading-time";
import styles from "./page.module.css";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Aviso no encontrado" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      ...(post.coverImage ? { images: [{ url: post.coverImage }] } : {}),
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const related = await getRelatedPosts(post);
  const minutes = getReadingTime(post.body);
  const cover = post.coverImage ?? "/images/hero/campus.jpg";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: post.publishedAt,
    author: {
      "@type": "Organization",
      name: post.author,
    },
    description: post.excerpt,
    image: cover,
    publisher: {
      "@type": "Organization",
      name: siteConfig.center.university,
    },
  };

  return (
    <div className={styles.page}>
      <ReadingProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className={`container reading ${styles.article}`}>
        <Breadcrumbs
          items={[
            { label: "Inicio", href: "/" },
            { label: "Blog", href: "/archivo" },
            { label: post.title },
          ]}
        />
        <Badge category={post.category}>{post.category}</Badge>
        <h1 className={styles.title}>{post.title}</h1>
        <div className={styles.meta}>
          <span>{post.author}</span>
          <span>·</span>
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          <span>·</span>
          <span>{minutes} min de lectura</span>
        </div>
        <div className={styles.cover}>
          <Image
            src={cover}
            alt=""
            fill
            priority
            sizes="(max-width: 720px) 100vw, 680px"
            className={styles.coverImage}
          />
        </div>
        <p className={styles.excerpt}>{post.excerpt}</p>
        <div
          className={`prose ${styles.body}`}
          dangerouslySetInnerHTML={{ __html: post.body }}
        />
        <TagList tags={post.tags} />
        <ArticleComments postSlug={post.slug} />

        {related.length > 0 ? (
          <section className={styles.related} aria-labelledby="related-heading">
            <h2 id="related-heading" className={styles.relatedTitle}>
              Relacionados
            </h2>
            {related.map((item) => (
              <ArticleCard key={item.slug} post={item} density="compact" />
            ))}
          </section>
        ) : null}
      </article>
    </div>
  );
}
