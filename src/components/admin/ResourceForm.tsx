"use client";

import { useRef, useState } from "react";
import { ArrowUpTrayIcon, DocumentIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { CategoryPills } from "@/components/ui/CategoryPills";
import { Button } from "@/components/ui/Button";
import { TextAreaField, TextField } from "@/components/ui/Input";
import { ACADEMIC_PROGRAMS } from "@/data/programs";
import type { Program, Resource, ResourceType } from "@/data/types";
import { detectFileFormat, formatBytes } from "@/lib/utils/files";
import { ConfirmBar } from "./ConfirmBar";
import styles from "./ResourceForm.module.css";

const TYPES: ResourceType[] = ["guía", "formato", "plantilla"];

type Props = {
  resource?: Resource;
  onSave: (formData: FormData) => Promise<{ error?: string; success?: boolean } | void>;
  onDelete?: () => Promise<{ error?: string } | void>;
};

type AttachedMeta = {
  fileName: string;
  fileFormat: string;
  size: string;
  fileUrl?: string;
  file?: File | null;
  isNew: boolean;
};

function initialPrograms(resource?: Resource): Program[] {
  if (resource?.programs?.length) return resource.programs;
  return ["General"];
}

export function ResourceForm({ resource, onSave, onDelete }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState(resource?.title ?? "");
  const [description, setDescription] = useState(resource?.description ?? "");
  const [programs, setPrograms] = useState<Program[]>(() => initialPrograms(resource));
  const [type, setType] = useState<ResourceType>(resource?.type ?? "guía");
  const [tagsText, setTagsText] = useState(resource?.tags.join(", ") ?? "");
  const [attachment, setAttachment] = useState<AttachedMeta | null>(
    resource?.fileName
      ? {
          fileName: resource.fileName,
          fileFormat: resource.fileFormat ?? detectFileFormat(resource.fileName),
          size: resource.size,
          fileUrl: resource.fileUrl,
          file: null,
          isNew: false,
        }
      : null,
  );
  const [removeFile, setRemoveFile] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  function toggleProgram(program: Program) {
    setPrograms((current) => {
      if (current.includes(program)) {
        if (current.length === 1) return current;
        return current.filter((item) => item !== program);
      }
      return [...current, program];
    });
  }

  function applyFile(file: File) {
    setAttachment({
      fileName: file.name,
      fileFormat: detectFileFormat(file.name, file.type),
      size: formatBytes(file.size),
      file,
      isNew: true,
    });
    setRemoveFile(false);
    setMessage("");
    setError("");
  }

  function onFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) applyFile(file);
  }

  function onDrop(event: React.DragEvent) {
    event.preventDefault();
    setDragOver(false);
    const file = event.dataTransfer.files?.[0];
    if (file) applyFile(file);
  }

  function clearAttachment() {
    setAttachment(null);
    setRemoveFile(Boolean(resource?.fileUrl || resource?.fileName));
    if (inputRef.current) inputRef.current.value = "";
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setPending(true);
    setError("");

    if (programs.length === 0) {
      setError("Selecciona al menos un programa.");
      setPending(false);
      return;
    }

    const formData = new FormData();
    formData.set("title", title);
    formData.set("description", description);
    formData.set("programs", JSON.stringify(programs));
    formData.set("type", type);
    formData.set("tags", tagsText);
    formData.set("size", attachment?.size ?? resource?.size ?? "—");
    formData.set("removeFile", removeFile ? "1" : "0");

    if (attachment?.file) {
      formData.set("file", attachment.file);
    }

    const result = await onSave(formData);
    setPending(false);

    if (result && "error" in result && result.error) {
      setError(result.error);
      return;
    }
    setMessage("Cambios guardados.");
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.layout}>
        <div className={styles.main}>
          <TextField
            id="title"
            label="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <TextAreaField
            id="description"
            label="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />

          <div className={styles.field}>
            <span className={styles.label}>Programas</span>
            <p className={styles.hint}>
              Puedes marcar varios si el recurso aplica a más de un programa.
            </p>
            <div className={styles.programGrid} role="group" aria-label="Programas">
              {ACADEMIC_PROGRAMS.map((program) => {
                const active = programs.includes(program);
                return (
                  <button
                    key={program}
                    type="button"
                    className={active ? styles.programActive : styles.programChip}
                    aria-pressed={active}
                    onClick={() => toggleProgram(program)}
                  >
                    {program}
                  </button>
                );
              })}
            </div>
          </div>

          <div className={styles.field}>
            <span className={styles.label}>Documento adjunto</span>
            <p className={styles.hint}>
              Arrastra un archivo o selecciónalo. El formato y el tamaño se detectan al instante.
            </p>

            <input
              ref={inputRef}
              type="file"
              className={styles.fileInput}
              accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.zip,.png,.jpg,.jpeg,.webp"
              onChange={onFileChange}
            />

            {attachment ? (
              <div className={styles.fileCard}>
                <DocumentIcon className={styles.fileIcon} aria-hidden />
                <div className={styles.fileBody}>
                  <p className={styles.fileName}>{attachment.fileName}</p>
                  <p className={styles.fileMeta}>
                    <span className={styles.formatBadge}>{attachment.fileFormat}</span>
                    <span>·</span>
                    <span className={styles.size}>{attachment.size}</span>
                    {attachment.isNew ? <span>· Nuevo</span> : null}
                  </p>
                </div>
                <button
                  type="button"
                  className={styles.clearBtn}
                  onClick={clearAttachment}
                  aria-label="Quitar archivo"
                >
                  <XMarkIcon width={18} height={18} aria-hidden />
                </button>
              </div>
            ) : (
              <button
                type="button"
                className={`${styles.dropzone} ${dragOver ? styles.dropzoneActive : ""}`}
                onClick={() => inputRef.current?.click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={onDrop}
              >
                <ArrowUpTrayIcon width={22} height={22} aria-hidden />
                <span>Subir documento</span>
                <span className={styles.dropHint}>PDF, Word, Excel, PowerPoint u otros</span>
              </button>
            )}
          </div>
        </div>

        <aside className={styles.side}>
          <div className={styles.field}>
            <span className={styles.label}>Tipo de recurso</span>
            <CategoryPills
              options={TYPES.map((t) => ({ value: t, label: t }))}
              value={type}
              onChange={(v) => setType(v as ResourceType)}
              variant="outline"
              ariaLabel="Tipo"
            />
          </div>
          <TextField
            id="tags"
            label="Etiquetas"
            hint="Separadas por comas"
            value={tagsText}
            onChange={(e) => setTagsText(e.target.value)}
          />

          {error ? (
            <p className={styles.error} role="alert">
              {error}
            </p>
          ) : null}
          {message ? (
            <p className={styles.success} role="status">
              {message}
            </p>
          ) : null}

          <div className={styles.actions}>
            <Button type="submit" disabled={pending}>
              Guardar
            </Button>
            {resource && onDelete ? (
              <button
                type="button"
                className={styles.deleteBtn}
                onClick={() => setConfirmDelete(true)}
              >
                Eliminar
              </button>
            ) : null}
          </div>
        </aside>
      </div>

      {confirmDelete && onDelete ? (
        <ConfirmBar
          message="¿Eliminar este recurso?"
          confirmLabel="Eliminar"
          onConfirm={async () => {
            setPending(true);
            await onDelete();
          }}
          onCancel={() => setConfirmDelete(false)}
        />
      ) : null}
    </form>
  );
}
