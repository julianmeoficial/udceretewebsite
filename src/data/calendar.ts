import type { CalendarEvent } from "./types";

/** Calendario académico 2026-2 — Acuerdo N.º 46-26 / Resolución N.º 13 */
export const academicSchedule2026_2 = {
  viernes: {
    semana1: [
      "2026-07-31",
      "2026-08-21",
      "2026-09-04",
      "2026-09-18",
      "2026-10-02",
      "2026-10-16",
      "2026-10-30",
      "2026-11-13",
    ],
    semana2: [
      "2026-08-14",
      "2026-08-28",
      "2026-09-11",
      "2026-09-25",
      "2026-10-09",
      "2026-10-23",
      "2026-11-06",
      "2026-11-20",
    ],
    parciales: {
      semana1: "2026-11-27",
      semana2: "2026-12-04",
    },
    supletorios: "2026-12-11",
    habilitaciones: "2026-12-18",
  },
  sabado: {
    semana1: [
      "2026-08-01",
      "2026-08-15",
      "2026-08-29",
      "2026-09-12",
      "2026-09-26",
      "2026-10-10",
      "2026-10-24",
      "2026-11-07",
    ],
    semana2: [
      "2026-08-08",
      "2026-08-22",
      "2026-09-05",
      "2026-09-19",
      "2026-10-03",
      "2026-10-17",
      "2026-10-31",
      "2026-11-21",
    ],
    parciales: {
      semana1: "2026-11-28",
      semana2: "2026-12-05",
    },
    supletorios: "2026-12-12",
    habilitaciones: "2026-12-19",
  },
} as const;

function tutorialEvent(
  id: string,
  date: string,
  day: "viernes" | "sábado",
  week: "A" | "B",
  session: number,
): CalendarEvent {
  return {
    id,
    title: `Tutoría ${day} — Semana ${week}, sesión ${session}`,
    date,
    category: "Académico",
    description: `Sesión de tutorías del periodo 2026-2 (${day}, grupo Semana ${week}).`,
    location: "Centro Tutorial Cereté",
  };
}

function buildTutorialEvents(): CalendarEvent[] {
  const events: CalendarEvent[] = [];

  academicSchedule2026_2.viernes.semana1.forEach((date, index) => {
    events.push(tutorialEvent(`vie-s1-${index}`, date, "viernes", "A", index + 1));
  });
  academicSchedule2026_2.viernes.semana2.forEach((date, index) => {
    events.push(tutorialEvent(`vie-s2-${index}`, date, "viernes", "B", index + 1));
  });
  academicSchedule2026_2.sabado.semana1.forEach((date, index) => {
    events.push(tutorialEvent(`sab-s1-${index}`, date, "sábado", "A", index + 1));
  });
  academicSchedule2026_2.sabado.semana2.forEach((date, index) => {
    events.push(tutorialEvent(`sab-s2-${index}`, date, "sábado", "B", index + 1));
  });

  return events;
}

const examEvents: CalendarEvent[] = [
  {
    id: "par-vie-s1",
    title: "Parcial — tutorías viernes Semana A",
    date: academicSchedule2026_2.viernes.parciales.semana1,
    category: "Académico",
    description: "Fecha de parcial para estudiantes con tutorías los viernes (Semana A).",
    location: "Centro Tutorial Cereté",
  },
  {
    id: "par-vie-s2",
    title: "Parcial — tutorías viernes Semana B",
    date: academicSchedule2026_2.viernes.parciales.semana2,
    category: "Académico",
    description: "Fecha de parcial para estudiantes con tutorías los viernes (Semana B).",
    location: "Centro Tutorial Cereté",
  },
  {
    id: "par-sab-s1",
    title: "Parcial — tutorías sábado Semana A",
    date: academicSchedule2026_2.sabado.parciales.semana1,
    category: "Académico",
    description: "Fecha de parcial para estudiantes con tutorías los sábados (Semana A).",
    location: "Centro Tutorial Cereté",
  },
  {
    id: "par-sab-s2",
    title: "Parcial — tutorías sábado Semana B",
    date: academicSchedule2026_2.sabado.parciales.semana2,
    category: "Académico",
    description: "Fecha de parcial para estudiantes con tutorías los sábados (Semana B).",
    location: "Centro Tutorial Cereté",
  },
  {
    id: "sup-vie",
    title: "Supletorios — tutorías viernes",
    date: academicSchedule2026_2.viernes.supletorios,
    category: "Académico",
    description: "Supletorios para quienes tengan tutorías los viernes.",
    location: "Centro Tutorial Cereté",
  },
  {
    id: "sup-sab",
    title: "Supletorios — tutorías sábado",
    date: academicSchedule2026_2.sabado.supletorios,
    category: "Académico",
    description: "Supletorios para quienes tengan tutorías los sábados.",
    location: "Centro Tutorial Cereté",
  },
  {
    id: "hab-vie",
    title: "Habilitaciones — tutorías viernes",
    date: academicSchedule2026_2.viernes.habilitaciones,
    category: "Académico",
    description: "Habilitaciones para estudiantes con tutorías los viernes.",
    location: "Centro Tutorial Cereté",
  },
  {
    id: "hab-sab",
    title: "Habilitaciones — tutorías sábado",
    date: academicSchedule2026_2.sabado.habilitaciones,
    category: "Académico",
    description: "Habilitaciones para estudiantes con tutorías los sábados.",
    location: "Centro Tutorial Cereté",
  },
];

export const calendarEvents: CalendarEvent[] = [...buildTutorialEvents(), ...examEvents];

export function formatScheduleDay(iso: string): string {
  const date = new Date(`${iso}T12:00:00`);
  const day = date.getDate();
  const month = date.toLocaleDateString("es-CO", { month: "short" }).replace(".", "");
  return `${day} ${month}`;
}
