import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { FairnessCalculatorSection } from "@/components/marketing/FairnessCalculatorSection";
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
        <section className="px-4 py-12 sm:px-6 sm:py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-heading text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl md:text-5xl">
              The Fairness Engine
            </h1>
            <p className="mt-4 text-base text-slate-600 dark:text-slate-300 sm:text-lg">
              We&apos;re the referee, not the cop. Here&apos;s the &quot;why&quot;
              behind the &quot;how.&quot;
            </p>
          </div>
        </section>

        <section className="px-4 pb-10 sm:px-6 sm:pb-12">
          <div className="mx-auto max-w-3xl space-y-5 text-slate-600 dark:text-slate-300 sm:space-y-6">
            <GlassPanel className="p-5 sm:p-6">
              <h2 className="font-heading text-xl font-bold text-slate-900 dark:text-white">
                Proportional splits
              </h2>
              <p className="mt-2 text-sm leading-relaxed">
                When everyone doesn&apos;t stay the full month, we weight each
                person&apos;s share by their active days—so nobody subsidizes
                someone else&apos;s travel.
              </p>
            </GlassPanel>
            <GlassPanel className="p-5 sm:p-6">
              <h2 className="font-heading text-xl font-bold text-slate-900 dark:text-white">
                Guest fees & house rules
              </h2>
              <p className="mt-2 text-sm leading-relaxed">
                Long-term guests? One-off costs? Your house can decide what
                counts and who pays—so the rules stay transparent.
              </p>
            </GlassPanel>
            <GlassPanel className="p-5 sm:p-6">
              <h2 className="font-heading text-xl font-bold text-slate-900 dark:text-white">
                Stock buy-backs
              </h2>
              <p className="mt-2 text-sm leading-relaxed">
                When someone moves out—or the group buys shared supplies—we keep
                transfers explicit so nobody&apos;s left holding the bag.
              </p>
              <p className="mt-3 text-sm leading-relaxed">
                Example: one roommate buys a shared router. Later, when someone
                leaves, HabiMate can record a clean &quot;buy-back&quot; so ownership
                (and the money) stays fair.
              </p>
            </GlassPanel>
            <GlassPanel className="p-5 sm:p-6" id="calculations-disclaimer">
              <h2 className="font-heading text-xl font-bold text-slate-900 dark:text-white">
                Calculations, cents &amp; rounding
              </h2>
              <p className="mt-2 text-sm leading-relaxed">
                Money is stored and split in{" "}
                <strong className="text-slate-900 dark:text-white">
                  whole cents
                </strong>{" "}
                so shares add up to the total you enter. When a total does not
                divide evenly (for example €10.00 split three ways), the extra
                cent is assigned using a fixed rule: remainder cents go to
                participants in a stable order (the same order your house uses
                in the app for that split). That way nothing “vanishes,” and the
                math is consistent and auditable.
              </p>
              <p className="mt-3 text-sm leading-relaxed">
                <strong className="text-slate-900 dark:text-white">
                  Bill splits
                </strong>{" "}
                and{" "}
                <strong className="text-slate-900 dark:text-white">
                  stock buy-backs
                </strong>{" "}
                both follow this cent-safe approach. Buy-backs are recorded as
                separate transfers from your shared expense totals so
                reimbursements stay clear.
              </p>
              <p className="mt-4 rounded-xl border border-[#FF6A6A]/25 bg-[#FF6A6A]/5 p-4 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                <strong className="font-semibold text-slate-900 dark:text-white">
                  Important.
                </strong>{" "}
                HabiMate helps your household track and agree on numbers. It
                does not decide legal disputes, enforce payments, or replace
                professional advice. For tax, tenancy, deposits, or court
                matters, keep your own records and consult a qualified
                professional. See also our{" "}
                <Link
                  href="/privacy"
                  className="font-semibold text-[#FF6A6A] underline-offset-2 hover:underline"
                >
                  Privacy &amp; Trust
                </Link>{" "}
                page for how we describe limitations on liability in plain
                language.
              </p>
            </GlassPanel>
          </div>
        </section>

        <FairnessCalculatorSection />

        <section className="px-4 py-12 text-center sm:px-6 sm:py-16">
          <Link
            href="/contact"
            className="inline-flex min-h-[48px] w-full max-w-xs items-center justify-center rounded-full bg-[#FF6A6A] px-8 py-3 font-semibold text-white hover:bg-[#ef5a5a] sm:w-auto sm:max-w-none"
          >
            Get early access
          </Link>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
