import { icon, pageHero, sectionHead, voiceDemo, reconcile, driverChat, ownerFeed, ctaBand, plate } from "../components.js";

const ANCHORS = ["records", "voice", "stock", "owner", "telegram"];

export default function features(t, lang) {
  const f = t.features;
  const r = f.records;

  const toc = `<nav class="toc" aria-label="${f.toc}"><ul>${f.tocItems
    .map((x, i) => `<li><a href="#${ANCHORS[i]}"><span class="num">0${i + 1}</span>${x}</a></li>`)
    .join("")}</ul></nav>`;

  const lookup = `<figure class="lookup-fig"><div class="lookup">
    <div class="lookup-search">
      <label for="lookup-q">${r.lookupLabel}</label>
      <div class="search-box">${icon.search}<input id="lookup-q" type="search" placeholder="${r.lookupPlaceholder}" autocomplete="off" aria-describedby="lookup-hint" data-lookup-input></div>
      <p class="field-hint" id="lookup-hint">${r.lookupHint}</p>
    </div>
    <p class="sr-only" aria-live="polite" data-lookup-status data-prefix="${r.lookupCount}"></p>
    <ul class="lookup-list" data-lookup-list>
      ${r.cars
        .map(
          (c) => `<li data-q="${c.search} ${c.plate.toLowerCase()} ${c.model.toLowerCase()} ${c.who.toLowerCase()}">
        ${plate(c.plate)}
        <span class="lk-main"><b>${c.model}</b><span>${c.who} · <span class="num">${c.phone}</span></span></span>
        <span class="lk-last">${c.last}</span>
      </li>`
        )
        .join("")}
    </ul>
    <p class="lookup-empty" data-lookup-empty hidden>${r.lookupEmpty}</p>
    <div class="history">
      <p class="mini-h">${icon.book}${r.historyTitle}</p>
      <ol class="history-list">${r.history
        .map((h) => `<li><span class="h-date">${h.date}</span><span class="h-kind">${h.kind}</span><span class="h-text">${h.text}</span>${h.km ? `<span class="h-km num">${h.km}</span>` : ""}</li>`)
        .join("")}</ol>
    </div>
  </div></figure>`;

  const s = f.stock;
  const body = `
${pageHero(f, toc, "page-hero-features")}

<section class="section" id="records" aria-labelledby="records-h">
  <div class="wrap split split-wide">
    <div class="split-copy">
      ${sectionHead(r, { id: "records-h", kicker: true })}
      <ul class="checks checks-dark">${r.points.map((p) => `<li>${p}</li>`).join("")}</ul>
      <blockquote class="example">${r.example}</blockquote>
    </div>
    <div class="split-visual">${lookup}</div>
  </div>
</section>

<section class="section band-sand" id="voice" aria-labelledby="voice-h">
  <div class="wrap">
    ${sectionHead(f.voice, { id: "voice-h", kicker: true })}
    ${voiceDemo(t, "feat-vd")}
    <p class="voice-lang">${f.voice.langNote}</p>
  </div>
</section>

<section class="section" id="stock" aria-labelledby="stock-h">
  <div class="wrap split">
    <div class="split-copy">
      ${sectionHead(s, { id: "stock-h", kicker: true })}
      <p class="caution"><b>${s.caution.title}</b> ${s.caution.text}</p>
    </div>
    <div class="split-visual">${reconcile(t)}</div>
  </div>
</section>

<section class="section band-ink" id="owner" aria-labelledby="owner-h">
  <div class="wrap split">
    <div class="split-copy">
      ${sectionHead(f.owner, { id: "owner-h", cls: "on-dark", kicker: true })}
    </div>
    <div class="split-visual">${ownerFeed(t)}</div>
  </div>
</section>

<section class="section" id="telegram" aria-labelledby="telegram-h">
  <div class="wrap split split-rev">
    <div class="split-visual">${driverChat(t)}</div>
    <div class="split-copy">
      ${sectionHead(f.telegram, { id: "telegram-h", kicker: true })}
      <dl class="points">${f.telegram.points.map((p) => `<div><dt>${p.t}</dt><dd>${p.d}</dd></div>`).join("")}</dl>
    </div>
  </div>
</section>

${ctaBand(t, lang)}`;
  return { title: t.meta.features.title, description: t.meta.features.description, body };
}
