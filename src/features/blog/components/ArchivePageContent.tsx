"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ArticleCard } from "@/features/blog/components/ArticleCard";
import { CategoryPills } from "@/components/ui/CategoryPills";
import { SelectField } from "@/components/ui/Input";
import type { Post } from "@/data/types";
import {
  filterPostsList,
  getCategories,
  getPostTags,
  type PostSort,
} from "@/features/blog/lib/posts-shared";
import styles from "./ArchivePageContent.module.css";

type Props = {
  initialPosts: Post[];
};

export function ArchivePageContent({ initialPosts }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categories = getCategories();
  const tags = getPostTags();
  const [category, setCategory] = useState("all");
  const [tag, setTag] = useState("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<PostSort>("recent");

  const paramTag = searchParams.get("tag");
  const matchedParam = tags.find(
    (item) => item.toLowerCase() === paramTag?.toLowerCase(),
  );
  const activeTag = matchedParam ?? tag;
  const results = filterPostsList(initialPosts, { category, tag: activeTag, query, sort });

  const categoryOptions = [
    { value: "all", label: "Todos" },
    ...categories.map((item) => ({ value: item, label: item })),
  ];

  const tagOptions = [
    { value: "all", label: "Temas" },
    ...tags.map((item) => ({ value: item, label: `#${item}` })),
  ];

  return (
    <div className={styles.page}>
      <div className="container">
        <header className={styles.header}>
          <p className={styles.kicker}>PUBLICACIONES</p>
          <h1 className={styles.title}>El blog del Centro Tutorial</h1>
          <p className={styles.subtitle}>
            Avisos, trámites y novedades para la comunidad del Centro Tutorial Cereté.
          </p>
        </header>

        <CategoryPills
          options={categoryOptions}
          value={category}
          onChange={(next) => {
            setCategory(next);
            if (next !== "all") setTag("all");
          }}
          ariaLabel="Categorías"
          className={styles.categoryPills}
        />

        <div className={styles.toolbar}>
          <label className={styles.searchWrap}>
            <MagnifyingGlassIcon className={styles.searchIcon} aria-hidden />
            <input
              type="search"
              className={styles.searchInput}
              placeholder="Buscar por título o tema…"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              aria-label="Buscar publicaciones"
            />
          </label>
          <SelectField
            id="sort"
            label="Ordenar"
            value={sort}
            onChange={(next) => setSort(next as PostSort)}
            options={[
              { value: "recent", label: "Más reciente" },
              { value: "title", label: "Por título" },
            ]}
            className={styles.sortSelect}
          />
        </div>

        <CategoryPills
          options={tagOptions}
          value={activeTag}
          onChange={(next) => {
            setTag(next);
            if (next !== "all") setCategory("all");
            router.replace("/archivo", { scroll: false });
          }}
          variant="outline"
          ariaLabel="Temas"
          className={styles.tagPills}
        />

        <p className={styles.count} aria-live="polite">
          {results.length} {results.length === 1 ? "resultado" : "resultados"}
        </p>

        {results.length === 0 ? (
          <p className={styles.empty}>No hay publicaciones con esos filtros.</p>
        ) : (
          <div className={styles.grid}>
            {results.map((post) => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
