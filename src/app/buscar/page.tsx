"use client";

import Link from "next/link";
import { useDeferredValue, useMemo, useState } from "react";
import {
  ArrowRightIcon,
  MagnifyingGlassIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { calendarEvents } from "@/data/calendar";
import { posts } from "@/data/posts";
import { resources } from "@/data/resources";
import { formatShortDate } from "@/lib/format";
import {
  AI_DAILY_LIMIT,
  getAiUsageCount,
  incrementAiUsage,
  resolveAiAnswer,
} from "@/lib/ai-demo";
import {
  highlightMatch,
  resourceFileLabel,
  searchEvents,
  searchPosts,
  searchResources,
  searchTramites,
} from "@/lib/search";
import styles from "./page.module.css";

type SearchMode = "site" | "ai";

export default function SearchPage() {
  const [mode, setMode] = useState<SearchMode>("site");
  const [query, setQuery] = useState("");
  const [aiSubmitted, setAiSubmitted] = useState(false);
  const [usageCount, setUsageCount] = useState(0);
  const deferred = useDeferredValue(query);

  const postResults = useMemo(() => searchPosts(posts, deferred), [deferred]);
  const resourceResults = useMemo(() => searchResources(resources, deferred), [deferred]);
  const eventResults = useMemo(() => searchEvents(calendarEvents, deferred), [deferred]);
  const tramiteResults = useMemo(() => searchTramites(posts, deferred), [deferred]);

  const hasQuery = deferred.trim().length > 0;
  const siteEmpty =
    hasQuery &&
    postResults.length === 0 &&
    resourceResults.length === 0 &&
    eventResults.length === 0 &&
    tramiteResults.length === 0;

  const aiAnswer = useMemo(
    () => (aiSubmitted && deferred.trim() ? resolveAiAnswer(deferred) : null),
    [aiSubmitted, deferred],
  );

  function handleSubmit() {
    if (!query.trim()) return;
    if (mode === "ai") {
      const next = incrementAiUsage();
      setUsageCount(next);
      setAiSubmitted(true);
    }
  }

  function switchMode(next: SearchMode) {
    setMode(next);
    setAiSubmitted(false);
    if (next === "ai") {
      setUsageCount(getAiUsageCount());
    }
  }

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

        <div className={styles.modeSwitch} role="group" aria-label="Modo de búsqueda">
          <button
            type="button"
            className={`${styles.modeBtn} ${mode === "site" ? styles.modeBtnActive : ""}`}
            aria-pressed={mode === "site"}
            onClick={() => switchMode("site")}
          >
            <MagnifyingGlassIcon width={16} height={16} aria-hidden />
            Buscar en el sitio
          </button>
          <button
            type="button"
            className={`${styles.modeBtn} ${mode === "ai" ? styles.modeBtnActive : ""}`}
            aria-pressed={mode === "ai"}
            onClick={() => switchMode("ai")}
          >
            <SparklesIcon width={16} height={16} aria-hidden />
            Preguntar a UDC AI
          </button>
        </div>

        <div className={styles.searchBar}>
          <label className={styles.searchField}>
            {mode === "site" ? (
              <MagnifyingGlassIcon className={styles.searchIcon} aria-hidden />
            ) : (
              <SparklesIcon className={styles.searchIcon} aria-hidden />
            )}
            <input
              type="search"
              className={styles.searchInput}
              placeholder={
                mode === "site"
                  ? "Buscar por título o tema…"
                  : "¿Cuándo abren las matrículas?"
              }
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                if (mode === "ai") setAiSubmitted(false);
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") handleSubmit();
              }}
              aria-label={mode === "site" ? "Buscar en el sitio" : "Pregunta a UDC AI"}
            />
          </label>
          <Button
            type="button"
            variant={mode === "ai" ? "outline" : "primary"}
            className={styles.searchCta}
            onClick={handleSubmit}
          >
            {mode === "site" ? (
              <>
                <MagnifyingGlassIcon width={16} height={16} aria-hidden />
                Buscar
              </>
            ) : (
              <>
                <SparklesIcon width={16} height={16} aria-hidden />
                Preguntar
              </>
            )}
          </Button>
        </div>

        {mode === "site" ? (
          <>
            {!hasQuery ? (
              <p className={styles.hint}>
                Escribe una consulta o prueba: matrícula, calendario, habilitaciones.
              </p>
            ) : null}

            {siteEmpty ? (
              <p className={styles.emptyState}>
                No hay resultados para «{deferred}». Prueba otra palabra o{" "}
                <button
                  type="button"
                  className={styles.inlineLink}
                  onClick={() => switchMode("ai")}
                >
                  pregunta a UDC AI
                </button>
                .
              </p>
            ) : null}

            {postResults.length > 0 ? (
              <section className={styles.group} aria-labelledby="posts-heading">
                <h2 id="posts-heading" className={styles.groupTitle}>ARTÍCULOS</h2>
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
                      <Button href={`/articulos/${post.slug}`} variant="primary" className={styles.openBtn}>
                        Abrir artículo
                      </Button>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {resourceResults.length > 0 ? (
              <section className={styles.group} aria-labelledby="resources-heading">
                <h2 id="resources-heading" className={styles.groupTitle}>RECURSOS</h2>
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
                <h2 id="events-heading" className={styles.groupTitle}>EVENTOS</h2>
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
                <h2 id="tramites-heading" className={styles.groupTitle}>TRÁMITES</h2>
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

            {hasQuery && !siteEmpty ? (
              <div className={styles.aiBanner}>
                <p>¿No encontraste lo que buscas?</p>
                <button
                  type="button"
                  className={styles.aiBannerLink}
                  onClick={() => {
                    switchMode("ai");
                    setAiSubmitted(false);
                  }}
                >
                  Preguntar a UDC AI →
                </button>
              </div>
            ) : null}
          </>
        ) : (
          <>
            {aiAnswer ? (
              <div className={styles.aiCard}>
                <div className={styles.aiDisclaimer}>
                  <SparklesIcon width={14} height={14} aria-hidden />
                  <span>Respuesta generada por IA · verifica siempre las fuentes</span>
                </div>
                <p className={styles.aiBody}>{aiAnswer.body}</p>
                <div className={styles.aiSources}>
                  <p className={styles.aiLabel}>Fuentes</p>
                  <div className={styles.sourceChips}>
                    {aiAnswer.sources.map((source) => (
                      <Link key={source.href} href={source.href} className={styles.sourceChip}>
                        {source.label}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className={styles.aiSuggested}>
                  <p className={styles.aiLabel}>Preguntas sugeridas</p>
                  <ul className={styles.suggestedList}>
                    {aiAnswer.suggested.map((item) => (
                      <li key={item}>
                        <button
                          type="button"
                          className={styles.suggestedBtn}
                          onClick={() => {
                            setQuery(item);
                            const next = incrementAiUsage();
                            setUsageCount(next);
                            setAiSubmitted(true);
                          }}
                        >
                          <span>{item}</span>
                          <ArrowRightIcon width={16} height={16} aria-hidden />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                <p className={styles.usageBanner} role="status">
                  Has usado {usageCount} de {AI_DAILY_LIMIT} consultas gratuitas hoy. El límite se
                  reinicia a medianoche.
                </p>
              </div>
            ) : (
              <p className={styles.hint}>
                Escribe una pregunta y pulsa Preguntar. Respuestas demo con fuentes del sitio.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
