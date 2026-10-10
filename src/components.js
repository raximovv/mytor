// Reusable HTML fragments. Content strings are authored in src/content and trusted.
import { url } from "./routes.js";

const svg = (body, extra = "") =>
  `<svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"${extra}>${body}</svg>`;

export const icon = {
  mic: svg('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21M9 21h6"/>'),
  check: svg('<path d="M5 12.5l4.5 4.5L19 7.5"/>'),
  search: svg('<circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.2-4.2"/>'),
  bell: svg('<path d="M6 9.5a6 6 0 0 1 12 0c0 5 2 6.5 2 6.5H4s2-1.5 2-6.5"/><path d="M10 19.5a2 2 0 0 0 4 0"/>'),
  drop: svg('<path d="M12 3.5c3.6 4.6 6 7.9 6 11a6 6 0 0 1-12 0c0-3.1 2.4-6.4 6-11z"/>'),
  alert: svg('<path d="M12 4l9 15.5H3L12 4z"/><path d="M12 10v4.5M12 17.2v.1"/>'),
  edit: svg('<path d="M4 20h4L19.5 8.5a2.1 2.1 0 0 0-4-4L4 16v4z"/>'),
  scale: svg('<path d="M12 4v16M5 20h14M6 8h12M6 8l-3 6a3 3 0 0 0 6 0L6 8zM18 8l-3 6a3 3 0 0 0 6 0l-3-6z"/>'),
  sum: svg('<path d="M4 5h16v14H4zM8 9h8M8 13h5"/>'),
  arrow: svg('<path d="M5 12h14M13 6l6 6-6 6"/>'),
  user: svg('<circle cx="12" cy="8" r="4"/><path d="M4 20.5c1.4-4 4.4-6 8-6s6.6 2 8 6"/>'),
  wrench: svg('<path d="M14.5 6.5a4 4 0 0 0 5 5L12 19a2.1 2.1 0 0 1-3-3l7.5-7.5zM14.5 6.5L17 4"/>'),
  car: svg('<path d="M4 16v-4l2-5h12l2 5v4M4 16h16M4 16v2.5M20 16v2.5"/><circle cx="7.5" cy="13" r=".8"/><circle cx="16.5" cy="13" r=".8"/>'),
  send: svg('<path d="M21 3L10 14M21 3l-7 18-4-7-7-4 18-7z"/>'),
  play: svg('<path d="M7 5l12 7-12 7V5z"/>'),
  pause: svg('<path d="M8 5v14M16 5v14"/>'),
  restart: svg('<path d="M4 12a8 8 0 1 0 2.4-5.7M4 4v4.5h4.5"/>'),
  back: svg('<path d="M19 12H5M11 6l-6 6 6 6"/>'),
  menu: svg('<path d="M4 7h16M4 12h16M4 17h16"/>'),
  close: svg('<path d="M6 6l12 12M18 6L6 18"/>'),
  box: svg('<path d="M3.5 7.5L12 3l8.5 4.5v9L12 21l-8.5-4.5v-9zM3.5 7.5L12 12l8.5-4.5M12 12v9"/>'),
  download: svg('<path d="M12 4v11M7 10.5l5 5 5-5M5 19.5h14"/>'),
  book: svg('<path d="M5 4.5h11a3 3 0 0 1 3 3V20H8a3 3 0 0 1-3-3V4.5zM5 17a3 3 0 0 1 3-3h11"/>'),
};

export const logo = `<svg class="logo-mark" viewBox="0 12 100 76" width="40" height="30" aria-hidden="true" focusable="false"><path fill="#01377F" fill-rule="evenodd" d="M77.6 87.2C77.5 87.1 77.0 86.5 76.6 85.8C75.3 83.7 74.2 82.3 72.9 81.0C69.8 78.0 66.6 76.5 62.4 76.2C59.8 75.9 56.1 76.6 52.9 77.9C51.7 78.4 47.8 80.3 45.7 81.5C43.6 82.7 40.6 84.2 39.4 84.7C34.5 86.8 29.9 87.2 25.3 86.0C21.4 85.0 17.6 82.7 15.0 79.6C13.0 77.2 11.4 74.1 10.7 71.3C10.2 69.4 10.1 68.5 10.0 65.8L10.0 63.3L8.8 62.6C8.1 62.3 7.1 61.7 6.6 61.4C3.8 59.9 2.6 59.1 1.6 57.9C0.6 56.5 0.1 55.3 0.0 53.7C-0.1 52.0 0.4 50.6 1.5 49.1C2.0 48.5 3.3 47.4 3.6 47.4C3.7 47.4 4.5 47.8 5.5 48.3C6.4 48.8 7.7 49.5 8.3 49.9C9.9 50.7 12.1 51.9 14.7 53.4C20.6 56.6 22.5 57.7 23.5 58.2C24.4 58.7 24.5 58.8 24.4 59.0C24.4 59.1 24.3 59.7 24.2 60.3C23.2 64.1 23.9 67.8 25.9 70.3C26.9 71.5 28.4 72.5 30.0 72.9C30.6 73.1 30.9 73.1 32.0 73.0C33.9 73.0 35.3 72.5 37.2 71.4C41.0 69.2 44.4 65.5 46.5 61.1C47.3 59.5 47.8 58.1 48.1 56.8C48.3 55.6 48.2 53.7 47.9 52.9C47.7 52.1 47.2 51.2 46.7 50.6C45.9 49.6 44.3 48.7 42.7 48.2C41.8 48.0 41.6 48.0 40.0 48.0C38.6 48.0 38.2 48.0 37.3 48.2C35.6 48.5 34.0 49.2 32.4 50.1C30.9 50.9 29.5 52.0 27.8 53.6L27.1 54.2L25.1 53.0C19.5 49.8 17.2 48.4 17.0 48.1C16.9 47.7 17.0 47.5 18.0 46.2C22.5 40.6 28.9 36.7 35.3 35.4C37.4 35.0 38.2 34.9 40.4 34.9C43.2 34.9 45.0 35.2 47.3 36.0C50.4 37.0 52.8 38.4 55.4 40.7C58.3 43.3 59.3 44.0 60.7 44.8C62.1 45.6 63.9 46.2 65.6 46.4C67.0 46.6 69.5 46.5 70.7 46.2C76.9 44.8 81.6 40.1 83.1 34.1C83.4 32.8 83.5 30.4 83.2 29.2C82.9 27.4 82.3 25.7 81.4 24.4C80.9 23.5 80.9 23.5 82.7 22.1C84.7 20.8 86.5 19.9 88.0 19.7C91.2 19.2 94.3 20.8 95.8 23.7C96.6 25.3 97.0 27.3 97.0 30.1C97.2 34.6 96.3 38.7 94.2 42.8C91.7 47.9 87.9 52.1 83.0 55.1C79.4 57.4 75.9 58.8 71.6 59.6C71.0 59.8 70.5 59.9 70.5 59.9C70.5 59.9 70.0 61.1 69.1 63.4L68.7 64.4L70.0 64.8C75.0 66.2 79.1 68.5 82.8 72.0C83.3 72.6 83.7 73.0 83.8 73.0C83.8 73.0 84.9 72.4 86.3 71.7C87.6 71.0 89.0 70.3 89.5 70.2C91.9 69.2 94.2 69.1 96.1 70.1C98.3 71.2 99.5 73.0 99.9 75.6C100.1 76.9 100.2 76.8 96.9 78.4C95.3 79.1 93.6 79.9 93.1 80.2C92.5 80.5 90.6 81.4 88.9 82.2C87.2 83.0 84.3 84.4 82.5 85.2C80.7 86.1 79.0 86.9 78.6 87.0C77.9 87.4 77.9 87.4 77.6 87.2ZM31.9 70.2C31.1 70.1 30.5 69.3 30.4 68.2C30.3 67.6 30.5 66.3 30.9 65.3C31.8 62.6 34.4 58.7 37.0 56.2C39.4 53.8 41.4 52.7 42.9 52.6C43.8 52.6 44.2 52.9 44.6 53.5C45.8 55.5 44.0 60.1 40.3 64.6C37.3 68.2 33.8 70.6 31.9 70.2ZM65.5 42.5C63.6 42.3 62.1 41.9 60.7 41.1C58.5 40.0 57.0 38.4 54.0 34.2C53.5 33.5 52.6 32.2 51.9 31.3C51.3 30.3 50.4 29.1 50.0 28.5C49.4 27.6 49.3 27.4 49.3 27.0C49.3 26.2 50.4 23.5 51.4 21.8C53.0 19.1 55.5 16.6 58.3 15.1C60.9 13.7 64.4 12.8 67.4 12.7C68.3 12.7 68.4 12.7 68.7 12.9C68.8 13.0 69.5 13.9 70.3 14.9C71.0 15.8 71.6 16.6 71.7 16.6C71.8 16.6 73.6 16.0 75.8 15.3C79.0 14.2 79.8 14.0 80.1 14.0C80.4 14.1 80.6 14.2 81.1 14.8C82.1 16.1 82.1 16.1 80.8 17.2C78.5 19.0 75.6 21.4 75.6 21.5C75.5 21.5 76.0 22.2 76.5 23.0C78.0 25.3 78.8 26.8 79.1 28.7C79.6 32.2 78.3 35.9 75.7 38.6C73.3 41.0 70.2 42.3 66.8 42.5C66.3 42.5 65.7 42.5 65.5 42.5Z"/></svg>`;
// The mascot glyph alone, for icons that draw their own background.
export const logoPath = `M77.6 87.2C77.5 87.1 77.0 86.5 76.6 85.8C75.3 83.7 74.2 82.3 72.9 81.0C69.8 78.0 66.6 76.5 62.4 76.2C59.8 75.9 56.1 76.6 52.9 77.9C51.7 78.4 47.8 80.3 45.7 81.5C43.6 82.7 40.6 84.2 39.4 84.7C34.5 86.8 29.9 87.2 25.3 86.0C21.4 85.0 17.6 82.7 15.0 79.6C13.0 77.2 11.4 74.1 10.7 71.3C10.2 69.4 10.1 68.5 10.0 65.8L10.0 63.3L8.8 62.6C8.1 62.3 7.1 61.7 6.6 61.4C3.8 59.9 2.6 59.1 1.6 57.9C0.6 56.5 0.1 55.3 0.0 53.7C-0.1 52.0 0.4 50.6 1.5 49.1C2.0 48.5 3.3 47.4 3.6 47.4C3.7 47.4 4.5 47.8 5.5 48.3C6.4 48.8 7.7 49.5 8.3 49.9C9.9 50.7 12.1 51.9 14.7 53.4C20.6 56.6 22.5 57.7 23.5 58.2C24.4 58.7 24.5 58.8 24.4 59.0C24.4 59.1 24.3 59.7 24.2 60.3C23.2 64.1 23.9 67.8 25.9 70.3C26.9 71.5 28.4 72.5 30.0 72.9C30.6 73.1 30.9 73.1 32.0 73.0C33.9 73.0 35.3 72.5 37.2 71.4C41.0 69.2 44.4 65.5 46.5 61.1C47.3 59.5 47.8 58.1 48.1 56.8C48.3 55.6 48.2 53.7 47.9 52.9C47.7 52.1 47.2 51.2 46.7 50.6C45.9 49.6 44.3 48.7 42.7 48.2C41.8 48.0 41.6 48.0 40.0 48.0C38.6 48.0 38.2 48.0 37.3 48.2C35.6 48.5 34.0 49.2 32.4 50.1C30.9 50.9 29.5 52.0 27.8 53.6L27.1 54.2L25.1 53.0C19.5 49.8 17.2 48.4 17.0 48.1C16.9 47.7 17.0 47.5 18.0 46.2C22.5 40.6 28.9 36.7 35.3 35.4C37.4 35.0 38.2 34.9 40.4 34.9C43.2 34.9 45.0 35.2 47.3 36.0C50.4 37.0 52.8 38.4 55.4 40.7C58.3 43.3 59.3 44.0 60.7 44.8C62.1 45.6 63.9 46.2 65.6 46.4C67.0 46.6 69.5 46.5 70.7 46.2C76.9 44.8 81.6 40.1 83.1 34.1C83.4 32.8 83.5 30.4 83.2 29.2C82.9 27.4 82.3 25.7 81.4 24.4C80.9 23.5 80.9 23.5 82.7 22.1C84.7 20.8 86.5 19.9 88.0 19.7C91.2 19.2 94.3 20.8 95.8 23.7C96.6 25.3 97.0 27.3 97.0 30.1C97.2 34.6 96.3 38.7 94.2 42.8C91.7 47.9 87.9 52.1 83.0 55.1C79.4 57.4 75.9 58.8 71.6 59.6C71.0 59.8 70.5 59.9 70.5 59.9C70.5 59.9 70.0 61.1 69.1 63.4L68.7 64.4L70.0 64.8C75.0 66.2 79.1 68.5 82.8 72.0C83.3 72.6 83.7 73.0 83.8 73.0C83.8 73.0 84.9 72.4 86.3 71.7C87.6 71.0 89.0 70.3 89.5 70.2C91.9 69.2 94.2 69.1 96.1 70.1C98.3 71.2 99.5 73.0 99.9 75.6C100.1 76.9 100.2 76.8 96.9 78.4C95.3 79.1 93.6 79.9 93.1 80.2C92.5 80.5 90.6 81.4 88.9 82.2C87.2 83.0 84.3 84.4 82.5 85.2C80.7 86.1 79.0 86.9 78.6 87.0C77.9 87.4 77.9 87.4 77.6 87.2ZM31.9 70.2C31.1 70.1 30.5 69.3 30.4 68.2C30.3 67.6 30.5 66.3 30.9 65.3C31.8 62.6 34.4 58.7 37.0 56.2C39.4 53.8 41.4 52.7 42.9 52.6C43.8 52.6 44.2 52.9 44.6 53.5C45.8 55.5 44.0 60.1 40.3 64.6C37.3 68.2 33.8 70.6 31.9 70.2ZM65.5 42.5C63.6 42.3 62.1 41.9 60.7 41.1C58.5 40.0 57.0 38.4 54.0 34.2C53.5 33.5 52.6 32.2 51.9 31.3C51.3 30.3 50.4 29.1 50.0 28.5C49.4 27.6 49.3 27.4 49.3 27.0C49.3 26.2 50.4 23.5 51.4 21.8C53.0 19.1 55.5 16.6 58.3 15.1C60.9 13.7 64.4 12.8 67.4 12.7C68.3 12.7 68.4 12.7 68.7 12.9C68.8 13.0 69.5 13.9 70.3 14.9C71.0 15.8 71.6 16.6 71.7 16.6C71.8 16.6 73.6 16.0 75.8 15.3C79.0 14.2 79.8 14.0 80.1 14.0C80.4 14.1 80.6 14.2 81.1 14.8C82.1 16.1 82.1 16.1 80.8 17.2C78.5 19.0 75.6 21.4 75.6 21.5C75.5 21.5 76.0 22.2 76.5 23.0C78.0 25.3 78.8 26.8 79.1 28.7C79.6 32.2 78.3 35.9 75.7 38.6C73.3 41.0 70.2 42.3 66.8 42.5C66.3 42.5 65.7 42.5 65.5 42.5Z`;

// Uzbek-style licence plate: region | number | UZ
export const plate = (p) => {
  const [reg, ...rest] = p.split(" ");
  return `<span class="plate"><span class="plate-reg">${reg}</span><span class="plate-num">${rest.join(" ")}</span><span class="plate-uz" aria-hidden="true">UZ</span></span>`;
};

// Circular "service stamp" — the site's recurring motif.
let stampSeq = 0;
export const stamp = (text, cls = "", mark = "check") => {
  const id = `stp${++stampSeq}`;
  const center =
    mark === "check"
      ? `<path d="M45 61l10 10 21-23" fill="none" stroke="currentColor" stroke-width="6.5" stroke-linecap="round" stroke-linejoin="round"/>`
      : `<text x="60" y="70" text-anchor="middle" font-size="27" font-weight="800" fill="currentColor" font-family="JetBrains Mono, monospace">${mark}</text>`;
  return `<svg class="stamp ${cls}" viewBox="0 0 120 120" aria-hidden="true" focusable="false"><defs><path id="${id}" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0"/></defs><circle cx="60" cy="60" r="56" fill="none" stroke="currentColor" stroke-width="2.5"/><circle cx="60" cy="60" r="33" fill="none" stroke="currentColor" stroke-width="1.4" stroke-dasharray="3 3"/><text font-size="10" font-weight="700" letter-spacing="1.2" fill="currentColor" font-family="JetBrains Mono, monospace"><textPath href="#${id}" textLength="270" lengthAdjust="spacing">${text}</textPath></text>${center}</svg>`;
};

export const stampsRow = (filled, total = 6, label = "") =>
  `<div class="stamps" role="img" aria-label="${label}">${Array.from({ length: total }, (_, i) => `<span class="${i < filled ? "on" : ""}">${i < filled ? icon.check : i + 1}</span>`).join("")}</div>`;

// Short reassurance chips (e.g. "6 hafta · Bepul · Majburiyatsiz").
export const facts = (items) => `<ul class="facts">${items.map((x) => `<li>${icon.check}${x}</li>`).join("")}</ul>`;

// Status-bar battery (decorative).
const battery = `<svg class="phone-battery" viewBox="0 0 27 13" width="27" height="13" aria-hidden="true" focusable="false"><rect x=".75" y=".75" width="22.5" height="11.5" rx="3.2" fill="none" stroke="currentColor" stroke-width="1.3" opacity=".55"/><rect x="2.6" y="2.6" width="15.5" height="7.8" rx="1.8" fill="currentColor"/><path d="M24.9 4.4v4.2c.9-.3 1.5-1.1 1.5-2.1s-.6-1.8-1.5-2.1z" fill="currentColor" opacity=".55"/></svg>`;

export const phone = (time, body, cls = "") =>
  `<div class="phone ${cls}"><div class="phone-bar"><span>${time}</span><span class="phone-notch" aria-hidden="true"></span>${battery}</div><div class="phone-screen">${body}</div></div>`;

export const sectionHead = ({ eyebrow, title, lead }, { id = "", cls = "", kicker = false } = {}) => {
  const k = kicker && eyebrow ? `<b class="kicker">${eyebrow.replace(/^\d+ · /, "")}.</b> ` : "";
  return `<div class="sec-head ${cls}"><h2 ${id ? `id="${id}"` : ""}>${title}</h2>${lead ? `<p class="lead">${k}${lead}</p>` : ""}</div>`;
};

export const pageHero = ({ title, lead }, extra = "", cls = "") =>
  `<section class="page-hero ${cls}"><div class="wrap"><h1 class="display">${title}</h1>${lead ? `<p class="lead">${lead}</p>` : ""}${extra}</div></section>`;

export const actions = (t, lang, { secondary = true, cls = "" } = {}) =>
  `<div class="actions ${cls}"><a class="btn btn-primary btn-lg" href="${url(lang, "demo")}">${t.ui.cta}</a>${secondary ? `<a class="btn btn-ghost btn-lg" href="${url(lang, "how")}">${t.ui.ctaSecondary}</a>` : ""}</div>`;

export const faq = (items) =>
  `<div class="faq">${items
    .map((i) => `<details><summary><span>${i.q}</span><span class="faq-i" aria-hidden="true"></span></summary><div class="faq-a"><p>${i.a}</p></div></details>`)
    .join("")}</div>`;

export const ctaBand = (t, lang, current = "") =>
  `<section class="cta-band" aria-labelledby="cta-title"><div class="wrap cta-inner">${stamp(t.demo.stamp, "cta-stamp")}<div class="cta-copy"><h2 id="cta-title">${t.cta.title}</h2><p>${t.cta.text}</p></div><div class="actions"><a class="btn btn-primary btn-lg" href="${url(lang, "demo")}">${t.ui.cta}</a>${current === "how" ? "" : `<a class="btn btn-ghost-light btn-lg" href="${url(lang, "how")}">${t.ui.ctaSecondary}</a>`}</div></div></section>`;

/* ---------- product previews ---------- */

const frow = (label, value, state = "ok", note = "") =>
  `<div class="frow is-${state}"><dt>${label}</dt><dd>${value}${note ? ` <span class="fnote">${note}</span>` : ""}</dd></div>`;

// The five voice-entry screens: speak → draft → clarify → confirm → history & stock. Illustrative only.
// Each call renders fresh stamps (unique ids), so a page can show the screens twice.
export const voiceScreens = (t) => {
  const d = t.demo, f = d.fields, v = d.values;
  const vehicle = `${plate("20 D 477 BB")} <span class="fsub">${t.sample.car} · ${v.vehicleFound}</span>`;
  return [
    `<div class="scr-title">${d.newService}</div>
     <div class="listen"><span class="mic-btn">${icon.mic}</span><span class="wave" aria-hidden="true">${"<i></i>".repeat(13)}</span><span class="listen-text">${d.listening}</span></div>
     <p class="transcript">${d.transcript}</p>`,
    `<div class="scr-row"><span class="scr-title">${d.newService}</span><span class="pill pill-draft">${d.draft}</span></div>
     <dl class="draft">
       ${frow(f.vehicle, vehicle)}
       ${frow(f.service, v.service)}
       ${frow(f.product, v.productDraft, "need", `<span class="pill pill-need">${d.needs}</span>`)}
       ${frow(f.qty, v.qtyDraft)}
       ${frow(f.total, v.total)}
       ${frow(f.payment, v.payment)}
       ${frow(f.mileage, `<span class="muted">${v.optional}</span>`, "opt")}
     </dl>`,
    `<div class="ask"><p>${d.ask}</p><div class="ask-opts"><span class="chip is-picked">${icon.check}${d.optBarrel}</span><span class="chip">${d.optBottle}</span></div></div>
     <div class="say-inline">${icon.mic}<span>${d.correction}</span></div>
     <dl class="draft draft-tight">
       ${frow(f.vehicle, plate("20 D 477 BB"))}
       ${frow(f.product, v.productFinal, "fixed")}
       ${frow(f.qty, `<s>${v.qtyDraft}</s> <b>${v.qtyFinal}</b>`, "fixed", `<span class="pill pill-fixed">${d.corrected}</span>`)}
       ${frow(f.total, v.total)}
       ${frow(f.payment, v.payment)}
     </dl>`,
    `<div class="scr-row"><span class="scr-title">${d.newService}</span>${plate("20 D 477 BB")}</div>
     <dl class="draft draft-tight">
       ${frow(f.service, v.service)}
       ${frow(f.product, v.productFinal)}
       ${frow(f.qty, v.qtyFinal)}
       ${frow(f.total, v.total)}
       ${frow(f.payment, v.payment)}
     </dl>
     <div class="confirm-wrap"><span class="fake-btn">${icon.check}${d.confirm}</span>${stamp(d.stamp, "rec-stamp rec-stamp-lg")}</div>
     <p class="scr-note">${d.confirmNote}</p>`,
    `<div class="saved">${icon.check}<span>${d.saved}</span></div>
     <div class="mini-card"><p class="mini-h">${icon.book}${d.history}</p><p>${d.historyEntry}</p><p class="scr-note">${d.driverNote}</p></div>
     <div class="mini-card"><p class="mini-h">${icon.drop}${d.stock}</p><p class="num stock-move"><s>${d.stockFrom}</s>${icon.arrow}<b>${d.stockTo}</b></p><div class="lvl" aria-hidden="true"><i style="--from:62%;--to:59%"></i></div></div>`,
  ];
};

// Voice entry demo with step buttons (features page).
export const voiceDemo = (t, idBase = "vd") => {
  const d = t.demo;
  const screens = voiceScreens(t);
  return `<div class="vdemo" data-vdemo role="region" aria-label="${d.region}">
    <div class="vdemo-stage">
      <figure class="vdemo-fig">
        ${phone("14:31", `<ol class="vscreens">${screens.map((s, i) => `<li class="vscreen scr" data-step="${i + 1}" id="${idBase}-s${i + 1}"><p class="vscreen-step">${i + 1}. ${d.steps[i].title}</p>${s}</li>`).join("")}</ol>`, "phone-demo")}
      </figure>
      <div class="notify-card vnotify" data-vnotify>
        ${icon.bell}<div><b>${d.notifyFrom} <span class="num">${d.time}</span></b><span><strong>${d.notifyTitle}.</strong> ${d.notifyText}</span></div>
      </div>
    </div>
    <div class="vdemo-ctrl">
      <ol class="vsteps">
        ${d.steps.map((s, i) => `<li><button type="button" class="vstep" data-goto="${i + 1}" aria-controls="${idBase}-s${i + 1}"><span class="vnum">${i + 1}</span><span class="vtxt"><b>${s.title}</b><span>${s.text}</span></span></button></li>`).join("")}
      </ol>
      <p class="vcap" aria-hidden="true" data-vcap><b></b><span></span></p>
      <div class="vbtns">
        <button type="button" class="btn btn-ghost btn-sm" data-vprev>${icon.back}${d.prev}</button>
        <button type="button" class="btn btn-dark btn-sm" data-vnext data-label-next="${d.next}" data-label-restart="${d.restart}">${d.next}</button>
        <button type="button" class="btn btn-ghost btn-sm" data-vplay data-label-play="${d.play}" data-label-pause="${d.pause}">${icon.play}<span>${d.play}</span></button>
      </div>
      <p class="sr-only" aria-live="polite" data-vlive></p>
    </div>
  </div>`;
};

// Telegram-style driver chat: reminder, service book, loyalty stamps.
export const driverChat = (t) => {
  const g = t.features.telegram;
  const body = `
    <div class="chat-head"><span class="avatar">M</span><span><b>${g.bot}</b><small>${g.botSub}</small></span></div>
    <div class="chat">
      <div class="bub">${g.msg1}<br><span class="muted">${g.msg1b}</span><span class="bt num">${g.time1}</span></div>
      <div class="bub bub-card"><p class="mini-h">${icon.book}${g.bookTitle}</p><ul class="book">${g.book.map(([dt, x]) => `<li><span class="num">${dt}</span><span>${x}</span></li>`).join("")}</ul></div>
      <div class="bub bub-card"><p class="mini-h">${g.stampsTitle}</p>${stampsRow(4, 6, g.stampsLabel)}</div>
      <div class="bub bub-me">${g.reply}<span class="bt num">${g.time2}</span></div>
    </div>`;
  return `<figure class="chat-fig">${phone("10:14", body, "phone-chat")}</figure>`;
};

const feedIcon = { service: icon.check, low: icon.drop, gap: icon.scale, fix: icon.edit, daily: icon.sum };

export const ownerFeed = (t) => {
  const o = t.features.owner;
  return `<figure class="feed-fig"><div class="feed-card"><p class="feed-title">${icon.bell}${o.feedTitle}<span class="pill pill-plain">Telegram</span></p>
    <ul class="feed">${o.feed.map((m) => `<li class="msg msg-${m.k}"><span class="msg-ic">${feedIcon[m.k]}</span><div><p class="msg-h"><b>${m.t}</b><span class="num">${m.time}</span></p><p>${m.d}</p></div></li>`).join("")}</ul></div></figure>`;
};

// Stock reconciliation: expected vs counted, with the gap shown as something to check.
export const reconcile = (t) => {
  const r = t.features.recon;
  return `<figure class="recon-fig"><div class="recon">
    <p class="recon-title">${icon.scale}${r.title}</p>
    <dl class="ledger">${r.rows.map(([k, v]) => `<div><dt>${k}</dt><dd class="num">${v}</dd></div>`).join("")}
      <div class="ledger-total"><dt>${r.expected}</dt><dd class="num">${r.expectedVal}</dd></div>
      <div><dt>${r.counted}</dt><dd class="num">${r.countedVal}</dd></div>
      <div class="ledger-gap"><dt>${r.gap} <span>· ${r.gapNote}</span></dt><dd class="num">${r.gapVal}</dd></div>
    </dl>
    <div class="gauge" role="img" aria-label="${r.gaugeLabel}">
      <div class="gauge-track"><span class="g-counted" style="width:55%"></span><span class="g-gap" style="left:55%;width:7%"></span><span class="g-mark" style="left:62%"></span></div>
      <div class="gauge-legend"><span><i class="lg-counted"></i>${r.counted} ${r.countedVal}</span><span><i class="lg-gap"></i>${r.gap} <b class="num">${r.gapVal}</b></span><span><i class="lg-mark"></i>${r.expected}</span></div>
    </div>
    <p class="recon-ok">${icon.check}<span>${r.bottle}</span></p>
    <p class="recon-note">${r.note}</p>
  </div></figure>`;
};
