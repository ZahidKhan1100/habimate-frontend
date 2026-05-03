import { OG_ALT, OG_SIZE, habimateOgImageResponse } from "@/lib/og-image";

export const runtime = "edge";
export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function TwitterImage() {
  return habimateOgImageResponse();
}
