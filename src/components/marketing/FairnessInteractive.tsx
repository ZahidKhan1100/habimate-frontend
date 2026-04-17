"use client";

import { useMemo, useState } from "react";
import * as Slider from "@radix-ui/react-slider";
import { GlassPanel } from "@/components/ui/glass-panel";

const BILL = 300;
const DAYS = 30;

export function FairnessInteractive() {
  const [days, setDays] = useState([30, 20, 10]);

  const amounts = useMemo(() => {
    const w = days.map((d) => Math.max(0, d));
    const sum = w.reduce((a, b) => a + b, 0) || 1;
    return w.map((wi) => (BILL * wi) / sum);
  }, [days]);

  return (
    <section className="border-y border-white/10 bg-white/5 px-6 py-16 dark:bg-slate-900/30">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-heading text-center text-2xl font-bold text-slate-900 dark:text-white">
          Drag days stayed — watch the bill move
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-sm text-slate-500">
          ${BILL} shared bill · {DAYS}-day period · three roommates
        </p>
        <GlassPanel className="mt-10 grid gap-10 p-8 md:grid-cols-2">
          <div className="space-y-8">
            {["You", "Roommate A", "Roommate B"].map((label, i) => (
              <div key={label}>
                <div className="mb-3 flex justify-between text-sm font-medium">
                  <span className="text-slate-500">{label}</span>
                  <span className="text-[#2EC4B6]">
                    {days[i]} days in house
                  </span>
                </div>
                <Slider.Root
                  className="relative flex h-6 w-full touch-none select-none items-center"
                  value={[days[i]]}
                  max={DAYS}
                  step={1}
                  onValueChange={(v) => {
                    const next = [...days];
                    next[i] = v[0];
                    setDays(next);
                  }}
                >
                  <Slider.Track className="relative h-2 grow rounded-full bg-slate-200 dark:bg-slate-700">
                    <Slider.Range className="absolute h-full rounded-full bg-[#FF6A6A]" />
                  </Slider.Track>
                  <Slider.Thumb
                    className="block h-5 w-5 rounded-full border-2 border-white bg-[#FF6A6A] shadow-lg focus:outline-none"
                    aria-label={label}
                  />
                </Slider.Root>
              </div>
            ))}
          </div>
          <div className="flex flex-col justify-center">
            <ul className="space-y-4">
              {amounts.map((amt, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                >
                  <span className="text-sm text-slate-600 dark:text-slate-300">
                    {["You", "Roommate A", "Roommate B"][i]}
                  </span>
                  <span className="text-lg font-black text-[#FF6A6A]">
                    ${amt.toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-center text-xs text-slate-500">
              Weights sum to your active days; amounts are proportional.
            </p>
          </div>
        </GlassPanel>
      </div>
    </section>
  );
}
