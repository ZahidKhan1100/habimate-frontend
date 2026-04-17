"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassPanel } from "@/components/ui/glass-panel";
import { GraduationCap, Plane, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

const personas = [
  {
    id: "student",
    label: "The student",
    icon: GraduationCap,
    headline: "Dinner skip, not drama.",
    body: "Cheap eats, shared utilities, and AI that reads blurry receipt photos—so you spend time on exams, not Excel.",
    bullets: [
      "Gemini-powered scanning for late-night grocery runs",
      "Split only what you actually ate",
      "Karma for who took the trash out (finally)",
    ],
  },
  {
    id: "nomad",
    label: "The digital nomad",
    icon: Plane,
    headline: "Short stays, fair shares.",
    body: "You’re in town two weeks; your roommates aren’t subsidizing your empty room. Proportional splits that respect real life.",
    bullets: [
      "Vacation-aware logic built in",
      "Transparent “why” behind every number",
      "Settle up without awkward Venmo essays",
    ],
  },
  {
    id: "manager",
    label: "The property manager",
    icon: Building2,
    headline: "Proof, not promises.",
    body: "Show tenants and owners a clean trail: who paid, when, and what the house agreed to—without playing detective.",
    bullets: [
      "Receipt and payment history in one place",
      "Export-friendly for disputes (we hope you never need it)",
      "House rules everyone can actually see",
    ],
  },
] as const;

export function PersonaSections() {
  const [active, setActive] = useState<(typeof personas)[number]["id"]>(
    "student",
  );
  const current = personas.find((p) => p.id === active)!;
  const HeroIcon = current.icon;

  return (
    <section className="border-b border-white/10 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-[#FF6A6A]">
          Who are you?
        </p>
        <h2 className="font-heading mt-3 text-center text-3xl font-extrabold text-slate-900 dark:text-white md:text-4xl">
          Same house. Different headaches.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-slate-600 dark:text-slate-300">
          Pick a persona—we’ll show how HabiMate meets you where you are.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-2 md:gap-3">
          {personas.map((p) => {
            const Icon = p.icon;
            const isOn = active === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setActive(p.id)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition",
                  isOn
                    ? "border-[#FF6A6A] bg-[#FF6A6A]/15 text-slate-900 dark:text-white"
                    : "border-white/10 bg-white/5 text-slate-600 hover:bg-white/10 dark:text-slate-300",
                )}
              >
                <Icon className="h-4 w-4 text-[#2EC4B6]" />
                {p.label}
              </button>
            );
          })}
        </div>

        <GlassPanel className="mt-10 p-8 md:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <div className="flex items-start gap-4">
                <HeroIcon className="mt-1 h-10 w-10 shrink-0 text-[#FF6A6A]" />
                <div>
                  <h3 className="font-heading text-2xl font-bold text-slate-900 dark:text-white">
                    {current.headline}
                  </h3>
                  <p className="mt-3 text-slate-600 dark:text-slate-300">
                    {current.body}
                  </p>
                  <ul className="mt-6 space-y-2 text-sm text-slate-700 dark:text-slate-200">
                    {current.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </GlassPanel>
      </div>
    </section>
  );
}
