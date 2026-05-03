import type { Metadata } from "next";
import { SITE_URL } from "@/config/urls";

/** Primary phrases for `<meta name="keywords">` (use sparingly; content still wins rankings). */
export const SITE_KEYWORDS = [
  "HabiMate",
  "roommate app",
  "split bills",
  "shared expenses",
  "household expenses",
  "fair expense splitting",
  "receipt scanner",
  "roommate finances",
  "settle up app",
] as const;

export function absoluteUrl(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${p}`;
}

/**
 * Per-route metadata with canonical URL and consistent social cards.
 * Use a short `title` — root layout's `title.template` appends `| HabiMate`.
 */
export function pageMetadata(opts: {
  title: string;
  description: string;
  path: string;
  /** Extra keywords merged with a subset of SITE_KEYWORDS */
  keywords?: string[];
  ogType?: "website" | "article";
}): Metadata {
  const url = absoluteUrl(opts.path);
  const keywords = opts.keywords?.length
    ? [...new Set([...opts.keywords, ...SITE_KEYWORDS.slice(0, 4)])]
    : [...SITE_KEYWORDS];

  return {
    title: opts.title,
    description: opts.description,
    keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${opts.title} | HabiMate`,
      description: opts.description,
      url,
      type: opts.ogType ?? "website",
      siteName: "HabiMate",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: `${opts.title} | HabiMate`,
      description: opts.description,
    },
  };
}
