import { GlassPanel } from "@/components/ui/glass-panel";
import { Brain, Heart, Palmtree, RefreshCcw } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI receipt scanner",
    body: "Powered by Gemini 1.5 Flash—snap a receipt, we pull the total and line up the month.",
    tag: "Gemini",
  },
  {
    icon: Heart,
    title: "Karma system",
    body: "Turn chores and good vibes into social currency. House legends, not house lectures.",
    tag: "Social",
  },
  {
    icon: Palmtree,
    title: "Vacation mode",
    body: "Don’t pay for what you don’t use. Split by days with exclusions when you’re away.",
    tag: "Fair",
  },
  {
    icon: RefreshCcw,
    title: "Stock buy-backs",
    body: "When someone moves out or the house buys shared supplies, keep transfers clear so nobody’s left holding the bag.",
    tag: "Clear",
  },
];

export function FeatureGrid() {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-heading text-center text-2xl font-extrabold tracking-tight text-[#1d1d1f] dark:text-white sm:text-3xl md:text-4xl">
          Built for real households
        </h2>
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <GlassPanel key={f.title} className="p-7">
              <div className="flex items-start justify-between">
                <div className="rounded-xl bg-[#f5f5f7] p-2.5 dark:bg-white/6">
                  <f.icon className="h-6 w-6 text-[#FF6A6A]" strokeWidth={1.5} />
                </div>
                <span className="rounded-full bg-[#f5f5f7] px-2.5 py-0.5 text-xs font-semibold text-[#6e6e73] dark:bg-white/6 dark:text-[#86868b]">
                  {f.tag}
                </span>
              </div>
              <h3 className="font-heading mt-5 text-base font-bold text-[#1d1d1f] dark:text-white">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#6e6e73] dark:text-[#86868b]">
                {f.body}
              </p>
            </GlassPanel>
          ))}
        </div>
      </div>
    </section>
  );
}
