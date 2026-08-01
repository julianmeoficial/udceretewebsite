"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";
import { AcademicScheduleTables } from "@/components/calendar/AcademicScheduleTables";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { calendarEvents } from "@/data/calendar";
import { formatDate } from "@/lib/format";
import { buildIcs, downloadIcs } from "@/lib/ics";
import styles from "./page.module.css";

const weekdays = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

function toKey(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export default function CalendarPage() {
  const [cursor, setCursor] = useState(() => new Date(2026, 7, 1));
  const [selected, setSelected] = useState("2026-08-01");

  const year = cursor.getFullYear();
  const month = cursor.getMonth();

  const eventMap = useMemo(() => {
    const map = new Map<string, typeof calendarEvents>();
    for (const event of calendarEvents) {
      const start = new Date(`${event.date}T12:00:00`);
      const end = new Date(`${(event.endDate ?? event.date)}T12:00:00`);
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        const key = toKey(d.getFullYear(), d.getMonth(), d.getDate());
        const list = map.get(key) ?? [];
        list.push(event);
        map.set(key, list);
      }
    }
    return map;
  }, []);

  const cells = useMemo(() => {
    const first = new Date(year, month, 1);
    const startOffset = (first.getDay() + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevDays = new Date(year, month, 0).getDate();
    const items: { day: number; key: string; inMonth: boolean }[] = [];

    for (let i = startOffset - 1; i >= 0; i -= 1) {
      const day = prevDays - i;
      const date = new Date(year, month - 1, day);
      items.push({
        day,
        key: toKey(date.getFullYear(), date.getMonth(), day),
        inMonth: false,
      });
    }

    for (let day = 1; day <= daysInMonth; day += 1) {
      items.push({ day, key: toKey(year, month, day), inMonth: true });
    }

    while (items.length % 7 !== 0) {
      const day = items.length - (startOffset + daysInMonth) + 1;
      const date = new Date(year, month + 1, day);
      items.push({
        day,
        key: toKey(date.getFullYear(), date.getMonth(), day),
        inMonth: false,
      });
    }

    return items;
  }, [year, month]);

  const selectedEvents = eventMap.get(selected) ?? [];
  const monthLabel = cursor.toLocaleDateString("es-CO", {
    month: "long",
    year: "numeric",
  });

  const monthEvents = calendarEvents.filter((event) => {
    const d = event.date.slice(0, 7);
    const end = (event.endDate ?? event.date).slice(0, 7);
    const key = `${year}-${String(month + 1).padStart(2, "0")}`;
    return d === key || end === key || (d < key && end > key);
  });

  return (
    <div className={styles.page}>
      <div className="container">
        <Breadcrumbs
          items={[
            { label: "Inicio", href: "/" },
            { label: "Calendario" },
          ]}
        />
        <header className={styles.header}>
          <div>
            <h1 className={styles.title}>Calendario académico 2026-2</h1>
            <p className={styles.subtitle}>
              Fechas oficiales de tutorías, parciales, supletorios y habilitaciones del Centro
              Tutorial Cereté.
            </p>
          </div>
          <Button
            type="button"
            variant="secondary"
            onClick={() => downloadIcs(buildIcs(calendarEvents))}
          >
            <Download size={16} aria-hidden />
            Exportar .ics
          </Button>
        </header>

        <AcademicScheduleTables />

        <figure className={styles.officialImage}>
          <Image
            src="/images/calendario-academico-2026-2.png"
            alt="Calendario académico 2026-2 del Centro Tutorial Cereté"
            width={1200}
            height={680}
            className={styles.officialImageImg}
          />
          <figcaption className={styles.officialCaption}>
            Referencia oficial del calendario académico 2026-2.
          </figcaption>
        </figure>

        <div className={styles.layout}>
          <div>
            <div className={styles.monthHead}>
              <button
                type="button"
                className={styles.navBtn}
                aria-label="Mes anterior"
                onClick={() => setCursor(new Date(year, month - 1, 1))}
              >
                <ChevronLeft size={18} />
              </button>
              <h2 className={styles.monthTitle}>{monthLabel}</h2>
              <button
                type="button"
                className={styles.navBtn}
                aria-label="Mes siguiente"
                onClick={() => setCursor(new Date(year, month + 1, 1))}
              >
                <ChevronRight size={18} />
              </button>
            </div>

            <div className={styles.weekdays}>
              {weekdays.map((day) => (
                <div key={day} className={styles.weekday}>
                  {day}
                </div>
              ))}
            </div>

            <div className={styles.grid}>
              {cells.map((cell) => {
                const hasEvents = eventMap.has(cell.key);
                return (
                  <button
                    key={cell.key}
                    type="button"
                    className={`${styles.cell} ${cell.inMonth ? "" : styles.cellMuted} ${
                      selected === cell.key ? styles.cellSelected : ""
                    }`}
                    disabled={!cell.inMonth}
                    onClick={() => setSelected(cell.key)}
                    aria-pressed={selected === cell.key}
                    aria-label={`${cell.day}${hasEvents ? ", con eventos" : ""}`}
                  >
                    <span>{cell.day}</span>
                    {hasEvents ? <span className={styles.dot} aria-hidden /> : null}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <h2 className={styles.listTitle}>
              {selectedEvents.length > 0
                ? `Eventos del ${formatDate(selected)}`
                : `Eventos de ${monthLabel}`}
            </h2>
            {(selectedEvents.length > 0 ? selectedEvents : monthEvents).map((event) => (
              <article key={event.id} className={styles.event}>
                <div className="cluster" style={{ marginBottom: "0.5rem" }}>
                  <Badge category={event.category}>{event.category}</Badge>
                </div>
                <h3 className={styles.eventTitle}>{event.title}</h3>
                <p className={styles.eventMeta}>
                  {formatDate(event.date)}
                  {event.endDate ? ` — ${formatDate(event.endDate)}` : ""}
                  {event.location ? ` · ${event.location}` : ""}
                </p>
                <p>{event.description}</p>
              </article>
            ))}
            {selectedEvents.length === 0 && monthEvents.length === 0 ? (
              <p>No hay eventos este mes.</p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
