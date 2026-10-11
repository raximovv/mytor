import Link from "next/link";
import { Icon } from "@/components/icons";
import { CtaBand, Facts, PageHero, SectionHead } from "@/components/ui";
import { CONTENT, path, type Lang } from "@/lib/site";

export default function Pricing({ lang }: { lang: Lang }) {
  const t = CONTENT[lang];
  const p = t.pricing;
  return (
    <>
      <PageHero title={p.title} lead={p.lead}>
        <Facts items={p.facts} />
        <div className="actions"><Link className="btn btn-primary btn-lg" href={path(lang, "demo")}>{t.ui.cta}</Link></div>
        <p className="cta-note">{p.ctaNote}</p>
      </PageHero>

      {/* Demo and pilot are free today; post-pilot prices are still being tested. Each stage states its status. */}
      <section className="section section-tight" aria-labelledby="ladder-h">
        <div className="wrap">
          <h2 id="ladder-h" className="h-sub">{p.ladderTitle}</h2>
          <ol className="ladder">
            {p.ladder.map((s, i) => (
              <li key={s.title} className={`ladder-step ladder-${i === 2 ? "later" : "free"}`} data-reveal>
                <p className="ladder-when"><span className="num">0{i + 1}</span>{s.when}</p>
                <h3>{s.title}</h3>
                <p className="ladder-status"><Icon name={i === 2 ? "alert" : "check"} />{s.status}</p>
                <p className="ladder-text">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section band" aria-labelledby="pilot-h">
        <div className="wrap">
          <h2 id="pilot-h" className="h-sub">{p.pilotTitle}</h2>
          <div className="weeks-bar" aria-hidden="true">
            {Array.from({ length: 6 }, (_, i) => <span key={i} className={`wk wk-${i === 0 ? "a" : i === 5 ? "c" : "b"}`}>{i + 1}</span>)}
          </div>
          <ol className="weeks">
            {p.weeks.map((w, i) => <li key={w.w} className={`week week-${"abc"[i]}`} data-reveal><span className="week-w">{w.w}</span><h3>{w.t}</h3><p>{w.d}</p></li>)}
          </ol>
        </div>
      </section>

      <section className="section" aria-labelledby="plans-h">
        <div className="wrap">
          <SectionHead title={p.plansTitle} lead={p.plansLead} id="plans-h" />
          <p className="badge-proposal"><Icon name="alert" />{p.proposal}</p>
          <ul className="plans">
            {p.plans.map((pl) => (
              <li key={pl.name} className="plan" data-reveal>
                <p className="plan-tag">{p.planTag}</p>
                <h3>{pl.name}</h3>
                <p className="plan-price"><span className="num">{pl.price}</span><span className="plan-unit">{pl.unit}</span></p>
                <p className="plan-for"><span>{p.forWord}:</span> {pl.for}</p>
              </li>
            ))}
          </ul>
          <p className="no-pay"><Icon name="check" /><span>{p.noPay}</span></p>
        </div>
      </section>

      <CtaBand t={t} lang={lang} />
    </>
  );
}
