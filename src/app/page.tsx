import Link from "next/link";
import {
  ArrowRightIcon,
  BookOpenIcon,
  CalendarDaysIcon,
  FolderIcon,
  HeartIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { FeaturedHero } from "@/components/blog/FeaturedHero";
import { Newsletter } from "@/components/home/Newsletter";
import { FadeInItem } from "@/components/ui/FadeInItem";
import { calendarEvents } from "@/data/calendar";
import { quickLinks } from "@/data/nav";
import { formatShortDate } from "@/lib/format";
import { getAllPosts, getFeaturedPost } from "@/lib/posts";
import styles from "./page.module.css";

const quickIcons = {
  calendar: CalendarDaysIcon,
  ai: SparklesIcon,
  citation: BookOpenIcon,
  folder: FolderIcon,
  heart: HeartIcon,
} as const;

function formatEventDate(iso: string): string {
  const date = new Date(`${iso}T12:00:00`);
  const day = date.getDate();
  const month = date.toLocaleDateString("es-CO", { month: "short" }).replace(".", "");
  return `${day} ${month}`;
}

export default async function HomePage() {
  const featured = (await getFeaturedPost())!;
  const latest = (await getAllPosts())
    .filter((post) => post.slug !== featured.slug)
    .slice(0, 6);
  const upcoming = [...calendarEvents]
    .sort((a, b) => a.date.localeCompare(b.date))
    .filter((event) => event.date >= "2026-08-01")
    .slice(0, 4);

  return (
    <>
      <FeaturedHero post={featured} />

      <section className={styles.section}>
        <div className="container">
          <header className={styles.sectionHead}>
            <div>
              <p className={styles.kicker}>Herramientas</p>
              <h2 className={styles.title}>Acceso rápido</h2>
            </div>
          </header>
          <div className={styles.quickStrip}>
            {quickLinks.map((item) => {
              const Icon = quickIcons[item.icon as keyof typeof quickIcons] ?? FolderIcon;
              return (
                <Link key={item.href} href={item.href} className={styles.quickCell}>
                  <Icon className={styles.quickIcon} aria-hidden />
                  <span className={styles.quickLabel}>{item.label}</span>
                  <span className={styles.quickDesc}>{item.description}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <header className={styles.sectionHead}>
            <div>
              <p className={styles.kicker}>Publicaciones</p>
              <h2 className={styles.title}>Lo más reciente</h2>
            </div>
            <Link href="/archivo" className={styles.link}>
              Ver todo
              <ArrowRightIcon className={styles.linkIcon} aria-hidden />
            </Link>
          </header>
          <div className={styles.grid}>
            {latest.map((post, index) => (
              <FadeInItem key={post.slug} index={index}>
                <ArticleCard post={post} />
              </FadeInItem>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <header className={styles.sectionHead}>
            <div>
              <p className={styles.kicker}>Agenda</p>
              <h2 className={styles.title}>Próximos eventos</h2>
            </div>
            <Link href="/calendario" className={styles.link}>
              Calendario
              <ArrowRightIcon className={styles.linkIcon} aria-hidden />
            </Link>
          </header>
          <div className={styles.events}>
            {upcoming.map((event) => (
              <article key={event.id} className={styles.event}>
                <div className={styles.eventDate}>{formatEventDate(event.date)}</div>
                <div>
                  <h3 className={styles.eventTitle}>{event.title}</h3>
                  <p className={styles.eventDesc}>
                    {formatShortDate(event.date)}
                    {event.location ? ` · ${event.location}` : ""}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  );
}
