import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { SITE_URL } from "@/config/urls";

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
  // Canonicalize host + protocol so Google doesn't treat http/www as separate URLs.
  // This is especially important when using Railway + external DNS where redirects may not be automatic.
  const canonical = new URL(SITE_URL);
  const canonicalHost = canonical.host;
  const canonicalProtocol = canonical.protocol.replace(":", "");

  const currentHost = request.headers.get("host") ?? request.nextUrl.host;
  const forwardedProto =
    request.headers.get("x-forwarded-proto") ?? request.nextUrl.protocol.replace(":", "");

  const shouldRedirectHost =
    !!canonicalHost &&
    !!currentHost &&
    currentHost !== canonicalHost &&
    (currentHost === `www.${canonicalHost}` || currentHost === `m.${canonicalHost}`);

  const shouldRedirectProto =
    canonicalProtocol === "https" && forwardedProto && forwardedProto !== "https";

  if (shouldRedirectHost || shouldRedirectProto) {
    const url = request.nextUrl.clone();
    url.host = canonicalHost;
    url.protocol = `${canonicalProtocol}:`;
    return NextResponse.redirect(url, 308);
  }

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
