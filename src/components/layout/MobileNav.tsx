"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, FolderOpen, Home, Newspaper, Search } from "lucide-react";
import { mobileNav } from "@/data/nav";
import styles from "./MobileNav.module.css";

const icons = {
  "/": Home,
  "/archivo": Newspaper,
  "/buscar": Search,
  "/calendario": CalendarDays,
  "/recursos": FolderOpen,
} as const;

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className={styles.nav} aria-label="Móvil">
      {mobileNav.map((item) => {
        const Icon = icons[item.href as keyof typeof icons] ?? FolderOpen;
        const active =
          item.href === "/"
            ? pathname === "/"
            : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`${styles.item} ${active ? styles.active : ""}`}
            aria-current={active ? "page" : undefined}
          >
            <Icon size={20} aria-hidden />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
