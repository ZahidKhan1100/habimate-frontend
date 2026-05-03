import type { Metadata } from "next";
import { Suspense } from "react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { pageMetadata } from "@/lib/seo";
import { JoinClient } from "./JoinClient";

export const metadata: Metadata = pageMetadata({
  title: "Join a house",
  description:
    "You were invited to a house on HabiMate. Install the app, then use your house code to join your roommates.",
  path: "/join",
});

function JoinFallback() {
  return (
    <div className="h-32 animate-pulse rounded-2xl border border-white/5 bg-slate-200/20 dark:bg-slate-800/40" />
  );
}

export default function JoinPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-xl">
          <h1 className="font-heading text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
            You&apos;re invited
          </h1>
          <p className="mt-3 text-slate-600 dark:text-slate-300">
            A roommate shared a HabiMate house invite with you. Use the code below after you
            install the app.
          </p>
          <div className="mt-10">
            <Suspense fallback={<JoinFallback />}>
              <JoinClient />
            </Suspense>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
