// Every page is a real file: /<route>index.html for Uzbek (default), /ru/<route>index.html for Russian.
import cfg from "../site.config.js";

export const LANGS = ["uz", "ru"];

// "" or "/mytor": prepended to every site-relative URL, never to file paths in dist/.
export const BASE = cfg.basePath.replace(/\/+$/, "").replace(/^(?=[^/])/, "/");
export const href = (path) => BASE + path;

export const ROUTES = {
  home: "",
  features: "features/",
  how: "how-it-works/",
  pricing: "pricing/",
  about: "about/",
  demo: "demo/",
  privacy: "privacy/",
};

export const dir = (lang) => (lang === "uz" ? "" : `${lang}/`);
export const prefix = (lang) => href("/" + dir(lang));
export const url = (lang, key) => prefix(lang) + ROUTES[key];
export const other = (lang) => (lang === "uz" ? "ru" : "uz");
