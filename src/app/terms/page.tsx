import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { GlassPanel } from "@/components/ui/glass-panel";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Service",
  description:
    "HabiMate Terms of Service for the roommate expense app and habimate.com website.",
  path: "/terms",
  keywords: ["terms of service", "user agreement"],
});

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <h1 className="font-heading text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
            Terms of Service
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 sm:text-base">
            These terms apply to the HabiMate app and website. Replace this
            placeholder with counsel-approved text when ready; the route stays
            stable at <strong className="text-slate-900 dark:text-white">/terms</strong>{" "}
            so the mobile app and footer links keep working.
          </p>

          <div className="mt-10 grid gap-6 sm:mt-12 sm:gap-8 lg:grid-cols-2">
            <GlassPanel className="p-5 sm:p-6 md:p-8">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                Summary
              </p>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                <p>
                  By using HabiMate you agree to follow these terms and our{" "}
                  <Link
                    href="/privacy"
                    className="font-semibold text-[#2EC4B6] underline-offset-2 hover:underline"
                  >
                    Privacy &amp; Trust
                  </Link>{" "}
                  materials. The service is provided &quot;as is&quot; as
                  software to help households organize expenses—not as legal,
                  tax, or financial advice.
                </p>
                <p>
                  You are responsible for the accuracy of amounts you enter and
                  for agreements between members of your household. See our{" "}
                  <Link
                    href="/fairness#calculations-disclaimer"
                    className="font-semibold text-[#FF6A6A] underline-offset-2 hover:underline"
                  >
                    Fairness
                  </Link>{" "}
                  page for how rounding and splits work.
                </p>
              </div>
            </GlassPanel>

            <GlassPanel className="border-[#FF6A6A]/25 p-5 sm:p-6 md:p-8">
              <p className="text-xs font-bold uppercase tracking-widest text-[#FF6A6A]">
                Full legal text
              </p>
              <p className="mt-4 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
                Publish your binding Terms of Service in this panel (or swap in
                a hosted document). Keeping the canonical URL on{" "}
                <strong className="text-slate-900 dark:text-white">
                  habimate.com/terms
                </strong>{" "}
                lets the app open it with{" "}
                <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs dark:bg-slate-800">
                  Linking.openURL
                </code>{" "}
                without a new app store build when wording changes.
              </p>
            </GlassPanel>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
