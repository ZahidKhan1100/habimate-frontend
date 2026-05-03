"use client";

import { useState } from "react";
import { GlassPanel } from "@/components/ui/glass-panel";
import { API_BASE_URL, apiUrl } from "@/config/urls";
import { cn } from "@/lib/utils";

const categories = [
  { id: "bug_report", label: "Bug report" },
  { id: "feature_idea", label: "Feature idea" },
  { id: "partnership", label: "Business partnership" },
  { id: "lead_magnet", label: "Resource download / templates" },
] as const;

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState<string>("feature_idea");
  const [message, setMessage] = useState("");
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
        body: JSON.stringify({ name, email, category, message }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        message?: string;
        errors?: Record<string, string[]>;
      };
      if (!res.ok) {
        const first =
          data.errors &&
          Object.values(data.errors).flat()[0];
        throw new Error(first || data.message || "Request failed");
      }
      setStatus("ok");
      setMessage("");
    } catch (err: unknown) {
      setStatus("err");
      setErrMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <GlassPanel className="p-6 md:p-8">
      <form onSubmit={onSubmit} className="space-y-6" aria-label="Contact support">
        <div>
          <label
            htmlFor="contact-name"
            className="block text-sm font-medium text-slate-700 dark:text-slate-200"
          >
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            autoComplete="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-slate-900 backdrop-blur-[15px] transition focus:border-[#2EC4B6] focus:outline-none dark:text-white"
          />
        </div>
        <div>
          <label
            htmlFor="contact-email"
            className="block text-sm font-medium text-slate-700 dark:text-slate-200"
          >
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            autoComplete="email"
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-slate-900 backdrop-blur-[15px] focus:border-[#2EC4B6] focus:outline-none dark:text-white"
          />
        </div>
        <div>
          <label
            htmlFor="contact-category"
            className="block text-sm font-medium text-slate-700 dark:text-slate-200"
          >
            Category
          </label>
          <select
            id="contact-category"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-2 w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-slate-900 backdrop-blur-[15px] focus:border-[#2EC4B6] focus:outline-none dark:text-white"
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="contact-message"
            className="block text-sm font-medium text-slate-700 dark:text-slate-200"
          >
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mt-2 w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-slate-900 backdrop-blur-[15px] focus:border-[#2EC4B6] focus:outline-none dark:text-white"
          />
        </div>
        {(status === "ok" || status === "err") && (
          <div role="status" aria-live="polite" className="min-h-[1.375rem]">
            {status === "ok" && (
              <p className="text-sm font-semibold text-[#1a9889] dark:text-[#2EC4B6]">
                Thanks — we&apos;ve received your message.
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
          aria-label={status === "loading" ? "Sending message" : "Send contact message"}
          className={cn(
            "w-full rounded-2xl bg-[#FF6A6A] py-4 font-bold text-white transition hover:bg-[#ef5a5a]",
            status === "loading" && "opacity-50",
          )}
        >
          {status === "loading" ? "Sending…" : "Send message"}
        </button>
      </form>
    </GlassPanel>
  );
}
