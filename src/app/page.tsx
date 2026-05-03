import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import { HeroSection } from "@/components/marketing/HeroSection";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { FeatureGrid } from "@/components/marketing/FeatureGrid";
import { GlassPanel } from "@/components/ui/glass-panel";
import { pageMetadata } from "@/lib/seo";

const FairnessCalculatorSection = dynamic(
  () =>
    import("@/components/marketing/FairnessCalculatorSection").then(
      (mod) => mod.FairnessCalculatorSection,
    ),
  {
    loading: () => <MarketingSectionFallback label="Fairness simulator" />,
  },
);

const HouseWrappedPreview = dynamic(
  () =>
    import("@/components/marketing/HouseWrappedPreview").then(
      (mod) => mod.HouseWrappedPreview,
    ),
  {
    loading: () => <MarketingSectionFallback label="House Wrapped preview" />,
  },
);

const SplitEngineSection = dynamic(
  () =>
    import("@/components/marketing/SplitEngineSection").then(
      (mod) => mod.SplitEngineSection,
    ),
  {
    loading: () => <MarketingSectionFallback label="Split engine" />,
  },
);

const WallLiveMock = dynamic(
  () =>
    import("@/components/marketing/WallLiveMock").then((mod) => mod.WallLiveMock),
  {
    loading: () => <MarketingSectionFallback label="House Wall preview" />,
  },
);

const PersonaSections = dynamic(
  () =>
    import("@/components/marketing/PersonaSections").then(
      (mod) => mod.PersonaSections,
    ),
  {
    loading: () => <MarketingSectionFallback label="Who uses HabiMate" />,
  },
);

const VerifiedLeadSection = dynamic(
  () =>
    import("@/components/marketing/VerifiedLeadSection").then(
      (mod) => mod.VerifiedLeadSection,
    ),
  {
    loading: () => <MarketingSectionFallback label="Downloads form" />,
  },
);

function MarketingSectionFallback({ label }: { label: string }) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={`Loading ${label}`}
      aria-busy
      className="mx-auto mb-px flex min-h-[200px] w-full max-w-6xl animate-pulse flex-col items-center justify-center rounded-2xl border border-slate-200/60 bg-slate-50/90 dark:border-white/5 dark:bg-slate-900/50"
    />
  );
}

export const metadata: Metadata = pageMetadata({
  title: "Shared living, simplified",
  description:
    "HabiMate splits roommate and household expenses fairly—AI receipt scanning, karma, vacation-aware day splits, and a shared house wall. Free expense splitter app.",
  path: "/",
  keywords: [
    "roommate bill splitter",
    "household expense tracker",
    "split rent and utilities",
  ],
});

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <FairnessCalculatorSection />
        <HouseWrappedPreview />
        <SplitEngineSection />
        <WallLiveMock />
        <PersonaSections />
        <FeatureGrid />
        <VerifiedLeadSection />

        <section className="border-t border-white/10 bg-slate-950/40 px-4 py-8 sm:px-6">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-2 text-center sm:flex-row sm:gap-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-teal-900 dark:text-teal-300">
              Privacy &amp; compliance
            </p>
            <p className="text-sm text-slate-800 dark:text-slate-300">
              <Link
                href="/privacy"
                className="font-semibold text-teal-900 underline underline-offset-2 hover:text-teal-950 dark:text-teal-300 dark:hover:text-teal-200"
              >
                Privacy &amp; Trust
              </Link>
              <span className="mx-2 text-slate-500 dark:text-slate-400" aria-hidden>
                ·
              </span>
              <Link
                href="/terms"
                className="font-semibold text-teal-900 underline underline-offset-2 hover:text-teal-950 dark:text-teal-300 dark:hover:text-teal-200"
              >
                Terms of Service
              </Link>
            </p>
          </div>
        </section>

        <section className="border-t border-white/10 px-4 py-16 dark:bg-slate-900/40 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-widest text-teal-800 dark:text-teal-400">
                What’s new
              </p>
              <h2 className="mt-3 font-heading text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl">
                Offline expenses, notifications, and the House Wall
              </h2>
              <p className="mt-3 text-sm text-slate-700 dark:text-slate-300 sm:text-base">
                A quick roundup of the latest improvements.
              </p>
            </div>

            <div className="mt-10 grid gap-6 sm:mt-12 sm:gap-8 lg:grid-cols-3">
              <GlassPanel className="p-5 sm:p-6">
                <h3 className="font-heading text-lg font-bold text-slate-900 dark:text-white">
                  Add expenses without internet
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                  Create bills offline and we’ll sync them automatically when you’re back online.
                </p>
              </GlassPanel>
              <GlassPanel className="p-5 sm:p-6">
                <h3 className="font-heading text-lg font-bold text-slate-900 dark:text-white">
                  Notifications
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                  Get alerts for important house activity so you don’t miss updates.
                </p>
              </GlassPanel>
              <GlassPanel className="p-5 sm:p-6">
                <h3 className="font-heading text-lg font-bold text-slate-900 dark:text-white">
                  House Wall
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                  Post updates and photos, run quick polls, and react — all in one shared feed.
                </p>
              </GlassPanel>
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Want the full release notes?
              </p>
              <Link
                href="/whats-new"
                className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-50 dark:border-white/20 dark:bg-white/10 dark:text-white dark:hover:bg-white/15"
              >
                View “What’s New” →
              </Link>
            </div>
          </div>
        </section>

        <section
          id="download"
          className="border-t border-white/10 px-4 py-16 dark:bg-slate-900/40 sm:px-6 sm:py-24"
        >
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-heading text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl">
              Get the app
            </h2>
            <p className="mt-3 text-sm text-slate-700 dark:text-slate-300 sm:text-base">
              Deep link into your house with Expo—add your Branch / universal
              link here when ready.
            </p>
            <div className="mt-8 flex w-full max-w-md flex-col items-stretch justify-center gap-3 sm:mx-auto sm:mt-10 sm:max-w-none sm:flex-row sm:items-center sm:gap-4">
              <a
                href="#"
                className="inline-flex min-h-[48px] w-full items-center justify-center rounded-2xl bg-slate-900 px-8 py-3.5 font-semibold text-white dark:bg-white dark:text-slate-900 sm:min-h-14 sm:w-auto sm:min-w-[200px] sm:py-0"
              >
                App Store
              </a>
              <a
                href="#"
                className="inline-flex min-h-[48px] w-full items-center justify-center rounded-2xl border border-slate-300 bg-white py-3.5 font-semibold text-slate-900 hover:bg-slate-50 dark:border-white/15 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800 sm:min-h-14 sm:w-auto sm:min-w-[200px] sm:py-0"
              >
                Google Play
              </a>
            </div>
            <GlassPanel className="mx-auto mt-10 max-w-lg p-5 sm:mt-12 sm:p-6">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Join the waitlist for early access and house invites.
              </p>
              <Link
                href="/contact"
                className="mt-4 inline-flex font-bold text-teal-800 underline underline-offset-2 hover:text-teal-900 dark:text-teal-300 dark:hover:text-teal-200"
              >
                Contact us →
              </Link>
            </GlassPanel>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
