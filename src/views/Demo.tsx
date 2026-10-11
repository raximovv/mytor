import Link from "next/link";
import { PageHero, SectionHead } from "@/components/ui";
import PitchVideo from "@/components/PitchVideo";
import VoiceDemo from "@/components/VoiceDemo";
import { voiceScreens } from "@/components/previews";
import { PITCH_ASSETS } from "@/content/pitch-assets";
import { CONTENT, path, type Lang } from "@/lib/site";

export default function Demo({ lang }: { lang: Lang }) {
  const t = CONTENT[lang];
  const p = t.pitch.demo;
  const d = t.demo;
  return (
    <>
      <PageHero title={p.title} lead={p.lead} className="page-hero-compact">
        <div className="actions pitch-demo-actions">
          <a className="btn btn-primary" href="#prototype">{p.prototypeLink}</a>
          <a className="btn btn-ghost" href={PITCH_ASSETS.deck} target="_blank" rel="noopener noreferrer">{t.pitch.deckLink} ↗</a>
        </div>
      </PageHero>
      <PitchVideo lang={lang} onDemoPage />

      <section className="section section-tight" aria-labelledby="video-description-h">
        <div className="wrap pitch-video-grid">
          <aside className="pitch-video-description" aria-labelledby="video-description-h">
            <h2 id="video-description-h">{p.descriptionTitle}</h2>
            <p>{p.description}</p>
            <ol className="pitch-chapters">{p.chapters.map((c) => <li key={c}>{c}</li>)}</ol>
          </aside>
        </div>
      </section>

      <section className="section band" id="prototype" aria-labelledby="prototype-h">
        <div className="wrap">
          <SectionHead title={p.prototypeTitle} lead={p.prototypeLead} id="prototype-h" />
          {PITCH_ASSETS.prototype ? <p className="sec-link"><a className="btn btn-primary" href={PITCH_ASSETS.prototype} target="_blank" rel="noopener noreferrer">{p.externalPrototype} ↗</a></p> : null}
          <VoiceDemo idBase="pitch-vd" steps={d.steps} screens={voiceScreens(t)}
            labels={{ region: d.region, prev: d.prev, next: d.next, restart: d.restart, play: d.play, pause: d.pause }}
            notify={{ from: d.notifyFrom, time: d.time, title: d.notifyTitle, text: d.notifyText }} />
        </div>
      </section>

      <section className="section" aria-labelledby="resources-h">
        <div className="wrap pitch-resources">
          <SectionHead title={p.resourcesTitle} lead={p.resourcesText} id="resources-h" />
          <div className="actions"><Link className="btn btn-dark" href={path(lang, "home")}>{p.back}</Link></div>
        </div>
      </section>
    </>
  );
}
