import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const CACHE_HTML_PATHS = new Set([
  "/",
  "/contact",
  "/fairness",
  "/join",
  "/privacy",
  "/terms",
  "/whats-new",
]);

/**
 * Lets CDNs edge-cache prerendered HTML (`s-maxage`) while browsers revalidate (`max-age=0`).
 */
export function middleware(request: NextRequest) {
  if (!CACHE_HTML_PATHS.has(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const res = NextResponse.next();
  res.headers.set(
    "Cache-Control",
    "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
  );
  return res;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icon.png|apple-icon.png|robots.txt|sitemap.xml|manifest.webmanifest).*)",
  ],
};
