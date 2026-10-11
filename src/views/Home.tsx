import Link from "next/link";
import { Icon, type IconName } from "@/components/icons";
import { CtaBand, Faq, H, Phase, Phone, Plate, SectionHead, Stamp, StampsRow } from "@/components/ui";
import { voiceScreens } from "@/components/previews";
import HeroLoop from "@/components/HeroLoop";
import VoiceDemo from "@/components/VoiceDemo";
import { CONTENT, path, type Lang } from "@/lib/site";

export default function Home({ lang }: { lang: Lang }) {
  const t = CONTENT[lang];
  const h = t.home, ui = t.ui, c = h.compare, fl = h.flow, bn = h.benefits, d = t.demo, ph = t.phoneHero;
  const tg = t.features.telegram, rc = t.features.recon, feed = t.features.owner.feed;
  const words = d.transcript.split(" ");

  // Each benefit tile proves its point with its own small preview (none repeats another section).
  const tiles = [
    {
      title: bn.big.title, text: bn.big.text,
      vis: (
        <div className="tile-chat">
          <div className="chat-head chat-head-mini"><span className="avatar">M</span><span><b>{tg.bot}</b><small>{tg.botSub}</small></span></div>
          <div className="bub">{tg.msg1}<span className="bt num">{tg.time1}</span></div>
          <div className="bub bub-card"><p className="mini-h">{tg.stampsTitle}</p><StampsRow filled={4} total={6} label={bn.big.stampsLabel} /></div>
        </div>
      ),
    },
    {
      title: bn.items[0].title, text: bn.items[0].text,
      vis: (
        <dl className="ledger ledger-mini">
          <div><dt>{rc.expected}</dt><dd className="num">{rc.expectedVal}</dd></div>
          <div><dt>{rc.counted}</dt><dd className="num">{rc.countedVal}</dd></div>
          <div className="ledger-gap"><dt>{rc.gap}</dt><dd className="num">{rc.gapVal}</dd></div>
        </dl>
      ),
    },
    {
      title: bn.items[1].title, text: bn.items[1].text,
      vis: (
        <ul className="feed feed-mini" data-stagger>
          {[feed[0], feed[1], feed[4]].map((m, i) => (
            <li key={m.k} className={`msg msg-${m.k}`} style={{ ["--i" as string]: i }}>
              <span className="msg-ic"><Icon name={(["check", "drop", "sum"] as IconName[])[i]} /></span>
              <div><p className="msg-h"><b>{m.t}</b><span className="num">{m.time}</span></p></div>
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: bn.items[2].title, text: bn.items[2].text,
      vis: (
        <div className="tile-worker">
          <span className="search-box is-static"><Icon name="search" /><span className="num">20 D 477</span></span>
          <span className="say-inline"><Icon name="mic" /><span>{d.correction}</span></span>
        </div>
      ),
    },
  ];

  return (
    <>
      {lang === "uz" ? (
        // A reader who chose Russian earlier and types the bare address is sent to /ru/ (only from outside the site).
        <script dangerouslySetInnerHTML={{ __html: `try{if(localStorage.getItem("mytor-lang")==="ru"&&location.pathname===${JSON.stringify((process.env.MYTOR_BASE_PATH || "") + "/")}&&!(document.referrer&&new URL(document.referrer).origin===location.origin))location.replace(${JSON.stringify((process.env.MYTOR_BASE_PATH || "") + "/ru/")})}catch(e){}` }} />
      ) : null}

      <section className="hero" aria-labelledby="hero-h">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <H as="h1" className="display" id="hero-h" html={h.title} />
            <H as="p" className="lead" html={h.lead} />
            <div className="actions hero-cta">
              <Link className="btn btn-primary btn-lg" href={path(lang, "demo")}>{ui.cta}</Link>
              {/* Download is not available yet: a second button with a "soon" tag, never a link. */}
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

      <section className="section" aria-labelledby="compare-h">
        <div className="wrap">
          <SectionHead title={c.title} lead={c.lead} id="compare-h" />
          <ul className="compare">
            {c.rows.map((r, i) => (
              <li key={r.topic} className="cmp-card" data-reveal>
                <div className="cmp-head"><span className="cmp-ic"><Icon name={(["user", "drop", "bell"] as IconName[])[i]} /></span><h3>{r.topic}</h3></div>
                <div className="cmp-side cmp-before"><span className="cmp-mark"><Icon name="close" /></span><p><span className="cmp-k">{c.before}</span>{r.before}</p></div>
                <span className="cmp-arrow" aria-hidden="true"><Icon name="arrow" /></span>
                <div className="cmp-side cmp-after"><span className="cmp-mark"><Icon name="check" /></span><p><span className="cmp-k">{c.after}</span>{r.after}</p></div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section band" aria-labelledby="benefits-h">
        <div className="wrap">
          <SectionHead title={bn.title} id="benefits-h" />
          <ul className="bento">
            {tiles.map((x) => (
              <li key={x.title} className="tile" data-reveal>
                <div className="tile-vis" aria-hidden="true">{x.vis}</div>
                <div className="tile-copy"><h3>{x.title}</h3><p>{x.text}</p></div>
              </li>
            ))}
          </ul>
          <p className="sec-link"><Link className="link-arrow" href={path(lang, "features")}>{bn.link}<Icon name="arrow" /></Link></p>
        </div>
      </section>

      <section className="section" aria-labelledby="flow-h">
        <div className="wrap">
          <SectionHead title={fl.title} lead={fl.lead} id="flow-h" />
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
          <p className="sec-link"><Link className="link-arrow" href={path(lang, "how")}>{fl.link}<Icon name="arrow" /></Link></p>
        </div>
      </section>

      <section className="section band" aria-labelledby="voice-h" id="voice">
        <div className="wrap">
          <SectionHead title={h.voice.title} lead={h.voice.lead} id="voice-h" />
          <VoiceDemo idBase="home-vd" steps={d.steps} screens={voiceScreens(t)}
            labels={{ region: d.region, prev: d.prev, next: d.next, restart: d.restart, play: d.play, pause: d.pause }}
            notify={{ from: d.notifyFrom, time: d.time, title: d.notifyTitle, text: d.notifyText }} />
        </div>
      </section>

      <section className="section" aria-labelledby="support-h">
        <div className="wrap">
          <div className="pilot">
            <div className="pilot-head">
              <SectionHead title={h.support.title} lead={h.support.lead} id="support-h" />
              <div className="pilot-cta">
                <Link className="btn btn-primary btn-lg" href={path(lang, "demo")}>{ui.cta}</Link>
                <Link className="link-arrow" href={path(lang, "pricing")}>{h.support.link}<Icon name="arrow" /></Link>
              </div>
              <p className="cta-note">{t.pricing.ctaNote}</p>
            </div>
            <ol className="support-steps">
              {h.support.steps.map(([a, s], i) => <li key={a} data-reveal><span className="support-n num">0{i + 1}</span><div><h3>{a}</h3><p>{s}</p></div></li>)}
            </ol>
          </div>
        </div>
      </section>

      <section className="section band" aria-labelledby="faq-h">
        <div className="wrap faq-grid">
          <SectionHead title={h.faq.title} id="faq-h" />
          <Faq items={h.faq.items} />
        </div>
      </section>

      <CtaBand t={t} lang={lang} />
    </>
  );
}

/** FAQ structured data: the same questions and answers that are visible on the page. */
export const homeJsonLd = (lang: Lang) => ({
  "@type": "FAQPage",
  mainEntity: CONTENT[lang].home.faq.items.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })),
});
