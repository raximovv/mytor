// Static build: renders every page in both languages into dist/. No dependencies.
import { mkdirSync, rmSync, writeFileSync, readFileSync, readdirSync, copyFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";

import cfg from "../site.config.js";
import uz from "../src/content/uz.js";
import ru from "../src/content/ru.js";
import { LANGS, ROUTES, url, prefix, dir } from "../src/routes.js";
import { layout } from "../src/layout.js";
import home from "../src/pages/home.js";
import features from "../src/pages/features.js";
import how from "../src/pages/how.js";
import pricing from "../src/pages/pricing.js";
import about from "../src/pages/about.js";
import demo from "../src/pages/demo.js";
import privacy from "../src/pages/privacy.js";
import notfound from "../src/pages/notfound.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const CONTENT = { uz, ru };
const PAGES = { home, features, how, pricing, about, demo, privacy };

rmSync(dist, { recursive: true, force: true });
mkdirSync(join(dist, "assets"), { recursive: true });

// Assets, with a content hash for cache busting.
const assetDir = join(root, "src", "assets");
const hash = createHash("sha1");
for (const f of readdirSync(assetDir)) {
  copyFileSync(join(assetDir, f), join(dist, "assets", f));
  hash.update(readFileSync(join(assetDir, f)));
}
const assetVersion = hash.digest("hex").slice(0, 8);

const write = (rel, html) => {
  const out = join(dist, rel);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, html);
};

let count = 0;
for (const lang of LANGS) {
  const t = CONTENT[lang];
  const alt = CONTENT[lang === "uz" ? "ru" : "uz"];
  for (const [key, render] of Object.entries(PAGES)) {
    const page = render(t, lang, cfg);
    const paths = { uz: url("uz", key), ru: url("ru", key) };
    const html = layout({ t, alt, key, ...page, cfg, assetVersion, paths });
    write(join(dir(lang), ROUTES[key], "index.html"), html);
    count++;
  }
  // 404: root 404.html is Uzbek; ru/404.html is used by servers that support per-folder 404s (serve.js does).
  const page = notfound(t, lang);
  const html = layout({ t, alt, key: "notfound", ...page, cfg, assetVersion, paths: { uz: prefix("uz"), ru: prefix("ru") }, noindex: true });
  write(join(dir(lang), "404.html"), html);
  count++;
}

write("robots.txt", `User-agent: *\nAllow: /\n${cfg.siteUrl ? `Sitemap: ${cfg.siteUrl.replace(/\/$/, "")}/sitemap.xml\n` : ""}`);
if (cfg.siteUrl) {
  const base = cfg.siteUrl.replace(/\/$/, "");
  const urls = LANGS.flatMap((lang) =>
    Object.keys(PAGES).map(
      (key) =>
        `  <url><loc>${base}${url(lang, key)}</loc>${LANGS.map((l) => `<xhtml:link rel="alternate" hreflang="${l}" href="${base}${url(l, key)}"/>`).join("")}</url>`
    )
  );
  write("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join("\n")}\n</urlset>\n`);
}

console.log(`Built ${count} pages into dist/ (assets v${assetVersion}).`);
console.log(cfg.formEndpoint ? `Form endpoint: ${cfg.formEndpoint}` : "Form endpoint: NOT CONNECTED (set MYTOR_FORM_ENDPOINT to connect).");
