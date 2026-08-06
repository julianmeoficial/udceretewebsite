"use client";

import { useEffect, useState } from "react";
import styles from "./ReadingProgress.module.css";

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrollable = el.scrollHeight - el.clientHeight;
      const value = scrollable > 0 ? (el.scrollTop / scrollable) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, value)));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={styles.bar}
      style={{ width: `${progress}%` }}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress)}
      aria-label="Progreso de lectura"
    />
  );
}
