"use client";

import styles from "./CategoryPills.module.css";

export type PillOption = {
  value: string;
  label: string;
};

type Props = {
  options: PillOption[];
  value: string;
  onChange: (value: string) => void;
  variant?: "solid" | "outline";
  ariaLabel?: string;
  className?: string;
};

export function CategoryPills({
  options,
  value,
  onChange,
  variant = "solid",
  ariaLabel = "Filtros",
  className = "",
}: Props) {
  return (
    <div
      className={`${styles.row} ${variant === "outline" ? styles.outlineRow : ""} ${className}`.trim()}
      role="group"
      aria-label={ariaLabel}
    >
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            className={`${styles.pill} ${variant === "outline" ? styles.pillOutline : ""} ${
              active ? styles.pillActive : ""
            }`}
            aria-pressed={active}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
