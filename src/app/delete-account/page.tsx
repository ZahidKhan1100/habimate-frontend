import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { GlassPanel } from "@/components/ui/glass-panel";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Delete your account",
  description:
    "How to request deletion of your HabiMate account and what happens to your data.",
  path: "/delete-account",
  keywords: ["delete account", "data deletion", "HabiMate privacy"],
});

export default function DeleteAccountPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <h1 className="font-heading text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
            Delete your HabiMate account
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 sm:text-base">
            This page explains how to close your account for{" "}
            <strong className="text-slate-900 dark:text-white">HabiMate</strong>{" "}
            (the app listed on Google Play and the App Store under that name).
          </p>

          <div className="mt-10 grid gap-6 sm:mt-12 sm:gap-8 lg:grid-cols-2">
            <GlassPanel className="p-5 sm:p-6 md:p-8">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                How to request deletion
              </p>
              <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                <li>
                  Open the <strong className="text-slate-900 dark:text-white">HabiMate</strong>{" "}
                  app on your phone and sign in.
                </li>
                <li>
                  Go to <strong className="text-slate-900 dark:text-white">Profile</strong>{" "}
                  (bottom tab).
                </li>
                <li>
                  Scroll to <strong className="text-slate-900 dark:text-white">Delete Account</strong>
                  , confirm, and complete the flow. This sends a deletion request to our servers.
                </li>
              </ol>
              <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                If you cannot use the app (e.g. lost access), contact us via our{" "}
                <Link
                  href="/contact"
                  className="font-semibold text-[#2EC4B6] underline-offset-2 hover:underline"
                >
                  contact form
                </Link>{" "}
                from the email associated with your account. Include &quot;Account deletion&quot;
                in your message so we can verify and process your request.
              </p>
            </GlassPanel>

            <GlassPanel className="border-[#2EC4B6]/30 p-5 sm:p-6 md:p-8">
              <p className="text-xs font-bold uppercase tracking-widest text-[#2EC4B6]">
                Data removed or retained
              </p>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
                <p>
                  <strong className="text-[#FF6A6A]">Generally deleted.</strong> After you
                  delete your account, we remove or anonymize personal data tied to your user
                  profile and access credentials so you cannot sign in again.
                </p>
                <p>
                  <strong className="text-[#FF6A6A]">Household content.</strong> Content you
                  contributed to a household (for example expenses or wall posts) may be
                  retained in aggregate or attributed to the household where needed so other
                  members&apos; records stay consistent, or may be removed depending on how the
                  household is configured. If something must remain for legitimate interests of
                  other members, we minimize what is kept.
                </p>
                <p>
                  <strong className="text-[#FF6A6A]">Backups &amp; legal.</strong> Residual
                  copies may persist for a limited time in encrypted backups and are overwritten
                  on a rolling schedule. We may retain certain records where the law requires
                  (for example fraud prevention or tax), only as long as necessary.
                </p>
                <p>
                  For broader privacy practices, see our{" "}
                  <Link
                    href="/privacy"
                    className="font-semibold text-[#2EC4B6] underline-offset-2 hover:underline"
                  >
                    Privacy &amp; Trust
                  </Link>{" "}
                  page.
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
