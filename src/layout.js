import { url, prefix, other, href as site } from "./routes.js";
import { logo, icon } from "./components.js";

const NAV = ["features", "how", "pricing", "about"];
const abs = (cfg, path) => (cfg.siteUrl ? cfg.siteUrl.replace(/\/$/, "") + path : path);
const attr = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const text = (s) => String(s).replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ");

export function layout({ t, alt, key, title, description, body, cfg, assetVersion, paths, noindex = false }) {
  const lang = t.lang;
  const o = other(lang);
  const ui = t.ui;
  const navLinks = NAV.map(
    (k) => `<li><a href="${url(lang, k)}"${k === key ? ' aria-current="page"' : ""}>${ui.nav[k]}</a></li>`
  ).join("");
  const langLinks = [lang === "uz" ? t : alt, lang === "uz" ? alt : t]
    .map((L) => {
      const here = L.lang === lang;
      const href = here ? paths[lang] : paths[L.lang];
      return `<a href="${href}" hreflang="${L.htmlLang}" lang="${L.htmlLang}"${here ? ' aria-current="true"' : ""} aria-label="${L.name}" title="${L.name}"><img class="lang-flag" src="${site(`/assets/flag-${L.lang}.svg`)}" width="24" height="18" alt="" aria-hidden="true"></a>`;
    })
    .join("");

  const alternates = noindex
    ? ""
    : `<link rel="alternate" hreflang="uz" href="${abs(cfg, paths.uz)}">
<link rel="alternate" hreflang="ru" href="${abs(cfg, paths.ru)}">
<link rel="alternate" hreflang="x-default" href="${abs(cfg, paths.uz)}">
${cfg.siteUrl ? `<link rel="canonical" href="${abs(cfg, paths[lang])}">` : ""}`;

  return `<!doctype html>
<html lang="${t.htmlLang}" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${attr(text(title))}</title>
<meta name="description" content="${attr(description)}">
${noindex ? '<meta name="robots" content="noindex">' : ""}
${alternates}
<meta property="og:type" content="website">
<meta property="og:site_name" content="Mytor">
<meta property="og:title" content="${attr(text(title))}">
<meta property="og:description" content="${attr(description)}">
<meta property="og:locale" content="${t.ogLocale}">
<meta property="og:locale:alternate" content="${alt.ogLocale}">
${cfg.siteUrl ? `<meta property="og:url" content="${abs(cfg, paths[lang])}">
<meta property="og:image" content="${abs(cfg, site(`/assets/og-${lang}.png`))}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${attr(t.meta.ogAlt)}">
<meta name="twitter:card" content="summary_large_image">` : ""}
<meta name="theme-color" content="#F6F1E7">
<link rel="icon" href="${site("/assets/favicon.svg")}" type="image/svg+xml">
<link rel="apple-touch-icon" href="${site("/assets/apple-touch-icon.png")}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geologica:wght@500..800&family=Onest:wght@400..700&family=JetBrains+Mono:wght@500;700&display=swap">
<link rel="stylesheet" href="${site("/assets/styles.css")}?v=${assetVersion}">
${key === "home" && lang === "uz" ? `<script>try{if(localStorage.getItem("mytor-lang")==="ru"&&location.pathname===${JSON.stringify(prefix("uz"))}&&!(document.referrer&&new URL(document.referrer).origin===location.origin))location.replace(${JSON.stringify(prefix("ru"))})}catch(e){}</script>
` : ""}<script>document.documentElement.classList.replace("no-js","js")</script>
<script src="${site("/assets/site.js")}?v=${assetVersion}" defer></script>
</head>
<body class="page-${key}">
<a class="skip" href="#main">${ui.skip}</a>
<header class="site-header">
  <div class="wrap hdr">
    <a class="brand" href="${prefix(lang)}">${logo}<span>Mytor</span></a>
    <nav class="nav" id="site-nav" aria-label="${ui.mainNav}">
      <ul class="nav-list">${navLinks}</ul>
      <a class="btn btn-primary nav-cta" href="${url(lang, "demo")}">${ui.cta}</a>
    </nav>
    <div class="hdr-end">
      <nav class="lang" aria-label="${ui.langNav}">${langLinks}</nav>
      <a class="btn btn-primary btn-sm hdr-cta" href="${url(lang, "demo")}"${key === "demo" ? ' aria-current="page"' : ""}>${ui.cta}</a>
      <button type="button" class="menu-btn" aria-expanded="false" aria-controls="site-nav" data-label-open="${ui.menu}" data-label-close="${ui.closeMenu}">
        <span class="i-open">${icon.menu}</span><span class="i-close">${icon.close}</span><span class="sr-only" data-menu-label>${ui.menu}</span>
      </button>
    </div>
  </div>
</header>
<main id="main" tabindex="-1">
${body}
</main>
<footer class="site-footer">
  <div class="wrap foot">
    <div class="foot-brand">
      <a class="brand brand-light" href="${prefix(lang)}">${logo}<span>Mytor</span></a>
      <p>${ui.footer.tagline}</p>
      <p class="foot-note"><span class="status-dot" aria-hidden="true"></span>${ui.footer.note}</p>
    </div>
    <nav class="foot-col" aria-label="${ui.footer.product}">
      <p class="foot-h">${ui.footer.product}</p>
      <ul>
        <li><a href="${url(lang, "features")}">${ui.nav.features}</a></li>
        <li><a href="${url(lang, "how")}">${ui.nav.how}</a></li>
        <li><a href="${url(lang, "pricing")}">${ui.nav.pricing}</a></li>
        <li><a href="${url(lang, "demo")}">${ui.cta}</a></li>
      </ul>
    </nav>
    <nav class="foot-col" aria-label="${ui.footer.company}">
      <p class="foot-h">${ui.footer.company}</p>
      <ul>
        <li><a href="${url(lang, "about")}">${ui.nav.about}</a></li>
        <li><a href="${url(lang, "privacy")}">${ui.footer.privacy}</a></li>
        <li><a href="${paths[o]}" hreflang="${alt.htmlLang}" lang="${alt.htmlLang}">${alt.name}</a></li>
      </ul>
    </nav>
  </div>
  <div class="wrap"><div class="foot-base"><span>${ui.footer.rights}</span><span>${ui.status}</span></div></div>
</footer>
</body>
</html>
`;
}
