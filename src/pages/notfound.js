import { url, prefix, other } from "../routes.js";
import { icon, stamp, actions } from "../components.js";

export default function notfound(t, lang) {
  const n = t.notfound;
  const keys = ["home", "features", "how", "pricing", "demo"];
  const body = `
<section class="nf">
  <div class="wrap nf-grid">
    <div>
      <h1 class="display">${n.title}</h1>
      <p class="lead">${n.text}</p>
      <ul class="nf-links">${keys.map((k) => `<li><a href="${url(lang, k)}">${n.links[k]}</a></li>`).join("")}</ul>
      ${actions(t, lang)}
      <p class="nf-other"><a href="${prefix(other(lang))}" hreflang="${other(lang)}" lang="${other(lang)}">${n.other}</a></p>
    </div>
    <div class="nf-art">${stamp(n.stamp, "nf-stamp", "?")}</div>
  </div>
</section>`;
  return { title: t.meta.notfound.title, description: t.meta.notfound.description, body };
}
