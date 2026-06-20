import Link from "next/link";
import { SiteLogo } from "@/components/site/SiteLogo";
import { AppleLogoMark } from "@/components/marketing/AppleLogoMark";
import { androidPlayStoreUrl, iosAppStoreUrl } from "@/lib/storeUrls";

export function SiteFooter() {
  const appStoreHref = iosAppStoreUrl();
  const playHref = androidPlayStoreUrl();

  return (
    <footer className="border-t border-black/6 bg-[#f5f5f7] py-10 pb-[max(2.5rem,env(safe-area-inset-bottom))] dark:border-white/8 dark:bg-[#1c1c1e] sm:py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 sm:px-6 md:flex-row md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <SiteLogo decorative size={40} className="rounded-lg" />
            <p className="font-heading text-base font-bold text-[#1d1d1f] dark:text-white">HabiMate</p>
          </div>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-[#6e6e73] dark:text-[#86868b]">
            Shared living, simplified. The referee—not the cop.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <a
              href={appStoreHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="HabiMate on the App Store (opens new tab)"
              className="inline-flex items-center gap-2 rounded-full border border-black/8 bg-white px-4 py-2 text-sm font-semibold text-[#1d1d1f] transition hover:bg-[#ebebeb] dark:border-white/8 dark:bg-white/6 dark:text-white dark:hover:bg-white/10"
            >
              <AppleLogoMark className="h-4 w-4 text-[#1d1d1f] dark:text-white" />
              App Store
            </a>
            <a
              href={playHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="HabiMate on Google Play (opens new tab)"
              className="inline-flex rounded-full border border-black/8 bg-white px-4 py-2 text-sm font-semibold text-[#1d1d1f] transition hover:bg-[#ebebeb] dark:border-white/8 dark:bg-white/6 dark:text-white dark:hover:bg-white/10"
            >
              Google Play
            </a>
          </div>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm sm:gap-8">
          {[
            { href: "/whats-new", label: "What's New" },
            { href: "/fairness", label: "Fairness engine" },
            { href: "/privacy", label: "Privacy" },
            { href: "/terms", label: "Terms" },
            { href: "/delete-account", label: "Delete account" },
            { href: "/contact", label: "Contact" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-[#6e6e73] transition hover:text-[#1d1d1f] dark:text-[#86868b] dark:hover:text-white"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
      <p className="mt-10 mx-auto max-w-2xl px-6 text-center text-[11px] leading-relaxed text-[#6e6e73] dark:text-[#86868b]">
        HabiMate provides tools to organize shared expenses—not legal, tax, or
        financial advice. See{" "}
        <Link
          href="/fairness#calculations-disclaimer"
          className="font-medium text-[#1d1d1f] underline underline-offset-2 hover:text-[#FF6A6A] dark:text-white dark:hover:text-[#FF6A6A]"
        >
          how we round amounts
        </Link>
        ,{" "}
        <Link
          href="/privacy"
          className="font-medium text-[#1d1d1f] underline underline-offset-2 hover:text-[#FF6A6A] dark:text-white dark:hover:text-[#FF6A6A]"
        >
          Privacy &amp; Trust
        </Link>
        , and{" "}
        <Link
          href="/terms"
          className="font-medium text-[#1d1d1f] underline underline-offset-2 hover:text-[#FF6A6A] dark:text-white dark:hover:text-[#FF6A6A]"
        >
          Terms of Service
        </Link>
        .
      </p>
      <p className="mt-4 text-center text-xs text-[#6e6e73] dark:text-[#86868b]">
        © {new Date().getFullYear()} HabiMate. All rights reserved.
      </p>
    </footer>
  );
}
