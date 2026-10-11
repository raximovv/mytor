import { Icon } from "@/components/icons";
import { CtaBand, H, PageHero, Plate } from "@/components/ui";
import { DriverChat, OwnerFeed, Reconcile, voiceScreens } from "@/components/previews";
import Lookup from "@/components/Lookup";
import Toc from "@/components/Toc";
import VoiceDemo from "@/components/VoiceDemo";
import { CONTENT, type Content, type Lang } from "@/lib/site";

const ANCHORS = ["records", "voice", "stock", "owner", "telegram"];

/** Every feature answers the same three questions, in the same order. */
function Pwb({ L, x }: { L: Content["features"]["labels"]; x: { problem: string; lead: string; why: string } }) {
  return (
    <dl className="pwb">
      <div className="pwb-problem"><dt>{L.problem}</dt><H as="dd" html={x.problem} /></div>
      <div className="pwb-how"><dt>{L.how}</dt><H as="dd" html={x.lead} /></div>
      <div className="pwb-why"><dt>{L.why}</dt><H as="dd" html={x.why} /></div>
    </dl>
  );
}

function Head({ title, id, n }: { title: string; id: string; n: number }) {
  return <><p className="feature-n num">0{n}</p><H as="h2" id={id} html={title} /></>;
}

export default function Features({ lang }: { lang: Lang }) {
  const t = CONTENT[lang];
  const f = t.features, r = f.records, s = f.stock, L = f.labels, d = t.demo;

  const history = (
    <div className="history">
      <p className="mini-h"><Icon name="book" />{r.historyTitle}</p>
      <ol className="history-list">
        {r.history.map((h) => (
          <li key={h.date}><span className="h-date">{h.date}</span><span className="h-kind">{h.kind}</span><span className="h-text">{h.text}</span>{h.km ? <span className="h-km num">{h.km}</span> : null}</li>
        ))}
      </ol>
    </div>
  );

  return (
    <>
      <PageHero title={f.title} lead={f.lead} className="page-hero-features" />
      <Toc label={f.toc} items={f.tocItems.map((x, i) => ({ id: ANCHORS[i], text: x }))} />

      <section className="section feature" id="records" aria-labelledby="records-h">
        <div className="wrap split split-wide">
          <div className="split-copy">
            <Head title={r.title} id="records-h" n={1} />
            <Pwb L={L} x={r} />
            <ul className="checks">{r.points.map((p) => <li key={p}><Icon name="check" /><span>{p}</span></li>)}</ul>
          </div>
          <div className="split-visual">
            <Lookup label={r.lookupLabel} placeholder={r.lookupPlaceholder} hint={r.lookupHint} countPrefix={r.lookupCount} empty={r.lookupEmpty} history={history}
              rows={r.cars.map((c) => ({
                key: c.plate,
                q: `${c.search} ${c.plate.toLowerCase()} ${c.model.toLowerCase()} ${c.who.toLowerCase()}`,
                node: <><Plate p={c.plate} /><span className="lk-main"><b>{c.model}</b><span>{c.who} · <span className="num">{c.phone}</span></span></span><span className="lk-last">{c.last}</span></>,
              }))} />
          </div>
        </div>
      </section>

      <section className="section band feature" id="voice" aria-labelledby="voice-h">
        <div className="wrap">
          <div className="feature-wide-head">
            <div><Head title={f.voice.title} id="voice-h" n={2} /></div>
            <Pwb L={L} x={f.voice} />
          </div>
          <VoiceDemo idBase="feat-vd" steps={d.steps} screens={voiceScreens(t)}
            labels={{ region: d.region, prev: d.prev, next: d.next, restart: d.restart, play: d.play, pause: d.pause }}
            notify={{ from: d.notifyFrom, time: d.time, title: d.notifyTitle, text: d.notifyText }} />
          <p className="voice-lang"><Icon name="mic" /><span>{f.voice.langNote}</span></p>
        </div>
      </section>

      <section className="section feature" id="stock" aria-labelledby="stock-h">
        <div className="wrap split">
          <div className="split-copy">
            <Head title={s.title} id="stock-h" n={3} />
            <Pwb L={L} x={s} />
            <p className="caution"><Icon name="alert" /><span><b>{s.caution.title}</b> {s.caution.text}</span></p>
          </div>
          <div className="split-visual"><Reconcile t={t} /></div>
        </div>
      </section>

      <section className="section band-dark feature" id="owner" aria-labelledby="owner-h">
        <div className="wrap split split-rev">
          <div className="split-copy">
            <Head title={f.owner.title} id="owner-h" n={4} />
            <Pwb L={L} x={f.owner} />
          </div>
          <div className="split-visual"><OwnerFeed t={t} /></div>
        </div>
      </section>

      <section className="section feature" id="telegram" aria-labelledby="telegram-h">
        <div className="wrap split">
          <div className="split-copy">
            <Head title={f.telegram.title} id="telegram-h" n={5} />
            <Pwb L={L} x={f.telegram} />
            <dl className="points">{f.telegram.points.map((p) => <div key={p.t}><dt>{p.t}</dt><dd>{p.d}</dd></div>)}</dl>
          </div>
          <div className="split-visual"><DriverChat t={t} /></div>
        </div>
      </section>

      <CtaBand t={t} lang={lang} />
    </>
  );
}
