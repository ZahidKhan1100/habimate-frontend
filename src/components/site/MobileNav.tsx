"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/", label: "Home" },
  { href: "/whats-new", label: "What's New" },
  { href: "/fairness", label: "Fairness" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
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
        className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-full bg-[#f5f5f7] text-[#1d1d1f] transition hover:bg-[#eaeaea] dark:bg-white/8 dark:text-white dark:hover:bg-white/12"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" strokeWidth={2} />
      </button>

      {open ? (
        <div
          id="mobile-nav-panel"
          className="fixed inset-0 z-100 flex flex-col md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
        >
          <div
            className="absolute inset-0 bg-black/25 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <nav
            className={cn(
              "relative ml-auto flex h-full w-full max-w-sm flex-col bg-white shadow-2xl dark:bg-black",
              "pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))] pl-6 pr-[max(1.5rem,env(safe-area-inset-right))]",
            )}
          >
            <div className="flex items-center justify-between border-b border-black/6 py-4 pr-2 dark:border-white/8">
              <span className="font-heading text-base font-bold text-[#1d1d1f] dark:text-white">
                Menu
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-full bg-[#f5f5f7] text-[#1d1d1f] dark:bg-white/8 dark:text-white"
                aria-label="Close menu"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <ul className="flex flex-1 flex-col py-6">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex min-h-12 items-center rounded-xl px-2 text-base font-medium text-[#1d1d1f] transition active:bg-[#f5f5f7] dark:text-white dark:active:bg-white/5"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mb-4 inline-flex min-h-12 items-center justify-center rounded-full bg-[#FF6A6A] px-6 text-sm font-semibold text-white transition hover:bg-[#f05a5a]"
            >
              Get support
            </Link>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
