"use client";

import type { PostStatus } from "@/data/types";
import { CategoryPills } from "@/components/ui/CategoryPills";
import { isFutureDate, todayISO } from "@/lib/utils/dates";
import styles from "./StatusPills.module.css";

type Props = {
  value: PostStatus;
  publishedAt?: string;
  onChange: (value: PostStatus) => void;
};

export function StatusPills({ value, publishedAt, onChange }: Props) {
  const scheduled =
    value === "published" &&
    publishedAt != null &&
    isFutureDate(publishedAt, todayISO());

  const options = [
    { value: "draft", label: "Borrador" },
    { value: "published", label: scheduled ? "Programado" : "Publicado" },
    { value: "archived", label: "Archivado" },
  ];

  return (
    <div className={styles.wrap}>
      <span className={styles.label}>Estado</span>
      <CategoryPills
        options={options}
        value={value}
        onChange={(next) => onChange(next as PostStatus)}
        ariaLabel="Estado de publicación"
        variant="outline"
      />
    </div>
  );
}
