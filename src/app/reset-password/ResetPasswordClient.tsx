"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  API_BASE_URL,
  PASSWORD_RESET_ANDROID_PACKAGE,
  PASSWORD_RESET_IOS_SCHEME,
  apiUrl,
} from "@/config/urls";
import { androidPlayStoreUrl, iosAppStoreUrl } from "@/lib/storeUrls";

function buildCustomSchemeUrl(token: string, email: string): string {
  const q = new URLSearchParams({ token, email }).toString();
  return `${PASSWORD_RESET_IOS_SCHEME}://reset-password?${q}`;
}

function buildAndroidIntentUrl(token: string, email: string, fallbackUrl: string): string {
  const q = new URLSearchParams({ token, email }).toString();
  return (
    `intent://reset-password?${q}` +
    `#Intent;scheme=${PASSWORD_RESET_IOS_SCHEME};package=${PASSWORD_RESET_ANDROID_PACKAGE};` +
    `S.browser_fallback_url=${encodeURIComponent(fallbackUrl)};end`
  );
}

export function ResetPasswordClient() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const email = searchParams.get("email") ?? "";
  const hasParams = Boolean(token.trim() && email.trim());

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const [busy, setBusy] = useState(false);

  const openInApp = useCallback(
    (e?: React.MouseEvent) => {
      e?.preventDefault();
      if (!hasParams) return;
      const fallback =
        typeof window !== "undefined" ? window.location.href : "";
      const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
      const isAndroid = /android/i.test(ua);
      if (isAndroid) {
        window.location.href = buildAndroidIntentUrl(token, email, fallback);
      } else {
        window.location.href = buildCustomSchemeUrl(token, email);
      }
    },
    [email, hasParams, token],
  );

  useEffect(() => {
    if (!hasParams) return;
    const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
    if (!/Mobile|Android|iPhone|iPad|iPod/i.test(ua)) return;
    const t = window.setTimeout(() => openInApp(), 450);
    return () => window.clearTimeout(t);
  }, [hasParams, openInApp]);

  const canUseWebForm = useMemo(() => Boolean(API_BASE_URL), []);

  const onSubmitWeb = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);
    if (!hasParams) return;
    if (password.length < 6) {
      setMsg({ type: "err", text: "Use at least 6 characters." });
      return;
    }
    if (password !== confirm) {
      setMsg({ type: "err", text: "Passwords do not match." });
      return;
    }
    if (!API_BASE_URL) {
      setMsg({ type: "err", text: "Server configuration error. Open the HabiMate app instead." });
      return;
    }

    setBusy(true);
    try {
      const res = await fetch(apiUrl("reset-password"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email,
          token,
          password,
          password_confirmation: confirm,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { message?: string };
      if (!res.ok) {
        setMsg({
          type: "err",
          text:
            typeof data.message === "string"
              ? data.message
              : "Could not reset password. Request a new link from the app.",
        });
        return;
      }
      setMsg({
        type: "ok",
        text:
          data.message ??
          "Password updated. Open the HabiMate app and sign in with your new password.",
      });
      setPassword("");
      setConfirm("");
    } catch {
      setMsg({ type: "err", text: "Network error. Check your connection and try again." });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto max-w-md">
      <p className="text-xs font-bold uppercase tracking-widest text-teal-800 dark:text-teal-400">
        HabiMate
      </p>
      <h1 className="mt-2 font-heading text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl">
        Reset your password
      </h1>

      {!hasParams ? (
        <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          This link is missing a token or email. Open the link from your password-reset email, or
          request a new reset from the app under{" "}
          <span className="font-semibold text-slate-800 dark:text-slate-200">Forgot password</span>.
        </p>
      ) : (
        <>
          <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            Prefer the app? We&apos;ll try to open HabiMate. If nothing happens, set a new password
            below in your browser, or install the app first.
          </p>

          <button
            type="button"
            onClick={openInApp}
            className="mt-6 flex w-full min-h-[48px] items-center justify-center rounded-2xl bg-[#FF6A6A] px-5 text-center text-sm font-bold text-white shadow-lg shadow-[#FF6A6A]/25 transition hover:bg-[#ef5a5a]"
          >
            Open HabiMate app
          </button>
          <p className="mt-2 text-center text-xs text-slate-500 dark:text-slate-400">
            Already installed? You may see a blank tab briefly—that is normal.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm">
            <a
              href={iosAppStoreUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-teal-800 underline underline-offset-2 hover:text-teal-950 dark:text-teal-300 dark:hover:text-teal-200"
            >
              App Store
            </a>
            <span className="text-slate-400" aria-hidden>
              ·
            </span>
            <a
              href={androidPlayStoreUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-teal-800 underline underline-offset-2 hover:text-teal-950 dark:text-teal-300 dark:hover:text-teal-200"
            >
              Google Play
            </a>
          </div>

          <hr className="my-10 border-slate-200 dark:border-white/10" />

          <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200">
            Continue in browser
          </h2>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            {email}
          </p>

          {!canUseWebForm ? (
            <p className="mt-4 text-sm text-amber-800 dark:text-amber-200">
              Web reset is not configured on this deployment. Use the button above or install the
              app.
            </p>
          ) : (
            <form onSubmit={onSubmitWeb} className="mt-4 space-y-3">
              <div>
                <label
                  htmlFor="rp-pw"
                  className="mb-1 block text-xs font-semibold text-slate-600 dark:text-slate-400"
                >
                  New password
                </label>
                <input
                  id="rp-pw"
                  type="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-900 shadow-sm dark:border-white/15 dark:bg-slate-900 dark:text-white"
                  minLength={6}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="rp-pw2"
                  className="mb-1 block text-xs font-semibold text-slate-600 dark:text-slate-400"
                >
                  Confirm password
                </label>
                <input
                  id="rp-pw2"
                  type="password"
                  autoComplete="new-password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-900 shadow-sm dark:border-white/15 dark:bg-slate-900 dark:text-white"
                  minLength={6}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={busy}
                className="mt-2 w-full min-h-[48px] rounded-xl bg-slate-800 px-4 py-2.5 font-bold text-white transition hover:bg-slate-900 disabled:opacity-60 dark:bg-slate-200 dark:text-slate-900 dark:hover:bg-white"
              >
                {busy ? "Saving…" : "Reset password in browser"}
              </button>
            </form>
          )}

          {msg ? (
            <p
              className={`mt-4 rounded-xl px-3 py-2 text-sm ${
                msg.type === "ok"
                  ? "bg-emerald-50 text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-100"
                  : "bg-red-50 text-red-900 dark:bg-red-950/40 dark:text-red-100"
              }`}
              role="status"
            >
              {msg.text}
            </p>
          ) : null}
        </>
      )}

      <p className="mt-10 text-center text-sm">
        <Link
          href="/"
          className="font-semibold text-teal-800 underline underline-offset-2 hover:text-teal-950 dark:text-teal-300 dark:hover:text-teal-200"
        >
          ← Back to home
        </Link>
      </p>
    </div>
  );
}
