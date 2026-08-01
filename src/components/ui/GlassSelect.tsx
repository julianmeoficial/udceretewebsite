"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import styles from "./GlassSelect.module.css";

export type GlassSelectOption = {
  value: string;
  label: string;
};

type Props = {
  id: string;
  label: string;
  options: GlassSelectOption[];
  value?: string;
  defaultValue?: string;
  name?: string;
  hint?: string;
  error?: string;
  className?: string;
  onChange?: (value: string) => void;
};

export function GlassSelect({
  id,
  label,
  options,
  value,
  defaultValue,
  name,
  hint,
  error,
  className = "",
  onChange,
}: Props) {
  const listboxId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState(defaultValue ?? options[0]?.value ?? "");
  const current = isControlled ? value : internal;
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(() =>
    Math.max(
      0,
      options.findIndex((option) => option.value === (defaultValue ?? options[0]?.value)),
    ),
  );

  const selected = options.find((option) => option.value === current) ?? options[0];

  const commit = useCallback(
    (next: string) => {
      if (!isControlled) setInternal(next);
      onChange?.(next);
      setOpen(false);
    },
    [isControlled, onChange],
  );

  useEffect(() => {
    if (!open) return;
    listRef.current?.focus();
    const onPointer = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function openMenu() {
    const index = options.findIndex((option) => option.value === current);
    setActiveIndex(index >= 0 ? index : 0);
    setOpen(true);
  }

  function onTriggerKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openMenu();
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      openMenu();
    }
  }

  function onListKeyDown(event: KeyboardEvent<HTMLUListElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => Math.min(options.length - 1, index + 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => Math.max(0, index - 1));
    } else if (event.key === "Home") {
      event.preventDefault();
      setActiveIndex(0);
    } else if (event.key === "End") {
      event.preventDefault();
      setActiveIndex(options.length - 1);
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      const option = options[activeIndex];
      if (option) commit(option.value);
    } else if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
    }
  }

  return (
    <div className={`${styles.field} ${className}`.trim()} ref={rootRef}>
      <label className={styles.label} id={`${id}-label`} htmlFor={id}>
        {label}
      </label>
      {hint ? <p className={styles.hint}>{hint}</p> : null}
      {name ? <input type="hidden" name={name} value={current} /> : null}
      <button
        type="button"
        id={id}
        className={`${styles.trigger} ${open ? styles.triggerOpen : ""}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-labelledby={`${id}-label`}
        onClick={() => {
          if (open) setOpen(false);
          else openMenu();
        }}
        onKeyDown={onTriggerKeyDown}
      >
        <span className={styles.value}>{selected?.label}</span>
        <ChevronDownIcon className={styles.chevron} aria-hidden />
      </button>
      {open ? (
        <ul
          id={listboxId}
          className={styles.menu}
          role="listbox"
          tabIndex={-1}
          aria-labelledby={`${id}-label`}
          onKeyDown={onListKeyDown}
          ref={listRef}
        >
          {options.map((option, index) => {
            const isSelected = option.value === current;
            const isActive = index === activeIndex;
            return (
              <li
                key={option.value}
                role="option"
                aria-selected={isSelected}
                className={`${styles.option} ${isSelected ? styles.optionSelected : ""} ${
                  isActive ? styles.optionActive : ""
                }`}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => commit(option.value)}
              >
                {option.label}
              </li>
            );
          })}
        </ul>
      ) : null}
      {error ? <p className={styles.error}>{error}</p> : null}
    </div>
  );
}
