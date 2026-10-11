"use client";
// How it works: the phase legend follows the reader and the rail beside it fills with scroll progress.
import { useEffect, useRef, useState, type ReactNode } from "react";

export default function HowProgress({ legend, children }: {
  legend: { label: string; items: { n: number; kind: string; range: string; text: string }[] };
  children: ReactNode;
}) {
  const root = useRef<HTMLDivElement>(null);
  const steps = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const r = root.current!, s = steps.current!;
    let io: IntersectionObserver | undefined;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver((es) => {
        es.forEach((e) => { if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.group)); });
      }, { rootMargin: "-35% 0px -60% 0px" });
      s.querySelectorAll("[data-group]").forEach((g) => io!.observe(g));
    }
    let ticking = false;
    const update = () => {
      ticking = false;
      const b = s.getBoundingClientRect();
      const p = (innerHeight * 0.5 - b.top) / b.height;
      r.style.setProperty("--p", Math.max(0, Math.min(1, p)).toFixed(3));
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => { io?.disconnect(); window.removeEventListener("scroll", onScroll); };
  }, []);

  return (
    <div className="wrap how-grid" data-how ref={root}>
      <nav className="how-legend" aria-label={legend.label}>
        <ol>
          {legend.items.map((i) => (
            <li key={i.n}>
              <a href={`#phase-${i.n}`} className={`legend-item legend-${i.kind}${active === i.n ? " is-active" : ""}`} data-legend={i.n}>
                <span className="num">{i.range}</span><span>{i.text}</span>
              </a>
            </li>
          ))}
        </ol>
        <div className="how-progress" aria-hidden="true"><i /></div>
      </nav>
      <div className="how-steps" ref={steps}>{children}</div>
    </div>
  );
}
