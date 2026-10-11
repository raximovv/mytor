import { Icon } from "@/components/icons";
import { Facts, PageHero } from "@/components/ui";
import DemoForm from "@/components/DemoForm";
import { CONTENT, FORM_ENDPOINT, path, type Lang } from "@/lib/site";

export default function Demo({ lang }: { lang: Lang }) {
  const t = CONTENT[lang];
  const f = t.form;
  return (
    <>
      <PageHero title={f.title} lead={f.lead} className="page-hero-compact"><Facts items={f.facts} /></PageHero>
      <section className="section section-tight">
        <div className="wrap form-grid">
          <DemoForm f={f} lang={lang} endpoint={FORM_ENDPOINT} privacyHref={path(lang, "privacy")} />
          <aside className="next-card" aria-labelledby="next-h">
            <h2 id="next-h">{f.next.title}</h2>
            <ol className="next-steps">{f.next.steps.map((s, i) => <li key={s}><span className="num">{i + 1}</span><span>{s}</span></li>)}</ol>
            <p className="next-note"><Icon name="check" /><span>{f.next.note}</span></p>
          </aside>
        </div>
      </section>
    </>
  );
}
