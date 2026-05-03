import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { GlassPanel } from "@/components/ui/glass-panel";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "What’s New",
  description:
    "Latest HabiMate updates: offline expenses, push notifications, House Wall, and fair split improvements.",
  path: "/whats-new",
});

const items = [
  {
    title: "Add expenses even without internet",
    body: "No signal? No problem. Create bills offline and HabiMate will sync them automatically when you’re back online.",
  },
  {
    title: "Notifications",
    body: "Get alerts for important house activity so you don’t miss updates (settlements, wall activity, and more).",
  },
  {
    title: "House Wall",
    body: "A shared feed for your house: post updates and photos, run quick polls, and react in real time.",
  },
];

export default function WhatsNewPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-widest text-[#2EC4B6]">
              Release notes
            </p>
            <h1 className="mt-3 font-heading text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
              What’s new in HabiMate
            </h1>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 sm:text-base">
              A quick roundup of the newest features your house can use right now.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:mt-12 sm:gap-8 lg:grid-cols-3">
            {items.map((it) => (
              <GlassPanel key={it.title} className="p-5 sm:p-6">
                <h2 className="font-heading text-lg font-bold text-slate-900 dark:text-white">
                  {it.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {it.body}
                </p>
              </GlassPanel>
            ))}
          </div>

          <GlassPanel className="mt-10 p-5 sm:mt-12 sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-heading text-lg font-bold text-slate-900 dark:text-white">
                  Want early access to updates?
                </p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                  Tell us what you want next — we read every message.
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-[#FF6A6A] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#FF6A6A]/25 hover:bg-[#ef5a5a]"
              >
                Contact support
              </Link>
            </div>
          </GlassPanel>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

