"use client";

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { Extension } from "@tiptap/core";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import CharacterCount from "@tiptap/extension-character-count";
import Typography from "@tiptap/extension-typography";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Highlighter,
  Italic,
  Keyboard,
  Link2,
  List,
  ListOrdered,
  Minus,
  Quote,
  Redo2,
  Strikethrough,
  Underline as UnderlineIcon,
  Undo2,
  X,
} from "lucide-react";
import styles from "./ArticleEditor.module.css";

gsap.registerPlugin(useGSAP);

const EditorShortcuts = Extension.create({
  name: "editorShortcuts",
  addKeyboardShortcuts() {
    return {
      "Mod-Alt-1": () => this.editor.commands.toggleHeading({ level: 1 }),
      "Mod-Alt-2": () => this.editor.commands.toggleHeading({ level: 2 }),
      "Mod-Alt-3": () => this.editor.commands.toggleHeading({ level: 3 }),
      "Mod-Shift-8": () => this.editor.commands.toggleBulletList(),
      "Mod-Shift-7": () => this.editor.commands.toggleOrderedList(),
      "Mod-Shift-9": () => this.editor.commands.toggleBlockquote(),
      "Mod-Shift-s": () => this.editor.commands.toggleStrike(),
      "Mod-k": () => {
        const previous = this.editor.getAttributes("link").href as string | undefined;
        const url = window.prompt("URL del enlace", previous ?? "https://");
        if (url === null) return true;
        if (url.trim() === "") {
          return this.editor.commands.unsetLink();
        }
        return this.editor.commands.setLink({ href: url.trim() });
      },
    };
  },
});

type Props = {
  value: string;
  onChange: (html: string) => void;
  id?: string;
};

type OsKind = "mac" | "windows";

function detectOs(): OsKind {
  if (typeof navigator === "undefined") return "windows";
  const ua = navigator.userAgent || "";
  const platform = navigator.platform || "";
  if (/Mac|iPhone|iPad|iPod/i.test(ua) || /Mac/i.test(platform)) return "mac";
  return "windows";
}

function buildShortcutGroups(os: OsKind) {
  const mod = os === "mac" ? "⌘" : "Ctrl";
  const alt = os === "mac" ? "⌥" : "Alt";
  const shift = os === "mac" ? "⇧" : "Shift";

  return [
    {
      title: "Texto",
      items: [
        { keys: [mod, "B"], label: "Negrita" },
        { keys: [mod, "I"], label: "Cursiva" },
        { keys: [mod, "U"], label: "Subrayado" },
        { keys: [mod, shift, "S"], label: "Tachado" },
        { keys: [mod, "E"], label: "Código en línea" },
        { keys: [mod, "K"], label: "Insertar enlace" },
      ],
    },
    {
      title: "Estructura",
      items: [
        { keys: [mod, alt, "1"], label: "Título H1" },
        { keys: [mod, alt, "2"], label: "Subtítulo H2" },
        { keys: [mod, alt, "3"], label: "Apartado H3" },
        { keys: [mod, shift, "8"], label: "Lista con viñetas" },
        { keys: [mod, shift, "7"], label: "Lista numerada" },
        { keys: [mod, shift, "9"], label: "Cita" },
      ],
    },
    {
      title: "Historial",
      items: [
        { keys: [mod, "Z"], label: "Deshacer" },
        { keys: [mod, shift, "Z"], label: "Rehacer" },
      ],
    },
    {
      title: "Markdown rápido",
      items: [
        { keys: ["#", "espacio"], label: "Título" },
        { keys: ["##", "espacio"], label: "Subtítulo" },
        { keys: ["-", "espacio"], label: "Viñetas" },
        { keys: ["1.", "espacio"], label: "Numerada" },
        { keys: [">", "espacio"], label: "Cita" },
        { keys: ["---"], label: "Línea horizontal" },
      ],
    },
  ] as const;
}

export function ArticleEditor({ value, onChange, id = "article-body" }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [hintsOpen, setHintsOpen] = useState(false);
  const [os] = useState<OsKind>(() => detectOs());
  const [stats, setStats] = useState({ words: 0, characters: 0 });

  const shortcutGroups = useMemo(() => buildShortcutGroups(os), [os]);
  const modLabel = os === "mac" ? "⌘" : "Ctrl";
  const osLabel = os === "mac" ? "macOS" : "Windows";

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
        bulletList: {
          HTMLAttributes: { class: styles.bulletList },
        },
        orderedList: {
          HTMLAttributes: { class: styles.orderedList },
        },
        code: {
          HTMLAttributes: { class: styles.inlineCode },
        },
        horizontalRule: {
          HTMLAttributes: { class: styles.hr },
        },
      }),
      Underline,
      Highlight.configure({ multicolor: false }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "center", "right"],
      }),
      Typography,
      CharacterCount,
      EditorShortcuts,
      Link.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
        HTMLAttributes: {
          rel: "noopener noreferrer",
          class: styles.link,
        },
      }),
      Placeholder.configure({
        placeholder:
          "Empieza a escribir el aviso… Prueba # espacio para un título, o - espacio para una lista.",
      }),
    ],
    content: value || "<p></p>",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        id,
        class: styles.prose,
        "aria-label": "Cuerpo del artículo",
        spellcheck: "true",
      },
    },
    onUpdate: ({ editor: current }) => {
      onChange(current.getHTML());
      setStats({
        words: current.storage.characterCount.words(),
        characters: current.storage.characterCount.characters(),
      });
    },
    onCreate: ({ editor: current }) => {
      setStats({
        words: current.storage.characterCount.words(),
        characters: current.storage.characterCount.characters(),
      });
    },
  });

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce || !rootRef.current) return;

      gsap.from("[data-editor-chrome]", {
        y: 8,
        opacity: 0,
        duration: 0.35,
        stagger: 0.05,
        ease: "power2.out",
      });
    },
    { scope: rootRef },
  );

  const setLink = useCallback(() => {
    if (!editor) return;
    const previous = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("URL del enlace", previous ?? "https://");
    if (url === null) return;
    if (url.trim() === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url.trim() }).run();
  }, [editor]);

  if (!editor) {
    return (
      <div className={styles.wrap} aria-busy="true">
        <div className={styles.skeleton} />
      </div>
    );
  }

  return (
    <div ref={rootRef} className={styles.wrap}>
      <div className={styles.toolbar} data-editor-chrome role="toolbar" aria-label="Formato del texto">
        <div className={styles.toolbarRow}>
          <ToolbarCluster label="Historial">
            <ToolbarButton
              label={`Deshacer (${modLabel}+Z)`}
              active={false}
              disabled={!editor.can().undo()}
              onClick={() => editor.chain().focus().undo().run()}
            >
              <Undo2 size={16} aria-hidden />
            </ToolbarButton>
            <ToolbarButton
              label={`Rehacer (${modLabel}+Shift+Z)`}
              active={false}
              disabled={!editor.can().redo()}
              onClick={() => editor.chain().focus().redo().run()}
            >
              <Redo2 size={16} aria-hidden />
            </ToolbarButton>
          </ToolbarCluster>

          <ToolbarCluster label="Títulos">
            <ToolbarButton
              label={`Título H1 (${modLabel}+Alt+1)`}
              active={editor.isActive("heading", { level: 1 })}
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            >
              <Heading1 size={16} aria-hidden />
            </ToolbarButton>
            <ToolbarButton
              label={`Subtítulo H2 (${modLabel}+Alt+2)`}
              active={editor.isActive("heading", { level: 2 })}
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            >
              <Heading2 size={16} aria-hidden />
            </ToolbarButton>
            <ToolbarButton
              label={`Apartado H3 (${modLabel}+Alt+3)`}
              active={editor.isActive("heading", { level: 3 })}
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            >
              <Heading3 size={16} aria-hidden />
            </ToolbarButton>
          </ToolbarCluster>

          <ToolbarCluster label="Estilo">
            <ToolbarButton
              label={`Negrita (${modLabel}+B)`}
              active={editor.isActive("bold")}
              onClick={() => editor.chain().focus().toggleBold().run()}
            >
              <Bold size={16} aria-hidden />
            </ToolbarButton>
            <ToolbarButton
              label={`Cursiva (${modLabel}+I)`}
              active={editor.isActive("italic")}
              onClick={() => editor.chain().focus().toggleItalic().run()}
            >
              <Italic size={16} aria-hidden />
            </ToolbarButton>
            <ToolbarButton
              label={`Subrayado (${modLabel}+U)`}
              active={editor.isActive("underline")}
              onClick={() => editor.chain().focus().toggleUnderline().run()}
            >
              <UnderlineIcon size={16} aria-hidden />
            </ToolbarButton>
            <ToolbarButton
              label={`Tachado (${modLabel}+Shift+S)`}
              active={editor.isActive("strike")}
              onClick={() => editor.chain().focus().toggleStrike().run()}
            >
              <Strikethrough size={16} aria-hidden />
            </ToolbarButton>
            <ToolbarButton
              label="Resaltar"
              active={editor.isActive("highlight")}
              onClick={() => editor.chain().focus().toggleHighlight().run()}
            >
              <Highlighter size={16} aria-hidden />
            </ToolbarButton>
            <ToolbarButton
              label={`Código (${modLabel}+E)`}
              active={editor.isActive("code")}
              onClick={() => editor.chain().focus().toggleCode().run()}
            >
              <Code size={16} aria-hidden />
            </ToolbarButton>
            <ToolbarButton
              id="editor-link-btn"
              label={`Enlace (${modLabel}+K)`}
              active={editor.isActive("link")}
              onClick={setLink}
            >
              <Link2 size={16} aria-hidden />
            </ToolbarButton>
          </ToolbarCluster>
        </div>

        <div className={styles.toolbarRow}>
          <ToolbarCluster label="Listas y bloques">
            <ToolbarButton
              label={`Lista con viñetas (${modLabel}+Shift+8)`}
              active={editor.isActive("bulletList")}
              onClick={() => editor.chain().focus().toggleBulletList().run()}
            >
              <List size={16} aria-hidden />
            </ToolbarButton>
            <ToolbarButton
              label={`Lista numerada (${modLabel}+Shift+7)`}
              active={editor.isActive("orderedList")}
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
            >
              <ListOrdered size={16} aria-hidden />
            </ToolbarButton>
            <ToolbarButton
              label={`Cita (${modLabel}+Shift+9)`}
              active={editor.isActive("blockquote")}
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
            >
              <Quote size={16} aria-hidden />
            </ToolbarButton>
            <ToolbarButton
              label="Línea separadora"
              active={false}
              onClick={() => editor.chain().focus().setHorizontalRule().run()}
            >
              <Minus size={16} aria-hidden />
            </ToolbarButton>
          </ToolbarCluster>

          <ToolbarCluster label="Alineación">
            <ToolbarButton
              label="Alinear izquierda"
              active={editor.isActive({ textAlign: "left" })}
              onClick={() => editor.chain().focus().setTextAlign("left").run()}
            >
              <AlignLeft size={16} aria-hidden />
            </ToolbarButton>
            <ToolbarButton
              label="Centrar"
              active={editor.isActive({ textAlign: "center" })}
              onClick={() => editor.chain().focus().setTextAlign("center").run()}
            >
              <AlignCenter size={16} aria-hidden />
            </ToolbarButton>
            <ToolbarButton
              label="Alinear derecha"
              active={editor.isActive({ textAlign: "right" })}
              onClick={() => editor.chain().focus().setTextAlign("right").run()}
            >
              <AlignRight size={16} aria-hidden />
            </ToolbarButton>
          </ToolbarCluster>

          <div className={styles.toolbarSpacer} />

          <button
            type="button"
            className={styles.shortcutsBtn}
            onClick={() => setHintsOpen(true)}
            aria-haspopup="dialog"
          >
            <Keyboard size={15} aria-hidden />
            Atajos
          </button>
        </div>
      </div>

      <div className={styles.editorShell} data-editor-chrome>
        <EditorContent editor={editor} className={styles.editor} />
      </div>

      <div className={styles.footer} data-editor-chrome>
        <p className={styles.footerHint}>
          Tip: <kbd className={styles.inlineKbd}>#</kbd> título ·{" "}
          <kbd className={styles.inlineKbd}>-</kbd> lista ·{" "}
          <kbd className={styles.inlineKbd}>{modLabel}</kbd>+
          <kbd className={styles.inlineKbd}>B</kbd> negrita
        </p>
        <p className={styles.stats} aria-live="polite">
          <span>{stats.words} palabras</span>
          <span className={styles.statSep} aria-hidden>
            ·
          </span>
          <span>{stats.characters} caracteres</span>
        </p>
      </div>

      {hintsOpen ? (
        <ShortcutsPopup
          osLabel={osLabel}
          groups={shortcutGroups}
          onClose={() => setHintsOpen(false)}
        />
      ) : null}
    </div>
  );
}

function ToolbarCluster({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.cluster} role="group" aria-label={label}>
      <span className={styles.clusterLabel}>{label}</span>
      <div className={styles.group}>{children}</div>
    </div>
  );
}

function ToolbarButton({
  label,
  active,
  disabled,
  onClick,
  children,
  id,
}: {
  label: string;
  active: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <button
      id={id}
      type="button"
      className={active ? styles.toolActive : styles.tool}
      aria-label={label}
      title={label}
      aria-pressed={active}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function ShortcutsPopup({
  osLabel,
  groups,
  onClose,
}: {
  osLabel: string;
  groups: ReturnType<typeof buildShortcutGroups>;
  onClose: () => void;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  useGSAP(
    () => {
      if (!overlayRef.current || !panelRef.current) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduce) {
        gsap.set(overlayRef.current, { opacity: 1 });
        gsap.set(panelRef.current, { opacity: 1, y: 0, scale: 1 });
        return;
      }

      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.22, ease: "power1.out" },
      );
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, y: 18, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.34, ease: "power2.out" },
      );
      gsap.from("[data-shortcut-row]", {
        opacity: 0,
        y: 6,
        duration: 0.25,
        stagger: 0.02,
        delay: 0.12,
        ease: "power2.out",
      });
    },
    { dependencies: [mounted] },
  );

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [onClose]);

  function closeWithAnimation() {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !overlayRef.current || !panelRef.current) {
      onClose();
      return;
    }
    const tl = gsap.timeline({ onComplete: onClose });
    tl.to(panelRef.current, {
      opacity: 0,
      y: 12,
      scale: 0.97,
      duration: 0.2,
      ease: "power2.in",
    }).to(
      overlayRef.current,
      { opacity: 0, duration: 0.16, ease: "power1.in" },
      "<",
    );
  }

  if (!mounted) return null;

  return createPortal(
    <div
      ref={overlayRef}
      className={styles.popupOverlay}
      role="presentation"
      onClick={(event) => {
        if (event.target === event.currentTarget) closeWithAnimation();
      }}
    >
      <div
        ref={panelRef}
        className={styles.popup}
        role="dialog"
        aria-modal="true"
        aria-labelledby="shortcuts-title"
      >
        <header className={styles.popupHeader}>
          <div>
            <p className={styles.popupKicker}>Atajos · {osLabel}</p>
            <h2 id="shortcuts-title" className={styles.popupTitle}>
              Teclado del editor
            </h2>
          </div>
          <button
            type="button"
            className={styles.popupClose}
            onClick={closeWithAnimation}
            aria-label="Cerrar atajos"
          >
            <X size={18} aria-hidden />
          </button>
        </header>

        <div className={styles.popupBody}>
          {groups.map((group) => (
            <section key={group.title} className={styles.popupSection}>
              <h3 className={styles.popupSectionTitle}>{group.title}</h3>
              <ul className={styles.shortcutList}>
                {group.items.map((item) => (
                  <li key={item.label} className={styles.shortcutItem} data-shortcut-row>
                    <span className={styles.shortcutKeys}>
                      {item.keys.map((key) => (
                        <kbd key={`${item.label}-${key}`} className={styles.kbd}>
                          {key}
                        </kbd>
                      ))}
                    </span>
                    <span className={styles.shortcutLabel}>{item.label}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>,
    document.body,
  );
}
