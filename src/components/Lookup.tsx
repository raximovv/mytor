"use client";
// Sample lookup: filters the fictional rows on the page. Nothing is sent anywhere.
import { useState, type ReactNode } from "react";
import { Icon } from "./icons";

const norm = (s: string) => s.toLowerCase().replace(/[\s+\-()]/g, "");

export default function Lookup({ label, placeholder, hint, countPrefix, empty, rows, history }: {
  label: string; placeholder: string; hint: string; countPrefix: string; empty: string;
  rows: { key: string; q: string; node: ReactNode }[]; history: ReactNode;
}) {
  const [q, setQ] = useState("");
  const nq = norm(q);
  const hits = rows.map((r) => !nq || norm(r.q).includes(nq));
  const n = hits.filter(Boolean).length;
  return (
    <figure className="lookup-fig">
      <div className="lookup">
        <div className="lookup-search">
          <label htmlFor="lookup-q">{label}</label>
          <div className="search-box">
            <Icon name="search" />
            <input id="lookup-q" type="search" placeholder={placeholder} autoComplete="off" aria-describedby="lookup-hint"
              data-lookup-input value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          <p className="field-hint" id="lookup-hint">{hint}</p>
        </div>
        <p className="sr-only" aria-live="polite" data-lookup-status>{nq ? `${countPrefix} ${n}` : ""}</p>
        <ul className="lookup-list" data-lookup-list>
          {rows.map((r, i) => <li key={r.key} data-q={r.q} hidden={!hits[i]}>{r.node}</li>)}
        </ul>
        <p className="lookup-empty" data-lookup-empty hidden={n !== 0}>{empty}</p>
        {history}
      </div>
    </figure>
  );
}
