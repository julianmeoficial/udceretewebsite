"use client";

import { useState } from "react";
import { signInDemoCentroAdmin, signInDemoSuperadmin } from "@/lib/auth/actions";
import styles from "./AdminDemoPanel.module.css";

export function AdminDemoPanel() {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.wrap}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
      >
        [admin test]
      </button>
      {open ? (
        <div className={styles.panel}>
          <p className={styles.note}>Acceso de demostración. No usar en producción.</p>
          <form action={signInDemoSuperadmin}>
            <button type="submit" className={styles.option}>Entrar como Superadmin</button>
          </form>
          <form action={signInDemoCentroAdmin}>
            <button type="submit" className={styles.option}>Entrar como Admin del centro</button>
          </form>
        </div>
      ) : null}
    </div>
  );
}
