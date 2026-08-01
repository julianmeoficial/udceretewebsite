"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/Button";
import styles from "./Newsletter.module.css";

export function Newsletter() {
  const [sent, setSent] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
    event.currentTarget.reset();
  }

  return (
    <section id="boletin" className={styles.section} aria-labelledby="newsletter-heading">
      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <h2 id="newsletter-heading" className={styles.title}>
            Recibe cada mes lo esencial del Centro Tutorial Cereté
          </h2>
          <p className={styles.desc}>
            Avisos de matrícula, calendario y recursos. Sin spam, solo lo que importa para tu
            semestre.
          </p>
        </div>
        <form className={styles.form} onSubmit={onSubmit}>
          <label className="visually-hidden" htmlFor="newsletter-email">Correo</label>
          <input
            id="newsletter-email"
            type="email"
            name="email"
            placeholder="tu@unicartagena.edu.co"
            className={styles.input}
            required
          />
          <Button type="submit" variant="primary">Suscribirme</Button>
        </form>
        {sent ? (
          <p className={styles.success} role="status">
            Suscripción registrada (demo). En producción usaría Resend.
          </p>
        ) : null}
      </div>
    </section>
  );
}
