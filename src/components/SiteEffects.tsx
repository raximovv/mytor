"use client";
// Page-wide effects, re-run on every page: sections fade up once as they reach the screen, and a language
// choice is remembered on this device (used only to send a returning Russian reader from the bare "/" to "/ru/").
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function SiteEffects({ homeHref, russianHref }: { homeHref: string; russianHref: string }) {
  const pathname = usePathname();
  const first = useRef(true);
  const popped = useRef(false);

  // Only check the remembered language when the document first loads, not on internal route changes.
  useEffect(() => {
    if (location.pathname !== homeHref) return;
    try {
      const internal = document.referrer && new URL(document.referrer).origin === location.origin;
      if (!internal && localStorage.getItem("mytor-lang") === "ru") location.replace(russianHref);
    } catch { /* Storage or the referrer can be unavailable. */ }
  }, [homeHref, russianHref]);

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

  useEffect(() => {
    const allowed = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    // Measure the stationary wrapper so the tilted card never shifts its own pointer coordinates.
    const cleanups = Array.from(document.querySelectorAll<HTMLElement>("#problem .cmp-tilt")).map((wrapper) => {
      const card = wrapper.querySelector<HTMLElement>(".cmp-card");
      if (!card) return () => {};
      let frame = 0;
      const reset = () => {
        cancelAnimationFrame(frame);
        card.classList.remove("is-tilting");
        card.style.removeProperty("--tilt-x");
        card.style.removeProperty("--tilt-y");
      };
      const move = (event: PointerEvent) => {
        if (!allowed.matches || event.pointerType !== "mouse") return;
        const rect = wrapper.getBoundingClientRect();
        const x = Math.max(-1, Math.min(1, (event.clientX - rect.left) / rect.width * 2 - 1));
        const y = Math.max(-1, Math.min(1, (event.clientY - rect.top) / rect.height * 2 - 1));
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          card.style.setProperty("--tilt-x", `${(-y * 4).toFixed(2)}deg`);
          card.style.setProperty("--tilt-y", `${(x * 4).toFixed(2)}deg`);
          card.classList.add("is-tilting");
        });
      };
      wrapper.addEventListener("pointerenter", move);
      wrapper.addEventListener("pointermove", move);
      wrapper.addEventListener("pointerleave", reset);
      wrapper.addEventListener("pointercancel", reset);
      allowed.addEventListener("change", reset);
      window.addEventListener("blur", reset);
      return () => {
        reset();
        wrapper.removeEventListener("pointerenter", move);
        wrapper.removeEventListener("pointermove", move);
        wrapper.removeEventListener("pointerleave", reset);
        wrapper.removeEventListener("pointercancel", reset);
        allowed.removeEventListener("change", reset);
        window.removeEventListener("blur", reset);
      };
    });
    return () => cleanups.forEach((cleanup) => cleanup());
  }, [pathname]);

  return null;
}
