import { url } from "../routes.js";
import { icon, pageHero, sectionHead, actions, ctaBand, plate, stamp } from "../components.js";

// Eight steps in three groups: once (setup), per car (worker), afterwards (automatic).
const GROUPS = [[0], [1, 2, 3], [4, 5, 6, 7]];

export default function how(t, lang) {
  const h = t.how;
  const d = t.demo;
  const b = t.home.bridge;

  // A small, distinct visual for each step.
  const visuals = [
    `<ul class="chips-static">${h.stages[0].list.map((x) => `<li>${icon.check}${x}</li>`).join("")}</ul>`,
    `<div class="mini-search"><span class="search-box is-static">${icon.search}<span class="num">20 D 477</span></span><span class="mini-result">${plate("20 D 477 BB")}<span>${t.sample.car}</span></span></div>`,
    `<div class="mini-say"><span class="say-inline">${icon.mic}<span>${d.transcript}</span></span></div>`,
    `<div class="mini-rec"><dl class="draft draft-tight"><div class="frow is-ok"><dt>${d.fields.product}</dt><dd>${d.values.productFinal}</dd></div><div class="frow is-fixed"><dt>${d.fields.qty}</dt><dd><s>${d.values.qtyDraft}</s> <b>${d.values.qtyFinal}</b></dd></div><div class="frow is-ok"><dt>${d.fields.total}</dt><dd>${d.values.total}</dd></div></dl>${stamp(d.stamp, "rec-stamp")}</div>`,
    `<ol class="oc-timeline">${b.timeline.map(([dt, x], i) => `<li class="${i === 0 ? "is-new" : ""}"><span class="num">${dt}</span><span>${x}</span></li>`).join("")}</ol>`,
    `<p class="mini-h">${icon.drop}${d.stock}</p><p class="num stock-move"><s>${d.stockFrom}</s>${icon.arrow}<b>${d.stockTo}</b><span class="delta">${h.delta}</span></p><div class="lvl" aria-hidden="true"><i style="--to:59%"></i></div>`,
    `<p class="notify-card">${icon.bell}<span><b>${d.notifyTitle} · <span class="num">${d.time}</span></b><span>${d.notifyText}</span></span></p>`,
    `<p class="bub">${t.features.telegram.msg1}</p>`,
  ];

  // Steps 05–08 all follow from the one confirmed record: tag each with when it happens.
  const when = (i) => (i < 4 ? "" : `<span class="when${i === 7 ? " when-later" : ""}">${i === 7 ? h.later : `${h.now} · <span class="num">${d.time}</span>`}</span>`);
  const step = (i) => `<li class="stage">
      <p class="stage-num num">${String(i + 1).padStart(2, "0")}${when(i)}</p>
      <div class="stage-copy"><h3>${h.stages[i].title}</h3><p>${h.stages[i].text}</p></div>
      <div class="stage-visual">${visuals[i]}</div>
    </li>`;

  // The confirmed record that feeds steps 05–08.
  const fan = `<div class="fan-src">
      <span class="fan-ok">${icon.check}</span>
      <p class="fan-main"><b>${h.fan.title} · <span class="num">${d.time}</span></b><span class="fan-rec">${plate("20 D 477 BB")}<span>${h.fan.record}</span></span></p>
      <p class="fan-note">${h.fan.note}</p>
    </div>`;

  const range = (g) => (g.length === 1 ? `0${g[0] + 1}` : `0${g[0] + 1}–0${g[g.length - 1] + 1}`);

  const body = `
${pageHero(h, actions(t, lang, { secondary: false }))}

<section class="section section-tight" aria-label="${h.eyebrow}">
  <div class="wrap">
    ${GROUPS.map(
      (g, gi) => `<div class="stage-group stage-group-${gi + 1}">
      <h2 class="group-h"><span class="num">${range(g)}</span>${h.groups[gi]}</h2>
      ${gi === 2 ? fan : ""}
      <ol class="stages" start="${g[0] + 1}">${g.map(step).join("")}</ol>
    </div>`
    ).join("")}
    <p class="sample-inline"><b>${t.ui.sample}</b> · ${t.ui.sampleNote}</p>
  </div>
</section>

<section class="section band-sand" aria-labelledby="roles-h">
  <div class="wrap">
    ${sectionHead(h.roles, { id: "roles-h" })}
    <div class="roles">
      ${h.roles.items
        .map(
          (r) => `<article class="role role-${r.k}"><h3>${r.title}</h3><p class="role-lead">${r.lead}</p><ul class="checks">${r.list.map((x) => `<li>${x}</li>`).join("")}</ul></article>`
        )
        .join("")}
    </div>
  </div>
</section>

<section class="section section-tight">
  <div class="wrap">
    <a class="pilot-link" href="${url(lang, "pricing")}">
      <span><b>${h.pilot.title}</b><span>${h.pilot.text}</span></span>
      <span class="link-arrow">${h.pilot.link}${icon.arrow}</span>
    </a>
  </div>
</section>

${ctaBand(t, lang, "how")}`;
  return { title: t.meta.how.title, description: t.meta.how.description, body };
}
