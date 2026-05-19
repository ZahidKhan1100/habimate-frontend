/**
 * Central place for public URLs (env-driven).
 * Set values in `.env.local` / Vercel — see `.env.example`.
 */

const DEFAULT_SITE = "https://habimate.com";

/** Canonical marketing site URL (Open Graph, metadata). No trailing slash. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || DEFAULT_SITE;

/**
 * Laravel API base path, e.g. `https://habimate.com/api/v1`.
 * No trailing slash. Empty if unset (contact form will show a config error).
 */
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ?? "";

/** Build a full API URL: `apiUrl("leads")` → `{API_BASE_URL}/leads` */
export function apiUrl(path: string): string {
  const segment = path.replace(/^\//, "");
  if (!API_BASE_URL) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not configured");
  }
  return `${API_BASE_URL}/${segment}`;
}

/** Must match Expo `scheme` in houseexpenses `app.json`. */
export const PASSWORD_RESET_IOS_SCHEME =
  process.env.NEXT_PUBLIC_PASSWORD_RESET_IOS_SCHEME?.trim() ||
  "com.ihabimate.habimate";

export const PASSWORD_RESET_ANDROID_PACKAGE =
  process.env.NEXT_PUBLIC_PASSWORD_RESET_ANDROID_PACKAGE?.trim() ||
  "com.ihabimate.habimate";
