import { Icon } from "@/components/icons";
import { CtaBand, H, PageHero, Stamp } from "@/components/ui";
import { CONTENT, type Lang } from "@/lib/site";

export default function About({ lang }: { lang: Lang }) {
  const t = CONTENT[lang];
  const a = t.about;
  return (
    <>
      <PageHero title={a.title} lead={a.lead} />

      <section className="section" aria-labelledby="why-h">
        <div className="wrap about-why">
          <h2 id="why-h" className="h-big">{a.why.title}</h2>
          <div className="prose">{a.why.paras.map((p) => <H as="p" key={p} html={p} />)}</div>
        </div>
      </section>

      <section className="section band" aria-labelledby="local-h">
        <div className="wrap about-cards">
          <div className="about-local" data-reveal>
            <p className="about-place"><Icon name="pin" /><span>{a.local.place}</span></p>
            <h2 id="local-h">{a.local.title}</h2>
            <p className="lead">{a.local.text}</p>
            <ul className="checks">{a.local.list.map((x) => <li key={x}><Icon name="check" /><span>{x}</span></li>)}</ul>
          </div>
          <div className="about-support" data-reveal>
            <Stamp text={t.demo.stamp} className="about-stamp" />
            <h2>{a.support.title}</h2>
            <p>{a.support.text}</p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="principles-h">
        <div className="wrap">
          <h2 id="principles-h" className="h-sub">{a.principles.title}</h2>
          <ul className="principles">
            {a.principles.items.map((x, i) => <li key={x.t} data-reveal><span className="num">0{i + 1}</span><h3>{x.t}</h3><p>{x.d}</p></li>)}
          </ul>
        </div>
      </section>

      <CtaBand t={t} lang={lang} />
    </>
  );
}
