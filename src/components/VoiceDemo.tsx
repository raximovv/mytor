"use client";
// Voice entry demo with step buttons. Illustrative only: no microphone, no network, no records.
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Icon } from "./icons";
import { Phone } from "./ui";

type Step = { title: string; text: string };
type Labels = { region: string; prev: string; next: string; restart: string; play: string; pause: string };
type Notify = { from: string; time: string; title: string; text: string };

export default function VoiceDemo({ idBase, steps, screens, labels, notify }: {
  idBase: string; steps: readonly Step[]; screens: ReactNode[]; labels: Labels; notify: Notify;
}) {
  const total = screens.length;
  const [current, setCurrent] = useState(1);
  const [playing, setPlaying] = useState(false);
  const [live, setLive] = useState("");
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const announce = (n: number) => setLive(`${n}/${total}. ${steps[n - 1].title}. ${steps[n - 1].text}`);
  const show = (n: number, say = true) => {
    const next = Math.max(1, Math.min(total, n));
    setCurrent(next);
    if (say) announce(next);
  };
  const stop = () => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
    setPlaying(false);
  };

  useEffect(() => () => { if (timer.current) clearInterval(timer.current); }, []);

  const togglePlay = () => {
    if (timer.current) { stop(); return; }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let n = current === total ? 1 : current;
    if (current === total) show(1);
    setPlaying(true);
    timer.current = setInterval(() => {
      if (n >= total) { stop(); return; }
      n += 1;
      show(n);
    }, reduce ? 4200 : 3000);
  };

  const last = current === total;
  const step = steps[current - 1];

  return (
    <div className="vdemo" data-vdemo role="region" aria-label={labels.region} data-step={current}>
      <div className="vdemo-stage">
        <figure className="vdemo-fig">
          <Phone time="14:31" className="phone-demo">
            <ol className="vscreens">
              {screens.map((s, i) => (
                <li key={i} className={`vscreen scr${i + 1 === current ? " is-active" : ""}`} data-step={i + 1} id={`${idBase}-s${i + 1}`}>
                  <p className="vscreen-step">{i + 1}. {steps[i].title}</p>
                  {s}
                </li>
              ))}
            </ol>
          </Phone>
        </figure>
        <div className="notify-card vnotify" data-vnotify>
          <Icon name="bell" />
          <div><b>{notify.from} <span className="num">{notify.time}</span></b><span><strong>{notify.title}.</strong> {notify.text}</span></div>
        </div>
      </div>
      <div className="vdemo-ctrl">
        <ol className="vsteps">
          {steps.map((s, i) => (
            <li key={i}>
              <button type="button" className={`vstep${i + 1 < current ? " is-done" : ""}`} data-goto={i + 1} aria-controls={`${idBase}-s${i + 1}`}
                aria-current={i + 1 === current ? "step" : undefined} onClick={() => { stop(); show(i + 1); }}>
                <span className="vnum">{i + 1}</span>
                <span className="vtxt"><b>{s.title}</b><span>{s.text}</span></span>
              </button>
            </li>
          ))}
        </ol>
        {/* Visible caption for narrow screens, where the step list collapses to numbers. */}
        <p className="vcap" aria-hidden="true" data-vcap><b>{current}/{total} · {step.title}</b><span>{step.text}</span></p>
        <div className="vbtns">
          <button type="button" className="btn btn-ghost btn-sm" data-vprev disabled={current === 1} onClick={() => { stop(); show(current - 1); }}>
            <Icon name="back" />{labels.prev}
          </button>
          <button type="button" className="btn btn-dark btn-sm" data-vnext onClick={() => { stop(); show(last ? 1 : current + 1); }}>
            {last ? labels.restart : labels.next}
          </button>
          <button type="button" className="btn btn-ghost btn-sm" data-vplay aria-pressed={playing} onClick={togglePlay}>
            <Icon name={playing ? "pause" : "play"} /><span>{playing ? labels.pause : labels.play}</span>
          </button>
        </div>
        <p className="sr-only" aria-live="polite" data-vlive>{live}</p>
      </div>
    </div>
  );
}
