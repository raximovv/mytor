"use client";
// Features: section index that marks the section being read.
import { useEffect, useState } from "react";

export default function Toc({ label, items }: { label: string; items: { id: string; text: string }[] }) {
  const [active, setActive] = useState("");
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: "-40% 0px -55% 0px" });
    items.forEach((i) => { const el = document.getElementById(i.id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, [items]);
  return (
    <nav className="toc" aria-label={label}>
      <div className="wrap">
        <ul>
          {items.map((x, i) => (
            <li key={x.id}><a href={`#${x.id}`} aria-current={active === x.id ? "true" : undefined}><span className="num">0{i + 1}</span>{x.text}</a></li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
