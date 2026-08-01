"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { TextAreaField, TextField } from "@/components/ui/Input";
import type { CmsWellbeing, SupportRoute, Testimonial } from "@/data/types";
import { createId } from "@/lib/cms/utils";
import styles from "./WellbeingEditor.module.css";

type Props = {
  initialData: CmsWellbeing;
  onSave: (data: CmsWellbeing) => Promise<{ error?: string; success?: boolean }>;
};

export function WellbeingEditor({ initialData, onSave }: Props) {
  const [routes, setRoutes] = useState<SupportRoute[]>(initialData.supportRoutes);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialData.testimonials);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSave() {
    setError("");
    const result = await onSave({ supportRoutes: routes, testimonials });
    if (result.error) {
      setError(result.error);
      return;
    }
    setMessage("Bienestar actualizado.");
  }

  function updateRoute(index: number, field: keyof SupportRoute, value: string) {
    setRoutes((current) =>
      current.map((route, i) => (i === index ? { ...route, [field]: value } : route)),
    );
  }

  function updateTestimonial(index: number, field: keyof Testimonial, value: string) {
    setTestimonials((current) =>
      current.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    );
  }

  return (
    <div className={styles.wrap}>
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Rutas de apoyo</h2>
        {routes.map((route, index) => (
          <div key={route.id} className={styles.card}>
            <TextField
              id={`route-title-${route.id}`}
              label="Título"
              value={route.title}
              onChange={(e) => updateRoute(index, "title", e.target.value)}
            />
            <TextAreaField
              id={`route-desc-${route.id}`}
              label="Descripción"
              value={route.description}
              onChange={(e) => updateRoute(index, "description", e.target.value)}
              rows={2}
            />
            <TextField
              id={`route-contact-${route.id}`}
              label="Contacto"
              value={route.contact}
              onChange={(e) => updateRoute(index, "contact", e.target.value)}
            />
            <TextField
              id={`route-schedule-${route.id}`}
              label="Horario"
              value={route.schedule}
              onChange={(e) => updateRoute(index, "schedule", e.target.value)}
            />
          </div>
        ))}
        <button
          type="button"
          className={styles.addBtn}
          onClick={() =>
            setRoutes((current) => [
              ...current,
              {
                id: createId("route"),
                title: "Nueva ruta",
                description: "",
                contact: "",
                schedule: "",
              },
            ])
          }
        >
          Agregar ruta
        </button>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Testimonios</h2>
        {testimonials.map((item, index) => (
          <div key={item.id} className={styles.card}>
            <TextAreaField
              id={`quote-${item.id}`}
              label="Cita"
              value={item.quote}
              onChange={(e) => updateTestimonial(index, "quote", e.target.value)}
              rows={2}
            />
            <TextField
              id={`author-${item.id}`}
              label="Autor"
              value={item.author}
              onChange={(e) => updateTestimonial(index, "author", e.target.value)}
            />
            <TextField
              id={`program-${item.id}`}
              label="Programa"
              value={item.program}
              onChange={(e) => updateTestimonial(index, "program", e.target.value)}
            />
          </div>
        ))}
        <button
          type="button"
          className={styles.addBtn}
          onClick={() =>
            setTestimonials((current) => [
              ...current,
              { id: createId("test"), quote: "", author: "", program: "" },
            ])
          }
        >
          Agregar testimonio
        </button>
      </section>

      {error ? <p className={styles.error} role="alert">{error}</p> : null}
      {message ? <p className={styles.success} role="status">{message}</p> : null}
      <Button type="button" onClick={handleSave}>Guardar cambios</Button>
    </div>
  );
}
