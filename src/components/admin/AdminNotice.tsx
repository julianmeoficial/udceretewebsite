import styles from "./AdminNotice.module.css";

export function AdminNotice() {
  return (
    <div className={styles.banner} role="status">
      <p>
        <strong>MVP local:</strong> los cambios se guardan en JSON del repositorio. En
        despliegue estático (Vercel) la escritura no persiste; conectar Supabase en
        producción.
      </p>
    </div>
  );
}
