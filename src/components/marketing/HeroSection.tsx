import Link from "next/link";
import { SiteLogo } from "@/components/site/SiteLogo";
import { AppleLogoMark } from "@/components/marketing/AppleLogoMark";
import { androidPlayStoreUrl, iosAppStoreUrl } from "@/lib/storeUrls";

export function HeroSection() {
  const appStoreHref = iosAppStoreUrl();
  const playHref = androidPlayStoreUrl();

  return (
    <section className="relative overflow-hidden px-4 pb-24 pt-20 sm:px-6 sm:pb-36 sm:pt-28 md:pt-36">
      {/* Barely-there brand blush — Apple-style zero-distraction background */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 70% 40% at 50% -5%, rgba(255,106,106,0.07) 0%, transparent 65%)",
        }}
      />
      <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-2 lg:items-center lg:gap-20">
        {/* Copy */}
        <div className="hm-hero-rise">
          <p className="mb-5 text-sm font-semibold uppercase tracking-widest text-[#FF6A6A]">
            Home &amp; Roommates
          </p>
          <h1 className="font-heading text-[2.75rem] font-extrabold leading-[1.05] tracking-tight text-[#1d1d1f] dark:text-white sm:text-6xl md:text-7xl">
            Shared Living,{" "}
            <span className="text-[#FF6A6A]">Simplified.</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-[#6e6e73] dark:text-[#86868b] sm:mt-8 sm:text-xl">
            Because you shouldn&apos;t pay for your roommate&apos;s 20-minute
            shower. Split bills fairly, stay transparent, and settle up without
            the spreadsheet chaos.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <a
              href={appStoreHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-full bg-[#FF6A6A] px-8 text-sm font-semibold text-white transition hover:bg-[#f05a5a] active:scale-[0.98]"
            >
              <AppleLogoMark className="h-5 w-5 shrink-0 text-white" />
              App Store
            </a>
            <a
              href={playHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-black/10 px-8 text-sm font-semibold text-[#1d1d1f] transition hover:bg-[#f5f5f7] active:scale-[0.98] dark:border-white/10 dark:text-white dark:hover:bg-white/5"
            >
              Google Play
            </a>
          </div>
          <div className="mt-7">
            <Link
              href="/contact"
              className="text-sm font-medium text-[#6e6e73] transition hover:text-[#1d1d1f] dark:text-[#86868b] dark:hover:text-white"
            >
              Join the community waitlist →
            </Link>
          </div>
        </div>

        {/* Phone mockup */}
        <div className="relative hm-hero-zoom">
          <div className="absolute -right-6 -top-6 h-48 w-48 rounded-full bg-[#FF6A6A]/8 blur-3xl" />
          <div className="relative rounded-2xl border border-black/6 bg-white p-6 shadow-[0_4px_40px_rgba(0,0,0,0.08)] dark:border-white/8 dark:bg-[#1c1c1e] dark:shadow-none md:p-8">
            <div className="rounded-xl bg-[#1d1d1f] p-4 shadow-2xl dark:bg-[#2c2c2e]">
              <div className="aspect-[9/16] max-h-[320px] rounded-lg bg-[#111111] p-4">
                <div className="flex items-center justify-between text-xs text-white/60">
                  <span>9:41</span>
                  <span className="flex items-center gap-1.5 font-medium text-white/80">
                    <SiteLogo decorative size={18} className="rounded-md" />
                    HabiMate
                  </span>
                </div>
                <div className="mt-6 space-y-3">
                  <FloatingReceiptCard />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FloatingReceiptCard() {
  return (
    <div className="hm-hero-card rounded-xl border border-white/8 bg-white/7 p-3">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-teal-300">
        Receipt scanned
      </p>
      <p className="mt-1 text-sm font-bold text-white">Whole Foods</p>
      <p className="text-xs text-white/50">AI · Gemini 1.5 Flash</p>
      <p className="mt-2 text-lg font-black text-[#FF6A6A]">$47.82</p>
    </div>
  );
}
