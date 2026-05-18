/**
 * Marketing site outbound links — set env in production/Vercel.
 *
 * IOS: App Store Connect → App → Share (copy link). Prefer the full apps.apple.com URL (includes numeric id).
 * ANDROID: Play Console → Growth → Store presence → Copy link / use details?id=PACKAGE
 */

const PKG = "com.ihabimate.habimate";

/** Canonical HabiMate listing (override with NEXT_PUBLIC_IOS_APP_STORE_URL if needed). */
const IOS_APP_STORE_DEFAULT =
  "https://apps.apple.com/pk/app/habimate/id6767857401";

export function iosAppStoreUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_IOS_APP_STORE_URL?.trim();
  if (fromEnv) return fromEnv;
  return IOS_APP_STORE_DEFAULT;
}

export function androidPlayStoreUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_ANDROID_PLAY_STORE_URL?.trim();
  if (fromEnv) return fromEnv;
  return `https://play.google.com/store/apps/details?id=${PKG}`;
}
