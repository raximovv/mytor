"use client";
// Demo-request form. Never claims success without a configured endpoint that answered 2xx.
// Not connected → says plainly nothing was sent. Failure → keeps the typed data. Gives up after 15 s.
import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { Icon } from "./icons";

type Msg = {
  legend: string; requiredNote: string; optional: string;
  name: string; phone: string; phoneHint: string; city: string; cityHint: string; shop: string;
  branches: string; branchOptions: readonly (readonly string[])[]; note: string; noteHint: string;
  consent: string; consentMore: string; submit: string; sending: string; cities: readonly string[];
  errors: { required: string; phone: string; consent: string; summary: string };
  notConnectedBanner: string; notConnectedTitle: string; notConnectedText: string;
  successTitle: string; successText: string; failTitle: string; failText: string;
};
type Name = "name" | "phone" | "city" | "consent";
type Result = { kind: "warn" | "success" | "error"; title: string; text: string } | null;

const phoneOk = (v: string) => { const d = v.replace(/\D/g, ""); return (d.length === 12 && d.startsWith("998")) || d.length === 9; };

export default function DemoForm({ f, lang, endpoint, privacyHref }: { f: Msg; lang: string; endpoint: string; privacyHref: string }) {
  const form = useRef<HTMLFormElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const [errors, setErrors] = useState<Partial<Record<Name, string>>>({});
  const [showSummary, setShowSummary] = useState(false);
  const [result, setResult] = useState<Result>(null);
  const [sending, setSending] = useState(false);

  const validate = () => {
    const el = form.current!.elements as unknown as Record<string, HTMLInputElement>;
    const next: Partial<Record<Name, string>> = {};
    (["name", "phone", "city"] as const).forEach((n) => {
      const v = el[n].value.trim();
      const e = !v ? f.errors.required : n === "phone" && !phoneOk(v) ? f.errors.phone : "";
      if (e) next[n] = e;
    });
    if (!el.consent.checked) next.consent = f.errors.consent;
    setErrors(next);
    return Object.keys(next) as Name[];
  };

  const show = (r: NonNullable<Result>) => { setResult(r); requestAnimationFrame(() => resultRef.current?.focus()); };

  // Re-validate once the person starts fixing a field that has an error.
  const onInput = (e: FormEvent<HTMLFormElement>) => {
    const t = e.target as HTMLInputElement;
    if (t.name && errors[t.name as Name]) validate();
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResult(null);
    const errs = validate();
    const el = form.current!.elements as unknown as Record<string, HTMLInputElement>;
    if (errs.length) { setShowSummary(true); el[errs[0]].focus(); return; }
    setShowSummary(false);
    if (!endpoint) { show({ kind: "warn", title: f.notConnectedTitle, text: f.notConnectedText }); return; }
    if (el.website.value) return; // honeypot

    const branches = (form.current!.elements.namedItem("branches") as RadioNodeList | null)?.value || null;
    const payload = {
      name: el.name.value.trim(), shop: el.shop.value.trim() || null, city: el.city.value.trim(), phone: el.phone.value.trim(),
      branches, note: (el.note as unknown as HTMLTextAreaElement).value.trim() || null, consent: true, lang, page: location.pathname,
    };
    setSending(true);
    const ctrl = new AbortController();
    const to = setTimeout(() => ctrl.abort(), 15000);
    try {
      const res = await fetch(endpoint, {
        method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload), signal: ctrl.signal,
      });
      if (!res.ok) throw new Error("HTTP " + res.status);
      form.current!.reset();
      show({ kind: "success", title: f.successTitle, text: f.successText });
    } catch {
      show({ kind: "error", title: f.failTitle, text: f.failText });
    } finally {
      clearTimeout(to);
      setSending(false);
    }
  };

  const field = (id: "name" | "phone" | "city" | "shop" | "note", label: string, opts: { type?: string; required?: boolean; hint?: string; attrs?: Record<string, unknown>; textarea?: boolean } = {}) => {
    const err = errors[id as Name];
    const describedBy = [opts.hint ? `f-${id}-hint` : "", `f-${id}-err`].filter(Boolean).join(" ");
    const common = { id: `f-${id}`, name: id, "aria-describedby": describedBy, "aria-invalid": err ? true : undefined, ...opts.attrs };
    return (
      <div className="field" data-field={id}>
        <label htmlFor={`f-${id}`}>{label}{opts.required ? <> <span className="req" aria-hidden="true">*</span></> : <> <span className="opt">({f.optional})</span></>}</label>
        {opts.textarea ? <textarea rows={4} {...common} /> : <input type={opts.type || "text"} required={opts.required} {...common} />}
        {opts.hint ? <p className="field-hint" id={`f-${id}-hint`}>{opts.hint}</p> : null}
        <p className="field-err" id={`f-${id}-err`} hidden={!err}>{err}</p>
      </div>
    );
  };

  return (
    <form ref={form} className="form" id="demo-form" method="post" action={endpoint || undefined} noValidate data-endpoint={endpoint} data-lang={lang}
      aria-labelledby="form-legend" onSubmit={onSubmit} onInput={onInput}>
      {endpoint ? null : <p className="form-banner" role="note"><Icon name="alert" /><span>{f.notConnectedBanner}</span></p>}
      <div className="form-summary" data-summary role="alert" tabIndex={-1} ref={summaryRef} hidden={!showSummary}>{showSummary ? f.errors.summary : ""}</div>
      <fieldset>
        <legend id="form-legend">{f.legend}</legend>
        <p className="req-note">{f.requiredNote}</p>
        <div className="field-row">
          {field("name", f.name, { required: true, attrs: { autoComplete: "name", maxLength: 80 } })}
          {field("phone", f.phone, { type: "tel", required: true, hint: f.phoneHint, attrs: { autoComplete: "tel", inputMode: "tel", maxLength: 20 } })}
        </div>
        <div className="field-row">
          {field("city", f.city, { required: true, hint: f.cityHint, attrs: { list: "city-list", autoComplete: "address-level2", maxLength: 80 } })}
          {field("shop", f.shop, { attrs: { autoComplete: "organization", maxLength: 120 } })}
        </div>
        <datalist id="city-list">{f.cities.map((c) => <option key={c} value={c} />)}</datalist>
        <fieldset className="field field-choice" data-field="branches">
          <legend>{f.branches} <span className="opt">({f.optional})</span></legend>
          <div className="choice-row">
            {f.branchOptions.map(([v, l], i) => (
              <label key={v} className="choice" htmlFor={`f-branches-${i + 1}`}>
                <input type="radio" name="branches" value={v} id={`f-branches-${i + 1}`} /><span>{l}</span>
              </label>
            ))}
          </div>
        </fieldset>
        {field("note", f.note, { hint: f.noteHint, textarea: true, attrs: { maxLength: 1000 } })}
        <div className="hp" aria-hidden="true"><label htmlFor="f-website">Website</label><input id="f-website" name="website" type="text" tabIndex={-1} autoComplete="off" /></div>
        <div className="field field-check" data-field="consent">
          <div className="check-row">
            <input id="f-consent" name="consent" type="checkbox" required aria-describedby="f-consent-err" aria-invalid={errors.consent ? true : undefined} />
            <label htmlFor="f-consent">{f.consent} <span className="req" aria-hidden="true">*</span></label>
          </div>
          <p className="consent-more"><Link href={privacyHref}>{f.consentMore}</Link></p>
          <p className="field-err" id="f-consent-err" hidden={!errors.consent}>{errors.consent}</p>
        </div>
      </fieldset>
      <button type="submit" className="btn btn-primary btn-lg btn-block" data-submit disabled={sending} aria-busy={sending || undefined}>
        {sending ? f.sending : f.submit}<span className="spinner" aria-hidden="true" />
      </button>
      <div className={`form-result${result ? " is-" + result.kind : ""}`} data-result role="status" tabIndex={-1} ref={resultRef} hidden={!result}>
        {result ? <><h3>{result.title}</h3><p>{result.text}</p></> : null}
      </div>
    </form>
  );
}

