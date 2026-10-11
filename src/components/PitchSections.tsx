import { SectionHead } from "./ui";
import { CONTENT, href, type Lang } from "@/lib/site";
import { PITCH_ASSETS } from "@/content/pitch-assets";

export default function PitchSections({ lang }: { lang: Lang }) {
  const p = CONTENT[lang].pitch;
  return (
    <>
      <section className="section pitch-team-section" id="team" aria-labelledby="team-h">
        <div className="wrap">
          <SectionHead title={p.team.title} id="team-h" />
          <ul className="pitch-team" id="why-us">
            {p.team.members.map((m) => (
              <li key={m.role}>
                <span className="pitch-portrait">
                  <img className={`pitch-portrait-photo pitch-portrait-${m.role.toLowerCase()}`} src={href(m.photo)} width={210} height={210} alt={m.name} loading="lazy" />
                </span>
                <p className="pitch-role">{m.role}</p>
                <h3>{m.name.split(" ").map((part, i) => <span key={i}>{part}</span>)}</h3>
                <p className="pitch-background" aria-label={p.team.backgroundLabel}>{m.background}</p>
              </li>
            ))}
          </ul>
          <div className="pitch-links" aria-label={p.team.linksTitle}>
            <a className="link-arrow" href="https://github.com/raximovv/mytor" target="_blank" rel="noopener noreferrer">{p.team.codeLink} ↗</a>
            <a className="link-arrow" href={PITCH_ASSETS.deck} target="_blank" rel="noopener noreferrer">{p.deckLink} ↗</a>
          </div>
        </div>
      </section>

      <section className="section pitch-roadmap-section" id="roadmap" aria-labelledby="roadmap-h">
        <div className="wrap">
          <SectionHead title={p.roadmap.title} lead={p.roadmap.lead} id="roadmap-h" />
          <ol className="pitch-roadmap" data-reveal>{p.roadmap.stages.map((s, i) => (
            <li key={s.name} className={i === 1 ? "is-current" : ""} aria-current={i === 1 ? "step" : undefined}>
              <span className="pitch-stage-dot" aria-hidden="true" />
              <p className="pitch-stage-status">{s.status}</p>
              <h3>{s.name}</h3><p>{s.text}</p>
            </li>
          ))}</ol>
        </div>
      </section>

      <section className="section" id="implementation" aria-labelledby="implementation-h">
        <div className="wrap">
          <SectionHead title={p.build.title} lead={p.build.lead} id="implementation-h" />
          <div className="pitch-build">
            <ol className="pitch-build-steps">{p.build.steps.map((s, i) => (
              <li key={s.title}><span className="num">0{i + 1}</span><div><h3>{s.title}</h3><p>{s.text}</p><p className="pitch-tech-line">{s.tech}</p></div></li>
            ))}</ol>
            <aside className="pitch-stack">
              <h3>{p.build.usedTitle}</h3><ul>{p.build.used.map((s) => <li key={s}>{s}</li>)}</ul>
              <h3>{p.build.plannedTitle}</h3><ul>{p.build.planned.map((s) => <li key={s}>{s}</li>)}</ul>
              <h3>{p.build.aiToolsTitle}</h3><p>{p.build.aiTools}</p>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
