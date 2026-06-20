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
        "sticky top-0 z-50 border-b border-black/6 bg-white/90 backdrop-blur-xl pt-[env(safe-area-inset-top)] dark:border-white/8 dark:bg-black/90",
        className,
      )}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 sm:h-16 sm:px-6">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2 font-heading text-base font-bold tracking-tight text-[#1d1d1f] dark:text-white sm:gap-2.5"
        >
          <SiteLogo
            decorative
            size={32}
            priority
            className="shrink-0 rounded-lg"
          />
          <span className="truncate">HabiMate</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex lg:gap-8">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              prefetch={false}
              className="text-sm font-medium text-[#6e6e73] transition hover:text-[#1d1d1f] dark:text-[#86868b] dark:hover:text-white"
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
            className="hidden rounded-full bg-[#FF6A6A] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#f05a5a] active:scale-[0.97] sm:inline-flex"
          >
            Get support
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
