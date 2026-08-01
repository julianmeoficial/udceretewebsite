"use client";

import { FormEvent, useState } from "react";
import { CategoryPills } from "@/components/ui/CategoryPills";
import { Button } from "@/components/ui/Button";
import { TextAreaField, TextField } from "@/components/ui/Input";
import { alertTopics } from "@/data/wellbeing";
import type { SupportRoute, Testimonial } from "@/data/types";
import styles from "./page.module.css";

type Props = {
  supportRoutes: SupportRoute[];
  testimonials: Testimonial[];
};

export function WellbeingPageContent({ supportRoutes, testimonials }: Props) {
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [topic, setTopic] = useState(alertTopics[0].value);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const nextErrors: Record<string, string> = {};

    const name = String(form.get("name") ?? "").trim();
    const contact = String(form.get("contact") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();

    if (!name) nextErrors.name = "Indica un nombre o seudónimo.";
    if (!contact) nextErrors.contact = "Deja un correo o teléfono de contacto.";
    if (message.length < 20)
      nextErrors.message = "Describe la situación con al menos 20 caracteres.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setSent(false);
      return;
    }

    setSent(true);
    event.currentTarget.reset();
    setTopic(alertTopics[0].value);
  }

  return (
    <div className={styles.page}>
      <div className="container">
        <header className={styles.header}>
          <p className={styles.kicker}>COMUNIDAD</p>
          <h1 className={styles.title}>Bienestar estudiantil</h1>
          <p className={styles.subtitle}>
            Rutas de atención y acompañamiento para estudiantes del Centro Tutorial Cereté.
            El canal de alerta temprana es una demostración: no envía datos reales.
          </p>
        </header>

        <section className={styles.section} aria-labelledby="routes-heading">
          <h2 id="routes-heading" className={styles.sectionTitle}>
            Rutas de atención
          </h2>
          <ol className={styles.routes}>
            {supportRoutes.map((route, index) => (
              <li key={route.id} className={styles.route}>
                <span className={styles.routeMarker} aria-hidden>
                  {index + 1}
                </span>
                <div className={styles.routeBody}>
                  <h3 className={styles.routeTitle}>{route.title}</h3>
                  <p className={styles.routeDesc}>{route.description}</p>
                  <p className={styles.routeMeta}>{route.schedule}</p>
                  <a href={`mailto:${route.contact}`} className={styles.routeContact}>
                    {route.contactName ? `${route.contactName} · ` : ""}
                    {route.contact}
                  </a>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.section} aria-labelledby="stories-heading">
          <h2 id="stories-heading" className={styles.sectionTitle}>
            Voces de la comunidad
          </h2>
          <div className={styles.quotes}>
            {testimonials.map((item) => (
              <blockquote key={item.id} className={styles.quote}>
                <p className={styles.quoteText}>“{item.quote}”</p>
                <footer className={styles.quoteAuthor}>
                  {item.author} · {item.program}
                </footer>
              </blockquote>
            ))}
          </div>
        </section>

        <section className={styles.section} aria-labelledby="alert-heading">
          <h2 id="alert-heading" className={styles.sectionTitle}>
            Canal de alerta temprana
          </h2>
          <form className={styles.form} onSubmit={onSubmit} noValidate>
            <p className={styles.note}>
              Formulario confidencial de demostración. En producción notificaría al equipo de
              bienestar sin exponer tu identidad públicamente.
            </p>
            <TextField
              id="name"
              name="name"
              label="Nombre o seudónimo"
              error={errors.name}
            />
            <TextField
              id="contact"
              name="contact"
              label="Correo o teléfono"
              error={errors.contact}
            />
            <div className={styles.topicField}>
              <span className={styles.topicLabel} id="topic-label">Motivo</span>
              <CategoryPills
                options={alertTopics}
                value={topic}
                onChange={setTopic}
                variant="outline"
                ariaLabel="Motivo de la alerta"
              />
              <input type="hidden" name="topic" value={topic} />
            </div>
            <TextAreaField
              id="message"
              name="message"
              label="Describe la situación"
              error={errors.message}
            />
            <Button type="submit">Enviar alerta (demo)</Button>
            {sent ? (
              <p className={styles.success} role="status">
                Gracias. En el prototipo no se envía nada; en producción se confirmaría el
                recibo.
              </p>
            ) : null}
          </form>
        </section>
      </div>
    </div>
  );
}
