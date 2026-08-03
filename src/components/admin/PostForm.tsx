"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { CategoryPills } from "@/components/ui/CategoryPills";
import { Button } from "@/components/ui/Button";
import { TextAreaField, TextField } from "@/components/ui/Input";
import { DEFAULT_AUTHOR, EDITORIAL_AUTHORS } from "@/data/authors";
import type { CmsPost, PostStatus, Category } from "@/data/types";
import { BLOG_CATEGORIES, FEATURED_TAGS } from "@/lib/content/posts-shared";
import { slugify } from "@/lib/cms/utils";
import { isFutureDate, todayISO } from "@/lib/utils/dates";
import { ArticleEditor } from "./ArticleEditor";
import { PublishDatePicker, type PublishMode } from "./PublishDatePicker";
import { StatusPills } from "./StatusPills";
import { ConfirmBar } from "./ConfirmBar";
import styles from "./PostForm.module.css";

type Props = {
  post?: CmsPost;
  onSave: (input: FormValues) => Promise<{ error?: string; success?: boolean } | void>;
  onDelete?: () => Promise<{ error?: string } | void>;
};

export type FormValues = {
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  category: Category;
  tags: string[];
  author: string;
  publishedAt: string;
  coverImage: string;
  featured: boolean;
  status: PostStatus;
};

export function PostForm({ post, onSave, onDelete }: Props) {
  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [slugManual, setSlugManual] = useState(Boolean(post));
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [body, setBody] = useState(post?.body ?? "");
  const [category, setCategory] = useState(post?.category ?? BLOG_CATEGORIES[0]);
  const [tags, setTags] = useState<string[]>(post?.tags ?? []);
  const [author, setAuthor] = useState(
    post?.author && EDITORIAL_AUTHORS.includes(post.author as (typeof EDITORIAL_AUTHORS)[number])
      ? post.author
      : DEFAULT_AUTHOR,
  );
  const [publishedAt, setPublishedAt] = useState(
    post?.publishedAt?.slice(0, 10) ?? todayISO(),
  );
  const [publishMode, setPublishMode] = useState<PublishMode>(() => {
    const date = post?.publishedAt?.slice(0, 10);
    if (date && isFutureDate(date)) return "schedule";
    return "now";
  });
  const [coverImage, setCoverImage] = useState(post?.coverImage ?? "");
  const [featured, setFeatured] = useState(post?.featured ?? false);
  const [status, setStatus] = useState<PostStatus>(post?.status ?? "draft");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [metaOpen, setMetaOpen] = useState(!post);

  const categoryOptions = BLOG_CATEGORIES.map((item) => ({ value: item, label: item }));

  function toggleTag(tag: string) {
    setTags((current) => {
      if (current.includes(tag)) return current.filter((item) => item !== tag);
      if (current.length >= 2) return current;
      return [...current, tag];
    });
  }

  function buildValues(): FormValues {
    return {
      title,
      slug: slugManual ? slug : slugify(title),
      excerpt,
      body,
      category,
      tags,
      author,
      publishedAt,
      coverImage,
      featured,
      status,
    };
  }

  async function handleSubmit(event: FormEvent, nextStatus?: PostStatus) {
    event.preventDefault();
    setError("");
    setMessage("");
    setPending(true);

    const resolvedStatus = nextStatus ?? status;
    if (nextStatus) setStatus(nextStatus);

    const values = buildValues();
    values.status = resolvedStatus;
    if (publishMode === "now") {
      values.publishedAt = todayISO();
    }

    const result = await onSave(values);
    setPending(false);

    if (result && "error" in result && result.error) {
      setError(result.error);
      return;
    }

    if (resolvedStatus === "published" && isFutureDate(values.publishedAt)) {
      setMessage("Artículo programado. Se mostrará en el blog en la fecha indicada.");
    } else if (resolvedStatus === "published") {
      setMessage("Artículo publicado correctamente.");
    } else if (resolvedStatus === "archived") {
      setMessage("Artículo archivado.");
    } else {
      setMessage("Borrador guardado.");
    }
  }

  function handlePublishModeChange(mode: PublishMode) {
    setPublishMode(mode);
    setStatus("published");
    if (mode === "now") {
      setPublishedAt(todayISO());
    }
  }

  function handleStatusChange(next: PostStatus) {
    setStatus(next);
    if (next === "published" && publishMode === "now") {
      setPublishedAt(todayISO());
    }
    if (next === "published" && publishMode === "schedule" && !isFutureDate(publishedAt)) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setPublishedAt(
        [
          tomorrow.getFullYear(),
          String(tomorrow.getMonth() + 1).padStart(2, "0"),
          String(tomorrow.getDate()).padStart(2, "0"),
        ].join("-"),
      );
    }
  }

  async function handleDelete() {
    if (!onDelete) return;
    setPending(true);
    const result = await onDelete();
    setPending(false);
    if (result?.error) {
      setError(result.error);
      setConfirmDelete(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={(event) => handleSubmit(event, "draft")} noValidate>
      <div className={styles.layout}>
        <div className={styles.writing}>
          <label className={styles.titleLabel} htmlFor="title">
            Título
          </label>
          <input
            id="title"
            className={styles.titleInput}
            value={title}
            onChange={(event) => {
              const next = event.target.value;
              setTitle(next);
              if (!slugManual) setSlug(slugify(next));
            }}
            placeholder="Título del aviso o artículo"
            required
          />

          <div className={styles.slugRow}>
            <span className={styles.slugPrefix}>/articulos/</span>
            <input
              id="slug"
              className={styles.slugInput}
              value={slugManual ? slug : slugify(title)}
              onChange={(event) => {
                setSlugManual(true);
                setSlug(event.target.value);
              }}
              aria-label="Slug de la URL"
            />
          </div>

          <div className={styles.field}>
            <span className={styles.label} id="body-label">
              Contenido
            </span>
            <ArticleEditor value={body} onChange={setBody} />
          </div>

          <TextAreaField
            id="excerpt"
            label="Extracto (listados y redes)"
            hint="Una o dos frases. Aparece en el blog y en la vista previa."
            value={excerpt}
            onChange={(event) => setExcerpt(event.target.value)}
            rows={2}
            required
          />
        </div>

        <aside className={styles.meta}>
          <div className={styles.metaSticky}>
            <StatusPills
              value={status}
              publishedAt={publishedAt}
              onChange={handleStatusChange}
            />

            <PublishDatePicker
              value={publishedAt}
              mode={publishMode}
              status={status}
              onChange={setPublishedAt}
              onModeChange={handlePublishModeChange}
            />

            <div className={styles.field}>
              <label className={styles.label} htmlFor="author">
                Autor
              </label>
              <select
                id="author"
                className={styles.select}
                value={author}
                onChange={(event) => setAuthor(event.target.value)}
              >
                {EDITORIAL_AUTHORS.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.field}>
              <span className={styles.label}>Categoría</span>
              <CategoryPills
                options={categoryOptions}
                value={category}
                onChange={(next) => setCategory(next as Category)}
                ariaLabel="Categoría"
                variant="outline"
              />
            </div>

            <div className={styles.field}>
              <span className={styles.label}>Temas (máx. 2)</span>
              <div className={styles.tags}>
                {FEATURED_TAGS.map((tag) => {
                  const active = tags.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      className={active ? styles.tagActive : styles.tag}
                      onClick={() => toggleTag(tag)}
                      aria-pressed={active}
                    >
                      #{tag}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              className={styles.metaToggle}
              onClick={() => setMetaOpen((open) => !open)}
              aria-expanded={metaOpen}
            >
              {metaOpen ? "Ocultar detalles" : "Más detalles"}
            </button>

            {metaOpen ? (
              <div className={styles.metaExtra}>
                <TextField
                  id="coverImage"
                  label="URL de portada"
                  value={coverImage}
                  onChange={(event) => setCoverImage(event.target.value)}
                  placeholder="/images/posts/ejemplo.jpg"
                />
                <label className={styles.check}>
                  <input
                    type="checkbox"
                    checked={featured}
                    onChange={(event) => setFeatured(event.target.checked)}
                  />
                  Destacar en inicio
                </label>
              </div>
            ) : null}

            <div className={styles.sideActions}>
              <Button
                type="button"
                disabled={pending}
                onClick={(event) => handleSubmit(event as unknown as FormEvent, "draft")}
              >
                Guardar borrador
              </Button>
              <Button
                type="button"
                variant="secondary"
                disabled={pending}
                onClick={(event) =>
                  handleSubmit(event as unknown as FormEvent, "published")
                }
              >
                {publishMode === "schedule" ? "Programar" : "Publicar"}
              </Button>
              {post?.status === "published" && !isFutureDate(post.publishedAt) ? (
                <Link href={`/articulos/${post.slug}`} className={styles.preview}>
                  Ver en el sitio
                </Link>
              ) : null}
              {post && onDelete ? (
                <button
                  type="button"
                  className={styles.deleteBtn}
                  onClick={() => setConfirmDelete(true)}
                  disabled={pending}
                >
                  Eliminar
                </button>
              ) : null}
            </div>
          </div>
        </aside>
      </div>

      {error ? (
        <p className={styles.error} role="alert">
          {error}
        </p>
      ) : null}
      {message ? (
        <p className={styles.success} role="status" aria-live="polite">
          {message}
        </p>
      ) : null}

      {confirmDelete ? (
        <ConfirmBar
          message="¿Eliminar este artículo? Esta acción no se puede deshacer."
          confirmLabel="Eliminar"
          onConfirm={handleDelete}
          onCancel={() => setConfirmDelete(false)}
        />
      ) : null}
    </form>
  );
}
