import { url } from "../routes.js";
import { icon, pageHero, facts } from "../components.js";

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");

export default function demo(t, lang, cfg) {
  const f = t.form;
  const endpoint = cfg.formEndpoint || "";

  const field = ({ id, label, type = "text", required = false, hint = "", attrs = "", textarea = false }) => {
    const describedBy = [hint ? `f-${id}-hint` : "", `f-${id}-err`].filter(Boolean).join(" ");
    const control = textarea
      ? `<textarea id="f-${id}" name="${id}" rows="4" aria-describedby="${describedBy}" ${attrs}></textarea>`
      : `<input id="f-${id}" name="${id}" type="${type}" ${required ? "required" : ""} aria-describedby="${describedBy}" ${attrs}>`;
    return `<div class="field" data-field="${id}">
      <label for="f-${id}">${label}${required ? ' <span class="req" aria-hidden="true">*</span>' : ` <span class="opt">(${f.optional})</span>`}</label>
      ${control}
      ${hint ? `<p class="field-hint" id="f-${id}-hint">${hint}</p>` : ""}
      <p class="field-err" id="f-${id}-err" hidden></p>
    </div>`;
  };

  const i18n = {
    errors: f.errors,
    sending: f.sending,
    submit: f.submit,
    notConnectedTitle: f.notConnectedTitle,
    notConnectedText: f.notConnectedText,
    successTitle: f.successTitle,
    successText: f.successText,
    failTitle: f.failTitle,
    failText: f.failText,
  };

  const body = `
${pageHero(f, facts(f.facts), "page-hero-compact")}

<section class="section section-tight">
  <div class="wrap form-grid">
    <form class="form" id="demo-form" method="post"${endpoint ? ` action="${esc(endpoint)}"` : ""} novalidate data-endpoint="${esc(endpoint)}" data-lang="${lang}" aria-labelledby="form-legend">
      ${endpoint ? "" : `<p class="form-banner" role="note">${icon.alert}<span>${f.notConnectedBanner}</span></p>`}
      <div class="form-summary" data-summary role="alert" tabindex="-1" hidden></div>
      <fieldset>
        <legend id="form-legend">${f.legend}</legend>
        <p class="req-note">${f.requiredNote}</p>
        <div class="field-row">
          ${field({ id: "name", label: f.name, required: true, attrs: 'autocomplete="name" maxlength="80"' })}
          ${field({ id: "phone", label: f.phone, type: "tel", required: true, hint: f.phoneHint, attrs: 'autocomplete="tel" inputmode="tel" maxlength="20"' })}
        </div>
        <div class="field-row">
          ${field({ id: "city", label: f.city, required: true, hint: f.cityHint, attrs: 'list="city-list" autocomplete="address-level2" maxlength="80"' })}
          ${field({ id: "shop", label: f.shop, attrs: 'autocomplete="organization" maxlength="120"' })}
        </div>
        <datalist id="city-list">${f.cities.map((c) => `<option value="${c}"></option>`).join("")}</datalist>
        <fieldset class="field field-choice" data-field="branches">
          <legend>${f.branches} <span class="opt">(${f.optional})</span></legend>
          <div class="choice-row">${f.branchOptions
            .map(([v, l], i) => `<label class="choice" for="f-branches-${i + 1}"><input type="radio" name="branches" value="${v}" id="f-branches-${i + 1}"><span>${l}</span></label>`)
            .join("")}</div>
        </fieldset>
        ${field({ id: "note", label: f.note, hint: f.noteHint, textarea: true, attrs: 'maxlength="1000"' })}
        <div class="hp" aria-hidden="true"><label for="f-website">Website</label><input id="f-website" name="website" type="text" tabindex="-1" autocomplete="off"></div>
        <div class="field field-check" data-field="consent">
          <div class="check-row">
            <input id="f-consent" name="consent" type="checkbox" required aria-describedby="f-consent-err">
            <label for="f-consent">${f.consent} <span class="req" aria-hidden="true">*</span></label>
          </div>
          <p class="consent-more"><a href="${url(lang, "privacy")}">${f.consentMore}</a></p>
          <p class="field-err" id="f-consent-err" hidden></p>
        </div>
      </fieldset>
      <button type="submit" class="btn btn-primary btn-lg btn-block" data-submit>${f.submit}</button>
      <div class="form-result" data-result role="status" tabindex="-1" hidden></div>
    </form>
    <aside class="next-card" aria-labelledby="next-h">
      <h2 id="next-h">${f.next.title}</h2>
      <ol class="next-steps">${f.next.steps.map((s, i) => `<li><span class="num">${i + 1}</span><span>${s}</span></li>`).join("")}</ol>
      <p class="next-note">${f.next.note}</p>
    </aside>
  </div>
</section>
<script type="application/json" id="form-i18n">${JSON.stringify(i18n).replace(/</g, "\\u003c")}</script>`;
  return { title: t.meta.demo.title, description: t.meta.demo.description, body };
}
