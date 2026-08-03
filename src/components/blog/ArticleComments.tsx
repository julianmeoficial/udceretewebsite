"use client";

/**
 * @mvp Comentarios en `localStorage` (por dispositivo).
 * Recrear con auth + persistencia real tras el feedback UX.
 * La mecánica de `useSyncExternalStore` + cache de snapshot sí es reutilizable.
 */
import { FormEvent, useCallback, useSyncExternalStore, useState } from "react";
import { Button } from "@/components/ui/Button";
import { TextAreaField, TextField } from "@/components/ui/Input";
import styles from "./ArticleComments.module.css";

type Reply = {
  id: string;
  author: string;
  body: string;
  createdAt: string;
};

type Comment = {
  id: string;
  author: string;
  body: string;
  createdAt: string;
  replies: Reply[];
};

type Props = {
  postSlug: string;
};

function storageKey(slug: string): string {
  return `udc-comments-${slug}`;
}

const EMPTY_COMMENTS: Comment[] = [];

type SnapshotCache = { raw: string | null; value: Comment[] };
const snapshotCache = new Map<string, SnapshotCache>();

function loadComments(slug: string): Comment[] {
  if (typeof window === "undefined") return EMPTY_COMMENTS;

  let raw: string | null;
  try {
    raw = localStorage.getItem(storageKey(slug));
  } catch {
    return EMPTY_COMMENTS;
  }

  const cached = snapshotCache.get(slug);
  if (cached && cached.raw === raw) return cached.value;

  let value: Comment[] = EMPTY_COMMENTS;
  if (raw) {
    try {
      value = JSON.parse(raw) as Comment[];
    } catch {
      value = EMPTY_COMMENTS;
    }
  }

  snapshotCache.set(slug, { raw, value });
  return value;
}

function saveComments(slug: string, comments: Comment[]): void {
  const raw = JSON.stringify(comments);
  localStorage.setItem(storageKey(slug), raw);
  snapshotCache.set(slug, { raw, value: comments });
}

function formatWhen(iso: string): string {
  return new Intl.DateTimeFormat("es-CO", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

function subscribe(onStoreChange: () => void): () => void {
  window.addEventListener("storage", onStoreChange);
  return () => window.removeEventListener("storage", onStoreChange);
}

function getServerSnapshot(): Comment[] {
  return EMPTY_COMMENTS;
}

function useStoredComments(slug: string): [Comment[], (next: Comment[]) => void] {
  const getSnapshot = useCallback(() => loadComments(slug), [slug]);

  const stored = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const persist = useCallback(
    (next: Comment[]) => {
      saveComments(slug, next);
      window.dispatchEvent(new Event("storage"));
    },
    [slug],
  );

  return [stored, persist];
}

export function ArticleComments({ postSlug }: Props) {
  const [comments, persist] = useStoredComments(postSlug);
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function onCommentSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const author = String(form.get("author") ?? "").trim();
    const body = String(form.get("body") ?? "").trim();
    const nextErrors: Record<string, string> = {};

    if (!author) nextErrors.author = "Indica tu nombre o seudónimo.";
    if (body.length < 5) nextErrors.body = "Escribe al menos 5 caracteres.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const comment: Comment = {
      id: crypto.randomUUID(),
      author,
      body,
      createdAt: new Date().toISOString(),
      replies: [],
    };

    persist([comment, ...comments]);
    event.currentTarget.reset();
    setErrors({});
  }

  function onReplySubmit(event: FormEvent<HTMLFormElement>, commentId: string) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const author = String(form.get("replyAuthor") ?? "").trim();
    const body = String(form.get("replyBody") ?? "").trim();
    const nextErrors: Record<string, string> = {};

    if (!author) nextErrors.replyAuthor = "Indica tu nombre o seudónimo.";
    if (body.length < 5) nextErrors.replyBody = "Escribe al menos 5 caracteres.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const reply: Reply = {
      id: crypto.randomUUID(),
      author,
      body,
      createdAt: new Date().toISOString(),
    };

    persist(
      comments.map((comment) =>
        comment.id === commentId
          ? { ...comment, replies: [...comment.replies, reply] }
          : comment,
      ),
    );

    setReplyTo(null);
    setErrors({});
  }

  return (
    <section className={styles.section} aria-labelledby="comments-heading">
      <h2 id="comments-heading" className={styles.title}>
        Comentarios
      </h2>
      <p className={styles.note}>
        Los comentarios se guardan en este dispositivo (demo). En producción requerirán
        iniciar sesión.
      </p>

      <form className={styles.form} onSubmit={onCommentSubmit} noValidate>
        <TextField
          id="comment-author"
          name="author"
          label="Nombre o seudónimo"
          error={errors.author}
        />
        <TextAreaField
          id="comment-body"
          name="body"
          label="Tu comentario"
          error={errors.body}
        />
        <Button type="submit">Publicar comentario</Button>
      </form>

      {comments.length === 0 ? (
        <p className={styles.empty}>Sé el primero en comentar este aviso.</p>
      ) : (
        <ul className={styles.list}>
          {comments.map((comment) => (
            <li key={comment.id} className={styles.comment}>
              <header className={styles.commentHead}>
                <strong className={styles.author}>{comment.author}</strong>
                <time className={styles.time} dateTime={comment.createdAt}>
                  {formatWhen(comment.createdAt)}
                </time>
              </header>
              <p className={styles.body}>{comment.body}</p>

              <button
                type="button"
                className={styles.replyToggle}
                onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
              >
                {replyTo === comment.id ? "Cancelar respuesta" : "Responder"}
              </button>

              {comment.replies.length > 0 ? (
                <ul className={styles.replies}>
                  {comment.replies.map((reply) => (
                    <li key={reply.id} className={styles.reply}>
                      <header className={styles.commentHead}>
                        <strong className={styles.author}>{reply.author}</strong>
                        <time className={styles.time} dateTime={reply.createdAt}>
                          {formatWhen(reply.createdAt)}
                        </time>
                      </header>
                      <p className={styles.body}>{reply.body}</p>
                    </li>
                  ))}
                </ul>
              ) : null}

              {replyTo === comment.id ? (
                <form
                  className={styles.replyForm}
                  onSubmit={(event) => onReplySubmit(event, comment.id)}
                  noValidate
                >
                  <TextField
                    id={`reply-author-${comment.id}`}
                    name="replyAuthor"
                    label="Nombre o seudónimo"
                    error={errors.replyAuthor}
                  />
                  <TextAreaField
                    id={`reply-body-${comment.id}`}
                    name="replyBody"
                    label="Tu respuesta"
                    error={errors.replyBody}
                  />
                  <Button type="submit" variant="secondary">
                    Enviar respuesta
                  </Button>
                </form>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
