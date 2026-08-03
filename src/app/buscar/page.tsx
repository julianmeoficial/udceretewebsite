"use client";

import Link from "next/link";
import { useDeferredValue, useMemo, useState } from "react";
import { ArrowRightIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { calendarEvents } from "@/data/calendar";
import { posts } from "@/data/posts";
import { resources } from "@/data/resources";
import { formatShortDate } from "@/lib/utils/format";
import {
  highlightMatch,
  resourceFileLabel,
  searchEvents,
  searchPosts,
  searchResources,
  searchTramites,
} from "@/lib/content/search";
import styles from "./page.module.css";

/**
 * Búsqueda client-side del sitio.
 *
 * MVP: indexa datos locales. En producción sustituir por un adaptador
 * (Meilisearch, API propia, etc.). El modo “IA” se eliminó a propósito:
 * recrearlo con un proveedor real tras el feedback UX.
 */
export default function SearchPage() {
  const [query, setQuery] = useState("");
  const deferred = useDeferredValue(query);

  const postResults = useMemo(() => searchPosts(posts, deferred), [deferred]);
  const resourceResults = useMemo(() => searchResources(resources, deferred), [deferred]);
  const eventResults = useMemo(() => searchEvents(calendarEvents, deferred), [deferred]);
  const tramiteResults = useMemo(() => searchTramites(posts, deferred), [deferred]);

  const hasQuery = deferred.trim().length > 0;
  const empty =
    hasQuery &&
    postResults.length === 0 &&
    resourceResults.length === 0 &&
    eventResults.length === 0 &&
    tramiteResults.length === 0;

  return (
    <div className={styles.page}>
      <div className={`container ${styles.container}`}>
        <header className={styles.header}>
          <p className={styles.kicker}>BÚSQUEDA</p>
          <h1 className={styles.title}>¿Qué necesitas encontrar?</h1>
          <p className={styles.subtitle}>
            Artículos, recursos y eventos del Centro Tutorial Cereté.
          </p>
        </header>

        <div className={styles.searchBar}>
          <label className={styles.searchField}>
            <MagnifyingGlassIcon className={styles.searchIcon} aria-hidden />
            <input
              type="search"
              className={styles.searchInput}
              placeholder="Buscar por título o tema…"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              aria-label="Buscar en el sitio"
            />
          </label>
          <Button type="button" variant="primary" className={styles.searchCta}>
            <MagnifyingGlassIcon width={16} height={16} aria-hidden />
            Buscar
          </Button>
        </div>

        {!hasQuery ? (
          <p className={styles.hint}>
            Escribe una consulta o prueba: matrícula, calendario, habilitaciones.
          </p>
        ) : null}

        {empty ? (
          <p className={styles.emptyState}>
            No hay resultados para «{deferred}». Prueba otra palabra o revisa el{" "}
            <Link href="/archivo" className={styles.inlineLink}>
              archivo de publicaciones
            </Link>
            .
          </p>
        ) : null}

        {postResults.length > 0 ? (
          <section className={styles.group} aria-labelledby="posts-heading">
            <h2 id="posts-heading" className={styles.groupTitle}>
              ARTÍCULOS
            </h2>
            <ul className={styles.articleList}>
              {postResults.map((post) => (
                <li key={post.slug} className={styles.articleCard}>
                  <div className={styles.articleBody}>
                    <Badge category={post.category}>{post.category}</Badge>
                    <h3 className={styles.articleTitle}>
                      <span
                        className={styles.hit}
                        dangerouslySetInnerHTML={{
                          __html: highlightMatch(post.title, deferred),
                        }}
                      />
                    </h3>
                    <p className={styles.articleMeta}>
                      {post.author} · {formatShortDate(post.publishedAt)}
                    </p>
                  </div>
                  <Button
                    href={`/articulos/${post.slug}`}
                    variant="primary"
                    className={styles.openBtn}
                  >
                    Abrir artículo
                  </Button>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {resourceResults.length > 0 ? (
          <section className={styles.group} aria-labelledby="resources-heading">
            <h2 id="resources-heading" className={styles.groupTitle}>
              RECURSOS
            </h2>
            <ul className={styles.rowList}>
              {resourceResults.map((resource) => (
                <li key={resource.id}>
                  <Link href="/recursos" className={styles.rowLink}>
                    <span className={styles.fileType}>
                      {resourceFileLabel(resource.type)}
                    </span>
                    <span
                      className={styles.hit}
                      dangerouslySetInnerHTML={{
                        __html: highlightMatch(resource.title, deferred),
                      }}
                    />
                    <ArrowRightIcon width={16} height={16} aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {eventResults.length > 0 ? (
          <section className={styles.group} aria-labelledby="events-heading">
            <h2 id="events-heading" className={styles.groupTitle}>
              EVENTOS
            </h2>
            <ul className={styles.rowList}>
              {eventResults.map((event) => (
                <li key={event.id}>
                  <Link href="/calendario" className={styles.rowLink}>
                    <span className={styles.rowText}>
                      <span
                        className={styles.hit}
                        dangerouslySetInnerHTML={{
                          __html: highlightMatch(event.title, deferred),
                        }}
                      />
                      {" — "}
                      {formatShortDate(event.date)}
                    </span>
                    <ArrowRightIcon width={16} height={16} aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {tramiteResults.length > 0 ? (
          <section className={styles.group} aria-labelledby="tramites-heading">
            <h2 id="tramites-heading" className={styles.groupTitle}>
              TRÁMITES
            </h2>
            <ul className={styles.rowList}>
              {tramiteResults.map((post) => (
                <li key={post.slug}>
                  <Link href={`/articulos/${post.slug}`} className={styles.rowLink}>
                    <span
                      className={styles.hit}
                      dangerouslySetInnerHTML={{
                        __html: highlightMatch(post.title, deferred),
                      }}
                    />
                    <ArrowRightIcon width={16} height={16} aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </div>
  );
}
