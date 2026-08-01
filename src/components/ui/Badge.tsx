import type { ReactNode } from "react";
import type { Category } from "@/data/types";
import styles from "./Badge.module.css";

type Props = {
  children: ReactNode;
  accent?: "plum" | "teal" | "gold" | "coral" | "amber" | "neutral";
  category?: Category;
  className?: string;
  showDot?: boolean;
};

export function Badge({ children, className = "", showDot = true }: Props) {
  return (
    <span className={`${styles.badge} ${className}`.trim()}>
      {showDot ? <span className={styles.dot} aria-hidden /> : null}
      {children}
    </span>
  );
}
