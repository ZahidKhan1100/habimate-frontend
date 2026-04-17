import { GlassPanel } from "@/components/ui/glass-panel";
import { Brain, Heart, Palmtree } from "lucide-react";

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
];

export function FeatureGrid() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-heading text-center text-3xl font-extrabold text-slate-900 dark:text-white md:text-4xl">
          Built for real households
        </h2>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {features.map((f) => (
            <GlassPanel key={f.title} className="p-6">
              <div className="flex items-center justify-between">
                <f.icon className="h-8 w-8 text-[#FF6A6A]" strokeWidth={1.5} />
                <span className="rounded-full bg-[#2EC4B6]/15 px-2 py-0.5 text-xs font-bold text-[#2EC4B6]">
                  {f.tag}
                </span>
              </div>
              <h3 className="font-heading mt-4 text-lg font-bold text-slate-900 dark:text-white">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {f.body}
              </p>
            </GlassPanel>
          ))}
        </div>
      </div>
    </section>
  );
}
