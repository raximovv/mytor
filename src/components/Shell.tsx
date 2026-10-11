// Page frame: skip link, header, main, footer, the fixed "site is a demo" strip, hreflang links and structured data.
import type { ReactNode } from "react";
import Link from "next/link";
import Header from "./Header";
import { Logo } from "./icons";
import { CONTENT, LANGS, abs, href, path, prefix, SITE_URL, type Lang, type PageKey } from "@/lib/site";

const NAV: PageKey[] = ["features", "how", "pricing", "about"];

/** Structured data: who publishes the site plus anything the page adds. No offers: prices are not final. */
function JsonLd({ lang, extra }: { lang: Lang; extra?: object }) {
  const t = CONTENT[lang];
  const org: Record<string, unknown> = { "@type": "Organization", name: "Mytor", description: t.ui.footer.tagline, areaServed: ["Guliston", "Sirdaryo"] };
  const site: Record<string, unknown> = { "@type": "WebSite", name: "Mytor", inLanguage: t.htmlLang };
  if (SITE_URL) {
    org.url = abs(prefix("uz"));
    org.logo = abs("/assets/apple-touch-icon.png");
    site.url = abs(prefix(lang));
  }
  const graph = { "@context": "https://schema.org", "@graph": [org, site, ...(extra ? [extra] : [])] };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }} />;
}

export default function Shell({ lang, page, noindex = false, jsonld, children }: {
  lang: Lang; page: PageKey | "notfound"; noindex?: boolean; jsonld?: object; children: ReactNode;
}) {
  const t = CONTENT[lang];
  const ui = t.ui;
  // The same page in each language (404 pages point at the two homepages).
  const pagePath = (l: Lang) => (page === "notfound" ? prefix(l) : path(l, page));

  return (
    <>
      {noindex ? null : LANGS.map((l) => <link key={l} rel="alternate" hrefLang={l} href={abs(pagePath(l))} />)}
      {noindex ? null : <link rel="alternate" hrefLang="x-default" href={abs(pagePath("uz"))} />}
      <a className="skip" href="#main">{ui.skip}</a>
      <Header
        home={prefix(lang)}
        nav={NAV.map((k) => ({ key: k, label: ui.nav[k as keyof typeof ui.nav], href: path(lang, k) }))}
        current={page}
        cta={ui.cta}
        ctaHref={path(lang, "demo")}
        ctaCurrent={page === "demo"}
        langs={(["uz", "ru"] as Lang[]).map((l) => ({ lang: CONTENT[l].htmlLang, name: CONTENT[l].name, href: href(pagePath(l)), flag: href(`/assets/flag-${l}.svg`), current: l === lang }))}
        labels={{ mainNav: ui.mainNav, langNav: ui.langNav, menu: ui.menu, closeMenu: ui.closeMenu }}
      />
      <main id="main" tabIndex={-1}>{children}</main>
      <footer className="site-footer">
        <div className="wrap foot">
          <div className="foot-brand">
            <Link className="brand brand-light" href={prefix(lang)}><Logo /><span>Mytor</span></Link>
            <p>{ui.footer.tagline}</p>
          </div>
          <nav className="foot-col" aria-label={ui.footer.product}>
            <p className="foot-h">{ui.footer.product}</p>
            <ul>
              <li><Link href={path(lang, "features")}>{ui.nav.features}</Link></li>
              <li><Link href={path(lang, "how")}>{ui.nav.how}</Link></li>
              <li><Link href={path(lang, "pricing")}>{ui.nav.pricing}</Link></li>
              <li><Link href={path(lang, "demo")}>{ui.cta}</Link></li>
            </ul>
          </nav>
          <nav className="foot-col" aria-label={ui.footer.company}>
            <p className="foot-h">{ui.footer.company}</p>
            <ul>
              <li><Link href={path(lang, "about")}>{ui.nav.about}</Link></li>
              <li><Link href={path(lang, "privacy")}>{ui.footer.privacy}</Link></li>
            </ul>
          </nav>
        </div>
        <div className="wrap"><div className="foot-base"><span>{ui.footer.rights}</span></div></div>
      </footer>
      <div className="demo-bar">
        <p className="sr-only">{ui.demoBar}</p>
        <div className="demo-track" aria-hidden="true">{Array.from({ length: 16 }, (_, i) => <span key={i}>{ui.demoBar}</span>)}</div>
      </div>
      {noindex ? null : <JsonLd lang={lang} extra={jsonld} />}
    </>
  );
}

