import { icon, pageHero } from "../components.js";

export default function privacy(t) {
  const p = t.privacy;
  const body = `
${pageHero(p, `<p class="updated">${p.updated}</p>`, "page-hero-compact")}
<section class="section section-tight">
  <div class="wrap legal">
    <p class="caution">${icon.alert}<span>${p.draftNote}</span></p>
    ${p.sections.map((s) => `<section class="legal-sec"><h2>${s.h}</h2><p>${s.p}</p></section>`).join("")}
  </div>
</section>`;
  return { title: t.meta.privacy.title, description: t.meta.privacy.description, body };
}
