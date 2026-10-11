"use client";
// Page-wide effects, re-run on every page: sections fade up once as they reach the screen, and a language
// choice is remembered on this device (used only to send a returning Russian reader from the bare "/" to "/ru/").
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function SiteEffects() {
  const pathname = usePathname();
  const first = useRef(true);
  const popped = useRef(false);

  // A new page opens at the top (client-side navigation otherwise keeps the old scroll position). Back/forward
  // keeps the browser's restored position; links to an #anchor go to the anchor.
  useEffect(() => {
    const onPop = () => { popped.current = true; };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    if (popped.current) { popped.current = false; return; }
    if (!location.hash) window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal], [data-stagger]"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    // Siblings revealed together get a small stagger.
    els.forEach((el) => {
      if (!el.hasAttribute("data-reveal") || !el.parentElement) return;
      const i = Array.from(el.parentElement.children).filter((c) => c.hasAttribute("data-reveal")).indexOf(el);
      if (i > 0) el.style.setProperty("--d", Math.min(i, 4) * 70 + "ms");
    });
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -6% 0px" });
    els.forEach((el) => io.observe(el));
    const all = () => els.forEach((el) => el.classList.add("is-in"));
    window.addEventListener("beforeprint", all);
    return () => { io.disconnect(); window.removeEventListener("beforeprint", all); };
  }, [pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element).closest?.("a[hreflang]");
      if (!a) return;
      try { localStorage.setItem("mytor-lang", a.getAttribute("hreflang") || ""); } catch { /* storage unavailable */ }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
