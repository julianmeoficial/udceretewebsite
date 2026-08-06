import styles from "./ConfirmBar.module.css";

type Props = {
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmBar({
  message,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  onConfirm,
  onCancel,
}: Props) {
  return (
    <div className={styles.bar} role="alert">
      <p className={styles.message}>{message}</p>
      <div className={styles.actions}>
        <button type="button" className={styles.confirm} onClick={onConfirm}>
          {confirmLabel}
        </button>
        <button type="button" className={styles.cancel} onClick={onCancel}>
          {cancelLabel}
        </button>
      </div>
    </div>
  );
}
