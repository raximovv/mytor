// Site-wide settings, routes and content lookup. Values come from next.config.mjs `env` (inlined at build time).
import uz from "../content/uz.js";
import ru from "../content/ru.js";

export type Lang = "uz" | "ru";
export type Content = typeof uz;

export const LANGS: Lang[] = ["uz", "ru"];
export const CONTENT: Record<Lang, Content> = { uz, ru: ru as Content };

/** "" or "/mytor": added to plain <a>/asset URLs. next/link adds it by itself. */
export const BASE = process.env.MYTOR_BASE_PATH || "";
/** Public origin, e.g. https://mytor.uz. Empty until a domain is chosen. */
export const SITE_URL = process.env.MYTOR_SITE_URL || "";
/** Demo-request endpoint (JSON POST, 2xx = success). Empty = form not connected. */
export const FORM_ENDPOINT = process.env.MYTOR_FORM_ENDPOINT || "";

export const ROUTES = {
  home: "",
  features: "features/",
  how: "how-it-works/",
  pricing: "pricing/",
  about: "about/",
  demo: "demo/",
  privacy: "privacy/",
} as const;
export type PageKey = keyof typeof ROUTES;
export const PAGE_KEYS = Object.keys(ROUTES) as PageKey[];

export const other = (lang: Lang): Lang => (lang === "uz" ? "ru" : "uz");
/** Path inside the site (no base path): "/", "/ru/features/". Use with next/link. */
export const prefix = (lang: Lang) => (lang === "uz" ? "/" : "/ru/");
export const path = (lang: Lang, key: PageKey) => prefix(lang) + ROUTES[key];
/** Full URL path including the base path: for plain <a> links, assets and metadata. */
export const href = (p: string) => BASE + p;
/** Absolute URL when the public origin is known, otherwise the base-path URL. */
export const abs = (p: string) => (SITE_URL ? SITE_URL + BASE + p : BASE + p);
