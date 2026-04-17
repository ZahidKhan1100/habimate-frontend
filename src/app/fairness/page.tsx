import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { FairnessInteractive } from "@/components/marketing/FairnessInteractive";
import { GlassPanel } from "@/components/ui/glass-panel";

export const metadata: Metadata = {
  title: "The Fairness Engine | HabiMate",
  description:
    "Guest fees, stock buy-backs, and proportional splits—why HabiMate is different.",
  openGraph: {
    title: "The Fairness Engine | HabiMate",
    description: "See how bills change when days stayed change—in real time.",
    type: "website",
  },
};

export default function FairnessPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="px-6 py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-heading text-4xl font-extrabold text-slate-900 dark:text-white md:text-5xl">
              The Fairness Engine
            </h1>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
              We&apos;re the referee, not the cop. Here&apos;s the &quot;why&quot;
              behind the &quot;how.&quot;
            </p>
          </div>
        </section>

        <section className="px-6 pb-12">
          <div className="mx-auto max-w-3xl space-y-6 text-slate-600 dark:text-slate-300">
            <GlassPanel className="p-6">
              <h2 className="font-heading text-xl font-bold text-slate-900 dark:text-white">
                Proportional splits
              </h2>
              <p className="mt-2 text-sm leading-relaxed">
                When everyone doesn&apos;t stay the full month, we weight each
                person&apos;s share by their active days—so nobody subsidizes
                someone else&apos;s travel.
              </p>
            </GlassPanel>
            <GlassPanel className="p-6">
              <h2 className="font-heading text-xl font-bold text-slate-900 dark:text-white">
                Guest fees & house rules
              </h2>
              <p className="mt-2 text-sm leading-relaxed">
                Long-term guests? One-off costs? Your house can decide what
                counts and who pays—so the rules stay transparent.
              </p>
            </GlassPanel>
            <GlassPanel className="p-6">
              <h2 className="font-heading text-xl font-bold text-slate-900 dark:text-white">
                Stock buy-backs
              </h2>
              <p className="mt-2 text-sm leading-relaxed">
                When someone moves out or the group buys shared supplies, we keep
                transfers clear so nobody&apos;s left holding the bag.
              </p>
            </GlassPanel>
          </div>
        </section>

        <FairnessInteractive />

        <section className="px-6 py-16 text-center">
          <Link
            href="/contact"
            className="inline-flex rounded-full bg-[#FF6A6A] px-8 py-3 font-semibold text-white hover:bg-[#ef5a5a]"
          >
            Get early access
          </Link>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
