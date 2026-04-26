import type { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://themarkest.me";

const locales = ["ru", "en"] as const;

const routes: Array<{
  path: string;
  priority: number;
  changeFrequency: "monthly";
}> = [
  { path: "/", priority: 1.0, changeFrequency: "monthly" },
  { path: "/about", priority: 0.9, changeFrequency: "monthly" },
  { path: "/projects", priority: 0.9, changeFrequency: "monthly" },
  { path: "/collaboration", priority: 0.7, changeFrequency: "monthly" },
  { path: "/lab", priority: 0.7, changeFrequency: "monthly" },
  { path: "/content", priority: 0.7, changeFrequency: "monthly" },
  { path: "/shop", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.7, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "monthly" },
  { path: "/terms", priority: 0.3, changeFrequency: "monthly" },
];

function buildUrl(locale: string, path: string): string {
  const suffix = path === "/" ? "" : path;
  return `${baseUrl}/${locale}${suffix}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return locales.flatMap((locale) =>
    routes.map((route) => ({
      url: buildUrl(locale, route.path),
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: {
          ru: buildUrl("ru", route.path),
          en: buildUrl("en", route.path),
        },
      },
    })),
  );
}
