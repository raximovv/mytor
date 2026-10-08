import { icon, pageHero, ctaBand, stamp } from "../components.js";

export default function about(t, lang) {
  const a = t.about;
  const body = `
${pageHero(a)}

<section class="section section-tight" aria-labelledby="why-h">
  <div class="wrap about-why">
    <h2 id="why-h" class="h-big">${a.why.title}</h2>
    <div class="prose">${a.why.paras.map((p) => `<p>${p}</p>`).join("")}</div>
  </div>
</section>

<section class="section band-sand" aria-labelledby="local-h">
  <div class="wrap split">
    <div class="split-copy">
      <h2 id="local-h">${a.local.title}</h2>
      <p class="lead">${a.local.text}</p>
      <ul class="checks checks-dark">${a.local.list.map((x) => `<li>${x}</li>`).join("")}</ul>
    </div>
    <div class="split-visual about-support">
      ${stamp(t.demo.stamp, "about-stamp")}
      <h2>${a.support.title}</h2>
      <p>${a.support.text}</p>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="principles-h">
  <div class="wrap">
    <h2 id="principles-h" class="h-sub">${a.principles.title}</h2>
    <ul class="principles">${a.principles.items.map((x, i) => `<li><span class="num">0${i + 1}</span><h3>${x.t}</h3><p>${x.d}</p></li>`).join("")}</ul>
    <aside class="status-card"><span class="status-dot" aria-hidden="true"></span><div><h2>${a.status.title}</h2><p>${a.status.text}</p></div></aside>
  </div>
</section>

${ctaBand(t, lang)}`;
  return { title: t.meta.about.title, description: t.meta.about.description, body };
}
