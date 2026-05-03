import Link from "next/link";
import { cn } from "@/lib/utils";
import { MobileNav } from "@/components/site/MobileNav";
import { SiteLogo } from "@/components/site/SiteLogo";
import { ThemeToggle } from "@/components/site/ThemeToggle";

const nav = [
  { href: "/", label: "Home" },
  { href: "/whats-new", label: "What’s New" },
  { href: "/fairness", label: "Fairness" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader({ className }: { className?: string }) {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-white/10 bg-white/95 pt-[env(safe-area-inset-top)] dark:bg-slate-950/95",
        className,
      )}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 sm:h-16 sm:px-6">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2 font-heading text-lg font-extrabold tracking-tight text-[#FF6A6A] sm:gap-2.5 sm:text-xl"
        >
          <SiteLogo
            decorative
            size={36}
            priority
            className="shrink-0 rounded-lg"
          />
          <span className="truncate">HabiMate</span>
        </Link>
        <nav className="hidden items-center gap-6 underline-offset-4 md:flex lg:gap-8">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              prefetch={false}
              className="text-sm font-medium text-slate-800 underline decoration-slate-500/70 transition hover:text-[#FF6A6A] hover:decoration-[#FF6A6A] dark:text-slate-200 dark:decoration-slate-400"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <ThemeToggle />
          <Link
            href="/contact"
            prefetch={false}
            className="hidden rounded-full bg-[#FF6A6A] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-[#FF6A6A]/25 transition hover:bg-[#ef5a5a] sm:inline-flex"
          >
            Get support
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
