import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "HabiMate — Shared living, simplified",
    short_name: "HabiMate",
    description:
      "Split bills fairly, scan receipts with AI, and settle up with your household.",
    start_url: "/",
    display: "standalone",
    background_color: "#0b1220",
    theme_color: "#0b1220",
    orientation: "portrait-primary",
    categories: ["finance", "lifestyle", "productivity"],
    lang: "en",
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
