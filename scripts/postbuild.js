// After `next build` (static export to out/): place the 404 pages and write robots.txt / sitemap.xml.
// Cloudflare Workers static assets with not_found_handling "404-page" serve the nearest 404.html, so /ru/... misses
// get ru/404.html.
import { copyFileSync, existsSync, readdirSync, renameSync, rmSync, statSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "out");
const base = (process.env.MYTOR_BASE_PATH || "").replace(/\/+$/, "").replace(/^(?=[^/])/, "/");
const siteUrl = (process.env.MYTOR_SITE_URL || "").replace(/\/+$/, "");

for (const [from, to] of [["not-found-page", "404.html"], ["ru/not-found-page", "ru/404.html"]]) {
  const src = join(out, from, "index.html");
  if (!existsSync(src)) throw new Error(`postbuild: ${from}/index.html missing`);
  renameSync(src, join(out, to));
  rmSync(join(out, from), { recursive: true, force: true });
  rmSync(join(out, from + ".txt"), { force: true });
}

// Link prefetching asks for segment payloads under flat dotted names (/features/__next.!X.features.__PAGE__.txt)
// while the export writes them as nested folders (__next.!X/features/__PAGE__.txt). Add the flat copies so the
// requests resolve on any static host (otherwise every prefetch is a 404 and navigations fall back to full loads).
(function flatten(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (!statSync(p).isDirectory() || name === "_next") continue;
    if (name.startsWith("__next.")) {
      (function copyAll(d, rel) {
        for (const f of readdirSync(d)) {
          const fp = join(d, f);
          if (statSync(fp).isDirectory()) copyAll(fp, [...rel, f]);
          else copyFileSync(fp, join(dir, [name, ...rel, f].join(".")));
        }
      })(p, []);
    } else flatten(p);
  }
})(out);

// Next's own default not-found export is not used (ours are placed above).
for (const d of ["_not-found", "404"]) rmSync(join(out, d), { recursive: true, force: true });
rmSync(join(out, "_not-found.txt"), { force: true });

const routes = ["", "demo/", "privacy/"];
writeFileSync(join(out, "robots.txt"), `User-agent: *\nAllow: /\n${siteUrl ? `Sitemap: ${siteUrl}${base}/sitemap.xml\n` : ""}`);
if (siteUrl) {
  const loc = (lang, r) => `${siteUrl}${base}/${lang === "uz" ? "" : "ru/"}${r}`;
  const urls = ["uz", "ru"].flatMap((lang) =>
    routes.map((r) => `  <url><loc>${loc(lang, r)}</loc>${["uz", "ru"].map((l) => `<xhtml:link rel="alternate" hreflang="${l}" href="${loc(l, r)}"/>`).join("")}</url>`)
  );
  writeFileSync(join(out, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join("\n")}\n</urlset>\n`);
}
console.log(`Postbuild: 404 pages placed, robots.txt${siteUrl ? " + sitemap.xml" : ""} written.`);
console.log(process.env.MYTOR_FORM_ENDPOINT ? `Form endpoint: ${process.env.MYTOR_FORM_ENDPOINT}` : "Form endpoint: NOT CONNECTED (set MYTOR_FORM_ENDPOINT to connect).");
