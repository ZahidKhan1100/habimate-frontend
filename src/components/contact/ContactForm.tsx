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
      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
            Name
          </label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-slate-900 backdrop-blur-[15px] transition focus:border-[#2EC4B6] focus:outline-none dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
            Email
          </label>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-slate-900 backdrop-blur-[15px] focus:border-[#2EC4B6] focus:outline-none dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
            Category
          </label>
          <select
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
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
            Message
          </label>
          <textarea
            required
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mt-2 w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-slate-900 backdrop-blur-[15px] focus:border-[#2EC4B6] focus:outline-none dark:text-white"
          />
        </div>
        {status === "ok" && (
          <p className="text-sm font-semibold text-[#2EC4B6]">
            Thanks — we&apos;ve received your message.
          </p>
        )}
        {status === "err" && (
          <p className="text-sm font-semibold text-red-500">{errMsg}</p>
        )}
        <button
          type="submit"
          disabled={status === "loading"}
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
