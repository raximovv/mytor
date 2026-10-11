"use client";
// Site header: navigation, flag language switch, demo CTA and the mobile menu (Escape and outside click close it).
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Icon, Logo } from "./icons";

type NavItem = { key: string; label: string; href: string };
type LangLink = { lang: string; name: string; href: string; flag: string; current: boolean };

export default function Header({ home, nav, current, cta, ctaHref, ctaCurrent, langs, labels }: {
  home: string; nav: NavItem[]; current: string; cta: string; ctaHref: string; ctaCurrent: boolean;
  langs: LangLink[]; labels: { mainNav: string; langNav: string; menu: string; closeMenu: string };
}) {
  const [open, setOpen] = useState(false);
  const btn = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;
    navRef.current?.querySelector("a")?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); btn.current?.focus(); } };
    const onClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!navRef.current?.contains(t) && !btn.current?.contains(t)) setOpen(false);
    };
    const wide = window.matchMedia("(min-width: 1040px)");
    const onWide = (m: MediaQueryListEvent) => { if (m.matches) setOpen(false); };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    wide.addEventListener("change", onWide);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
      wide.removeEventListener("change", onWide);
    };
  }, [open]);

  return (
    <header className="site-header">
      <div className="wrap hdr">
        <Link className="brand" href={home}><Logo /><span>Mytor</span></Link>
        <nav className={`nav${open ? " is-open" : ""}`} id="site-nav" aria-label={labels.mainNav} ref={navRef}>
          <ul className="nav-list">
            {nav.map((n) => (
              <li key={n.key}><a href={n.href} aria-current={n.key === current ? "page" : undefined} onClick={() => setOpen(false)}>{n.label}</a></li>
            ))}
          </ul>
          <Link className="btn btn-primary nav-cta" href={ctaHref} onClick={() => setOpen(false)}>{cta}</Link>
        </nav>
        <div className="hdr-end">
          <nav className="lang" aria-label={labels.langNav}>
            {/* Plain links: switching language loads the other language's document (its own <html lang>). */}
            {langs.map((l) => (
              <a key={l.lang} href={l.href} hrefLang={l.lang} lang={l.lang} aria-current={l.current ? "true" : undefined} aria-label={l.name} title={l.name}>
                <img className="lang-flag" src={l.flag} width={24} height={18} alt="" aria-hidden="true" />
              </a>
            ))}
          </nav>
          <Link className="btn btn-primary btn-sm hdr-cta" href={ctaHref} aria-current={ctaCurrent ? "page" : undefined}>{cta}</Link>
          <button type="button" className="menu-btn" aria-expanded={open} aria-controls="site-nav" ref={btn} onClick={() => setOpen((o) => !o)}>
            <span className="i-open"><Icon name="menu" /></span>
            <span className="i-close"><Icon name="close" /></span>
            <span className="sr-only" data-menu-label>{open ? labels.closeMenu : labels.menu}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
