// End-to-end journey of a shop owner on a phone, in both languages, with real taps and typing
// (headless Chrome/Edge via DevTools protocol; no dependencies; Node 22+).
//   node scripts/journey.js [baseUrl] [--expect=not-connected|success|error] [--mock=http://localhost:4400]
// Home → mobile menu → pricing → FAQ → "Demo so‘rash" → form errors → fixed form → submit → result,
// plus the voice demo, sample lookup, language switch and the remembered language on the homepage.
// --expect must match how the site was built (no endpoint = not-connected). Only use fictional test data:
// with a real endpoint configured, every run sends a test request there.
import { spawn } from "node:child_process";
import { existsSync, mkdtempSync, rmSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import uz from "../src/content/uz.js";
import ru from "../src/content/ru.js";

const args = process.argv.slice(2);
const base = (args.find((a) => !a.startsWith("--")) || "http://localhost:4321").replace(/\/$/, "");
const expect = (args.find((a) => a.startsWith("--expect=")) || "--expect=not-connected").split("=")[1];
const mock = (args.find((a) => a.startsWith("--mock=")) || "").split("=")[1];

const browserPath = [
  process.env.CHROME_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].filter(Boolean).find((p) => existsSync(p));
if (!browserPath) throw new Error("No Chrome/Edge found. Set CHROME_PATH.");

const profile = mkdtempSync(join(tmpdir(), "mytor-journey-"));
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
const waiters = [];
const errors = [];
ws.addEventListener("message", (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) { const p = pending.get(m.id); pending.delete(m.id); m.error ? p.reject(new Error(m.error.message)) : p.resolve(m.result); return; }
  if (m.method === "Runtime.exceptionThrown") errors.push(m.params.exceptionDetails.exception?.description || m.params.exceptionDetails.text);
  waiters.filter((w) => w.method === m.method).forEach((w) => { waiters.splice(waiters.indexOf(w), 1); w.resolve(m.params); });
});
const send = (method, params = {}) => new Promise((resolve, reject) => { const id = ++seq; pending.set(id, { resolve, reject }); ws.send(JSON.stringify({ id, method, params })); });
const once = (method, ms = 15000) => new Promise((resolve, reject) => { const w = { method, resolve }; waiters.push(w); setTimeout(() => { const i = waiters.indexOf(w); if (i >= 0) { waiters.splice(i, 1); reject(new Error(`timeout waiting for ${method}`)); } }, ms); });
const ev = async (expression) => {
  const r = await send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true });
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || r.exceptionDetails.text);
  return r.result.value;
};

let passed = 0, failed = 0;
const ok = (cond, label) => { cond ? passed++ : failed++; console.log(`${cond ? "  ✓" : "  ✗"} ${label}`); };
const settle = () => ev(`document.fonts.ready.then(() => new Promise(r => setTimeout(r, 200)))`);
const go = async (path) => { const l = once("Page.loadEventFired"); await send("Page.navigate", { url: base + path }); await l; await settle(); };
const path = () => ev("location.pathname");

// Tap like a finger: scroll the element into view, make sure nothing covers it, press and release.
async function tap(sel, { nav = false } = {}) {
  const pt = await ev(`(() => {
    const el = document.querySelector(${JSON.stringify(sel)});
    if (!el) return { err: "missing" };
    el.scrollIntoView({ block: "center", behavior: "instant" });
    const b = el.getBoundingClientRect();
    if (!b.width || !b.height) return { err: "not visible" };
    const x = b.left + b.width / 2, y = b.top + b.height / 2;
    const hit = document.elementFromPoint(x, y);
    const reach = hit && (hit === el || el.contains(hit) || (hit.closest && hit.closest("label") && hit.closest("label").control === el) || (el.tagName === "LABEL" && el.control === hit));
    return reach ? { x, y } : { err: "covered by " + (hit ? hit.tagName + "." + hit.className : "nothing") };
  })()`);
  if (pt.err) throw new Error(`tap ${sel}: ${pt.err}`);
  const loaded = nav ? once("Page.loadEventFired") : null;
  for (const type of ["mousePressed", "mouseReleased"]) await send("Input.dispatchMouseEvent", { type, x: pt.x, y: pt.y, button: "left", clickCount: 1 });
  if (loaded) { await loaded; await settle(); } else await sleep(120);
}
async function type(sel, text) {
  for (let attempt = 1; attempt <= 2; attempt++) {
    await ev(`(() => { const el = document.querySelector(${JSON.stringify(sel)}); el.focus(); el.select && el.select(); })()`);
    await sleep(40);
    await send("Input.dispatchKeyEvent", { type: "keyDown", key: "Backspace", code: "Backspace", windowsVirtualKeyCode: 8 });
    await send("Input.dispatchKeyEvent", { type: "keyUp", key: "Backspace", code: "Backspace", windowsVirtualKeyCode: 8 });
    await send("Input.insertText", { text });
    await sleep(60);
    if ((await ev(`document.querySelector(${JSON.stringify(sel)}).value`)) === text) return;
    console.log(`    (retyping into ${sel})`);
  }
  throw new Error(`could not type into ${sel}`);
}
const key = async (k, code, vk) => { for (const t of ["keyDown", "keyUp"]) await send("Input.dispatchKeyEvent", { type: t, key: k, code, windowsVirtualKeyCode: vk }); await sleep(80); };
const inView = (sel) => ev(`(() => { const el = document.querySelector(${JSON.stringify(sel)}); if (!el) return false; const b = el.getBoundingClientRect(); return b.top >= 0 && b.bottom <= innerHeight && b.width > 0; })()`);
const text = (sel) => ev(`(document.querySelector(${JSON.stringify(sel)}) || {}).textContent || ""`);
const visible = (sel) => ev(`(() => { const el = document.querySelector(${JSON.stringify(sel)}); return !!el && !el.hidden && el.getBoundingClientRect().height > 0; })()`);

await send("Page.enable");
await send("Runtime.enable");
await send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });

for (const t of [uz, ru]) {
  const P = t.lang === "uz" ? "/" : "/ru/";
  const other = t.lang === "uz" ? "ru" : "uz";
  console.log(`\n${t.name} (${t.lang}) · 390×844`);

  // 1–3. Opens the site and understands it from the first screen.
  await go(P);
  if (t.lang === "uz") await ev(`localStorage.clear()`);
  ok(await inView("h1"), "headline visible without scrolling");
  ok(await inView(".hero .btn-primary"), `primary CTA «${t.ui.cta}» visible without scrolling`);
  ok((await text(".hero .btn-primary")) === t.ui.cta, "primary CTA label");
  ok(!(await ev(`/interfeys namunasi|пример интерфейса/i.test(document.querySelector("main").innerText) || !!document.querySelector(".status-note, .sample-tag, .vnote")`)), "no demo/sample labels on the page itself");
  ok(/interfeys namunasi|пример интерфейса/i.test(await text(".site-footer")), "footer still notes screens are examples");
  ok(await ev(`document.querySelectorAll("main > section").length`) <= 9, "homepage kept to 8 sections + CTA");

  // Voice demo: step through on the phone, caption follows.
  for (let i = 0; i < 4; i++) await tap("#voice [data-vnext]");
  ok((await ev(`document.querySelector('#voice .vstep[aria-current="step"]').dataset.goto`)) === "5", "voice demo: Next reaches step 5");
  ok((await text("#voice [data-vcap] b")).startsWith("5/5"), "voice demo: visible step caption updates on phone");
  ok(await visible("#voice [data-vnotify]"), "voice demo: owner notification appears on step 5");
  ok(await inView("#voice .phone-demo") || (await ev(`document.querySelector('#voice .phone-demo').getBoundingClientRect().bottom > 0`)), "voice demo: phone stays on screen while tapping controls");
  await tap("#voice [data-vnext]");
  ok((await ev(`document.querySelector('#voice .vstep[aria-current="step"]').dataset.goto`)) === "1", "voice demo: restart returns to step 1");
  await tap('#voice .vstep[data-goto="3"]');
  ok((await text("#voice [data-vlive]")).startsWith("3/5"), "voice demo: step change announced to screen readers");

  // FAQ opens and closes.
  await tap("#faq-h ~ .faq details:nth-of-type(2) summary, .faq details:nth-of-type(2) summary");
  ok(await ev(`document.querySelectorAll(".faq details")[1].open`), "FAQ: tap opens the answer");
  ok(/(majburlamaydi|не обязывает)/.test(await ev(`document.querySelectorAll(".faq details")[1].textContent`)), "FAQ: no-commitment answer present");
  await tap(".faq details:nth-of-type(2) summary");
  ok(!(await ev(`document.querySelectorAll(".faq details")[1].open`)), "FAQ: second tap closes it");

  // Mobile menu: open, Escape closes and returns focus, then go to pricing.
  await ev(`scrollTo(0, 0)`);
  await tap(".menu-btn");
  ok((await ev(`document.querySelector(".menu-btn").getAttribute("aria-expanded")`)) === "true" && (await visible("#site-nav")), "menu opens");
  await key("Escape", "Escape", 27);
  ok((await ev(`document.querySelector(".menu-btn").getAttribute("aria-expanded")`)) === "false" && (await ev(`document.activeElement.classList.contains("menu-btn")`)), "Escape closes menu and returns focus");
  await tap(".menu-btn");
  await tap(`#site-nav a[href$="pricing/"]`, { nav: true });
  ok((await path()) === P + "pricing/", "menu → pricing page");

  // 4. Pricing: free pilot, prices not final, CTA reachable.
  ok(await inView(".page-hero .btn-primary"), "pricing: CTA visible without scrolling");
  ok((await ev(`[...document.querySelectorAll(".page-hero .facts li")].map(l => l.textContent).join("|")`)) === t.pricing.facts.join("|"), "pricing: 6 weeks · free · no commitment");
  ok((await text(".badge-proposal")).includes(t.pricing.proposal), "pricing: prices marked as being tested");
  ok((await ev(`document.querySelectorAll(".plan").length`)) === 3, "pricing: 3 proposed plans");

  // 5. Decides to request a demo.
  await tap(".page-hero .btn-primary", { nav: true });
  ok((await path()) === P + "demo/", "pricing CTA → demo page");
  ok(await inView(".page-hero .facts"), "demo: reassurance (free, no commitment) on first screen");

  // 6. Fills out the form: first an empty submit, then a wrong phone, then correct.
  await tap("[data-submit]");
  ok(await visible("[data-summary]"), "empty submit: error summary shown");
  ok((await ev(`[...document.querySelectorAll('[aria-invalid="true"]')].map(e => e.name).join(",")`)) === "name,phone,city,consent", "empty submit: only name, phone, city, consent required");
  ok((await ev(`document.activeElement.id`)) === "f-name", "empty submit: focus moves to first problem");
  await type("#f-name", "Test Testov");
  await type("#f-phone", "90 12");
  await tap("[data-submit]");
  ok((await ev(`document.activeElement.id`)) === "f-phone" && (await text("#f-phone-err")) === t.form.errors.phone, "short phone number: clear phone error");
  await type("#f-phone", "+998 90 123 45 67");
  await type("#f-city", t.form.cities[0]);
  await tap('label[for="f-branches-3"]');
  ok(await ev(`document.querySelector("#f-branches-3").checked`), "branch count: one tap");
  await tap('label[for="f-consent"]');
  ok(!(await visible("#f-name-err")) && !(await visible("#f-phone-err")), "errors clear once fixed");
  const before = mock ? (await (await fetch(mock + "/count")).json()).received : 0;
  await tap("[data-submit]");
  if (expect !== "not-connected") await ev(`new Promise(r => { const t0 = Date.now(); (function w() { const el = document.querySelector("[data-result]"); if (!el.hidden || Date.now() - t0 > 20000) r(); else setTimeout(w, 100); })(); })`);
  const cls = await ev(`document.querySelector("[data-result]").className`);
  const title = await text("[data-result] h3");
  if (expect === "not-connected") {
    ok(cls.includes("is-warn") && title === t.form.notConnectedTitle, "not connected: says plainly that nothing was sent");
    ok((await ev(`document.querySelector("#f-name").value`)) === "Test Testov", "not connected: typed data kept on the page");
  } else if (expect === "success") {
    ok(cls.includes("is-success") && title === t.form.successTitle, "success message shown");
    ok((await ev(`document.querySelector("#f-name").value`)) === "", "form cleared after success");
    if (mock) ok((await (await fetch(mock + "/count")).json()).received === before + 1, "endpoint received exactly one valid request");
  } else {
    ok(cls.includes("is-error") && title === t.form.failTitle, "failure message shown");
    ok((await ev(`document.querySelector("#f-name").value`)) === "Test Testov", "failure: typed data kept for retry");
    ok(!(await ev(`document.querySelector("[data-submit]").disabled`)), "failure: button usable again");
  }
  ok((await ev(`document.activeElement === document.querySelector("[data-result]")`)), "result receives focus (announced)");
  ok((await ev(`document.querySelector("#demo-form").method`)) === "post", "form posts (no personal data in URL without JS)");

  // Language switch keeps the page and is remembered for the bare homepage.
  await ev(`scrollTo(0, 0)`);
  await tap(`.lang a[hreflang="${other}"]`, { nav: true });
  ok((await path()) === (other === "uz" ? "/demo/" : "/ru/demo/"), "language switch keeps the same page");
  ok((await ev(`localStorage.getItem("mytor-lang")`)) === other, "language choice remembered");
  await go("/");
  ok((await path()) === (other === "ru" ? "/ru/" : "/"), `typing the bare address opens the ${other === "ru" ? "Russian" : "Uzbek"} homepage`);

  // Sample lookup on features.
  await go(P + "features/");
  await type("[data-lookup-input]", "477");
  ok((await ev(`document.querySelectorAll("[data-lookup-list] li:not([hidden])").length`)) === 1, "features: sample lookup filters by plate");
}

ok(errors.length === 0, `no JavaScript errors${errors.length ? ": " + errors.join(" | ") : ""}`);
console.log(`\n${passed} passed, ${failed} failed (expect=${expect})`);
ws.close();
chrome.kill();
await sleep(300);
try { rmSync(profile, { recursive: true, force: true }); } catch {}
process.exit(failed ? 1 : 0);
