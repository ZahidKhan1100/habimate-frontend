"use client";

import { GlassPanel } from "@/components/ui/glass-panel";

const feed = [
  { text: "Alex just settled the Electric Bill", emoji: "⚡️" },
  { text: "Jordan scanned a grocery receipt", emoji: "🧾" },
  { text: "Sam earned +10 Karma for cleaning the fridge", emoji: "🧊" },
  { text: "House savings goal hit 82% this week", emoji: "📈" },
  { text: "New poll: pizza night — Friday?", emoji: "🍕" },
  { text: "Mia marked rent as paid (verified)", emoji: "✅" },
];

export function WallLiveMock() {
  const loop = [...feed, ...feed];

  return (
    <section className="border-b border-white/10 px-4 py-16 dark:bg-slate-900/20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-[#2EC4B6]">
          The Wall
        </p>
        <h2 className="font-heading mt-3 text-center text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl md:text-4xl">
          The vibe of your house, live
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-slate-600 dark:text-slate-300">
          No long explainer video—just the pulse of what happens when everyone
          stays in sync.
        </p>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <GlassPanel className="relative h-[320px] overflow-hidden p-0 md:h-[380px]">
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-16 bg-gradient-to-b from-[var(--background)] to-transparent dark:from-[#0b1220]" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-16 bg-gradient-to-t from-[var(--background)] to-transparent dark:from-[#0b1220]" />
            <div className="animate-wall-marquee flex flex-col gap-3 px-4 py-4">
              {loop.map((item, i) => (
                <div
                  key={`${item.text}-${i}`}
                  className="rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-medium text-slate-800 shadow-sm backdrop-blur-[15px] dark:text-slate-100"
                >
                  <span className="mr-2">{item.emoji}</span>
                  {item.text}
                </div>
              ))}
            </div>
          </GlassPanel>

          <div className="flex flex-col justify-center space-y-4">
            <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">
              Settlements, receipts, and karma land in one place—so your group
              chat stops being a receipt graveyard.
            </p>
            <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
              <li>• Real-time activity without the noise</li>
              <li>• Proof of payment when it matters</li>
              <li>• Enough personality to feel like home</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
