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
  book: svg('<path d="M5 4.5h11a3 3 0 0 1 3 3V20H8a3 3 0 0 1-3-3V4.5zM5 17a3 3 0 0 1 3-3h11"/>'),
};

export const logo = `<svg class="logo-mark" viewBox="0 0 32 32" width="30" height="30" aria-hidden="true" focusable="false"><rect width="32" height="32" rx="9" fill="#1A2230"/><path d="M16 5.5c4.4 5.6 7 9.1 7 12.6a7 7 0 0 1-14 0c0-3.5 2.6-7 7-12.6z" fill="#E39B2D"/><path d="M12.6 18.4l2.4 2.4 4.6-4.9" fill="none" stroke="#1A2230" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

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

// Large decorative stamp ring behind the hero phone.
export const ring = (text) =>
  `<svg class="hero-ring" viewBox="0 0 400 400" aria-hidden="true" focusable="false"><defs><path id="hero-ring-path" d="M200,200 m-168,0 a168,168 0 1,1 336,0 a168,168 0 1,1 -336,0"/></defs><circle cx="200" cy="200" r="194" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="200" cy="200" r="146" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4 6"/><text font-size="17" font-weight="700" letter-spacing="3" fill="currentColor" font-family="JetBrains Mono, monospace"><textPath href="#hero-ring-path" textLength="1040" lengthAdjust="spacing">${text}</textPath></text></svg>`;

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

// Hero: voice becomes a stamped record, plus a matching owner notification.
export const heroPhone = (t) => {
  const h = t.phoneHero;
  const body = `
    <div class="scr">
      <div class="scr-row"><span class="scr-title">${h.card}</span>${plate("20 D 477 BB")}</div>
      <p class="scr-car">${t.sample.car}</p>
      <dl class="draft">${h.rows.map(([k, v], i) => `<div class="frow ${i === 1 ? "is-fixed" : "is-ok"}"><dt>${k}</dt><dd>${v}</dd></div>`).join("")}</dl>
      <div class="rec-foot"><div class="mini-ok">${icon.check}<span>${h.history}</span></div>${stamp(h.stamp, "rec-stamp rec-stamp-inline")}</div>
      <div class="mini-stock"><span>${h.stock}</span><span class="num"><s>${t.demo.stockFrom}</s> → <b>${t.demo.stockTo}</b></span></div>
    </div>`;
  return `<figure class="hero-fig">
    ${ring(h.ring)}
    <div class="say-bubble">${icon.mic}<span>${h.say}</span></div>
    ${phone("14:32", body, "phone-hero")}
    <div class="notify-card hero-notify">${icon.bell}<div><b>${h.notifyFrom}</b><span>${h.notifyText}</span></div></div>
  </figure>`;
};

const frow = (label, value, state = "ok", note = "") =>
  `<div class="frow is-${state}"><dt>${label}</dt><dd>${value}${note ? ` <span class="fnote">${note}</span>` : ""}</dd></div>`;

// Voice entry: speak → draft → clarify → confirm → history & stock. Illustrative only.
export const voiceDemo = (t, idBase = "vd") => {
  const d = t.demo, f = d.fields, v = d.values;
  const vehicle = `${plate("20 D 477 BB")} <span class="fsub">${t.sample.car} · ${v.vehicleFound}</span>`;
  const screens = [
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
