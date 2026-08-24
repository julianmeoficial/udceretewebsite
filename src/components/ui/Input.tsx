import type {
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
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

type SelectOption = {
  value: string;
  label: string;
};

type SelectFieldProps = FieldProps &
  Omit<SelectHTMLAttributes<HTMLSelectElement>, "onChange"> & {
    options: SelectOption[];
    onChange?: (value: string) => void;
  };

/** Select nativo alineado al design system institucional. */
export function SelectField({
  label,
  hint,
  error,
  id,
  options,
  className = "",
  onChange,
  ...props
}: SelectFieldProps) {
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      {hint ? <p className={styles.hint}>{hint}</p> : null}
      <select
        id={id}
        className={`${styles.control} ${styles.select} ${className}`.trim()}
        onChange={(event) => onChange?.(event.target.value)}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error ? <p className={styles.error}>{error}</p> : null}
    </div>
  );
}
