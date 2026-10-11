import { Icon } from "@/components/icons";
import { PageHero } from "@/components/ui";
import { CONTENT, type Lang } from "@/lib/site";

export default function Privacy({ lang }: { lang: Lang }) {
  const p = CONTENT[lang].privacy;
  return (
    <>
      <PageHero title={p.title} className="page-hero-compact"><p className="updated">{p.updated}</p></PageHero>
      <section className="section section-tight">
        <div className="wrap legal">
          <p className="caution"><Icon name="alert" /><span>{p.draftNote}</span></p>
          {p.sections.map((s) => <section key={s.h} className="legal-sec"><h2>{s.h}</h2><p>{s.p}</p></section>)}
        </div>
      </section>
    </>
  );
}
