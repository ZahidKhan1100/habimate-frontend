"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { GlassPanel } from "@/components/ui/glass-panel";

const PERIOD_DAYS = 30;
const TOTAL = 300;

type Mate = { name: string; days: number; color: string };

const defaultMates: Mate[] = [
  { name: "Alex", days: 30, color: "#FF6A6A" },
  { name: "Jordan", days: 18, color: "#2EC4B6" },
  { name: "Sam", days: 24, color: "#a78bfa" },
];

export function SplitEngineSection() {
  const [mates, setMates] = useState<Mate[]>(defaultMates);

  const shares = useMemo(() => {
    const weights = mates.map((m) => Math.max(0, Math.min(PERIOD_DAYS, m.days)));
    const sum = weights.reduce((a, b) => a + b, 0) || 1;
    return mates.map((m, i) => ({
      ...m,
      weight: weights[i],
      amount: (TOTAL * weights[i]) / sum,
    }));
  }, [mates]);

  return (
    <section className="border-b border-white/10 px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-[#2EC4B6]">
          The Split Engine
        </p>
        <h2 className="font-heading mt-3 text-center text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl md:text-4xl">
          How a ${TOTAL} bill splits when life isn&apos;t equal
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-slate-600 dark:text-slate-300">
          Drag &quot;days in the house&quot; for each roommate. The math updates
          instantly—fair shares, no drama.
        </p>

        <GlassPanel className="mt-10 p-4 sm:mt-12 sm:p-6 md:p-10">
          <div className="grid min-w-0 gap-8 md:grid-cols-2">
            <div className="space-y-6">
              {mates.map((mate, idx) => (
                <div key={mate.name}>
                  <div className="mb-2 flex justify-between text-sm font-medium">
                    <span style={{ color: mate.color }}>{mate.name}</span>
                    <span className="text-slate-600 dark:text-slate-400">
                      {mate.days} / {PERIOD_DAYS} days
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={PERIOD_DAYS}
                    value={mate.days}
                    aria-label={`${mate.name}: days present in house this period`}
                    aria-valuemin={0}
                    aria-valuemax={PERIOD_DAYS}
                    aria-valuenow={mate.days}
                    aria-valuetext={`${mate.days} of ${PERIOD_DAYS} days`}
                    onChange={(e) => {
                      const v = Number(e.target.value);
                      setMates((prev) => {
                        const next = [...prev];
                        next[idx] = { ...next[idx], days: v };
                        return next;
                      });
                    }}
                    className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-[#FF6A6A] dark:bg-slate-700"
                  />
                </div>
              ))}
            </div>
            <div className="min-w-0 overflow-x-auto">
              <div className="flex h-44 min-w-[260px] items-end justify-around gap-2 rounded-2xl bg-slate-900/50 p-3 sm:h-48 sm:gap-4 sm:p-4">
                {shares.map((s) => (
                  <motion.div
                    key={s.name}
                    layout
                    className="flex flex-1 flex-col items-center justify-end"
                  >
                    <motion.div
                      layout
                      className="w-full max-w-[72px] rounded-t-lg"
                      style={{
                        background: s.color,
                        height: `${Math.max(8, (s.amount / TOTAL) * 160)}px`,
                      }}
                    />
                    <p className="mt-2 text-center text-xs font-bold text-white">
                      {s.name}
                    </p>
                    <p className="text-sm font-black text-[#2EC4B6]">
                      ${s.amount.toFixed(2)}
                    </p>
                  </motion.div>
                ))}
              </div>
              <p className="mt-4 text-center text-sm text-slate-600 dark:text-slate-400">
                Total ${TOTAL.toFixed(2)} · Proportional to active days
              </p>
            </div>
          </div>
        </GlassPanel>
      </div>
    </section>
  );
}
