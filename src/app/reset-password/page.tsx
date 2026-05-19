import type { Metadata } from "next";
import { Suspense } from "react";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { pageMetadata } from "@/lib/seo";
import { ResetPasswordClient } from "./ResetPasswordClient";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Reset password",
    description:
      "Open the HabiMate app to set a new password, or finish reset in your browser.",
    path: "/reset-password",
  }),
  robots: { index: false, follow: false },
};

function ResetFallback() {
  return (
    <div className="h-40 animate-pulse rounded-2xl border border-white/5 bg-slate-200/20 dark:bg-slate-800/40" />
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 px-4 py-12 sm:px-6 sm:py-16">
        <Suspense fallback={<ResetFallback />}>
          <ResetPasswordClient />
        </Suspense>
      </main>
      <SiteFooter />
    </div>
  );
}
