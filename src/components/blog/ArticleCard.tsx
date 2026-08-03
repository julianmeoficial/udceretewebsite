import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import type { Post } from "@/data/types";
import { formatShortDate } from "@/lib/utils/format";
import styles from "./ArticleCard.module.css";

type Props = {
  post: Post;
  density?: "default" | "compact";
};

export function ArticleCard({ post, density = "default" }: Props) {
  const imageSrc = post.coverImage ?? "/images/hero/campus.jpg";

  return (
    <Link
      href={`/articulos/${post.slug}`}
      className={`${styles.card} ${density === "compact" ? styles.compact : ""}`}
    >
      {density === "default" ? (
        <div className={styles.thumb}>
          <Image
            src={imageSrc}
            alt=""
            fill
            sizes="(max-width: 719px) 100vw, (max-width: 959px) 50vw, 33vw"
            className={styles.thumbImage}
          />
        </div>
      ) : null}
      <Badge category={post.category}>{post.category}</Badge>
      <h3 className={styles.title}>{post.title}</h3>
      {density === "default" ? <p className={styles.excerpt}>{post.excerpt}</p> : null}
      <div className={styles.meta}>
        <span className={styles.author}>{post.author}</span>
        <span>·</span>
        <time dateTime={post.publishedAt}>{formatShortDate(post.publishedAt)}</time>
      </div>
    </Link>
  );
}
