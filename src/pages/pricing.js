import { url } from "../routes.js";
import { icon, pageHero, sectionHead, faq, ctaBand, facts } from "../components.js";

export default function pricing(t, lang) {
  const p = t.pricing;
  const weekSpan = [[1, 1], [2, 5], [6, 6]];

  const body = `
${pageHero(p, `${facts(p.facts)}<div class="actions"><a class="btn btn-primary btn-lg" href="${url(lang, "demo")}">${t.ui.cta}</a></div><p class="cta-note">${p.ctaNote}</p>`)}

<section class="section section-tight" aria-labelledby="pilot-h">
  <div class="wrap">
    <h2 id="pilot-h" class="h-sub">${p.pilotTitle}</h2>
    <div class="weeks-bar" aria-hidden="true">${Array.from({ length: 6 }, (_, i) => `<span class="wk wk-${i === 0 ? "a" : i === 5 ? "c" : "b"}">${i + 1}</span>`).join("")}</div>
    <ol class="weeks">
      ${p.weeks.map((w, i) => `<li class="week week-${"abc"[i]}" style="--span:${weekSpan[i][1] - weekSpan[i][0] + 1}"><span class="week-w">${w.w}</span><h3>${w.t}</h3><p>${w.d}</p></li>`).join("")}
    </ol>
  </div>
</section>

<section class="section band-sand" aria-labelledby="plans-h">
  <div class="wrap">
    ${sectionHead({ title: p.plansTitle, lead: p.plansLead }, { id: "plans-h" })}
    <p class="badge-proposal">${icon.alert}${p.proposal}</p>
    <ul class="plans">
      ${p.plans
        .map(
          (pl) => `<li class="plan">
        <h3>${pl.name}</h3>
        <p class="plan-price"><span class="num">${pl.price}</span><span class="plan-unit">${pl.unit}</span></p>
        <p class="plan-tag">${p.planTag}</p>
        <p class="plan-for"><span>${p.forWord}:</span> ${pl.for}</p>
      </li>`
        )
        .join("")}
    </ul>
    <p class="no-pay">${p.noPay}</p>
  </div>
</section>

<section class="section" aria-labelledby="pfaq-h">
  <div class="wrap faq-grid">
    ${sectionHead({ title: p.faqTitle }, { id: "pfaq-h" })}
    ${faq(p.faq)}
  </div>
</section>

${ctaBand(t, lang)}`;
  return { title: t.meta.pricing.title, description: t.meta.pricing.description, body };
}
