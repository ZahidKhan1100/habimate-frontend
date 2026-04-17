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
          className="border-t border-white/10 px-6 py-24 dark:bg-slate-900/40"
        >
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-heading text-3xl font-extrabold text-slate-900 dark:text-white">
              Get the app
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300">
              Deep link into your house with Expo—add your Branch / universal
              link here when ready.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#"
                className="inline-flex h-14 min-w-[200px] items-center justify-center rounded-2xl bg-slate-900 px-8 font-semibold text-white dark:bg-white dark:text-slate-900"
              >
                App Store
              </a>
              <a
                href="#"
                className="inline-flex h-14 min-w-[200px] items-center justify-center rounded-2xl border border-white/10 bg-white/10 font-semibold backdrop-blur-[15px]"
              >
                Google Play
              </a>
            </div>
            <GlassPanel className="mx-auto mt-12 max-w-lg p-6">
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
