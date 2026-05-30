import Link from "next/link";
import { GlassPanel } from "@/components/ui/glass-panel";
import {
  SPLIT_ROUNDING_EXAMPLE_LINES,
  SPLIT_ROUNDING_EXAMPLE_TITLE,
  SPLIT_ROUNDING_EQUAL_RULE,
  SPLIT_ROUNDING_SHORT,
  SPLIT_ROUNDING_TITLE,
  SPLIT_ROUNDING_WHO_GETS_CENT,
} from "@/lib/splitRoundingRule";

type Props = {
  compact?: boolean;
  className?: string;
  id?: string;
};

export function SplitRoundingCallout({
  compact = false,
  className = "",
  id,
}: Props) {
  return (
    <GlassPanel id={id} className={`p-5 sm:p-6 ${className}`.trim()}>
      <h3 className="font-heading text-lg font-bold text-slate-900 dark:text-white">
        {SPLIT_ROUNDING_TITLE}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        {SPLIT_ROUNDING_SHORT}
      </p>
      {!compact && (
        <>
          <p className="mt-4 text-sm font-bold text-slate-900 dark:text-white">
            {SPLIT_ROUNDING_EXAMPLE_TITLE}
          </p>
          <ul className="mt-2 space-y-1.5 text-sm text-slate-600 dark:text-slate-300">
            {SPLIT_ROUNDING_EXAMPLE_LINES.map((line) => (
              <li key={line} className="flex gap-2">
                <span className="text-[#FF6A6A]" aria-hidden>
                  •
                </span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            {SPLIT_ROUNDING_WHO_GETS_CENT}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            {SPLIT_ROUNDING_EQUAL_RULE}
          </p>
        </>
      )}
      <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
        Same rule in the{" "}
        <Link
          href="/fairness"
          className="font-semibold text-[#FF6A6A] underline-offset-2 hover:underline"
        >
          fairness engine
        </Link>{" "}
        and in the HabiMate app when you add expenses.
      </p>
    </GlassPanel>
  );
}
