import Link from "next/link";
import { Actions, H, Stamp } from "@/components/ui";
import { CONTENT, href, other, path, prefix, type Lang, type PageKey } from "@/lib/site";

const KEYS: PageKey[] = ["home", "demo"];

export default function NotFound({ lang }: { lang: Lang }) {
  const t = CONTENT[lang];
  const n = t.notfound;
  const o = other(lang);
  return (
    <section className="nf">
      <div className="wrap nf-grid">
        <div>
          <H as="h1" className="display" html={n.title} />
          <p className="lead">{n.text}</p>
          <ul className="nf-links">{KEYS.map((k) => <li key={k}><Link href={path(lang, k)}>{n.links[k as keyof typeof n.links]}</Link></li>)}</ul>
          <Actions t={t} lang={lang} />
          <p className="nf-other"><a href={href(prefix(o))} hrefLang={o} lang={o}>{n.other}</a></p>
        </div>
        <div className="nf-art"><Stamp text={n.stamp} className="nf-stamp" mark="?" /></div>
      </div>
    </section>
  );
}
