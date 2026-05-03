"use client";

import { useState } from "react";
import { GlassPanel } from "@/components/ui/glass-panel";
import { API_BASE_URL, apiUrl } from "@/config/urls";
import { cn } from "@/lib/utils";
import { BadgeCheck, Download } from "lucide-react";

function triggerFileDownload(href: string, filename: string) {
  const a = document.createElement("a");
  a.href = href;
  a.setAttribute("download", filename);
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export function VerifiedLeadSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">(
    "idle",
  );
  const [errMsg, setErrMsg] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrMsg("");
    if (!API_BASE_URL) {
      setStatus("err");
      setErrMsg("API URL not configured. Set NEXT_PUBLIC_API_BASE_URL.");
      return;
    }
    try {
      const res = await fetch(apiUrl("leads"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: name.trim() || "Visitor",
          email: email.trim(),
          category: "lead_magnet",
          message:
            "Requested: HabiMate Verified badge (SVG) + Professional House Agreement template (HTML).",
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        message?: string;
        errors?: Record<string, string[]>;
      };
      if (!res.ok) {
        const first =
          data.errors && Object.values(data.errors).flat()[0];
        throw new Error(first || data.message || "Request failed");
      }
      setStatus("ok");
      triggerFileDownload("/habimate-verified-badge.svg", "habimate-verified-badge.svg");
      setTimeout(() => {
        triggerFileDownload(
          "/downloads/house-agreement-template.html",
          "habimate-house-agreement-template.html",
        );
      }, 400);
    } catch (err: unknown) {
      setStatus("err");
      setErrMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <section
      id="verified"
      className="border-b border-white/10 px-4 py-16 dark:bg-slate-950/30 sm:px-6 sm:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid min-w-0 gap-10 lg:grid-cols-2 lg:items-center lg:gap-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-800 dark:text-teal-400">
              Authority & trust
            </p>
            <h2 className="font-heading mt-3 text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl md:text-4xl">
              HabiMate Verified
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-300">
              Grab a badge for your house chat and a printable house agreement
              template—so shared living looks professional, not improvised.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-slate-700 dark:text-slate-200">
              <li className="flex items-center gap-2">
                <BadgeCheck className="h-5 w-5 shrink-0 text-[#2EC4B6]" />
                SVG badge for Slack, iMessage, or your fridge whiteboard
              </li>
              <li className="flex items-center gap-2">
                <Download className="h-5 w-5 shrink-0 text-[#FF6A6A]" />
                House rules PDF-friendly HTML (print to PDF from your browser)
              </li>
            </ul>
          </div>

          <GlassPanel className="p-5 sm:p-6 md:p-8">
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Enter your email — we&apos;ll send the files to your device
              instantly. We&apos;ll only use this to follow up if you ask us to.
            </p>
            <form
              onSubmit={onSubmit}
              className="mt-6 space-y-4"
              aria-label="Download verified badge and house agreement template"
            >
              <div>
                <label
                  htmlFor="verified-name"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-200"
                >
                  Name <span className="font-normal text-slate-600 dark:text-slate-400">(optional)</span>
                </label>
                <input
                  id="verified-name"
                  name="name"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="First name"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-slate-900 backdrop-blur-[15px] placeholder:text-slate-500 focus:border-[#2EC4B6] focus:outline-none dark:text-white dark:placeholder:text-slate-400"
                />
              </div>
              <div>
                <label
                  htmlFor="verified-email"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-200"
                >
                  Email
                </label>
                <input
                  id="verified-email"
                  name="email"
                  autoComplete="email"
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-slate-900 backdrop-blur-[15px] focus:border-[#2EC4B6] focus:outline-none dark:text-white"
                />
              </div>
              {(status === "ok" || status === "err") && (
                <div role="status" aria-live="polite" className="min-h-[1.375rem]">
                  {status === "ok" && (
                    <p className="text-sm font-semibold text-[#1a9889] dark:text-[#2EC4B6]">
                      Downloads started — check your browser if nothing appeared.
                    </p>
                  )}
                  {status === "err" && (
                    <p className="text-sm font-semibold text-red-600 dark:text-red-400">{errMsg}</p>
                  )}
                </div>
              )}
              <button
                type="submit"
                disabled={status === "loading"}
                aria-busy={status === "loading"}
                className={cn(
                  "flex min-h-[48px] w-full items-center justify-center gap-2 rounded-2xl bg-[#FF6A6A] px-4 py-3.5 text-sm font-bold text-white transition hover:bg-[#ef5a5a] sm:text-base",
                  status === "loading" && "opacity-50",
                )}
              >
                <Download className="h-5 w-5 shrink-0" aria-hidden />
                {status === "loading"
                  ? "Preparing…"
                  : "Email me the badge & template"}
              </button>
            </form>
          </GlassPanel>
        </div>
      </div>
    </section>
  );
}
