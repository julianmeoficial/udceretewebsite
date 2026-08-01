"use client";

import { usePathname } from "next/navigation";
import { MobileNav } from "@/components/layout/MobileNav";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

type Props = {
  children: React.ReactNode;
};

export function SiteChrome({ children }: Props) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return children;
  }

  return (
    <>
      <SiteHeader />
      <main className="main-content">{children}</main>
      <SiteFooter />
      <MobileNav />
    </>
  );
}
