"use client";
// Hero app loop: listening → saved record → stamp → owner message, held on the finished record, then again.
// Runs continuously (hovering does not stop it); only pauses off screen and in a hidden tab.
// Without JS or with reduced motion the CSS shows the saved record.
import { useEffect, useRef, type ReactNode } from "react";

const CYCLE = 8000; // ~5.5 s sequence + 2.5 s on the finished record
const FADE = 450;

export default function HeroLoop({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const fig = ref.current;
    if (!fig || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    fig.querySelectorAll("[data-words]").forEach((el) => el.classList.add("is-ready"));

    let timer: ReturnType<typeof setTimeout> | undefined;
    let startedAt = 0, left = CYCLE;
    let started = false, paused = false, inView = !("IntersectionObserver" in window);

    const schedule = (ms: number) => { clearTimeout(timer); left = ms; startedAt = Date.now(); timer = setTimeout(restart, ms); };
    function restart() {
      fig!.classList.add("is-out");
      timer = setTimeout(() => {
        fig!.removeAttribute("data-run");
        void fig!.offsetWidth; // restart the CSS animations
        fig!.classList.remove("is-out");
        fig!.setAttribute("data-run", "");
        schedule(CYCLE);
      }, FADE);
    }
    const pause = () => {
      if (paused || !started) return;
      paused = true;
      fig.classList.add("is-paused");
      clearTimeout(timer);
      left = Math.max(0, left - (Date.now() - startedAt));
    };
    const play = () => {
      if (!started) { started = true; fig.setAttribute("data-run", ""); schedule(CYCLE); return; }
      if (!paused) return;
      paused = false;
      fig.classList.remove("is-paused", "is-out");
      schedule(left);
    };
    const sync = () => (inView && !document.hidden ? play() : pause());

    document.addEventListener("visibilitychange", sync);
    let io: IntersectionObserver | undefined;
    let cancelled = false;
    // Start once the fonts are in and the phone is on screen (below the fold on phones).
    const begin = () => {
      if (cancelled) return;
      if (!("IntersectionObserver" in window)) { sync(); return; }
      io = new IntersectionObserver((es) => { inView = es[0].isIntersecting; sync(); }, { threshold: 0.35 });
      io.observe(fig);
    };
    if (document.fonts?.ready) document.fonts.ready.then(begin); else begin();

    return () => {
      cancelled = true;
      clearTimeout(timer);
      io?.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  return <figure ref={ref} className="hero-fig app-fig" data-app>{children}</figure>;
}
