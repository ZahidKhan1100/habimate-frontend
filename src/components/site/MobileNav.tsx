"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/", label: "Home" },
  { href: "/fairness", label: "Fairness" },
  { href: "/privacy", label: "Privacy" },
  { href: "/contact", label: "Contact" },
] as const;

export function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-slate-200/80 bg-white/80 text-slate-800 shadow-sm backdrop-blur-[15px] dark:border-white/10 dark:bg-white/10 dark:text-white"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" strokeWidth={2.25} />
      </button>

      {open ? (
        <div
          id="mobile-nav-panel"
          className="fixed inset-0 z-[100] flex flex-col md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
        >
          <div
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <nav
            className={cn(
              "relative ml-auto flex h-full w-full max-w-sm flex-col border-l border-white/10 bg-[var(--background)] shadow-2xl",
              "pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))] pl-6 pr-[max(1.5rem,env(safe-area-inset-right))]",
            )}
          >
            <div className="flex items-center justify-between border-b border-white/10 py-4 pr-2">
              <span className="font-heading text-lg font-bold text-[#FF6A6A]">
                Menu
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <ul className="flex flex-1 flex-col gap-1 py-6">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex min-h-12 items-center rounded-xl px-3 text-lg font-semibold text-slate-800 active:bg-[#FF6A6A]/10 dark:text-slate-100 dark:active:bg-white/10"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mb-4 inline-flex min-h-12 items-center justify-center rounded-2xl bg-[#FF6A6A] px-6 text-center font-bold text-white shadow-lg shadow-[#FF6A6A]/25"
            >
              Get support
            </Link>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
