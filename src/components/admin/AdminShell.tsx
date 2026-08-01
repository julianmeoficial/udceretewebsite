"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  CalendarDaysIcon,
  Cog6ToothIcon,
  DocumentTextIcon,
  FolderIcon,
  HeartIcon,
  HomeIcon,
  UsersIcon,
  ArrowTopRightOnSquareIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import type { SessionUser } from "@/lib/auth/types";
import { canAccessSection, roleLabel } from "@/lib/auth/permissions";
import { signOut } from "@/lib/auth/actions";
import { AdminNotice } from "./AdminNotice";
import styles from "./AdminShell.module.css";

gsap.registerPlugin(useGSAP);

type NavItem = {
  href: string;
  label: string;
  section: "dashboard" | "articulos" | "recursos" | "calendario" | "bienestar" | "usuarios" | "ajustes";
  exact?: boolean;
  Icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
};

const NAV_CONTENT: NavItem[] = [
  { href: "/admin", label: "Resumen", section: "dashboard", exact: true, Icon: HomeIcon },
  { href: "/admin/articulos", label: "Artículos", section: "articulos", Icon: DocumentTextIcon },
  { href: "/admin/recursos", label: "Recursos", section: "recursos", Icon: FolderIcon },
  { href: "/admin/calendario", label: "Calendario", section: "calendario", Icon: CalendarDaysIcon },
  { href: "/admin/bienestar", label: "Bienestar", section: "bienestar", Icon: HeartIcon },
];

const NAV_SYSTEM: NavItem[] = [
  { href: "/admin/usuarios", label: "Usuarios", section: "usuarios", Icon: UsersIcon },
  { href: "/admin/ajustes", label: "Ajustes", section: "ajustes", Icon: Cog6ToothIcon },
];

type Props = {
  user: SessionUser;
  children: React.ReactNode;
};

export function AdminShell({ user, children }: Props) {
  const pathname = usePathname();
  const [navOpen, setNavOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const contentNav = NAV_CONTENT.filter((item) => canAccessSection(user.role, item.section));
  const systemNav = NAV_SYSTEM.filter((item) => canAccessSection(user.role, item.section));
  const isEditor = pathname.includes("/editar") || pathname.includes("/nuevo");

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce || !contentRef.current) return;
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" },
      );
    },
    { scope: contentRef, dependencies: [pathname] },
  );

  function renderNavItems(items: NavItem[]) {
    return items.map((item) => {
      const active = item.exact
        ? pathname === item.href
        : pathname.startsWith(item.href);
      const Icon = item.Icon;
      return (
        <li key={item.href}>
          <Link
            href={item.href}
            className={active ? styles.navLinkActive : styles.navLink}
            onClick={() => setNavOpen(false)}
            aria-current={active ? "page" : undefined}
          >
            <Icon className={styles.navIcon} aria-hidden />
            <span>{item.label}</span>
          </Link>
        </li>
      );
    });
  }

  return (
    <div className={styles.shell}>
      <header className={styles.topbar}>
        <div className={styles.topbarInner}>
          <div className={styles.brand}>
            <button
              type="button"
              className={styles.menuBtn}
              onClick={() => setNavOpen((open) => !open)}
              aria-expanded={navOpen}
              aria-controls="admin-nav"
              aria-label={navOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {navOpen ? (
                <XMarkIcon width={20} height={20} aria-hidden />
              ) : (
                <Bars3Icon width={20} height={20} aria-hidden />
              )}
            </button>
            <Link href="/admin" className={styles.brandLink}>
              <span className={styles.brandKicker}>Panel editorial</span>
              <span className={styles.brandTitle}>UDEC Cereté</span>
            </Link>
          </div>
          <div className={styles.userMeta}>
            <div className={styles.userText}>
              <span className={styles.userRole}>{roleLabel(user.role)}</span>
              <span className={styles.userEmail}>{user.email}</span>
            </div>
            <form action={signOut}>
              <button type="submit" className={styles.signOut}>
                Cerrar sesión
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className={styles.body}>
        {navOpen ? (
          <button
            type="button"
            className={styles.backdrop}
            aria-label="Cerrar menú"
            onClick={() => setNavOpen(false)}
          />
        ) : null}

        <aside
          id="admin-nav"
          className={`${styles.nav} ${navOpen ? styles.navOpen : ""}`}
          aria-label="Administración"
        >
          <div className={styles.navGroup}>
            <p className={styles.navGroupLabel}>Contenido</p>
            <ul className={styles.navList}>{renderNavItems(contentNav)}</ul>
          </div>

          {systemNav.length > 0 ? (
            <div className={styles.navGroup}>
              <p className={styles.navGroupLabel}>Sistema</p>
              <ul className={styles.navList}>{renderNavItems(systemNav)}</ul>
            </div>
          ) : null}

          <div className={styles.navFooter}>
            <Link href="/" className={styles.publicLink}>
              <ArrowTopRightOnSquareIcon width={16} height={16} aria-hidden />
              Ver sitio público
            </Link>
          </div>
        </aside>

        <main className={`${styles.main} ${isEditor ? styles.mainWide : ""}`}>
          <div className={`${styles.mainInner} ${isEditor ? styles.mainInnerWide : ""}`}>
            <AdminNotice />
            <div ref={contentRef}>{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
}
