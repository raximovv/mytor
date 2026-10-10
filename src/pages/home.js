import { url } from "../routes.js";
import { icon, sectionHead, faq, ctaBand, plate, stamp, phone, voiceScreens } from "../components.js";

// Hero app: the phone loops "listening" → saved record → stamp → owner message (site.js drives the loop).
// Both layers share one cell; without JS or with reduced motion only the saved record shows.
const heroApp = (t) => {
  const d = t.demo;
  const ph = t.phoneHero;
  const screen = `<div class="app-screen">
      <div class="app-listen" aria-hidden="true">
        <p class="scr-title">${d.newService}</p>
        <div class="listen"><span class="mic-btn">${icon.mic}</span><span class="wave">${"<i></i>".repeat(13)}</span><span class="listen-text">${d.listening}</span></div>
        <p class="transcript" data-words>${d.transcript}</p>
      </div>
      <div class="app-rec scr">
        <div class="scr-row"><span class="scr-title">${ph.card}</span>${plate("20 D 477 BB")}</div>
        <p class="scr-car">${t.sample.car}</p>
        <dl class="draft">${ph.rows.map(([k, v], i) => `<div class="frow ${i === 1 ? "is-fixed" : "is-ok"}" style="--r:${i}"><dt>${k}</dt><dd>${v}</dd></div>`).join("")}</dl>
        <div class="rec-foot"><div class="mini-ok">${icon.check}<span>${ph.history}</span></div>${stamp(ph.stamp, "rec-stamp rec-stamp-inline app-stamp")}</div>
        <div class="mini-stock"><span>${ph.stock}</span><span class="num"><s>${d.stockFrom}</s> → <b>${d.stockTo}</b></span></div>
      </div>
    </div>`;
  return `<figure class="hero-fig app-fig" data-app>
    <div class="say-bubble app-say">${icon.mic}<span>${ph.say}</span></div>
    ${phone("14:32", screen, "phone-hero")}
    <div class="notify-card hero-notify app-notify">${icon.bell}<div><b>${ph.notifyFrom} <span class="num">${d.time}</span></b><span>${ph.notifyText}</span></div></div>
    <button type="button" class="btn btn-ghost btn-sm app-toggle" data-app-toggle data-label-pause="${d.pause}" data-label-play="${d.play}" hidden><span class="i-pause">${icon.pause}</span><span class="i-play">${icon.play}</span><span data-label>${d.pause}</span></button>
  </figure>`;
};

// The confirmed record (Spark, 20 D 477 BB) that feeds the three results below it.
const recordCard = (t) => {
  const b = t.home.bridge;
  return `<div class="rec-card">
    <div class="rec-card-top"><span class="mini-h">${icon.check}${b.recordTitle}</span>${plate("20 D 477 BB")}</div>
    <dl class="draft draft-tight">${b.record.map(([k, v]) => `<div class="frow is-ok"><dt>${k}</dt><dd>${v}</dd></div>`).join("")}</dl>
    ${stamp(t.demo.stamp, "rec-card-stamp")}
  </div>`;
};

// Voice entry told as you scroll: a pinned phone on wide screens, each step's own screen on narrow ones.
const voiceStory = (t) => {
  const d = t.demo;
  const pinned = voiceScreens(t);
  const inline = voiceScreens(t);
  return `<div class="story" data-story>
    <div class="story-pin">
      ${phone("14:31", `<ol class="vscreens">${pinned.map((s, i) => `<li class="vscreen scr${i === 0 ? " is-active" : ""}" data-screen="${i + 1}"><p class="vscreen-step">${i + 1}. ${d.steps[i].title}</p>${s}</li>`).join("")}</ol>`, "phone-demo")}
      <div class="notify-card story-notify" data-story-notify>${icon.bell}<div><b>${d.notifyFrom} <span class="num">${d.time}</span></b><span><strong>${d.notifyTitle}.</strong> ${d.notifyText}</span></div></div>
    </div>
    <ol class="story-steps">
      ${d.steps
        .map(
          (s, i) => `<li class="story-step${i === 0 ? " is-active" : ""}" data-step="${i + 1}">
        <span class="story-n num">0${i + 1}</span>
        <div class="story-copy"><h3>${s.title}</h3><p>${s.text}</p></div>
        <div class="story-inline scr">${inline[i]}</div>
      </li>`
        )
        .join("")}
    </ol>
  </div>`;
};

export default function home(t, lang) {
  const h = t.home;
  const ui = t.ui;
  const b = h.bridge;
  const d = t.demo;
  const results = [
    `<ol class="oc-timeline">${b.timeline.map(([dt, x], i) => `<li class="${i === 0 ? "is-new" : ""}"><span class="num">${dt}</span><span>${x}</span></li>`).join("")}</ol>`,
    `<p class="num stock-move"><s>${d.stockFrom}</s>${icon.arrow}<b>${d.stockTo}</b></p><div class="lvl" aria-hidden="true"><i style="--to:59%"></i></div>`,
    `<p class="oc-msg">${icon.bell}<span>${b.ownerMsg}</span></p><p class="oc-msg oc-msg-driver">${icon.send}<span>${b.driverMsg}</span></p>`,
  ];

  const body = `
<section class="hero" aria-labelledby="hero-h">
  <div class="wrap hero-grid">
    <div class="hero-copy">
      <p class="hero-kicker"><span class="status-chip"><span class="status-dot" aria-hidden="true"></span>${ui.status}</span><span>${h.eyebrow}</span></p>
      <h1 class="display" id="hero-h">${h.title}</h1>
      <p class="lead">${h.lead}</p>
      <div class="hero-cta">
        <a class="btn btn-primary btn-lg" href="${url(lang, "demo")}">${ui.cta}</a>
        <span class="cta-soon">${icon.download}<span>${ui.download}</span><span class="soon-tag">${ui.soon}</span></span>
      </div>
      <div class="hero-proof"><span class="proof-k">${h.support.eyebrow}</span><ul class="offer-list">${t.pricing.facts.map((x) => `<li>${icon.check}<span>${x}</span></li>`).join("")}</ul></div>
    </div>
    <div class="hero-visual">${heroApp(t)}</div>
  </div>
</section>

<section class="section band-sand" aria-labelledby="problems-h">
  <div class="wrap problems-split">
    ${sectionHead(h.problems, { id: "problems-h", cls: "sticky-head" })}
    <ol class="problems-list">
      ${h.problems.items
        .map(
          (p, i) => `<li class="problem-item">
        <p class="problem-num num">0${i + 1} · ${p.tag}</p>
        <h3>${p.title}</h3>
        <p>${p.text}</p>
        <ul class="dash-list">${p.list.map((x) => `<li>${x}</li>`).join("")}</ul>
      </li>`
        )
        .join("")}
    </ol>
  </div>
</section>

<section class="section" aria-labelledby="bridge-h">
  <div class="wrap">
    ${sectionHead(b, { id: "bridge-h", cls: "sec-head-center" })}
    <div class="one-rec">
      ${recordCard(t)}
      <ol class="one-rec-results">
        ${b.outcomes.map((o, i) => `<li><div class="oc-vis">${results[i]}</div><h3>${o.title}</h3><p>${o.why}</p></li>`).join("")}
      </ol>
    </div>
    <p class="sec-link sec-link-center"><a class="link-arrow" href="${url(lang, "how")}">${b.link}${icon.arrow}</a></p>
  </div>
</section>

<section class="section band-sand" aria-labelledby="voice-h" id="voice">
  <div class="wrap">
    ${sectionHead(h.voice, { id: "voice-h" })}
    ${voiceStory(t)}
  </div>
</section>

<section class="section" aria-labelledby="roles-h">
  <div class="wrap">
    ${sectionHead({ title: t.how.roles.title }, { id: "roles-h" })}
    <div class="roles">
      ${t.how.roles.items.map((r) => `<article class="role role-${r.k}"><h3>${r.title}</h3><p class="role-lead">${r.lead}</p><ul class="checks">${r.list.map((x) => `<li>${x}</li>`).join("")}</ul></article>`).join("")}
    </div>
  </div>
</section>

<section class="section band-sand" aria-labelledby="support-h">
  <div class="wrap">
    ${sectionHead(h.support, { id: "support-h" })}
    <ol class="support-steps">
      ${h.support.steps.map(([a, s], i) => `<li><span class="support-n num">0${i + 1}</span><h3>${a}</h3><p>${s}</p></li>`).join("")}
    </ol>
    <div class="pilot-cta"><a class="btn btn-primary btn-lg" href="${url(lang, "demo")}">${ui.cta}</a><p class="cta-note">${t.pricing.ctaNote}</p></div>
  </div>
</section>

<section class="section" aria-labelledby="faq-h">
  <div class="wrap faq-grid">
    ${sectionHead({ title: h.faq.title }, { id: "faq-h" })}
    ${faq(h.faq.items)}
  </div>
</section>

${ctaBand(t, lang)}`;
  return { title: t.meta.home.title, description: t.meta.home.description, body };
}
