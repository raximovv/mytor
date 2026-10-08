// Static checks on dist/: translation parity, links, metadata, headings, labels, forbidden claims.
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, dirname, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import uz from "../src/content/uz.js";
import ru from "../src/content/ru.js";
import { BASE } from "../src/routes.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const problems = [];
const fail = (m) => problems.push(m);

// 1. Both languages have the same content shape (same keys, same array lengths).
function shape(a, b, path) {
  if (Array.isArray(a)) {
    if (!Array.isArray(b) || a.length !== b.length) return fail(`content shape: ${path} length uz=${a.length} ru=${b?.length}`);
    a.forEach((x, i) => shape(x, b[i], `${path}[${i}]`));
  } else if (a && typeof a === "object") {
    const ka = Object.keys(a).sort().join(), kb = Object.keys(b || {}).sort().join();
    if (ka !== kb) return fail(`content shape: ${path} keys differ`);
    for (const k of Object.keys(a)) shape(a[k], b[k], `${path}.${k}`);
  } else if (typeof a === "string" && (typeof b !== "string" || (a.trim() && !b.trim()))) fail(`content: ${path} missing in ru`);
}
shape(uz, ru, "content");

// 2. Walk dist.
const files = [];
(function walk(d) {
  for (const f of readdirSync(d)) {
    const p = join(d, f);
    statSync(p).isDirectory() ? walk(p) : files.push(p);
  }
})(dist);
const html = files.filter((f) => f.endsWith(".html"));

// Site URL ("/mytor/ru/") -> path inside dist/ ("/ru/"); null when it points outside the site.
const local = (href) => (href.startsWith(BASE + "/") ? href.slice(BASE.length) : null);

const resolves = (href) => {
  const path = href.split("#")[0].split("?")[0];
  if (!path) return true;
  if (local(path) === null) return false;
  const p = join(dist, local(path));
  return path.endsWith("/") ? existsSync(join(p, "index.html")) : existsSync(p);
};

const forbidden = [
  /app store|google play|play market|apple store/i,
  /\b\d{1,3}\s?%/, // percentages (no invented stats)
  /o‘g‘rilikni oldini|prevents theft|предотвращ\w* краж/i,
  /mijozlarimiz|наши клиенты|отзыв\w* клиент/i,
  /\+998\s?\d{2}\s?(?!123 45 67)\d{3}/, // real-looking phone numbers (the form's format example is allowed)
  /t\.me\//i,
  /undefined|\[object Object\]/,
  /—/, // em dashes in visible copy (style rule)
];

let pages = 0;
for (const file of html) {
  const rel = relative(dist, file).split(sep).join("/");
  const src = readFileSync(file, "utf8");
  pages++;
  const lang = src.match(/<html lang="([^"]+)"/)?.[1];
  if (!lang) fail(`${rel}: missing html lang`);
  const expectRu = rel.startsWith("ru/");
  if ((lang === "ru") !== expectRu) fail(`${rel}: lang=${lang} does not match path`);
  if (!/<title>[^<]{10,}<\/title>/.test(src)) fail(`${rel}: missing/short <title>`);
  if (!/<meta name="description" content="[^"]{40,}">/.test(src)) fail(`${rel}: missing/short meta description`);
  const h1 = (src.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) fail(`${rel}: ${h1} <h1> elements`);
  if (!rel.endsWith("404.html")) {
    for (const hl of ["uz", "ru", "x-default"]) if (!src.includes(`hreflang="${hl}"`)) fail(`${rel}: missing hreflang ${hl}`);
  }
  // Internal links and assets resolve.
  for (const m of src.matchAll(/(?:href|src)="(\/[^"]*)"/g)) if (!resolves(m[1])) fail(`${rel}: broken link ${m[1]}`);
  // In-page anchors exist.
  for (const m of src.matchAll(/href="([^"#]*)#([^"]+)"/g)) {
    const targetSrc = m[1] ? (resolves(m[1]) ? readFileSync(join(dist, local(m[1]), m[1].endsWith("/") ? "index.html" : ""), "utf8") : "") : src;
    if (!targetSrc.includes(`id="${m[2]}"`)) fail(`${rel}: missing anchor ${m[1]}#${m[2]}`);
  }
  // Every form control has a label.
  for (const m of src.matchAll(/<(input|textarea|select)\b([^>]*)>/g)) {
    const id = m[2].match(/\bid="([^"]+)"/)?.[1];
    if (/type="hidden"/.test(m[2])) continue;
    if (!id || !src.includes(`for="${id}"`)) fail(`${rel}: form control without label (${m[0].slice(0, 60)})`);
  }
  // Duplicate ids.
  const ids = [...src.matchAll(/\bid="([^"]+)"/g)].map((x) => x[1]);
  const dup = ids.filter((x, i) => ids.indexOf(x) !== i);
  if (dup.length) fail(`${rel}: duplicate ids ${[...new Set(dup)].join(", ")}`);
  // Language switch points to the equivalent page.
  const visible = src.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<[^>]+>/g, " ");
  for (const re of forbidden) if (re.test(visible)) fail(`${rel}: forbidden pattern ${re} → "${visible.match(re)[0]}"`);
  // No untranslated text: Uzbek Latin (o‘ / g‘) on Russian pages, Cyrillic on Uzbek pages.
  // Allowed: the other language's own name in the switcher/footer and the 404 cross-link.
  const allowed = /O‘zbekcha( sayt)?|Русский|Русская версия сайта/g;
  const textOnly = visible.replace(allowed, "");
  if (expectRu) {
    const leak = textOnly.match(/[A-Za-z]*[og]‘[A-Za-z‘’]*/);
    if (leak) fail(`${rel}: Uzbek text on Russian page → "${leak[0]}"`);
  } else {
    const leak = textOnly.match(/[А-Яа-яЁё]{2,}/);
    if (leak) fail(`${rel}: Cyrillic text on Uzbek page → "${leak[0]}"`);
  }
  // Style rules: no eyebrow badges above headlines, no em dashes in titles/descriptions.
  if (/class="eyebrow"/.test(src)) fail(`${rel}: eyebrow badge above a headline`);
  if (/<title>[^<]*—|content="[^"]*—/.test(src)) fail(`${rel}: em dash in title/description`);
  // Previews are labelled.
  if (/class="phone /.test(src) && !/(Interfeys namunasi|Пример интерфейса)/.test(src)) fail(`${rel}: phone preview without sample label`);
}

// 3. Language switch keeps the equivalent page.
for (const file of html.filter((f) => !f.endsWith("404.html"))) {
  const rel = BASE + "/" + relative(dist, file).split(sep).join("/").replace(/index\.html$/, "");
  const src = readFileSync(file, "utf8");
  const langNav = src.match(/<nav class="lang"[\s\S]*?<\/nav>/)?.[0] || "";
  const hrefs = [...langNav.matchAll(/href="([^"]+)"/g)].map((m) => m[1]);
  const ruRoot = BASE + "/ru/";
  const counterpart = rel.startsWith(ruRoot) ? BASE + "/" + rel.slice(ruRoot.length) : ruRoot + rel.slice(BASE.length + 1);
  if (!hrefs.includes(rel) || !hrefs.includes(counterpart)) fail(`${rel}: language switch does not point to ${counterpart}`);
}

console.log(`Checked ${pages} HTML pages, ${files.length} files.`);
if (problems.length) {
  console.error(problems.map((p) => "  ✗ " + p).join("\n"));
  console.error(`${problems.length} problem(s).`);
  process.exit(1);
}
console.log("All checks passed.");
