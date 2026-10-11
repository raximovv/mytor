import Link from "next/link";
import type { ReactNode } from "react";
import { Icon, type IconName } from "@/components/icons";
import { Actions, CtaBand, PageHero, Phase, Plate, SectionHead, Stamp } from "@/components/ui";
import HowProgress from "@/components/HowProgress";
import { CONTENT, path, type Lang } from "@/lib/site";

// Eight steps in three phases: once (setup), per car (worker), afterwards (Mytor by itself).
const GROUPS = [[0], [1, 2, 3], [4, 5, 6, 7]];
const KINDS = ["setup", "worker", "auto"] as const;
const ROLE_ICON: Record<string, IconName> = { owner: "user", worker: "wrench", driver: "car" };

export default function How({ lang }: { lang: Lang }) {
  const t = CONTENT[lang];
  const h = t.how, d = t.demo, b = t.home.bridge;

  // A distinct, readable preview for each step.
  const visuals: ReactNode[] = [
    <ul key="0" className="chips-static">{h.stages[0].list.map((x) => <li key={x}><Icon name="check" />{x}</li>)}</ul>,
    <div key="1" className="mini-search"><span className="search-box is-static"><Icon name="search" /><span className="num">20 D 477</span></span><span className="mini-result"><Plate p="20 D 477 BB" /><span>{t.sample.car}</span></span></div>,
    <div key="2" className="mini-say"><span className="say-inline"><Icon name="mic" /><span>{d.transcript}</span></span></div>,
    <div key="3" className="mini-rec">
      <dl className="draft draft-tight">
        <div className="frow is-ok"><dt>{d.fields.product}</dt><dd>{d.values.productFinal}</dd></div>
        <div className="frow is-fixed"><dt>{d.fields.qty}</dt><dd><s>{d.values.qtyDraft}</s> <b>{d.values.qtyFinal}</b></dd></div>
        <div className="frow is-ok"><dt>{d.fields.total}</dt><dd>{d.values.total}</dd></div>
      </dl>
      <Stamp text={d.stamp} className="rec-stamp" />
    </div>,
    <ol key="4" className="oc-timeline">{b.timeline.map(([dt, x], i) => <li key={dt} className={i === 0 ? "is-new" : ""}><span className="num">{dt}</span><span>{x}</span></li>)}</ol>,
    <div key="5"><p className="mini-h"><Icon name="drop" />{d.stock}</p><p className="num stock-move"><s>{d.stockFrom}</s><Icon name="arrow" /><b>{d.stockTo}</b><span className="delta">{h.delta}</span></p><div className="lvl" aria-hidden="true"><i style={{ ["--to" as string]: "59%" }} /></div></div>,
    <p key="6" className="notify-card"><Icon name="bell" /><span><b>{d.notifyTitle} · <span className="num">{d.time}</span></b><span>{d.notifyText}</span></span></p>,
    <p key="7" className="bub">{t.features.telegram.msg1}</p>,
  ];

  // Steps 05–08 all follow from the one confirmed record: tag each with when it happens.
  const when = (i: number) =>
    i < 4 ? null : i === 7
      ? <span className="when when-later"><Icon name="clock" />{h.later}</span>
      : <span className="when">{h.now} · <span className="num">{d.time}</span></span>;

  const range = (g: number[]) => (g.length === 1 ? `0${g[0] + 1}` : `0${g[0] + 1}–0${g[g.length - 1] + 1}`);

  return (
    <>
      <PageHero title={h.title} lead={h.lead}><Actions t={t} lang={lang} secondary={false} /></PageHero>

      <section className="section how-flow" aria-label={h.eyebrow}>
        <HowProgress legend={{ label: h.eyebrow, items: GROUPS.map((g, gi) => ({ n: gi + 1, kind: KINDS[gi], range: range(g), text: h.groups[gi] })) }}>
          {GROUPS.map((g, gi) => (
            <div key={gi} className={`stage-group stage-group-${gi + 1}`} id={`phase-${gi + 1}`} data-group={gi + 1}>
              <h2 className="group-h"><Phase kind={KINDS[gi]}>{range(g)}</Phase><span>{h.groups[gi]}</span></h2>
              {gi === 2 ? (
                <div className="fan-src">
                  <span className="fan-ok"><Icon name="check" /></span>
                  <p className="fan-main"><b>{h.fan.title} · <span className="num">{d.time}</span></b><span className="fan-rec"><Plate p="20 D 477 BB" /><span>{h.fan.record}</span></span></p>
                  <p className="fan-note">{h.fan.note}</p>
                </div>
              ) : null}
              <ol className="stages" start={g[0] + 1}>
                {g.map((i) => (
                  <li key={i} className={`stage stage-${KINDS[gi]}`} data-step data-reveal>
                    <span className="stage-dot" aria-hidden="true" />
                    <div className="stage-copy"><p className="stage-num"><span className="num">{String(i + 1).padStart(2, "0")}</span>{when(i)}</p><h3>{h.stages[i].title}</h3><p>{h.stages[i].text}</p></div>
                    <div className="stage-visual">{visuals[i]}</div>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </HowProgress>
      </section>

      <section className="section band" aria-labelledby="roles-h">
        <div className="wrap">
          <SectionHead title={h.roles.title} id="roles-h" />
          <div className="roles">
            {h.roles.items.map((r) => (
              <article key={r.k} className={`role role-${r.k}`} data-reveal>
                <span className="role-ic"><Icon name={ROLE_ICON[r.k]} /></span>
                <h3>{r.title}</h3>
                <p className="role-lead">{r.lead}</p>
                <ul className="checks">{r.list.map((x) => <li key={x}><Icon name="check" /><span>{x}</span></li>)}</ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-tight">
        <div className="wrap">
          <Link className="pilot-link" href={path(lang, "pricing")}>
            <span><b>{h.pilot.title}</b><span>{h.pilot.text}</span></span>
            <span className="link-arrow">{h.pilot.link}<Icon name="arrow" /></span>
          </Link>
        </div>
      </section>

      <CtaBand t={t} lang={lang} current="how" />
    </>
  );
}
