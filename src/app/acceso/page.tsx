"use client";

/**
 * @mvp Flujo Magic Link simulado + panel demo.
 * Validar copy y fricción de acceso; recrear con auth institucional real.
 */
import Link from "next/link";
import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/Button";
import { AdminDemoPanel } from "@/components/admin/AdminDemoPanel";
import styles from "./page.module.css";

type Step = "idle" | "sent";

const INSTITUTIONAL_DOMAIN = "@unicartagena.edu.co";

export default function AccessPage() {
  const [step, setStep] = useState<Step>("idle");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [domainWarning, setDomainWarning] = useState("");

  function validateEmail(value: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = email.trim();

    if (!validateEmail(trimmed)) {
      setError("Ingresa un correo válido.");
      setStep("idle");
      setDomainWarning("");
      return;
    }

    setError("");
    if (!trimmed.toLowerCase().endsWith(INSTITUTIONAL_DOMAIN)) {
      setDomainWarning(
        "Preferimos correos institucionales (@unicartagena.edu.co). En producción podrías recibir el enlace igualmente.",
      );
    } else {
      setDomainWarning("");
    }

    setStep("sent");
  }

  return (
    <div className={styles.page}>
      <div className={styles.wrapper}>
        <div className={styles.card}>
          <header className={styles.cardHeader}>
            <p className={styles.kicker}>ÁREA PERSONAL</p>
            <h1 className={styles.title}>Ingresa a tu cuenta</h1>
            <p className={styles.subtitle}>
              Te enviaremos un enlace mágico a tu correo institucional. Leer el contenido nunca
              requiere iniciar sesión.
            </p>
          </header>

          <form className={styles.form} onSubmit={onSubmit} noValidate>
            <label className={styles.field} htmlFor="email">
              <span className={styles.label}>Correo institucional</span>
              <input
                id="email"
                name="email"
                type="email"
                className={styles.input}
                placeholder="tu.nombre@unicartagena.edu.co"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  if (step === "sent") setStep("idle");
                }}
                autoComplete="email"
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? "email-error" : domainWarning ? "email-hint" : undefined}
              />
            </label>

            {error ? (
              <p id="email-error" className={styles.error} role="alert">
                {error}
              </p>
            ) : null}

            {domainWarning ? (
              <p id="email-hint" className={styles.warning}>
                {domainWarning}
              </p>
            ) : null}

            <Button type="submit" className={styles.submit}>
              Enviar enlace de acceso
            </Button>
          </form>

          {step === "sent" ? (
            <p className={styles.status} role="status" aria-live="polite">
              Enlace enviado a <strong>{email.trim()}</strong> (simulado). En producción usaría
              autenticación institucional.
            </p>
          ) : null}

          <Link href="/" className={styles.backLink}>
            Volver al inicio
          </Link>
          <AdminDemoPanel />
        </div>
      </div>
    </div>
  );
}
