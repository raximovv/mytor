import Link from "next/link";
import { Icon, type IconName } from "@/components/icons";
import { H, Phase, Phone, Plate, SectionHead, Stamp } from "@/components/ui";
import HeroLoop from "@/components/HeroLoop";
import PitchSections from "@/components/PitchSections";
import PitchVideo from "@/components/PitchVideo";
import { CONTENT, href, path, type Lang } from "@/lib/site";

export default function Home({ lang }: { lang: Lang }) {
  const t = CONTENT[lang];
  const h = t.home, ui = t.ui, c = h.compare, fl = h.flow, d = t.demo, ph = t.phoneHero;
  const p = t.pitch;
  const words = d.transcript.split(" ");

  return (
    <>
      <section className="hero" aria-labelledby="hero-h">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <H as="h1" className="display" id="hero-h" html={h.title} />
            <H as="p" className="lead" html={h.lead} />
            <div className="actions hero-cta">
              <Link className="btn btn-primary btn-lg" href={path(lang, "demo")}>{h.cta}</Link>
              <span className="btn btn-ghost btn-lg cta-soon"><Icon name="download" /><span>{ui.download}</span> <span className="soon-tag">{ui.soon}</span></span>
            </div>
          </div>
          <div className="hero-visual">
            <HeroLoop>
              <div className="say-bubble app-say"><Icon name="mic" /><span>{ph.say}</span></div>
              <Phone time="14:32" className="phone-hero">
                <div className="app-screen">
                  <div className="app-listen" aria-hidden="true">
                    <p className="scr-title">{d.newService}</p>
                    <div className="listen"><span className="mic-btn"><Icon name="mic" /></span><span className="wave">{Array.from({ length: 13 }, (_, i) => <i key={i} />)}</span><span className="listen-text">{d.listening}</span></div>
                    <p className="transcript" data-words>
                      {words.map((w, i) => <span key={i}><span className="w" style={{ ["--i" as string]: i }}>{w}</span>{i < words.length - 1 ? " " : ""}</span>)}
                    </p>
                  </div>
                  <div className="app-rec scr">
                    <div className="scr-row"><span className="scr-title">{ph.card}</span><Plate p="20 D 477 BB" /></div>
                    <p className="scr-car">{t.sample.car}</p>
                    <dl className="draft">
                      {ph.rows.map(([k, v], i) => (
                        <div key={k} className={`frow ${i === 1 ? "is-fixed" : "is-ok"}`} style={{ ["--r" as string]: i }}><dt>{k}</dt><H as="dd" html={v} /></div>
                      ))}
                    </dl>
                    <div className="rec-foot"><div className="mini-ok"><Icon name="check" /><span>{ph.history}</span></div><Stamp text={ph.stamp} className="rec-stamp rec-stamp-inline app-stamp" /></div>
                    <div className="mini-stock"><span>{ph.stock}</span><span className="num"><s>{d.stockFrom}</s> → <b>{d.stockTo}</b></span></div>
                  </div>
                </div>
              </Phone>
              <div className="notify-card hero-notify app-notify"><Icon name="bell" /><div><b>{ph.notifyFrom} <span className="num">{d.time}</span></b><span>{ph.notifyText}</span></div></div>
            </HeroLoop>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="compare-h" id="problem">
        <div className="wrap">
          <SectionHead title={p.problemTitle} lead={p.problemLead} id="compare-h" />
          <ul className="compare">
            {c.rows.map((r, i) => (
              <li key={r.topic} className="cmp-tilt" data-reveal>
                <div className="cmp-card">
                <div className="cmp-head"><img className="cmp-photo" src={href(`/assets/problem/${["customers", "oil", "control"][i]}.jpg`)} width={64} height={64} alt="" loading="lazy" decoding="async" /><h3>{r.topic}</h3></div>
                <div className="cmp-side cmp-before"><span className="cmp-mark"><Icon name="close" /></span><p><span className="cmp-k">{c.before}</span>{r.before}</p></div>
                <span className="cmp-arrow" aria-hidden="true"><Icon name="arrow" /></span>
                <div className="cmp-side cmp-after"><span className="cmp-mark"><Icon name="check" /></span><p><span className="cmp-k">{c.after}</span>{r.after}</p></div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <PitchVideo lang={lang} />

      <section className="section" aria-labelledby="flow-h">
        <div className="wrap">
          <SectionHead title={p.solutionTitle} lead={p.solutionLead} id="flow-h" />
          <div className="flow">
            <div className="flow-col flow-worker" data-reveal>
              <Phase kind="worker">{fl.worker}</Phase>
              <ol className="flow-steps">{fl.steps.map(([a, s], i) => <li key={a}><span className="flow-n num">{i + 1}</span><span><b>{a}</b><span>{s}</span></span></li>)}</ol>
            </div>
            <div className="flow-core" data-reveal>
              <div className="rec-card">
                <div className="rec-card-top"><span className="mini-h"><Icon name="check" />{h.bridge.recordTitle}</span><Plate p="20 D 477 BB" /></div>
                <dl className="draft draft-tight">{h.bridge.record.map(([k, v]) => <div key={k} className="frow is-ok"><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
                <Stamp text={d.stamp} className="rec-card-stamp" />
              </div>
            </div>
            <div className="flow-col flow-auto" data-reveal>
              <Phase kind="auto">{fl.auto}</Phase>
              <ul className="flow-results">{fl.results.map(([a, s], i) => <li key={a}><span className="flow-ic"><Icon name={(["book", "drop", "bell", "send"] as IconName[])[i]} /></span><span><b>{a}</b><span>{s}</span></span></li>)}</ul>
            </div>
          </div>
          <p className="sec-link"><Link className="link-arrow" href={path(lang, "demo") + "#prototype"}>{p.demo.prototypeLink}<Icon name="arrow" /></Link></p>
        </div>
      </section>

      <PitchSections lang={lang} />

      <section className="cta-band" aria-labelledby="pitch-cta-h">
        <div className="wrap pitch-resources">
          <div><h2 id="pitch-cta-h">{p.cta.title}</h2><p className="lead">{p.cta.text}</p></div>
          <Link className="btn btn-primary btn-lg" href={path(lang, "demo")}>{ui.cta}<Icon name="arrow" /></Link>
        </div>
      </section>
    </>
  );
}

/** The presentation is a concept, not a claim that the software is launched. */
export const homeJsonLd = (lang: Lang) => ({
  "@type": "CreativeWork",
  name: "Mytor · Pitch Day 3.0",
  inLanguage: lang,
  description: CONTENT[lang].pitch.problemLead,
});
