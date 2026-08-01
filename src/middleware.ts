import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE } from "@/lib/auth/types";

const SUPERADMIN_ONLY_PREFIXES = ["/admin/usuarios", "/admin/ajustes"];

function parseSession(raw: string | undefined): { role: string; expiresAt: number } | null {
  if (!raw) return null;
  try {
    const data = JSON.parse(raw) as { role?: string; expiresAt?: number };
    if (!data.role || !data.expiresAt || data.expiresAt < Date.now()) return null;
    return { role: data.role, expiresAt: data.expiresAt };
  } catch {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const session = parseSession(request.cookies.get(SESSION_COOKIE)?.value);

  if (!session) {
    const loginUrl = new URL("/acceso", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (
    session.role !== "superadmin" &&
    SUPERADMIN_ONLY_PREFIXES.some((prefix) => pathname.startsWith(prefix))
  ) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
