"use client";

import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Copy, Check } from "lucide-react";
import { SITE_URL } from "@/config/urls";

export function JoinClient() {
  const search = useSearchParams();
  const code = useMemo(
    () => (search.get("code") || search.get("house_code") || "").trim(),
    [search],
  );
  const [copied, setCopied] = useState(false);
  const openInAppHref = useMemo(
    () =>
      code
        ? `com.ihabimate.habimate://join?code=${encodeURIComponent(code)}`
        : null,
    [code],
  );

  const copy = useCallback(async () => {
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  }, [code]);

  if (!code) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur sm:p-8">
        <h2 className="font-heading text-xl font-bold text-slate-900 dark:text-white">
          Missing house code
        </h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          This page needs a <code className="rounded bg-slate-200/80 px-1.5 py-0.5 text-sm dark:bg-slate-800">?code=</code> link from your host&apos;s
          invite QR. Ask them to resend the invite, or go back to the{" "}
          <Link href="/" className="font-semibold text-[#2EC4B6] underline-offset-2 hover:underline">
            home page
          </Link>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Your house code
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <code className="break-all rounded-2xl border border-[#FF6A6A]/40 bg-[#FF6A6A]/10 px-4 py-3 text-2xl font-black tracking-tight text-[#FF6A6A] sm:text-3xl">
            {code}
          </code>
          <button
            type="button"
            onClick={copy}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-white/20 dark:text-white"
            aria-label="Copy house code"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>

      <ol className="list-decimal space-y-3 pl-5 text-slate-600 dark:text-slate-300">
        <li>Install the HabiMate app from the App Store or Google Play.</li>
        <li>Sign up or log in, then start joining a house — paste the code when asked, or use Scan QR inside the app.</li>
        <li>If the app is already installed, you can try opening the invite in the app.</li>
      </ol>

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <a
          href="/#download"
          className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-[#FF6A6A] px-6 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-[#FF6A6A]/30 transition hover:bg-[#ef5a5a]"
        >
          Get the app
        </a>
        {openInAppHref ? (
          <a
            href={openInAppHref}
            className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-white/10 bg-white/10 px-6 py-3 text-center text-sm font-semibold text-slate-900 backdrop-blur transition hover:bg-white/20 dark:text-white"
          >
            Open in HabiMate
          </a>
        ) : null}
        <Link
          href="/"
          className="inline-flex min-h-12 items-center justify-center text-sm font-semibold text-[#2EC4B6] underline-offset-2 hover:underline"
        >
          Home
        </Link>
      </div>

      <p className="text-xs text-slate-500 dark:text-slate-500">
        Scanning the QR in the <strong>phone Camera</strong> app should open this page (
        {SITE_URL}/join) — not &quot;No usable data&quot; — as long as you&apos;re online.
        Your host can re-share a QR from HabiMate after updating the app.
      </p>
    </div>
  );
}
