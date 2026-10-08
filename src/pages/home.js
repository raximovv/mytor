import { url } from "../routes.js";
import { icon, actions, sectionHead, heroPhone, voiceDemo, faq, ctaBand, stampsRow, plate, stamp } from "../components.js";

// "One record → three results": the record on the left feeds history, stock and messages.
const bridge = (t) => {
  const b = t.home.bridge;
  const d = t.demo;
  const visuals = [
    `<ol class="oc-timeline">${b.timeline.map(([dt, x], i) => `<li class="${i === 0 ? "is-new" : ""}"><span class="num">${dt}</span><span>${x}</span></li>`).join("")}</ol>`,
    `<p class="num stock-move"><s>${d.stockFrom}</s>${icon.arrow}<b>${d.stockTo}</b></p><div class="lvl" aria-hidden="true"><i style="--to:59%"></i></div>`,
    `<p class="oc-msg">${icon.bell}<span>${b.ownerMsg}</span></p><p class="oc-msg oc-msg-driver">${icon.send}<span>${b.driverMsg}</span></p>`,
  ];
  return `<div class="bridge">
    <figure class="bridge-rec">
      <div class="bridge-card">
        <div class="scr-row"><span class="mini-h">${icon.check}${b.recordTitle}</span>${plate("20 D 477 BB")}</div>
        <dl class="draft draft-tight">${b.record.map(([k, v]) => `<div class="frow is-ok"><dt>${k}</dt><dd>${v}</dd></div>`).join("")}</dl>
        ${stamp(d.stamp, "bridge-stamp")}
      </div>
      <figcaption><p class="sample-tag"><b>${t.ui.sample}</b><span> · ${t.ui.sampleNote}</span></p></figcaption>
    </figure>
    <ol class="outcomes">
      ${b.outcomes.map((o, i) => `<li class="oc"><div class="oc-copy"><h3>${o.title}</h3><p>${o.why}</p></div><div class="oc-vis">${visuals[i]}</div></li>`).join("")}
    </ol>
  </div>`;
};

const notebookArt = `<svg class="prob-art" viewBox="0 0 160 120" aria-hidden="true" focusable="false">
  <rect x="34" y="14" width="92" height="96" rx="6" fill="#FFFCF6" stroke="#1A2230" stroke-width="2"/>
  <path d="M126 70 L126 110 L98 110 L108 98 L102 90 L114 84 L110 76 Z" fill="#F6F1E7" stroke="#1A2230" stroke-width="2" stroke-linejoin="round"/>
  <g stroke="#C9BDA8" stroke-width="2"><path d="M46 36h66M46 48h66M46 60h52M46 72h44M46 84h36"/></g>
  <g fill="none" stroke="#1A2230" stroke-width="2" stroke-linecap="round"><path d="M48 34c6-4 10 4 16 0s10 4 16 0"/><path d="M48 58c5-3 9 3 14 0"/></g>
  <g fill="#1A2230"><circle cx="46" cy="14" r="3"/><circle cx="64" cy="14" r="3"/><circle cx="82" cy="14" r="3"/><circle cx="100" cy="14" r="3"/></g>
  <text x="128" y="44" font-size="34" font-weight="800" fill="#E39B2D" font-family="Geologica, sans-serif">?</text>
</svg>`;

const barrelArt = `<svg class="prob-art" viewBox="0 0 160 120" aria-hidden="true" focusable="false">
  <path d="M50 12h60c6 18 6 78 0 96H50c-6-18-6-78 0-96z" fill="#FFFCF6" stroke="#1A2230" stroke-width="2"/>
  <path d="M46.5 34h67M45 60h70M46.5 86h67" stroke="#1A2230" stroke-width="2"/>
  <path d="M48 60h64c1.5 16 .5 34-2 48H50c-2.5-14-3.5-32-2-48z" fill="#E39B2D" opacity=".85"/>
  <path d="M40 46h80" stroke="#B23A2B" stroke-width="2" stroke-dasharray="5 4"/>
  <text x="122" y="50" font-size="11" font-weight="700" fill="#B23A2B" font-family="JetBrains Mono, monospace">?</text>
  <text x="60" y="78" font-size="12" font-weight="700" fill="#1A2230" font-family="JetBrains Mono, monospace">200 L</text>
</svg>`;


export default function home(t, lang) {
  const h = t.home;
  const body = `
<section class="hero">
  <div class="wrap hero-grid">
    <div class="hero-copy">
      <h1 class="display">${h.title}</h1>
      <p class="lead">${h.lead}</p>
      ${actions(t, lang)}
      <p class="status-note"><span class="status-dot" aria-hidden="true"></span><span>${h.status}</span></p>
    </div>
    <div class="hero-visual">${heroPhone(t)}</div>
  </div>
</section>

<section class="section band-sand" aria-labelledby="problems-h">
  <div class="wrap">
    ${sectionHead(h.problems, { id: "problems-h" })}
    <div class="problems">
      ${h.problems.items
        .map(
          (p, i) => `<article class="problem">
        <div class="problem-top"><span class="tag">${p.tag}</span>${i === 0 ? notebookArt : barrelArt}</div>
        <h3>${p.title}</h3>
        <p>${p.text}</p>
        <ul class="dash-list">${p.list.map((x) => `<li>${x}</li>`).join("")}</ul>
      </article>`
        )
        .join("")}
    </div>
  </div>
</section>

<section class="section section-bridge" aria-labelledby="bridge-h">
  <div class="wrap">
    ${sectionHead(h.bridge, { id: "bridge-h" })}
    ${bridge(t)}
    <p class="sec-link"><a class="link-arrow" href="${url(lang, "how")}">${h.bridge.link}${icon.arrow}</a></p>
  </div>
</section>

<section class="section band-sand" aria-labelledby="voice-h" id="voice">
  <div class="wrap">
    ${sectionHead(h.voice, { id: "voice-h" })}
    ${voiceDemo(t, "home-vd")}
  </div>
</section>

<section class="section band-ink" aria-labelledby="benefits-h">
  <div class="wrap">
    ${sectionHead(h.benefits, { id: "benefits-h", cls: "on-dark" })}
    <div class="bento">
      <article class="bento-big">
        <h3>${h.benefits.big.title}</h3>
        <p>${h.benefits.big.text}</p>
        <div class="bento-stamps">${stampsRow(4, 6, h.benefits.big.stampsLabel)}<span>${h.benefits.big.stampsLabel}</span></div>
      </article>
      ${h.benefits.items.map((b) => `<article class="bento-item"><p class="bento-sample num">${b.sample}</p><h3>${b.title}</h3><p>${b.text}</p></article>`).join("")}
    </div>
    <p class="sec-link"><a class="link-arrow link-light" href="${url(lang, "features")}">${h.benefits.link}${icon.arrow}</a></p>
  </div>
</section>

<section class="section" aria-labelledby="support-h">
  <div class="wrap">
    ${sectionHead(h.support, { id: "support-h" })}
    <ol class="support-steps">
      ${h.support.steps.map(([a, b], i) => `<li><span class="support-n num">0${i + 1}</span><h3>${a}</h3><p>${b}</p></li>`).join("")}
    </ol>
    <div class="actions actions-split"><a class="btn btn-primary btn-lg" href="${url(lang, "demo")}">${t.ui.cta}</a><a class="link-arrow" href="${url(lang, "pricing")}">${h.support.link}${icon.arrow}</a></div>
  </div>
</section>

<section class="section band-sand" aria-labelledby="faq-h">
  <div class="wrap faq-grid">
    ${sectionHead(h.faq, { id: "faq-h" })}
    ${faq(h.faq.items)}
  </div>
</section>

${ctaBand(t, lang)}`;
  return { title: t.meta.home.title, description: t.meta.home.description, body };
}
