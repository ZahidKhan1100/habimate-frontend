import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { GlassPanel } from "@/components/ui/glass-panel";

export const metadata: Metadata = {
  title: "Privacy & Trust | HabiMate",
  description:
    "How we handle your data, receipts, and trust—plain language and the legal details.",
  openGraph: {
    title: "Privacy & Trust | HabiMate",
    description: "The HabiMate promise alongside our legal commitments.",
  },
};

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <h1 className="font-heading text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
            Privacy & Trust
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 sm:text-base">
            Human-readable on the right, legal framing on the left—same
            commitments, two lenses.
          </p>

          <div className="mt-10 grid gap-6 sm:mt-12 sm:gap-8 lg:grid-cols-2">
            <GlassPanel className="p-5 sm:p-6 md:p-8">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                Legalese (summary)
              </p>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                <p>
                  HabiMate processes account and household data to provide expense
                  splitting, settlements, and in-app features. We use service
                  providers under appropriate agreements and retain data only
                  as needed to operate the service and meet legal obligations.
                </p>
                <p>
                  You may request access or deletion of personal data where
                  applicable law applies. Continued use of the service
                  constitutes acceptance of the full Terms of Service and
                  Privacy Policy (link your full legal documents when
                  published).
                </p>
                <p>
                  <strong className="text-slate-900 dark:text-white">
                    Calculations and disputes.
                  </strong>{" "}
                  HabiMate provides software tools to help roommates organize
                  expenses and suggested settlement amounts. We do not provide
                  legal, tax, accounting, or financial advice. Amounts and
                  splits are produced according to the rules described in the
                  product (including whole-cent rounding as explained on our{" "}
                  <Link
                    href="/fairness#calculations-disclaimer"
                    className="font-semibold text-[#FF6A6A] underline-offset-2 hover:underline"
                  >
                    Fairness
                  </Link>{" "}
                  page). You are responsible for verifying amounts that matter
                  to you and for resolving disagreements between household
                  members. To the fullest extent permitted by law, HabiMate and
                  its operators are not liable for losses arising from reliance
                  on in-app calculations, rounding, or household disputes; your
                  formal Terms of Service should govern when published.
                </p>
              </div>
            </GlassPanel>

            <GlassPanel className="border-[#2EC4B6]/30 p-5 sm:p-6 md:p-8">
              <p className="text-xs font-bold uppercase tracking-widest text-[#2EC4B6]">
                The HabiMate promise
              </p>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
                <p>
                  <strong className="text-[#FF6A6A]">Receipt photos.</strong>{" "}
                  When you scan a receipt, we send the image to our AI provider
                  to extract amounts and text. We design for minimal retention:
                  treat images as sensitive, avoid storing raw images longer than
                  needed for processing, and keep derived data encrypted at
                  rest where applicable.
                </p>
                <p>
                  <strong className="text-[#FF6A6A]">No cop mode.</strong> We
                  help you settle fairly—we don&apos;t sell your drama to
                  advertisers. Analytics we use are privacy-friendly where
                  possible (e.g. Plausible) and configurable.
                </p>
                <p>
                  <strong className="text-[#FF6A6A]">Questions?</strong> Contact
                  us via the support form—we&apos;ll answer in plain language.
                </p>
              </div>
            </GlassPanel>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
