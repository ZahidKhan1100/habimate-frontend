"use client";

import { useMemo, useState, useCallback } from "react";
import * as Slider from "@radix-ui/react-slider";
import { motion, AnimatePresence } from "framer-motion";
import { GlassPanel } from "@/components/ui/glass-panel";
import Link from "next/link";
import { splitEqualCentsParts } from "@/lib/splitEqualCents";
import { weightedSplitCents } from "@/lib/weightedSplitCents";

const PERIOD = 30;
const MAX_MATES = 6;
const MIN_MATES = 2;

type Mode = "bills" | "buyback";

type Mate = {
  id: string;
  name: string;
  daysInHouse: number;
};

function createMate(name: string, daysInHouse = PERIOD): Mate {
  return {
    id:
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `m-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    name,
    daysInHouse,
  };
}

function createInitialHouse(): { mates: Mate[]; buyerId: string } {
  const a = createMate("You", PERIOD);
  const b = createMate("Alex", PERIOD);
  return { mates: [a, b], buyerId: a.id };
}

const INITIAL_HOUSE = createInitialHouse();

export function FairnessCalculatorSection() {
  const [mode, setMode] = useState<Mode>("bills");
  const [hasGenerated, setHasGenerated] = useState(false);

  const [mates, setMates] = useState<Mate[]>(() =>
    INITIAL_HOUSE.mates.map((m) => ({ ...m })),
  );

  const [bill, setBill] = useState([300]);
  const [payerIndex, setPayerIndex] = useState(0);

  const [buybackTotal, setBuybackTotal] = useState([120]);
  const [buyerId, setBuyerId] = useState<string>(INITIAL_HOUSE.buyerId);
  const [reimburseOn, setReimburseOn] = useState<Record<string, boolean>>({});

  const effectiveBuyerId =
    buyerId && mates.some((m) => m.id === buyerId)
      ? buyerId
      : mates[0]?.id ?? "";

  const B = bill[0];
  const pool = buybackTotal[0];

  const expensePlan = useMemo(() => {
    const weights = mates.map((m) => m.daysInHouse);
    const sumW = weights.reduce((a, b) => a + Math.max(0, b), 0);
    if (mates.length < 2 || sumW <= 0) return null;
    const shares = weightedSplitCents(B, weights);
    const naive = B / mates.length;
    const savings = mates.map((_, i) =>
      Math.max(0, Math.round((naive - shares[i]) * 100) / 100),
    );
    const payer = Math.min(Math.max(0, payerIndex), mates.length - 1);
    const transfers: { from: number; to: number; amount: number }[] = [];
    for (let i = 0; i < mates.length; i++) {
      if (i === payer) continue;
      const amt = Math.round(shares[i] * 100) / 100;
      if (amt >= 0.01) {
        transfers.push({ from: i, to: payer, amount: amt });
      }
    }
    return { shares, naive, savings, payer, transfers };
  }, [mates, B, payerIndex]);

  const buybackPlan = useMemo(() => {
    if (!effectiveBuyerId || mates.length < 2) return null;
    const reimbursing = mates.filter(
      (m) =>
        m.id !== effectiveBuyerId && reimburseOn[m.id] !== false,
    );
    if (reimbursing.length === 0) return null;
    const parts = splitEqualCentsParts(pool, reimbursing.length);
    const rows = reimbursing.map((m, i) => ({
      fromName: m.name,
      toName: mates.find((x) => x.id === effectiveBuyerId)?.name ?? "Buyer",
      amount: parts[i] ?? 0,
    }));
    const sum = rows.reduce((a, r) => a + r.amount, 0);
    return { rows, sum };
  }, [mates, effectiveBuyerId, reimburseOn, pool]);

  const updateName = (id: string, name: string) => {
    setMates((prev) =>
      prev.map((m) => (m.id === id ? { ...m, name } : m)),
    );
  };

  const updateDays = (id: string, days: number[]) => {
    const v = days[0];
    setMates((prev) =>
      prev.map((m) => (m.id === id ? { ...m, daysInHouse: v } : m)),
    );
  };

  const addMate = useCallback(() => {
    setMates((prev) => {
      if (prev.length >= MAX_MATES) return prev;
      const nm = createMate(`Mate ${prev.length + 1}`, PERIOD);
      setReimburseOn((r) => ({ ...r, [nm.id]: true }));
      return [...prev, nm];
    });
  }, []);

  const removeMate = (id: string) => {
    setMates((prev) => {
      if (prev.length <= MIN_MATES) return prev;
      const next = prev.filter((m) => m.id !== id);
      setPayerIndex((p) => Math.min(p, next.length - 1));
      if (id === buyerId && next[0]) setBuyerId(next[0].id);
      return next;
    });
  };

  const canGenerate =
    mates.length >= MIN_MATES &&
    (mode === "bills"
      ? expensePlan !== null
      : buybackPlan !== null && buybackPlan.rows.length > 0);

  const onGenerate = () => {
    if (!canGenerate) return;
    setHasGenerated(true);
    const el = document.getElementById("settlement-result");
    el?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  return (
    <section
      id="calculator"
      className="border-b border-white/10 px-4 py-16 dark:bg-slate-950/40 sm:px-6 sm:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-[#2EC4B6]">
          Live calculator · add your house
        </p>
        <h2 className="font-heading mt-3 text-center text-3xl font-extrabold text-slate-900 dark:text-white md:text-4xl">
          Fairness Simulator
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-base text-slate-600 dark:text-slate-300 sm:text-lg">
          Add roommates, set days home or buy-back roles, then generate a
          settlement preview—the same ideas HabiMate uses in the app.
        </p>

        <GlassPanel className="mt-10 p-4 sm:mt-12 sm:p-6 md:p-10">
          <div
            className="flex flex-wrap justify-center gap-2 rounded-2xl border border-slate-200/80 bg-slate-100/80 p-1.5 dark:border-white/10 dark:bg-slate-900/60"
            role="tablist"
            aria-label="Simulator mode"
          >
            <ModeTab
              active={mode === "bills"}
              onClick={() => {
                setMode("bills");
                setHasGenerated(false);
              }}
            >
              Shared bills
            </ModeTab>
            <ModeTab
              active={mode === "buyback"}
              onClick={() => {
                setMode("buyback");
                setHasGenerated(false);
              }}
            >
              Stock buy-back
            </ModeTab>
          </div>

          <div className="mt-8 grid min-w-0 gap-8 sm:mt-10 sm:gap-10 lg:grid-cols-2">
            <div className="space-y-6">
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
                    Housemates ({mates.length})
                  </span>
                  <button
                    type="button"
                    onClick={addMate}
                    disabled={mates.length >= MAX_MATES}
                    className="rounded-lg bg-[#FF6A6A]/15 px-3 py-1.5 text-xs font-bold text-[#FF6A6A] hover:bg-[#FF6A6A]/25 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    + Add mate
                  </button>
                </div>
                <div className="space-y-3">
                  {mates.map((m, idx) => (
                    <div
                      key={m.id}
                      className="rounded-2xl border border-slate-200/90 bg-white/60 p-3 dark:border-white/10 dark:bg-slate-900/40"
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        <input
                          type="text"
                          value={m.name}
                          onChange={(e) => updateName(m.id, e.target.value)}
                          className="min-w-[100px] flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-900 dark:border-white/10 dark:bg-slate-950 dark:text-white"
                          placeholder="Name"
                          aria-label={`Mate ${idx + 1} name`}
                        />
                        {mates.length > MIN_MATES && (
                          <button
                            type="button"
                            onClick={() => removeMate(m.id)}
                            className="rounded-lg px-2 py-1 text-xs font-bold text-slate-400 hover:bg-red-500/10 hover:text-red-500"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      {mode === "bills" && (
                        <div className="mt-3">
                          <SliderField
                            label="Days in house this month"
                            value={[m.daysInHouse]}
                            onChange={(v) => updateDays(m.id, v)}
                            min={0}
                            max={PERIOD}
                            step={1}
                            format={(d) => `${d} / ${PERIOD} days`}
                          />
                        </div>
                      )}
                      {mode === "buyback" && (
                        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs">
                          <label className="inline-flex cursor-pointer items-center gap-2 font-semibold text-slate-600 dark:text-slate-300">
                            <input
                              type="radio"
                              name="buyer"
                              checked={effectiveBuyerId === m.id}
                              onChange={() => setBuyerId(m.id)}
                              className="accent-[#FF6A6A]"
                            />
                            Buyer (gets paid)
                          </label>
                          {m.id !== effectiveBuyerId && (
                            <label className="inline-flex cursor-pointer items-center gap-2 font-semibold text-slate-600 dark:text-slate-300">
                              <input
                                type="checkbox"
                                checked={reimburseOn[m.id] !== false}
                                onChange={(e) =>
                                  setReimburseOn((prev) => ({
                                    ...prev,
                                    [m.id]: e.target.checked,
                                  }))
                                }
                                className="accent-[#2EC4B6]"
                              />
                              Pays back
                            </label>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <AnimatePresence mode="wait">
                {mode === "bills" ? (
                  <motion.div
                    key="bills-ctrl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <SliderField
                      label="Total bill (one statement)"
                      value={bill}
                      onChange={setBill}
                      min={50}
                      max={900}
                      step={5}
                      format={(v) => `$${v}`}
                    />
                    <div>
                      <label className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-200">
                        Who paid the full bill upfront?
                      </label>
                      <select
                        value={payerIndex}
                        onChange={(e) =>
                          setPayerIndex(Number(e.target.value))
                        }
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-900 dark:border-white/10 dark:bg-slate-950 dark:text-white"
                      >
                        {mates.map((m, i) => (
                          <option key={m.id} value={i}>
                            {m.name || `Person ${i + 1}`}
                          </option>
                        ))}
                      </select>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Fair shares use each person&apos;s days in the house
                      (weighted split, cent-safe). Settlement lines show who
                      should pay the person who advanced the money.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="buyback-ctrl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <SliderField
                      label="Total buy-back pool"
                      value={buybackTotal}
                      onChange={setBuybackTotal}
                      min={20}
                      max={500}
                      step={5}
                      format={(v) => `$${v}`}
                    />
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Pick who bought the item (buyer) and who is chipping in.
                      The pool is split in whole cents across payers—same as the
                      app.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="button"
                onClick={onGenerate}
                disabled={!canGenerate}
                className="min-h-[48px] w-full rounded-2xl bg-[#2EC4B6] py-3.5 text-center text-base font-black text-white shadow-lg shadow-[#2EC4B6]/25 transition hover:bg-[#26b0a3] disabled:cursor-not-allowed disabled:opacity-40 sm:py-4"
              >
                Generate settlement
              </button>
            </div>

            <div
              id="settlement-result"
              className="flex min-h-[280px] min-w-0 flex-col justify-start overflow-x-auto rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-800/80 p-4 sm:min-h-[320px] sm:p-6 md:p-8"
            >
              {!hasGenerated ? (
                <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
                  <p className="text-3xl" aria-hidden>
                    🧮
                  </p>
                  <p className="max-w-xs text-sm font-semibold text-white/70">
                    Add your housemates, adjust amounts, then tap{" "}
                    <span className="text-[#2EC4B6]">Generate settlement</span>{" "}
                    to see fair shares and transfers.
                  </p>
                </div>
              ) : mode === "bills" && expensePlan ? (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/50">
                    Expense settlement
                  </p>
                  <p className="mt-1 text-xs text-white/40">
                    {PERIOD}-day month · weighted by days in house
                  </p>
                  <ul className="mt-5 space-y-3">
                    {mates.map((m, i) => (
                      <li
                        key={m.id}
                        className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-2.5"
                      >
                        <span
                          className={
                            i === expensePlan.payer
                              ? "font-bold text-[#FF6A6A]"
                              : "text-white/85"
                          }
                        >
                          {m.name || `Person ${i + 1}`}
                          {i === expensePlan.payer && (
                            <span className="ml-2 text-[10px] font-bold uppercase text-white/40">
                              paid bill
                            </span>
                          )}
                        </span>
                        <div className="text-right">
                          <span className="font-mono text-base font-bold text-[#2EC4B6]">
                            ${expensePlan.shares[i].toFixed(2)}
                          </span>
                          <span className="ml-2 text-[10px] text-white/35">
                            fair share
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                  {mates.map((m, i) => (
                    <div key={`sv-${m.id}`}>
                      {expensePlan.savings[i] >= 0.01 && (
                        <p className="mt-2 text-xs font-bold text-[#2EC4B6]/90">
                          {m.name}: ${expensePlan.savings[i].toFixed(2)} saved
                          vs equal ${expensePlan.naive.toFixed(2)} each
                        </p>
                      )}
                    </div>
                  ))}
                  <div className="mt-6 border-t border-white/10 pt-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-white/50">
                      Suggested transfers
                    </p>
                    {expensePlan.transfers.length === 0 ? (
                      <p className="mt-3 text-sm text-white/50">
                        No money moves needed (payer&apos;s share covers the
                        advance).
                      </p>
                    ) : (
                      <ul className="mt-3 space-y-2">
                        {expensePlan.transfers.map((t, idx) => (
                          <li
                            key={idx}
                            className="flex flex-col gap-1 rounded-lg bg-white/5 px-3 py-2.5 text-xs sm:flex-row sm:items-center sm:justify-between sm:gap-2 sm:text-sm"
                          >
                            <span className="min-w-0 break-words text-white/80">
                              {mates[t.from].name}{" "}
                              <span className="text-white/40">→</span>{" "}
                              {mates[t.to].name}
                            </span>
                            <span className="shrink-0 font-mono font-bold text-[#2EC4B6]">
                              ${t.amount.toFixed(2)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <p className="mt-4 text-center text-xs text-white/35">
                    Total bill ${B.toFixed(2)}
                  </p>
                </div>
              ) : hasGenerated && mode === "buyback" && buybackPlan ? (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/50">
                    Buy-back settlement
                  </p>
                  <ul className="mt-5 space-y-2">
                    {buybackPlan.rows.map((r, idx) => (
                      <li
                        key={idx}
                        className="flex flex-col gap-1 rounded-xl bg-white/5 px-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-4"
                      >
                        <span className="min-w-0 break-words text-xs text-white/85 sm:text-sm">
                          {r.fromName}{" "}
                          <span className="text-white/40">→</span> {r.toName}
                        </span>
                        <span className="shrink-0 font-mono text-base font-bold text-[#2EC4B6] sm:text-lg">
                          ${r.amount.toFixed(2)}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 rounded-xl border border-[#2EC4B6]/25 bg-[#2EC4B6]/10 px-4 py-3 text-xs leading-relaxed text-[#5eead4]">
                    Pool total: ${pool.toFixed(2)} · Sum of rows: $
                    {buybackPlan.sum.toFixed(2)}
                  </p>
                </div>
              ) : (
                <p className="text-sm text-amber-200/90">
                  Select at least one roommate to reimburse the buyer (besides
                  the buyer).
                </p>
              )}
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link
              href="#download"
              className="inline-flex min-h-[48px] w-full items-center justify-center rounded-2xl bg-[#FF6A6A] px-6 py-3.5 text-center text-sm font-bold text-white shadow-xl shadow-[#FF6A6A]/30 transition hover:bg-[#ef5a5a] sm:h-14 sm:w-auto sm:px-10 sm:text-base"
            >
              Stop the manual math. Let HabiMate handle your house.
            </Link>
          </div>
        </GlassPanel>
      </div>
    </section>
  );
}

function ModeTab({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`rounded-xl px-3 py-2 text-xs font-bold transition sm:px-4 sm:py-2.5 sm:text-sm ${
        active
          ? "bg-[#FF6A6A] text-white shadow-md shadow-[#FF6A6A]/25"
          : "text-slate-600 hover:bg-white/60 dark:text-slate-300 dark:hover:bg-white/10"
      }`}
    >
      {children}
    </button>
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
