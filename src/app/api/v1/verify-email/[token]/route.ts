import { NextResponse } from "next/server";

/**
 * Laravel emails used to embed links under the marketing hostname when PUBLIC_APP_URL
 * pointed at Next instead of the API. That yielded 404 (no Laravel at habimate.com).
 * Redirect browsers to the real API route so clicks still work after deploy fixes.
 *
 * Requires NEXT_PUBLIC_API_BASE_URL (e.g. https://api.habimate.com/api/v1).
 */
export async function GET(
  _request: Request,
  context: { params: Promise<{ token: string }> },
) {
  const { token } = await context.params;
  const trimmedToken = decodeURIComponent(token ?? "").trim();

  if (!trimmedToken) {
    return new NextResponse("Not Found", { status: 404 });
  }

  const base =
    process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "").trim() ?? "";

  if (!base) {
    return new NextResponse("Verification is not configured (API URL missing).", {
      status: 503,
    });
  }

  const target = `${base}/verify-email/${encodeURIComponent(trimmedToken)}`;
  return NextResponse.redirect(target, 307);
}
