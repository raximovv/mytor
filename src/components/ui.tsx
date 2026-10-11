// Shared presentational components. Content strings are authored in src/content and trusted: some contain
// small inline markup (<em>, <s>, &nbsp;), so they are rendered with <H>.
import { useId, type ElementType, type ReactNode } from "react";
import Link from "next/link";
import { Icon, STATUS_SVG } from "./icons";
import { path, type Content, type Lang } from "@/lib/site";

type HProps = { as?: ElementType; html: string; className?: string; id?: string; [k: string]: unknown };
/** Renders a trusted content string that may contain inline markup. */
export function H({ as: Tag = "span", html, ...rest }: HProps) {
  return <Tag {...rest} dangerouslySetInnerHTML={{ __html: html }} />;
}

/** Uzbek-style licence plate: region | number | UZ. */
export function Plate({ p }: { p: string }) {
  const [reg, ...rest] = p.split(" ");
  return (
    <span className="plate">
      <span className="plate-reg">{reg}</span>
      <span className="plate-num">{rest.join(" ")}</span>
      <span className="plate-uz" aria-hidden="true">UZ</span>
    </span>
  );
}

/** Circular "service stamp", the site's recurring motif. */
export function Stamp({ text, className = "", mark = "check" }: { text: string; className?: string; mark?: string }) {
  const id = "stp" + useId().replace(/[^a-zA-Z0-9]/g, "");
  return (
    <svg className={`stamp ${className}`} viewBox="0 0 120 120" aria-hidden="true" focusable="false">
      <defs><path id={id} d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" /></defs>
      <circle cx="60" cy="60" r="56" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="60" cy="60" r="33" fill="none" stroke="currentColor" strokeWidth="1.4" strokeDasharray="3 3" />
      <text fontSize="10" fontWeight="700" letterSpacing="1.2" fill="currentColor" fontFamily="JetBrains Mono, monospace">
        <textPath href={`#${id}`} textLength="270" lengthAdjust="spacing">{text}</textPath>
      </text>
      {mark === "check" ? (
        <path d="M45 61l10 10 21-23" fill="none" stroke="currentColor" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <text x="60" y="70" textAnchor="middle" fontSize="27" fontWeight="800" fill="currentColor" fontFamily="JetBrains Mono, monospace">{mark}</text>
      )}
    </svg>
  );
}

export function StampsRow({ filled, total = 6, label = "" }: { filled: number; total?: number; label?: string }) {
  return (
    <div className="stamps" role="img" aria-label={label}>
      {Array.from({ length: total }, (_, i) => (
        <span key={i} className={i < filled ? "on" : ""}>{i < filled ? <Icon name="check" /> : i + 1}</span>
      ))}
    </div>
  );
}

/** Short reassurance chips (e.g. "6 hafta · Bepul · Majburiyatsiz"). */
export function Facts({ items }: { items: readonly string[] }) {
  return <ul className="facts">{items.map((x) => <li key={x}><Icon name="check" />{x}</li>)}</ul>;
}

/** Who does a step: one-time setup, the worker, or Mytor by itself. */
export function Phase({ kind, children }: { kind: "setup" | "worker" | "auto"; children: ReactNode }) {
  return <span className={`phase phase-${kind}`}><span className="phase-dot" aria-hidden="true" />{children}</span>;
}

/** iPhone-style frame: titanium edge and side buttons, Dynamic Island and status bar on the screen, home indicator. */
export function Phone({ time, className = "", children }: { time: string; className?: string; children: ReactNode }) {
  return (
    <div className={`phone ${className}`}>
      <span className="phone-btn phone-btn-action" aria-hidden="true" />
      <span className="phone-btn phone-btn-up" aria-hidden="true" />
      <span className="phone-btn phone-btn-down" aria-hidden="true" />
      <span className="phone-btn phone-btn-power" aria-hidden="true" />
      <div className="phone-display">
        <div className="phone-bar">
          <span className="phone-time">{time}</span>
          <span className="phone-island" aria-hidden="true" />
          <span className="phone-icons" aria-hidden="true" dangerouslySetInnerHTML={{ __html: STATUS_SVG }} />
        </div>
        <div className="phone-screen">{children}</div>
        <span className="phone-home" aria-hidden="true" />
      </div>
    </div>
  );
}

export function SectionHead({ title, lead, id, className = "" }: { title: string; lead?: string; id?: string; className?: string }) {
  return (
    <div className={`sec-head ${className}`}>
      <H as="h2" id={id} html={title} />
      {lead ? <H as="p" className="lead" html={lead} /> : null}
    </div>
  );
}

/** Page opening: title, lead and actions. */
export function PageHero({ title, lead, className = "", children }: { title: string; lead?: string; className?: string; children?: ReactNode }) {
  return (
    <section className={`page-hero ${className}`}>
      <div className="wrap page-hero-in">
        <div className="page-hero-copy">
          <H as="h1" className="display" html={title} />
          {lead ? <H as="p" className="lead" html={lead} /> : null}
          {children}
        </div>
      </div>
    </section>
  );
}

export function Actions({ t, lang, secondary = true, className = "" }: { t: Content; lang: Lang; secondary?: boolean; className?: string }) {
  return (
    <div className={`actions ${className}`}>
      <Link className="btn btn-primary btn-lg" href={path(lang, "demo")}>{t.ui.cta}</Link>
      {secondary ? <Link className="btn btn-ghost btn-lg" href={path(lang, "how")}>{t.ui.ctaSecondary}</Link> : null}
    </div>
  );
}

export function Faq({ items }: { items: readonly { q: string; a: string }[] }) {
  return (
    <div className="faq">
      {items.map((i) => (
        <details key={i.q}>
          <summary><H html={i.q} /><span className="faq-i" aria-hidden="true" /></summary>
          <div className="faq-a"><H as="p" html={i.a} /></div>
        </details>
      ))}
    </div>
  );
}

export function CtaBand({ t, lang, current = "" }: { t: Content; lang: Lang; current?: string }) {
  return (
    <section className="cta-band" aria-labelledby="cta-title">
      <div className="wrap">
        <div className="cta-inner">
          <Stamp text={t.demo.stamp} className="cta-stamp" />
          <div className="cta-copy">
            <H as="h2" id="cta-title" html={t.cta.title} />
            <H as="p" html={t.cta.text} />
            <ul className="cta-facts">{t.pricing.facts.map((x) => <li key={x}><Icon name="check" />{x}</li>)}</ul>
          </div>
          <div className="actions">
            <Link className="btn btn-primary btn-lg" href={path(lang, "demo")}>{t.ui.cta}</Link>
            {current === "how" ? null : <Link className="btn btn-ghost-light btn-lg" href={path(lang, "how")}>{t.ui.ctaSecondary}</Link>}
          </div>
        </div>
      </div>
    </section>
  );
}
