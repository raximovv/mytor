// Per-page <head> metadata from the content files: title, description, Open Graph, canonical (when the public
// origin is known) and noindex for the 404 pages. hreflang links are rendered by <Shell>.
import type { Metadata } from "next";
import { CONTENT, SITE_URL, abs, path, prefix, type Lang, type PageKey } from "./site";

const text = (s: string) => s.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ");

export function pageMeta(lang: Lang, key: PageKey | "notfound"): Metadata {
  const t = CONTENT[lang];
  const alt = CONTENT[lang === "uz" ? "ru" : "uz"];
  const m = t.meta[key];
  const url = key === "notfound" ? prefix(lang) : path(lang, key);
  const meta: Metadata = {
    title: { absolute: text(m.title) },
    description: m.description,
    openGraph: {
      type: "website",
      siteName: "Mytor",
      title: text(m.title),
      description: m.description,
      locale: t.ogLocale,
      alternateLocale: alt.ogLocale,
      ...(SITE_URL ? { url: abs(url), images: [{ url: abs(`/assets/og-${lang}.png`), width: 1200, height: 630, alt: t.meta.ogAlt }] } : {}),
    },
    ...(SITE_URL ? { twitter: { card: "summary_large_image" }, metadataBase: new URL(SITE_URL), alternates: { canonical: abs(url) } } : {}),
  };
  if (key === "notfound") meta.robots = { index: false };
  return meta;
}
