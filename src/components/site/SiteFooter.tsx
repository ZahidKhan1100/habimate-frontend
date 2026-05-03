import Link from "next/link";
import { SiteLogo } from "@/components/site/SiteLogo";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-slate-950 py-10 pb-[max(2.5rem,env(safe-area-inset-bottom))] text-slate-400 sm:py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 sm:px-6 md:flex-row md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <SiteLogo decorative size={44} className="rounded-lg" />
            <p className="font-heading text-lg font-bold text-white">HabiMate</p>
          </div>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-300">
            Shared living, simplified. The referee—not the cop.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm sm:gap-8">
          <Link
            href="/whats-new"
            className="text-teal-300 underline decoration-slate-500 underline-offset-2 hover:text-teal-200 hover:decoration-teal-300"
          >
            What’s New
          </Link>
          <Link
            href="/fairness"
            className="text-teal-300 underline decoration-slate-500 underline-offset-2 hover:text-teal-200 hover:decoration-teal-300"
          >
            Fairness engine
          </Link>
          <Link
            href="/privacy"
            className="text-teal-300 underline decoration-slate-500 underline-offset-2 hover:text-teal-200 hover:decoration-teal-300"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="text-teal-300 underline decoration-slate-500 underline-offset-2 hover:text-teal-200 hover:decoration-teal-300"
          >
            Terms
          </Link>
          <Link
            href="/contact"
            className="text-teal-300 underline decoration-slate-500 underline-offset-2 hover:text-teal-200 hover:decoration-teal-300"
          >
            Contact
          </Link>
        </div>
      </div>
      <p className="mt-10 mx-auto max-w-2xl px-6 text-center text-[11px] leading-relaxed text-slate-300">
        HabiMate provides tools to organize shared expenses—not legal, tax, or
        financial advice. See{" "}
        <Link
          href="/fairness#calculations-disclaimer"
          className="font-medium text-teal-300 underline decoration-teal-400/70 underline-offset-2 hover:text-teal-200"
        >
          how we round amounts
        </Link>
        ,{" "}
        <Link
          href="/privacy"
          className="font-medium text-teal-300 underline decoration-teal-400/70 underline-offset-2 hover:text-teal-200"
        >
          Privacy &amp; Trust
        </Link>
        , and{" "}
        <Link
          href="/terms"
          className="font-medium text-teal-300 underline decoration-teal-400/70 underline-offset-2 hover:text-teal-200"
        >
          Terms of Service
        </Link>
        .
      </p>
      <p className="mt-4 text-center text-xs text-slate-300">
        © {new Date().getFullYear()} HabiMate. All rights reserved.
      </p>
    </footer>
  );
}
