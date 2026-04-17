"use client";

import { motion } from "framer-motion";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Sparkles, PiggyBank, Store } from "lucide-react";

const stats = [
  {
    icon: Sparkles,
    label: "Most active chore-doer",
    value: "Jordan",
    sub: "12 tasks · streak 5 weeks",
    gradient: "from-[#FF6A6A]/30 to-transparent",
  },
  {
    icon: PiggyBank,
    label: "Total house savings",
    value: "$847",
    sub: "vs. last month’s split guesswork",
    gradient: "from-[#2EC4B6]/25 to-transparent",
  },
  {
    icon: Store,
    label: "Most scanned merchant",
    value: "Trader Joe’s",
    sub: "18 receipts · AI line-items",
    gradient: "from-violet-500/20 to-transparent",
  },
];

export function HouseWrappedPreview() {
  return (
    <section className="border-b border-white/10 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-[#FF6A6A]">
          House Wrapped
        </p>
        <h2 className="font-heading mt-3 text-center text-3xl font-extrabold text-slate-900 dark:text-white md:text-4xl">
          Your month, in one glance
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-slate-600 dark:text-slate-300">
          Not another boring spreadsheet—a social diary for your home. Preview
          what a monthly wrap could look like.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.45 }}
            >
              <GlassPanel className="relative h-full overflow-hidden p-6">
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${s.gradient}`}
                />
                <s.icon className="relative h-8 w-8 text-[#2EC4B6]" />
                <p className="relative mt-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {s.label}
                </p>
                <p className="font-heading relative mt-2 text-2xl font-extrabold text-slate-900 dark:text-white">
                  {s.value}
                </p>
                <p className="relative mt-2 text-sm text-slate-600 dark:text-slate-400">
                  {s.sub}
                </p>
              </GlassPanel>
            </motion.div>
          ))}
        </div>
        <p className="mt-10 text-center text-sm text-slate-500">
          Illustrative preview — real stats sync from your house in the app.
        </p>
      </div>
    </section>
  );
}
