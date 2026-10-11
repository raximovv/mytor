import Link from "next/link";
import { PITCH_ASSETS } from "@/content/pitch-assets";
import { CONTENT, href, path, type Lang } from "@/lib/site";

/** The selected video presentation is shared by the homepage and required demo page. */
export default function PitchVideo({ lang, onDemoPage = false }: { lang: Lang; onDemoPage?: boolean }) {
  const p = CONTENT[lang].pitch.demo;
  const video = PITCH_ASSETS.video;
  return (
    <section className="section pitch-theater" id="demo-video" aria-labelledby="demo-video-h">
      <div className="wrap">
        <div className="pitch-video-heading"><h2 id="demo-video-h">{p.videoTitle}</h2><span>{p.duration}</span></div>
        <div className="pitch-video-frame" data-reveal>
          {video ? (video.kind === "embed" ?
            <iframe src={video.src} title={p.videoTitle} loading="lazy" allow="fullscreen; picture-in-picture" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" /> :
            <video src={video.src.startsWith("/") ? href(video.src) : video.src}
              poster={video.poster ? (video.poster.startsWith("/") ? href(video.poster) : video.poster) : undefined}
              controls playsInline preload="metadata" aria-label={p.videoTitle} />
          ) : (
            <div className="pitch-video-pending" role="status">
              <span className="pitch-video-brand">Mytor</span>
              <div className="pitch-video-message">
                <h3>{p.pendingTitle}</h3><p>{p.pendingText}</p>
                <Link className="btn btn-primary btn-lg" href={onDemoPage ? "#prototype" : path(lang, "demo") + "#prototype"}>{p.prototypeLink} ↗</Link>
              </div>
              <span className="pitch-video-duration">{p.duration}</span>
            </div>
          )}
        </div>
        {video?.watchUrl ? <p className="sec-link"><a className="link-arrow" href={video.watchUrl} target="_blank" rel="noopener noreferrer">{p.watch} ↗</a></p> : null}
      </div>
    </section>
  );
}
