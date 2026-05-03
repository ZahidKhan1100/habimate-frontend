import type { MetadataRoute } from "next";
import { SITE_URL } from "@/config/urls";

const routes: {
  path: string;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
  priority: number;
}[] = [
    { path: "/", changeFrequency: "weekly", priority: 1 },
    { path: "/fairness", changeFrequency: "monthly", priority: 0.9 },
    { path: "/whats-new", changeFrequency: "weekly", priority: 0.85 },
    { path: "/privacy", changeFrequency: "yearly", priority: 0.6 },
    { path: "/terms", changeFrequency: "yearly", priority: 0.6 },
    { path: "/contact", changeFrequency: "yearly", priority: 0.7 },
    { path: "/join", changeFrequency: "monthly", priority: 0.75 },
  ];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
