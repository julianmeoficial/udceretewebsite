"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogIn, Search } from "lucide-react";
import { mainNav } from "@/data/nav";
import styles from "./SiteHeader.module.css";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.brand} aria-label="Centro Tutorial Cereté">
          <span className={styles.brandName}>Centro Tutorial Cereté</span>
        </Link>

        <nav className={styles.nav} aria-label="Principal">
          {mainNav.map((item) => {
            const active =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navLink} ${active ? styles.navLinkActive : ""}`}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className={styles.actions}>
          <Link href="/buscar" className={styles.searchLink} aria-label="Buscar">
            <Search size={18} aria-hidden />
          </Link>
          <Link href="/acceso" className={styles.accessLink} aria-label="Ingresar">
            <LogIn size={18} aria-hidden />
            <span className={styles.accessLabel}>Ingresar</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
