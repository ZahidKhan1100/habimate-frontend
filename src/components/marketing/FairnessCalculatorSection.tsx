"use client";

import { useMemo, useState } from "react";
import * as Slider from "@radix-ui/react-slider";
import { motion } from "framer-motion";
import { GlassPanel } from "@/components/ui/glass-panel";
import Link from "next/link";

const PERIOD = 30;

export function FairnessCalculatorSection() {
  const [bill, setBill] = useState([300]);
  const [mates, setMates] = useState([3]);
  const [daysAway, setDaysAway] = useState([8]);

  const n = mates[0];
  const B = bill[0];
  const D = daysAway[0];

  const breakdown = useMemo(() => {
    const youPresent = Math.max(0, PERIOD - D);
    const sumWeight = youPresent + PERIOD * (n - 1);
    if (sumWeight <= 0) {
      return { you: 0, others: Array.from({ length: n - 1 }, () => 0) };
    }
    const youShare = (B * youPresent) / sumWeight;
    const otherEach = (B * PERIOD) / sumWeight;
    return {
      you: youShare,
      others: Array.from({ length: Math.max(0, n - 1) }, () => otherEach),
    };
  }, [B, n, D]);

  const labels = ["You"] as string[];
  for (let i = 1; i < n; i++) labels.push(`Mate ${i}`);

  return (
    <section
      id="calculator"
      className="border-b border-white/10 px-6 py-24 dark:bg-slate-950/40"
    >
      <div className="mx-auto max-w-6xl">
        <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-[#2EC4B6]">
          Fairness calculator
        </p>
        <h2 className="font-heading mt-3 text-center text-3xl font-extrabold text-slate-900 dark:text-white md:text-4xl">
          Stop guessing. See the split.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-slate-600 dark:text-slate-300">
          Slide your bill, headcount, and how many days you were away. Everyone
          else is assumed full-time in the house—watch the math stay fair.
        </p>

        <GlassPanel className="mt-12 p-6 md:p-10">
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="space-y-8">
              <SliderField
                label="Total bill amount"
                value={bill}
                onChange={setBill}
                min={50}
                max={900}
                step={5}
                format={(v) => `$${v}`}
              />
              <SliderField
                label="Number of roommates"
                value={mates}
                onChange={setMates}
                min={2}
                max={6}
                step={1}
                format={(v) => `${v} people`}
              />
              <SliderField
                label='Your "days away" this month'
                value={daysAway}
                onChange={setDaysAway}
                min={0}
                max={PERIOD}
                step={1}
                format={(v) => `${v} days away`}
              />
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Based on a {PERIOD}-day period. Your share scales with days
                present; full-time roommates split the rest proportionally.
              </p>
            </div>

            <div className="flex flex-col justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-800/80 p-6 md:p-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-white/50">
                Your household split
              </p>
              <ul className="mt-6 space-y-4">
                <motion.li
                  layout
                  className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3"
                >
                  <span className="font-medium text-[#FF6A6A]">{labels[0]}</span>
                  <motion.span
                    key={breakdown.you}
                    initial={{ opacity: 0.5, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-mono text-lg font-bold text-[#2EC4B6]"
                  >
                    ${breakdown.you.toFixed(2)}
                  </motion.span>
                </motion.li>
                {breakdown.others.map((amt, i) => (
                  <motion.li
                    key={`m-${n}-${i}`}
                    layout
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3"
                  >
                    <span className="font-medium text-white/80">
                      {labels[i + 1]}
                    </span>
                    <motion.span
                      key={amt}
                      initial={{ opacity: 0.5, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="font-mono text-lg font-bold text-[#2EC4B6]"
                    >
                      ${amt.toFixed(2)}
                    </motion.span>
                  </motion.li>
                ))}
              </ul>
              <p className="mt-6 text-center text-xs text-white/40">
                Total ${B.toFixed(2)} · {PERIOD}-day month
              </p>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link
              href="#download"
              className="inline-flex h-14 items-center justify-center rounded-2xl bg-[#FF6A6A] px-10 font-bold text-white shadow-xl shadow-[#FF6A6A]/30 transition hover:bg-[#ef5a5a]"
            >
              Stop the manual math. Let HabiMate handle your house.
            </Link>
          </div>
        </GlassPanel>
      </div>
    </section>
  );
}

function SliderField({
  label,
  value,
  onChange,
  min,
  max,
  step,
  format,
}: {
  label: string;
  value: number[];
  onChange: (v: number[]) => void;
  min: number;
  max: number;
  step: number;
  format: (v: number) => string;
}) {
  const v = value[0];
  return (
    <div>
      <div className="mb-3 flex justify-between text-sm font-medium text-slate-700 dark:text-slate-200">
        <span>{label}</span>
        <span className="text-[#2EC4B6]">{format(v)}</span>
      </div>
      <Slider.Root
        className="relative flex h-6 w-full touch-none select-none items-center"
        value={value}
        min={min}
        max={max}
        step={step}
        onValueChange={onChange}
      >
        <Slider.Track className="relative h-2 grow rounded-full bg-slate-200 dark:bg-slate-700">
          <Slider.Range className="absolute h-full rounded-full bg-[#FF6A6A]" />
        </Slider.Track>
        <Slider.Thumb className="block h-5 w-5 rounded-full border-2 border-white bg-white shadow-md ring-2 ring-[#FF6A6A]/40 focus:outline-none" />
      </Slider.Root>
    </div>
  );
}
