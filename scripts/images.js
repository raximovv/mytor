// Renders the social-preview images (og-uz.png, og-ru.png) and apple-touch-icon.png into src/assets/
// with headless Chrome/Edge (no dependencies; Node 22+). Re-run after changing the headline copy:
//   node scripts/images.js
import { spawn } from "node:child_process";
import { existsSync, writeFileSync, mkdtempSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import uz from "../src/content/uz.js";
import ru from "../src/content/ru.js";
import { logo, ring } from "../src/components.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const assets = join(root, "src", "assets");
const browserPath = [
  process.env.CHROME_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].filter(Boolean).find((p) => existsSync(p));
if (!browserPath) throw new Error("No Chrome/Edge found. Set CHROME_PATH.");

const fonts = `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geologica:wght@700..800&family=Onest:wght@500..600&family=JetBrains+Mono:wght@700&display=block">`;

const og = (t) => `<!doctype html><html><head><meta charset="utf-8">${fonts}<style>
  * { margin: 0; box-sizing: border-box; }
  body { width: 1200px; height: 630px; overflow: hidden; background: #F6F1E7; color: #1A2230; font-family: Onest, sans-serif; position: relative; }
  .bar { position: absolute; left: 0; right: 0; bottom: 0; height: 14px; background: #E39B2D; }
  .brand { position: absolute; left: 80px; top: 70px; display: flex; align-items: center; gap: 16px; font: 800 44px/1 Geologica, sans-serif; letter-spacing: -.03em; }
  .brand svg { width: 58px; height: 58px; }
  h1 { position: absolute; left: 80px; top: 178px; width: 720px; font: 800 66px/1.04 Geologica, sans-serif; letter-spacing: -.03em; }
  h1 em { font-style: normal; box-shadow: inset 0 -.2em 0 #E39B2D; }
  .pilot { position: absolute; left: 80px; bottom: 74px; display: flex; gap: 12px; }
  .pilot span { font: 600 26px/1 Onest, sans-serif; background: #FFFCF6; border: 2px solid #DCD2BF; border-radius: 99px; padding: 14px 22px; }
  .pilot span:first-child { background: #1A2230; border-color: #1A2230; color: #F6F1E7; }
  .hero-ring { position: absolute; right: -120px; top: 40px; width: 560px; color: #E39B2D; opacity: .55; transform: rotate(-10deg); }
</style></head><body>
  ${ring(t.phoneHero.ring)}
  <div class="brand">${logo}<span>Mytor</span></div>
  <h1>${t.home.title}</h1>
  <div class="pilot">${t.pricing.facts.map((x) => `<span>${x}</span>`).join("")}</div>
  <div class="bar"></div>
</body></html>`;

const touch = `<!doctype html><html><head><meta charset="utf-8"><style>* { margin: 0; } body { width: 180px; height: 180px; background: #1A2230; }</style></head><body>
<svg viewBox="0 0 32 32" width="180" height="180"><rect width="32" height="32" fill="#1A2230"/><path d="M16 5.5c4.4 5.6 7 9.1 7 12.6a7 7 0 0 1-14 0c0-3.5 2.6-7 7-12.6z" fill="#E39B2D"/><path d="M12.6 18.4l2.4 2.4 4.6-4.9" fill="none" stroke="#1A2230" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
</body></html>`;

const JOBS = [
  ["og-uz.png", og(uz), 1200, 630],
  ["og-ru.png", og(ru), 1200, 630],
  ["apple-touch-icon.png", touch, 180, 180],
];

const profile = mkdtempSync(join(tmpdir(), "mytor-img-"));
const port = 9300 + Math.floor(Math.random() * 500);
const chrome = spawn(browserPath, ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--no-first-run", `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, "about:blank"], { stdio: "ignore" });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let wsUrl;
for (let i = 0; i < 50 && !wsUrl; i++) {
  await sleep(200);
  try { wsUrl = (await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()).find((t) => t.type === "page")?.webSocketDebuggerUrl; } catch {}
}
if (!wsUrl) { chrome.kill(); throw new Error("Could not connect to headless browser."); }
const ws = new WebSocket(wsUrl);
await new Promise((r) => ws.addEventListener("open", r, { once: true }));
let seq = 0;
const pending = new Map();
ws.addEventListener("message", (e) => { const m = JSON.parse(e.data); if (m.id && pending.has(m.id)) { const p = pending.get(m.id); pending.delete(m.id); m.error ? p.reject(new Error(m.error.message)) : p.resolve(m.result); } });
const send = (method, params = {}) => new Promise((resolve, reject) => { const id = ++seq; pending.set(id, { resolve, reject }); ws.send(JSON.stringify({ id, method, params })); });

for (const [name, html, width, height] of JOBS) {
  await send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: false });
  const { frameId } = await send("Page.getFrameTree").then((r) => r.frameTree.frame).then((f) => ({ frameId: f.id }));
  await send("Page.setDocumentContent", { frameId, html });
  // The font stylesheet loads asynchronously: wait until the display face is usable.
  await send("Runtime.evaluate", { expression: `(async () => { for (let i = 0; i < 80 && document.fonts.size === 0; i++) await new Promise(r => setTimeout(r, 100)); await Promise.all(["800 40px Geologica", "600 20px Onest", "700 16px \\"JetBrains Mono\\""].map(f => document.fonts.load(f, "Mo‘ж"))); await document.fonts.ready; await new Promise(r => setTimeout(r, 300)); })()`, awaitPromise: true });
  const { data } = await send("Page.captureScreenshot", { format: "png", clip: { x: 0, y: 0, width, height, scale: 1 } });
  writeFileSync(join(assets, name), Buffer.from(data, "base64"));
  console.log(`saved src/assets/${name}`);
}
ws.close();
chrome.kill();
await sleep(300);
try { rmSync(profile, { recursive: true, force: true }); } catch {}
