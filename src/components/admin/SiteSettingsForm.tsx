"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { TextAreaField, TextField } from "@/components/ui/Input";
import { siteConfig } from "@/data/site";
import styles from "./SiteSettingsForm.module.css";

type SiteConfig = typeof siteConfig;

type Props = {
  initial: SiteConfig;
  onSave: (data: SiteConfig) => Promise<{ error?: string; success?: boolean }>;
};

export function SiteSettingsForm({ initial, onSave }: Props) {
  const [data, setData] = useState<SiteConfig>(initial);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSave() {
    setError("");
    const result = await onSave(data);
    if (result.error) {
      setError(result.error);
      return;
    }
    setMessage("Ajustes guardados.");
  }

  return (
    <div className={styles.form}>
      <TextField
        id="name"
        label="Nombre del sitio"
        value={data.name}
        onChange={(e) => setData({ ...data, name: e.target.value })}
      />
      <TextField
        id="shortName"
        label="Nombre corto"
        value={data.shortName}
        onChange={(e) => setData({ ...data, shortName: e.target.value })}
      />
      <TextAreaField
        id="description"
        label="Descripción"
        value={data.description}
        onChange={(e) => setData({ ...data, description: e.target.value })}
        rows={3}
      />
      <TextField
        id="centerName"
        label="Centro"
        value={data.center.name}
        onChange={(e) =>
          setData({ ...data, center: { ...data.center, name: e.target.value } })
        }
      />
      <TextField
        id="centerEmail"
        label="Correo del centro"
        value={data.center.email}
        onChange={(e) =>
          setData({ ...data, center: { ...data.center, email: e.target.value } })
        }
      />
      {error ? <p className={styles.error} role="alert">{error}</p> : null}
      {message ? <p className={styles.success} role="status">{message}</p> : null}
      <Button type="button" onClick={handleSave}>Guardar ajustes</Button>
    </div>
  );
}
