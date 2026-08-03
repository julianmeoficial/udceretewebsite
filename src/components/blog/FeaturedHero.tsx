"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Clock, User } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import type { Post } from "@/data/types";
import { formatShortDate } from "@/lib/utils/format";
import { getReadingTime } from "@/lib/content/reading-time";
import styles from "./FeaturedHero.module.css";

gsap.registerPlugin(useGSAP);

type Props = {
  post: Post;
};

export function FeaturedHero({ post }: Props) {
  const root = useRef<HTMLElement>(null);
  const minutes = getReadingTime(post.body);
  const imageSrc = post.coverImage ?? "/images/hero/campus.jpg";

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce || !root.current) return;

      gsap.from("[data-animate='hero']", {
        y: 16,
        opacity: 0,
        duration: 0.55,
        stagger: 0.08,
        ease: "power2.out",
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className={styles.hero} aria-label="Destacado">
      <div className={`container ${styles.inner}`}>
        <div className={styles.content}>
          <p className={styles.brand} data-animate="hero">
            Universidad de Cartagena · Centro Tutorial Cereté
          </p>
          <div data-animate="hero">
            <Badge>{post.category}</Badge>
          </div>
          <h1 className={styles.title} data-animate="hero">
            {post.title}
          </h1>
          <p className={styles.excerpt} data-animate="hero">
            {post.excerpt}
          </p>
          <div className={styles.meta} data-animate="hero">
            <span className={styles.metaItem}>
              <User size={16} aria-hidden />
              {post.author}
            </span>
            <time dateTime={post.publishedAt}>{formatShortDate(post.publishedAt)}</time>
            <span className={styles.metaItem}>
              <Clock size={16} aria-hidden />
              {minutes} min de lectura
            </span>
          </div>
          <div className={styles.cta} data-animate="hero">
            <Button href={`/articulos/${post.slug}`} variant="primary">
              Leer artículo
            </Button>
            <Link href="/archivo" className={styles.secondaryLink}>
              Ver todo el blog
            </Link>
          </div>
        </div>
        <div className={styles.media} data-animate="hero">
          <Image
            src={imageSrc}
            alt=""
            fill
            priority
            sizes="(max-width: 899px) 100vw, 50vw"
            className={styles.mediaImage}
          />
        </div>
      </div>
    </section>
  );
}
