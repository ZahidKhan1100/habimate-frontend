"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { GlassPanel } from "@/components/ui/glass-panel";
import { SiteLogo } from "@/components/site/SiteLogo";
import { Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-12 sm:px-6 sm:pb-24 sm:pt-16 md:pt-24">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 90% 60% at 50% -20%, rgba(255,106,106,0.35) 0%, transparent 55%), radial-gradient(ellipse 60% 40% at 100% 50%, rgba(46,196,182,0.12) 0%, transparent 50%)",
        }}
      />
      <div className="mx-auto grid max-w-6xl gap-10 sm:gap-12 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#2EC4B6] backdrop-blur-[15px]">
            <Sparkles className="h-3.5 w-3.5" />
            Home & roommates
          </p>
          <h1 className="font-heading text-3xl font-extrabold leading-[1.1] tracking-tight text-slate-900 dark:text-white sm:text-4xl md:text-5xl lg:text-6xl">
            Shared Living,{" "}
            <span className="bg-gradient-to-r from-[#FF6A6A] to-[#FF8E8E] bg-clip-text text-transparent">
              Simplified.
            </span>
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:mt-6 sm:text-lg">
            Because you shouldn&apos;t pay for your roommate&apos;s 20-minute
            shower. Split bills fairly, stay transparent, and settle up without
            the spreadsheet chaos.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-4">
            <a
              href="#download"
              className="inline-flex min-h-[48px] items-center justify-center rounded-2xl bg-[#FF6A6A] px-8 py-3.5 text-center font-semibold text-white shadow-xl shadow-[#FF6A6A]/30 transition hover:bg-[#ef5a5a] sm:min-h-14 sm:py-0"
            >
              App Store
            </a>
            <a
              href="#download"
              className="inline-flex min-h-[48px] items-center justify-center rounded-2xl border border-white/10 bg-white/10 px-8 py-3.5 text-center font-semibold text-slate-900 backdrop-blur-[15px] transition hover:bg-white/20 dark:text-white sm:min-h-14 sm:py-0"
            >
              Google Play
            </a>
          </div>
          <div className="mt-6">
            <Link
              href="/contact"
              className="text-sm font-semibold text-[#2EC4B6] underline-offset-4 hover:underline"
            >
              Join the community waitlist →
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="absolute -right-8 -top-8 h-56 w-56 rounded-full bg-[#2EC4B6]/20 blur-3xl" />
          <GlassPanel className="relative p-6 md:p-8">
            <div className="rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 p-4 shadow-2xl">
              <div className="aspect-[9/16] max-h-[320px] rounded-xl bg-gradient-to-b from-slate-700 to-slate-900 p-4">
                <div className="flex items-center justify-between text-xs text-white/60">
                  <span>9:41</span>
                  <span className="flex items-center gap-1.5 font-medium text-white/80">
                    <SiteLogo size={18} className="rounded-md" />
                    HabiMate
                  </span>
                </div>
                <div className="mt-6 space-y-3">
                  <FloatingReceiptCard />
                </div>
              </div>
            </div>
          </GlassPanel>
        </motion.div>
      </div>
    </section>
  );
}

function FloatingReceiptCard() {
  return (
    <motion.div
      initial={{ y: 12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="rounded-xl border border-white/10 bg-white/10 p-3 backdrop-blur-md"
    >
      <p className="text-[10px] font-semibold uppercase tracking-wider text-[#2EC4B6]">
        Receipt scanned
      </p>
      <p className="mt-1 text-sm font-bold text-white">Whole Foods</p>
      <p className="text-xs text-white/60">AI · Gemini 1.5 Flash</p>
      <p className="mt-2 text-lg font-black text-[#FF6A6A]">$47.82</p>
    </motion.div>
  );
}
