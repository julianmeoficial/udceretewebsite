import { academicSchedule2026_2, formatScheduleDay } from "@/data/calendar";
import styles from "./AcademicScheduleTables.module.css";

type WeekKey = "A" | "B";

type DaySchedule = {
  semanaA: readonly string[];
  semanaB: readonly string[];
  parciales: { semanaA: string; semanaB: string };
  supletorios: string;
  habilitaciones: string;
};

export function AcademicScheduleTables() {
  const viernes: DaySchedule = {
    semanaA: academicSchedule2026_2.viernes.semana1,
    semanaB: academicSchedule2026_2.viernes.semana2,
    parciales: {
      semanaA: academicSchedule2026_2.viernes.parciales.semana1,
      semanaB: academicSchedule2026_2.viernes.parciales.semana2,
    },
    supletorios: academicSchedule2026_2.viernes.supletorios,
    habilitaciones: academicSchedule2026_2.viernes.habilitaciones,
  };

  const sabado: DaySchedule = {
    semanaA: academicSchedule2026_2.sabado.semana1,
    semanaB: academicSchedule2026_2.sabado.semana2,
    parciales: {
      semanaA: academicSchedule2026_2.sabado.parciales.semana1,
      semanaB: academicSchedule2026_2.sabado.parciales.semana2,
    },
    supletorios: academicSchedule2026_2.sabado.supletorios,
    habilitaciones: academicSchedule2026_2.sabado.habilitaciones,
  };

  return (
    <div className={styles.wrap}>
      <header className={styles.header}>
        <p className={styles.ref}>
          Acuerdo N.º 46-26 · Resolución N.º 13 · Periodo 2026-2
        </p>
        <p className={styles.legend}>
          El centro trabaja en dos ciclos: <strong>Semana A</strong> y{" "}
          <strong>Semana B</strong>. Identifica el tuyo y consulta las fechas de
          tutorías y evaluaciones.
        </p>
      </header>

      <div className={styles.tracks}>
        <DayTrack title="Tutorías viernes" schedule={viernes} />
        <DayTrack title="Tutorías sábado" schedule={sabado} />
      </div>
    </div>
  );
}

function DayTrack({ title, schedule }: { title: string; schedule: DaySchedule }) {
  return (
    <section className={styles.track} aria-labelledby={`${title}-heading`}>
      <h3 id={`${title}-heading`} className={styles.trackTitle}>
        {title}
      </h3>

      <WeekBlock label="Semana A" week="A" dates={schedule.semanaA} />
      <WeekBlock label="Semana B" week="B" dates={schedule.semanaB} />

      <div className={styles.evals}>
        <h4 className={styles.evalsTitle}>Evaluaciones</h4>
        <dl className={styles.evalList}>
          <div className={styles.evalItem}>
            <dt>Parcial Semana A</dt>
            <dd>{formatScheduleDay(schedule.parciales.semanaA)}</dd>
          </div>
          <div className={styles.evalItem}>
            <dt>Parcial Semana B</dt>
            <dd>{formatScheduleDay(schedule.parciales.semanaB)}</dd>
          </div>
          <div className={styles.evalItem}>
            <dt>Supletorios</dt>
            <dd>{formatScheduleDay(schedule.supletorios)}</dd>
          </div>
          <div className={styles.evalItem}>
            <dt>Habilitaciones</dt>
            <dd>{formatScheduleDay(schedule.habilitaciones)}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}

function WeekBlock({
  label,
  week,
  dates,
}: {
  label: string;
  week: WeekKey;
  dates: readonly string[];
}) {
  return (
    <div className={styles.week}>
      <div className={styles.weekHead}>
        <span className={week === "A" ? styles.badgeA : styles.badgeB}>{label}</span>
        <span className={styles.sessionCount}>{dates.length} sesiones</span>
      </div>
      <ol className={styles.sessionList}>
        {dates.map((date, index) => (
          <li key={date} className={styles.session}>
            <span className={styles.sessionNum} aria-hidden>
              {String(index + 1).padStart(2, "0")}
            </span>
            <time dateTime={date} className={styles.sessionDate}>
              {formatLongDay(date)}
            </time>
          </li>
        ))}
      </ol>
    </div>
  );
}

function formatLongDay(iso: string): string {
  const date = new Date(`${iso}T12:00:00`);
  return date.toLocaleDateString("es-CO", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}
