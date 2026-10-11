// Product previews (illustrative screens with fictional data). Rendered on the server; the interactive
// wrappers (voice demo, hero loop, lookup) are client components that receive these as children.
import { Fragment, type ReactNode } from "react";
import { Icon, type IconName } from "./icons";
import { H, Phone, Plate, Stamp, StampsRow } from "./ui";
import type { Content } from "@/lib/site";

type RowState = "ok" | "need" | "fixed" | "opt";
export function Frow({ label, state = "ok", note, children }: { label: string; state?: RowState; note?: ReactNode; children: ReactNode }) {
  return (
    <div className={`frow is-${state}`}>
      <dt>{label}</dt>
      <dd>{children}{note ? <> <span className="fnote">{note}</span></> : null}</dd>
    </div>
  );
}

/** The five voice-entry screens: speak → draft → clarify → confirm → history & stock. */
export function voiceScreens(t: Content): ReactNode[] {
  const d = t.demo, f = d.fields, v = d.values;
  return [
    <Fragment key="s1">
      <div className="scr-title">{d.newService}</div>
      <div className="listen"><span className="mic-btn"><Icon name="mic" /></span><span className="wave" aria-hidden="true">{Array.from({ length: 13 }, (_, i) => <i key={i} />)}</span><span className="listen-text">{d.listening}</span></div>
      <p className="transcript">{d.transcript}</p>
    </Fragment>,
    <Fragment key="s2">
      <div className="scr-row"><span className="scr-title">{d.newService}</span><span className="pill pill-draft">{d.draft}</span></div>
      <dl className="draft">
        <Frow label={f.vehicle}><Plate p="20 D 477 BB" /> <span className="fsub">{t.sample.car} · {v.vehicleFound}</span></Frow>
        <Frow label={f.service}>{v.service}</Frow>
        <Frow label={f.product} state="need" note={<span className="pill pill-need">{d.needs}</span>}>{v.productDraft}</Frow>
        <Frow label={f.qty}>{v.qtyDraft}</Frow>
        <Frow label={f.total}>{v.total}</Frow>
        <Frow label={f.payment}>{v.payment}</Frow>
        <Frow label={f.mileage} state="opt"><span className="muted">{v.optional}</span></Frow>
      </dl>
    </Fragment>,
    <Fragment key="s3">
      <div className="ask"><p>{d.ask}</p><div className="ask-opts"><span className="chip is-picked"><Icon name="check" />{d.optBarrel}</span><span className="chip">{d.optBottle}</span></div></div>
      <div className="say-inline"><Icon name="mic" /><span>{d.correction}</span></div>
      <dl className="draft draft-tight">
        <Frow label={f.vehicle}><Plate p="20 D 477 BB" /></Frow>
        <Frow label={f.product} state="fixed">{v.productFinal}</Frow>
        <Frow label={f.qty} state="fixed" note={<span className="pill pill-fixed">{d.corrected}</span>}><s>{v.qtyDraft}</s> <b>{v.qtyFinal}</b></Frow>
        <Frow label={f.total}>{v.total}</Frow>
        <Frow label={f.payment}>{v.payment}</Frow>
      </dl>
    </Fragment>,
    <Fragment key="s4">
      <div className="scr-row"><span className="scr-title">{d.newService}</span><Plate p="20 D 477 BB" /></div>
      <dl className="draft draft-tight">
        <Frow label={f.service}>{v.service}</Frow>
        <Frow label={f.product}>{v.productFinal}</Frow>
        <Frow label={f.qty}>{v.qtyFinal}</Frow>
        <Frow label={f.total}>{v.total}</Frow>
        <Frow label={f.payment}>{v.payment}</Frow>
      </dl>
      <div className="confirm-wrap"><span className="fake-btn"><Icon name="check" />{d.confirm}</span><Stamp text={d.stamp} className="rec-stamp rec-stamp-lg" /></div>
      <p className="scr-note">{d.confirmNote}</p>
    </Fragment>,
    <Fragment key="s5">
      <div className="saved"><Icon name="check" /><span>{d.saved}</span></div>
      <div className="mini-card"><p className="mini-h"><Icon name="book" />{d.history}</p><p>{d.historyEntry}</p><p className="scr-note">{d.driverNote}</p></div>
      <div className="mini-card"><p className="mini-h"><Icon name="drop" />{d.stock}</p><p className="num stock-move"><s>{d.stockFrom}</s><Icon name="arrow" /><b>{d.stockTo}</b></p><div className="lvl" aria-hidden="true"><i style={{ ["--from" as string]: "62%", ["--to" as string]: "59%" }} /></div></div>
    </Fragment>,
  ];
}

/** Telegram-style driver chat: reminder, service book, bonus litres. */
export function DriverChat({ t }: { t: Content }) {
  const g = t.features.telegram;
  return (
    <figure className="chat-fig">
      <Phone time="10:14" className="phone-chat">
        <div className="chat-head"><span className="avatar">M</span><span><b>{g.bot}</b><small>{g.botSub}</small></span></div>
        <div className="chat">
          <div className="bub">{g.msg1}<br /><span className="muted">{g.msg1b}</span><span className="bt num">{g.time1}</span></div>
          <div className="bub bub-card"><p className="mini-h"><Icon name="book" />{g.bookTitle}</p><ul className="book">{g.book.map(([dt, x]) => <li key={dt}><span className="num">{dt}</span><span>{x}</span></li>)}</ul></div>
          <div className="bub bub-card"><p className="mini-h">{g.stampsTitle}</p><StampsRow filled={4} total={6} label={g.stampsLabel} /></div>
          <div className="bub bub-me">{g.reply}<span className="bt num">{g.time2}</span></div>
        </div>
      </Phone>
    </figure>
  );
}

const FEED_ICON: Record<string, IconName> = { service: "check", low: "drop", gap: "scale", fix: "edit", daily: "sum" };

export function OwnerFeed({ t }: { t: Content }) {
  const o = t.features.owner;
  return (
    <figure className="feed-fig">
      <div className="feed-card">
        <p className="feed-title"><Icon name="bell" />{o.feedTitle}<span className="pill pill-plain">Telegram</span></p>
        <ul className="feed">
          {o.feed.map((m) => (
            <li key={m.k} className={`msg msg-${m.k}`}>
              <span className="msg-ic"><Icon name={FEED_ICON[m.k]} /></span>
              <div><p className="msg-h"><b>{m.t}</b><span className="num">{m.time}</span></p><p>{m.d}</p></div>
            </li>
          ))}
        </ul>
      </div>
    </figure>
  );
}

/** Stock reconciliation: expected vs counted, with the gap shown as something to check. */
export function Reconcile({ t }: { t: Content }) {
  const r = t.features.recon;
  return (
    <figure className="recon-fig">
      <div className="recon">
        <p className="recon-title"><Icon name="scale" />{r.title}</p>
        <dl className="ledger">
          {r.rows.map(([k, v]) => <div key={k}><dt>{k}</dt><dd className="num">{v}</dd></div>)}
          <div className="ledger-total"><dt>{r.expected}</dt><dd className="num">{r.expectedVal}</dd></div>
          <div><dt>{r.counted}</dt><dd className="num">{r.countedVal}</dd></div>
          <div className="ledger-gap"><dt>{r.gap} <span>· {r.gapNote}</span></dt><dd className="num">{r.gapVal}</dd></div>
        </dl>
        <div className="gauge" role="img" aria-label={r.gaugeLabel}>
          <div className="gauge-track"><span className="g-counted" style={{ width: "55%" }} /><span className="g-gap" style={{ left: "55%", width: "7%" }} /><span className="g-mark" style={{ left: "62%" }} /></div>
          <div className="gauge-legend"><span><i className="lg-counted" />{r.counted} {r.countedVal}</span><span><i className="lg-gap" />{r.gap} <b className="num">{r.gapVal}</b></span><span><i className="lg-mark" />{r.expected}</span></div>
        </div>
        <p className="recon-ok"><Icon name="check" /><span>{r.bottle}</span></p>
        <p className="recon-note">{r.note}</p>
      </div>
    </figure>
  );
}

