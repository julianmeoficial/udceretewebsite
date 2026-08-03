"use client";

import { useMemo, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import {
  formatLongDate,
  formatMonthYear,
  isFutureDate,
  todayISO,
} from "@/lib/utils/dates";
import styles from "./PublishDatePicker.module.css";

export type PublishMode = "now" | "schedule";

type Props = {
  value: string;
  mode: PublishMode;
  status: "draft" | "published" | "archived";
  onChange: (iso: string) => void;
  onModeChange: (mode: PublishMode) => void;
};

const WEEKDAYS = ["L", "M", "X", "J", "V", "S", "D"];

function tomorrowISO(): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return [
    tomorrow.getFullYear(),
    String(tomorrow.getMonth() + 1).padStart(2, "0"),
    String(tomorrow.getDate()).padStart(2, "0"),
  ].join("-");
}

export function PublishDatePicker({
  value,
  mode,
  status,
  onChange,
  onModeChange,
}: Props) {
  const today = todayISO();
  const initial = value || today;
  const initialDate = new Date(`${initial}T12:00:00`);

  const [cursor, setCursor] = useState({
    year: initialDate.getFullYear(),
    month: initialDate.getMonth(),
  });

  const cells = useMemo(() => {
    const first = new Date(cursor.year, cursor.month, 1);
    const startOffset = (first.getDay() + 6) % 7;
    const daysInMonth = new Date(cursor.year, cursor.month + 1, 0).getDate();
    const items: { day: number; iso: string; inMonth: boolean }[] = [];

    for (let i = 0; i < startOffset; i += 1) {
      items.push({ day: 0, iso: "", inMonth: false });
    }
    for (let day = 1; day <= daysInMonth; day += 1) {
      const iso = `${cursor.year}-${String(cursor.month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      items.push({ day, iso, inMonth: true });
    }
    return items;
  }, [cursor]);

  function selectMode(next: PublishMode) {
    if (next === "now") {
      onChange(today);
      onModeChange("now");
      return;
    }

    const nextDate = isFutureDate(value, today) ? value : tomorrowISO();
    onChange(nextDate);
    const d = new Date(`${nextDate}T12:00:00`);
    setCursor({ year: d.getFullYear(), month: d.getMonth() });
    onModeChange("schedule");
  }

  const scheduled = status === "published" && mode === "schedule" && isFutureDate(value, today);

  return (
    <div className={styles.wrap}>
      <span className={styles.label}>Publicación</span>

      <div className={styles.modes} role="group" aria-label="Modo de publicación">
        <button
          type="button"
          className={mode === "now" ? styles.modeActive : styles.mode}
          onClick={() => selectMode("now")}
        >
          Hoy
        </button>
        <button
          type="button"
          className={mode === "schedule" ? styles.modeActive : styles.mode}
          onClick={() => selectMode("schedule")}
        >
          Programar
        </button>
      </div>

      {mode === "schedule" ? (
        <div className={styles.calendar}>
          <div className={styles.calHead}>
            <button
              type="button"
              className={styles.navBtn}
              aria-label="Mes anterior"
              onClick={() =>
                setCursor((c) => {
                  const m = c.month - 1;
                  return m < 0
                    ? { year: c.year - 1, month: 11 }
                    : { year: c.year, month: m };
                })
              }
            >
              <ChevronLeftIcon width={16} height={16} aria-hidden />
            </button>
            <p className={styles.monthLabel}>
              {formatMonthYear(cursor.year, cursor.month)}
            </p>
            <button
              type="button"
              className={styles.navBtn}
              aria-label="Mes siguiente"
              onClick={() =>
                setCursor((c) => {
                  const m = c.month + 1;
                  return m > 11
                    ? { year: c.year + 1, month: 0 }
                    : { year: c.year, month: m };
                })
              }
            >
              <ChevronRightIcon width={16} height={16} aria-hidden />
            </button>
          </div>

          <div className={styles.weekdays}>
            {WEEKDAYS.map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>

          <div className={styles.grid} role="grid" aria-label="Calendario de publicación">
            {cells.map((cell, index) =>
              cell.inMonth ? (
                <button
                  key={cell.iso}
                  type="button"
                  role="gridcell"
                  className={[
                    styles.day,
                    cell.iso === value ? styles.daySelected : "",
                    cell.iso === today ? styles.dayToday : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  aria-selected={cell.iso === value}
                  onClick={() => {
                    onChange(cell.iso);
                    if (cell.iso === today) {
                      onModeChange("now");
                    }
                  }}
                >
                  {cell.day}
                </button>
              ) : (
                <span key={`empty-${index}`} className={styles.dayEmpty} />
              ),
            )}
          </div>
        </div>
      ) : null}

      <p className={styles.summary} aria-live="polite">
        {mode === "now" ? (
          <>
            Se publicará <strong>hoy</strong> ({formatLongDate(today)}).
          </>
        ) : scheduled ? (
          <>
            <strong>Programado</strong> para el {formatLongDate(value)}. No aparecerá en el
            blog hasta esa fecha.
          </>
        ) : (
          <>
            Elige la fecha de publicación: <strong>{formatLongDate(value)}</strong>.
          </>
        )}
      </p>
    </div>
  );
}
