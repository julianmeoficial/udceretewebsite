import Link from "next/link";
import { getFeaturedTags } from "@/lib/posts";
import styles from "./TagList.module.css";

type Props = {
  tags: string[];
};

export function TagList({ tags }: Props) {
  const featured = new Set(getFeaturedTags().map((t) => t.toLowerCase()));
  const visible = tags.filter((tag) => featured.has(tag.toLowerCase())).slice(0, 2);

  if (!visible.length) return null;

  return (
    <div className={styles.wrap}>
      <p className={styles.label}>Temas relacionados</p>
      <ul className={styles.tags} aria-label="Temas relacionados">
        {visible.map((tag) => (
          <li key={tag}>
            <Link
              href={`/archivo?tag=${encodeURIComponent(tag)}`}
              className={styles.tag}
            >
              #{tag}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
