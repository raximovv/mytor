// Real screenshots of the running site via headless Chrome/Edge + DevTools protocol (no dependencies; Node 22+).
// Usage: npm run serve (in another terminal), then:
//   node scripts/screenshots.js [baseUrl] [filter]   → PNGs in screenshots/
//   node scripts/screenshots.js [baseUrl] --audit    → every route × 320/375/430/1440: overflow, console errors,
//                                                      failed requests, small touch targets, heading order
import { spawn } from "node:child_process";
import { existsSync, mkdirSync, writeFileSync, mkdtempSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "screenshots");
mkdirSync(out, { recursive: true });
const base = (process.argv[2] || "http://localhost:4321").replace(/\/$/, "");
const filter = process.argv[3] || "";
const AUDIT = filter === "--audit";

const browserPath = [
  process.env.CHROME_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].filter(Boolean).find((p) => existsSync(p));
if (!browserPath) throw new Error("No Chrome/Edge found. Set CHROME_PATH.");

// [name, path, width, options] — options.full: full page; options.run: JS before capture; options.clip: selector to capture.
const D = 1440, M = 390;
const SHOTS = [
  ["01-home-desktop", "/", D, { full: true }],
  ["02-home-mobile", "/", M, { full: true }],
  ["03-home-ru-desktop", "/ru/", D, { full: true }],
  ["04-features-desktop", "/features/", D, { full: true }],
  ["05-features-ru-mobile", "/ru/features/", M, { full: true }],
  ["06-how-desktop", "/how-it-works/", D, { full: true }],
  ["06b-how-mobile-320", "/how-it-works/", 320, { full: true }],
  ["06c-home-mobile-320", "/", 320, { full: false }],
  ["06d-pricing-mobile-430", "/pricing/", 430, { full: true }],
  ["07-pricing-desktop", "/pricing/", D, { full: true }],
  ["08-pricing-ru-mobile", "/ru/pricing/", M, { full: true }],
  ["09-about-desktop", "/about/", D, { full: true }],
  ["10-demo-desktop", "/demo/", D, { full: true }],
  ["11-demo-ru-mobile-errors", "/ru/demo/", M, { full: true, run: `document.querySelector('[data-submit]').click()` }],
  ["12-demo-not-connected", "/demo/", D, { clip: "#demo-form", run: `
      const f=document.querySelector('#demo-form');
      f.name.value='Test'; f.shop.value='Namuna'; f.city.value='Guliston'; f.phone.value='+998 90 123 45 67'; f.consent.checked=true;
      document.querySelector('[data-submit]').click();` }],
  ["13-voice-step1", "/features/", D, { clip: "#voice [data-vdemo]" }],
  ["14-voice-step3", "/features/", D, { clip: "#voice [data-vdemo]", run: `document.querySelector('#voice [data-goto="3"]').click()` }],
  ["15-voice-step5-ru", "/ru/features/", D, { clip: "#voice [data-vdemo]", run: `document.querySelector('#voice [data-goto="5"]').click()` }],
  ["16-mobile-menu-open", "/pricing/", M, { full: false, run: `document.querySelector('.menu-btn').click()` }],
  ["17-privacy-desktop", "/privacy/", D, { full: true }],
  ["18-404-desktop", "/no-such-page/", D, { full: false }],
  ["19-404-ru-mobile", "/ru/no-such-page/", M, { full: true }],
  ["20-faq-open-mobile", "/", M, { clip: ".faq", run: `document.querySelectorAll('.faq details')[4].open=true` }],
].filter(([n]) => AUDIT || n.includes(filter));

const profile = mkdtempSync(join(tmpdir(), "mytor-shots-"));
const port = 9300 + Math.floor(Math.random() * 500);
const chrome = spawn(browserPath, [
  "--headless=new", "--disable-gpu", "--hide-scrollbars", "--no-first-run", "--no-default-browser-check",
  `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, "about:blank",
], { stdio: "ignore" });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let wsUrl;
for (let i = 0; i < 50 && !wsUrl; i++) {
  await sleep(200);
  try {
    const list = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
    wsUrl = list.find((t) => t.type === "page")?.webSocketDebuggerUrl;
  } catch {}
}
if (!wsUrl) { chrome.kill(); throw new Error("Could not connect to headless browser."); }

const ws = new WebSocket(wsUrl);
await new Promise((r) => ws.addEventListener("open", r, { once: true }));
let seq = 0;
const pending = new Map();
const waiters = [];
ws.addEventListener("message", (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) { const p = pending.get(m.id); pending.delete(m.id); m.error ? p.reject(new Error(m.error.message)) : p.resolve(m.result); }
  else if (m.method) waiters.filter((w) => w.method === m.method).forEach((w) => { waiters.splice(waiters.indexOf(w), 1); w.resolve(m.params); });
});
const send = (method, params = {}) => new Promise((resolve, reject) => { const id = ++seq; pending.set(id, { resolve, reject }); ws.send(JSON.stringify({ id, method, params })); });
const once = (method) => new Promise((resolve) => waiters.push({ method, resolve }));
const evaluate = async (expression) => (await send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true })).result.value;

await send("Page.enable");

if (AUDIT) {
  await send("Runtime.enable");
  await send("Network.enable");
  await send("Log.enable");
  const issues = [];
  let current = "";
  const record = (msg) => issues.push(`${current}: ${msg}`);
  ws.addEventListener("message", (e) => {
    const m = JSON.parse(e.data);
    if (m.method === "Runtime.exceptionThrown") record("JS exception " + m.params.exceptionDetails.text);
    if (m.method === "Runtime.consoleAPICalled" && ["error", "warning"].includes(m.params.type)) record("console." + m.params.type + " " + m.params.args.map((a) => a.value).join(" "));
    if (m.method === "Log.entryAdded" && m.params.entry.level === "error" && !/no-such-page/.test(m.params.entry.url || "")) record("log error " + m.params.entry.text + " " + (m.params.entry.url || ""));
    if (m.method === "Network.loadingFailed" && !m.params.canceled) record("request failed " + m.params.errorText);
    if (m.method === "Network.responseReceived" && m.params.response.status >= 400 && !/no-such-page/.test(m.params.response.url)) record(`HTTP ${m.params.response.status} ${m.params.response.url}`);
  });
  const routes = ["/", "/features/", "/how-it-works/", "/pricing/", "/about/", "/demo/", "/privacy/", "/no-such-page/"];
  const all = [...routes, ...routes.map((r) => "/ru" + r)];
  for (const width of [320, 375, 430, 1440]) {
    for (const path of all) {
      current = `${width}px ${path}`;
      await send("Emulation.setDeviceMetricsOverride", { width, height: 800, deviceScaleFactor: 1, mobile: width < 600 });
      const loaded = once("Page.loadEventFired");
      await send("Page.navigate", { url: base + path });
      await loaded;
      await evaluate(`document.fonts.ready.then(() => new Promise(r => setTimeout(r, 150)))`);
      const r = await evaluate(`(() => {
        const out = [];
        const vw = document.documentElement.clientWidth;
        const over = document.documentElement.scrollWidth - vw;
        if (over > 0) out.push("horizontal overflow " + over + "px");
        // Elements sticking out of the viewport (ignoring decorative/clipped ones).
        const wide = [...document.querySelectorAll("main *, header *, footer *")].filter(el => {
          const b = el.getBoundingClientRect();
          if (!b.width || el.closest("[aria-hidden=true], .hero, svg, .vscreen:not(.is-active), .nav:not(.is-open)")) return false;
          return b.right > vw + 1 || b.left < -1;
        }).slice(0, 3).map(el => el.tagName.toLowerCase() + "." + [...el.classList].join("."));
        if (wide.length) out.push("outside viewport: " + wide.join(", "));
        // Touch targets under 24×24 (WCAG 2.2 AA), excluding inline links in running text.
        const small = [...document.querySelectorAll("a, button, input, summary, select, textarea")].filter(el => {
          const b = el.getBoundingClientRect();
          if (!b.width || getComputedStyle(el).visibility === "hidden" || el.closest(".hp, .nav:not(.is-open)")) return false;
          if (el.tagName === "A" && el.closest("p, li") && !el.className && getComputedStyle(el).display === "inline") return false;
          return b.height < 24 || b.width < 24;
        }).map(el => el.tagName.toLowerCase() + (el.className ? "." + el.className.split(" ").join(".") : "") + " " + (el.textContent || "").trim().slice(0, 20));
        if (small.length) out.push("small targets: " + small.slice(0, 4).join(" | "));
        // Heading order: exactly one h1, no skipped levels.
        const hs = [...document.querySelectorAll("h1,h2,h3,h4")].map(h => +h.tagName[1]);
        if (hs.filter(x => x === 1).length !== 1) out.push("h1 count " + hs.filter(x => x === 1).length);
        hs.forEach((l, i) => { if (i && l > hs[i - 1] + 1) out.push("heading skip h" + hs[i - 1] + "→h" + l); });
        // Text clipped inside its box.
        const clipped = [...document.querySelectorAll("h1,h2,h3,.btn,.plate,.frow dd")].filter(el => el.scrollWidth > el.clientWidth + 1 && getComputedStyle(el).overflow !== "visible").slice(0, 3).map(el => el.tagName.toLowerCase() + " " + el.textContent.trim().slice(0, 24));
        if (clipped.length) out.push("clipped: " + clipped.join(" | "));
        return [...new Set(out)];
      })()`);
      r.forEach(record);
    }
  }
  console.log(issues.length ? issues.join("\n") : "Audit: no issues found.");
  console.log(`Audited ${all.length} routes × 4 widths.`);
  ws.close(); chrome.kill(); await sleep(300);
  try { rmSync(profile, { recursive: true, force: true }); } catch {}
  process.exit(issues.length ? 1 : 0);
}

for (const [name, path, width, opt] of SHOTS) {
  const mobile = width < 600;
  await send("Emulation.setDeviceMetricsOverride", { width, height: mobile ? 844 : 900, deviceScaleFactor: 1, mobile });
  const loaded = once("Page.loadEventFired");
  await send("Page.navigate", { url: base + path });
  await loaded;
  await evaluate(`document.fonts.ready.then(() => new Promise(r => setTimeout(r, 300)))`);
  if (opt.run) { await evaluate(`(async () => { ${opt.run} })()`); await sleep(700); }
  let params = { format: "png", captureBeyondViewport: true };
  if (opt.clip) {
    await evaluate(`document.querySelector(".site-header").style.position = "static"`);
    const r = await evaluate(`(() => { const b = document.querySelector(${JSON.stringify(opt.clip)}).getBoundingClientRect(); return { x: b.left - 16, y: b.top + scrollY - 16, width: b.width + 32, height: b.height + 32 }; })()`);
    params.clip = { ...r, x: Math.max(0, r.x), scale: 1 };
  } else if (opt.full) {
    const h = await evaluate(`document.documentElement.scrollHeight`);
    params.clip = { x: 0, y: 0, width, height: h, scale: 1 };
  }
  const overflow = await evaluate(`document.documentElement.scrollWidth - document.documentElement.clientWidth`);
  const { data } = await send("Page.captureScreenshot", params);
  writeFileSync(join(out, `${name}.png`), Buffer.from(data, "base64"));
  console.log(`saved screenshots/${name}.png${overflow > 0 ? `  ⚠ horizontal overflow ${overflow}px` : ""}`);
}
ws.close();
chrome.kill();
await sleep(300);
try { rmSync(profile, { recursive: true, force: true }); } catch {}
