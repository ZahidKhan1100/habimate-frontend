import Link from "next/link";
import { cn } from "@/lib/utils";
import { SiteLogo } from "@/components/site/SiteLogo";
import { ThemeToggle } from "@/components/site/ThemeToggle";

const nav = [
  { href: "/", label: "Home" },
  { href: "/fairness", label: "Fairness" },
  { href: "/privacy", label: "Privacy" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader({ className }: { className?: string }) {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-white/10 bg-white/70 backdrop-blur-[15px] dark:bg-slate-950/70",
        className,
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-heading text-xl font-extrabold tracking-tight text-[#FF6A6A]"
        >
          <SiteLogo size={36} priority className="rounded-lg" />
          <span>HabiMate</span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-600 transition hover:text-[#FF6A6A] dark:text-slate-300"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/contact"
            className="rounded-full bg-[#FF6A6A] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-[#FF6A6A]/25 transition hover:bg-[#ef5a5a]"
          >
            Get support
          </Link>
        </div>
      </div>
    </header>
  );
}
