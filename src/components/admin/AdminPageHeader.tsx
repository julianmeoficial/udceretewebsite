import type { ReactNode } from "react";
import styles from "./AdminPageHeader.module.css";

type Props = {
  kicker?: string;
  title: string;
  description?: string;
  action?: ReactNode;
};

export function AdminPageHeader({ kicker, title, description, action }: Props) {
  return (
    <header className={styles.header}>
      <div className={styles.body}>
        {kicker ? <p className={styles.kicker}>{kicker}</p> : null}
        <h1 className={styles.title}>{title}</h1>
        {description ? <p className={styles.description}>{description}</p> : null}
      </div>
      {action ? <div className={styles.action}>{action}</div> : null}
    </header>
  );
}
