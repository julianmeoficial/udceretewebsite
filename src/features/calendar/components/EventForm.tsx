"use client";

import { useState } from "react";
import { CategoryPills } from "@/components/ui/CategoryPills";
import { Button } from "@/components/ui/Button";
import { TextAreaField, TextField } from "@/components/ui/Input";
import type { CalendarEvent, Category } from "@/data/types";
import { BLOG_CATEGORIES } from "@/features/blog/lib/posts-shared";
import { ConfirmBar } from "@/features/admin/components/ConfirmBar";
import styles from "@/features/resources/components/ResourceForm.module.css";

type Input = {
  title: string;
  date: string;
  endDate?: string;
  category: Category;
  description: string;
  location?: string;
};

type Props = {
  event?: CalendarEvent;
  onSave: (input: Input) => Promise<{ error?: string; success?: boolean } | void>;
  onDelete?: () => Promise<{ error?: string } | void>;
};

export function EventForm({ event, onSave, onDelete }: Props) {
  const [title, setTitle] = useState(event?.title ?? "");
  const [date, setDate] = useState(event?.date ?? "");
  const [endDate, setEndDate] = useState(event?.endDate ?? "");
  const [category, setCategory] = useState<Category>(event?.category ?? BLOG_CATEGORIES[0]);
  const [description, setDescription] = useState(event?.description ?? "");
  const [location, setLocation] = useState(event?.location ?? "");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const result = await onSave({
      title,
      date,
      endDate: endDate || undefined,
      category,
      description,
      location: location || undefined,
    });
    if (result && "error" in result && result.error) {
      setError(result.error);
      return;
    }
    setMessage("Cambios guardados.");
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <TextField id="title" label="Título" value={title} onChange={(e) => setTitle(e.target.value)} />
      <TextField id="date" label="Fecha" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <TextField id="endDate" label="Fecha fin (opcional)" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      <div className={styles.field}>
        <span className={styles.label}>Categoría</span>
        <CategoryPills
          options={BLOG_CATEGORIES.map((c) => ({ value: c, label: c }))}
          value={category}
          onChange={(v) => setCategory(v as Category)}
          variant="outline"
          ariaLabel="Categoría"
        />
      </div>
      <TextAreaField id="description" label="Descripción" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
      <TextField id="location" label="Ubicación" value={location} onChange={(e) => setLocation(e.target.value)} />
      {error ? <p className={styles.error} role="alert">{error}</p> : null}
      {message ? <p className={styles.success} role="status">{message}</p> : null}
      <div className={styles.actions}>
        <Button type="submit">Guardar</Button>
        {event && onDelete ? (
          <button type="button" className={styles.deleteBtn} onClick={() => setConfirmDelete(true)}>
            Eliminar
          </button>
        ) : null}
      </div>
      {confirmDelete && onDelete ? (
        <ConfirmBar
          message="¿Eliminar este evento?"
          confirmLabel="Eliminar"
          onConfirm={() => onDelete()}
          onCancel={() => setConfirmDelete(false)}
        />
      ) : null}
    </form>
  );
}
