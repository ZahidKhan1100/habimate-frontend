import Link from "next/link";
import { SiteLogo } from "@/components/site/SiteLogo";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-slate-950 py-12 text-slate-400">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 md:flex-row md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <SiteLogo size={44} className="rounded-lg" />
            <p className="font-heading text-lg font-bold text-white">HabiMate</p>
          </div>
          <p className="mt-2 max-w-sm text-sm leading-relaxed">
            Shared living, simplified. The referee—not the cop.
          </p>
        </div>
        <div className="flex flex-wrap gap-8 text-sm">
          <Link href="/fairness" className="hover:text-[#2EC4B6]">
            Fairness engine
          </Link>
          <Link href="/privacy" className="hover:text-[#2EC4B6]">
            Privacy
          </Link>
          <Link href="/contact" className="hover:text-[#2EC4B6]">
            Contact
          </Link>
        </div>
      </div>
      <p className="mt-10 text-center text-xs">
        © {new Date().getFullYear()} HabiMate. All rights reserved.
      </p>
    </footer>
  );
}
