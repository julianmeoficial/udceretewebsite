import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import styles from "./Input.module.css";

type FieldProps = {
  label: string;
  hint?: string;
  error?: string;
  id: string;
};

export function TextField({
  label,
  hint,
  error,
  id,
  className = "",
  ...props
}: FieldProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      {hint ? <p className={styles.hint}>{hint}</p> : null}
      <input id={id} className={`${styles.control} ${className}`.trim()} {...props} />
      {error ? <p className={styles.error}>{error}</p> : null}
    </div>
  );
}

export function TextAreaField({
  label,
  hint,
  error,
  id,
  className = "",
  ...props
}: FieldProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      {hint ? <p className={styles.hint}>{hint}</p> : null}
      <textarea
        id={id}
        className={`${styles.control} ${styles.textarea} ${className}`.trim()}
        {...props}
      />
      {error ? <p className={styles.error}>{error}</p> : null}
    </div>
  );
}

export { GlassSelect as SelectField } from "./GlassSelect";
export type { GlassSelectOption as SelectOption } from "./GlassSelect";
