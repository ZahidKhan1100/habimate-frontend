import type { Metadata } from "next";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { HeroSection } from "@/components/marketing/HeroSection";
import { FairnessCalculatorSection } from "@/components/marketing/FairnessCalculatorSection";
import { HouseWrappedPreview } from "@/components/marketing/HouseWrappedPreview";
import { SplitEngineSection } from "@/components/marketing/SplitEngineSection";
import { WallLiveMock } from "@/components/marketing/WallLiveMock";
import { PersonaSections } from "@/components/marketing/PersonaSections";
import { FeatureGrid } from "@/components/marketing/FeatureGrid";
import { VerifiedLeadSection } from "@/components/marketing/VerifiedLeadSection";
import { GlassPanel } from "@/components/ui/glass-panel";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Shared living, simplified",
  description:
    "HabiMate splits expenses fairly—AI receipt scanning, karma, and vacation-aware splits.",
};

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

        <section
          id="download"
          className="border-t border-white/10 px-4 py-16 dark:bg-slate-900/40 sm:px-6 sm:py-24"
        >
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-heading text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl">
              Get the app
            </h2>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 sm:text-base">
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
                className="inline-flex min-h-[48px] w-full items-center justify-center rounded-2xl border border-white/10 bg-white/10 py-3.5 font-semibold backdrop-blur-[15px] sm:min-h-14 sm:w-auto sm:min-w-[200px] sm:py-0"
              >
                Google Play
              </a>
            </div>
            <GlassPanel className="mx-auto mt-10 max-w-lg p-5 sm:mt-12 sm:p-6">
              <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                Join the waitlist for early access and house invites.
              </p>
              <Link
                href="/contact"
                className="mt-4 inline-flex font-bold text-[#2EC4B6] hover:underline"
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
