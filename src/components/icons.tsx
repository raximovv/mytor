// Line icons, the logo and phone status-bar glyphs. Generated once from the original static site, same artwork.
// SVG bodies are trusted static strings.

const ICONS = {
  mic: "<rect x=\"9\" y=\"3\" width=\"6\" height=\"11\" rx=\"3\"/><path d=\"M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21M9 21h6\"/>",
  check: "<path d=\"M5 12.5l4.5 4.5L19 7.5\"/>",
  search: "<circle cx=\"11\" cy=\"11\" r=\"6.5\"/><path d=\"M20 20l-4.2-4.2\"/>",
  bell: "<path d=\"M6 9.5a6 6 0 0 1 12 0c0 5 2 6.5 2 6.5H4s2-1.5 2-6.5\"/><path d=\"M10 19.5a2 2 0 0 0 4 0\"/>",
  drop: "<path d=\"M12 3.5c3.6 4.6 6 7.9 6 11a6 6 0 0 1-12 0c0-3.1 2.4-6.4 6-11z\"/>",
  alert: "<path d=\"M12 4l9 15.5H3L12 4z\"/><path d=\"M12 10v4.5M12 17.2v.1\"/>",
  edit: "<path d=\"M4 20h4L19.5 8.5a2.1 2.1 0 0 0-4-4L4 16v4z\"/>",
  scale: "<path d=\"M12 4v16M5 20h14M6 8h12M6 8l-3 6a3 3 0 0 0 6 0L6 8zM18 8l-3 6a3 3 0 0 0 6 0l-3-6z\"/>",
  sum: "<path d=\"M4 5h16v14H4zM8 9h8M8 13h5\"/>",
  arrow: "<path d=\"M5 12h14M13 6l6 6-6 6\"/>",
  user: "<circle cx=\"12\" cy=\"8\" r=\"4\"/><path d=\"M4 20.5c1.4-4 4.4-6 8-6s6.6 2 8 6\"/>",
  wrench: "<path d=\"M14.5 6.5a4 4 0 0 0 5 5L12 19a2.1 2.1 0 0 1-3-3l7.5-7.5zM14.5 6.5L17 4\"/>",
  car: "<path d=\"M4 16v-4l2-5h12l2 5v4M4 16h16M4 16v2.5M20 16v2.5\"/><circle cx=\"7.5\" cy=\"13\" r=\".8\"/><circle cx=\"16.5\" cy=\"13\" r=\".8\"/>",
  send: "<path d=\"M21 3L10 14M21 3l-7 18-4-7-7-4 18-7z\"/>",
  play: "<path d=\"M7 5l12 7-12 7V5z\"/>",
  pause: "<path d=\"M8 5v14M16 5v14\"/>",
  restart: "<path d=\"M4 12a8 8 0 1 0 2.4-5.7M4 4v4.5h4.5\"/>",
  back: "<path d=\"M19 12H5M11 6l-6 6 6 6\"/>",
  menu: "<path d=\"M4 7h16M4 12h16M4 17h16\"/>",
  close: "<path d=\"M6 6l12 12M18 6L6 18\"/>",
  box: "<path d=\"M3.5 7.5L12 3l8.5 4.5v9L12 21l-8.5-4.5v-9zM3.5 7.5L12 12l8.5-4.5M12 12v9\"/>",
  download: "<path d=\"M12 4v11M7 10.5l5 5 5-5M5 19.5h14\"/>",
  pin: "<path d=\"M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z\"/><circle cx=\"12\" cy=\"10\" r=\"2.4\"/>",
  clock: "<circle cx=\"12\" cy=\"12\" r=\"8.5\"/><path d=\"M12 7.5V12l3 2\"/>",
  book: "<path d=\"M5 4.5h11a3 3 0 0 1 3 3V20H8a3 3 0 0 1-3-3V4.5zM5 17a3 3 0 0 1 3-3h11\"/>",
} as const;
export type IconName = keyof typeof ICONS;

export function Icon({ name, className = "ic" }: { name: IconName; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width={24} height={24} fill="none" stroke="currentColor" strokeWidth={1.8}
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" dangerouslySetInnerHTML={{ __html: ICONS[name] }} />
  );
}

import { LOGO_PATH } from "@/lib/logo.js";
export { LOGO_PATH };

export function Logo() {
  return (
    <svg className="logo-mark" viewBox="0 12 100 76" width={40} height={30} aria-hidden="true" focusable="false">
      <path fill="#01377F" fillRule="evenodd" d={LOGO_PATH} />
    </svg>
  );
}

/** Raw status-bar SVG markup (signal, Wi-Fi, battery). */
export const STATUS_SVG = "<svg class=\"phone-signal\" viewBox=\"0 0 18 12\" width=\"18\" height=\"12\" aria-hidden=\"true\" focusable=\"false\"><rect x=\"0\" y=\"8\" width=\"3\" height=\"4\" rx=\".8\" fill=\"currentColor\"/><rect x=\"5\" y=\"5.5\" width=\"3\" height=\"6.5\" rx=\".8\" fill=\"currentColor\"/><rect x=\"10\" y=\"3\" width=\"3\" height=\"9\" rx=\".8\" fill=\"currentColor\"/><rect x=\"15\" y=\"0\" width=\"3\" height=\"12\" rx=\".8\" fill=\"currentColor\"/></svg><svg class=\"phone-wifi\" viewBox=\"0 0 16 12\" width=\"16\" height=\"12\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M8 11.6 5.6 9.2a3.4 3.4 0 0 1 4.8 0L8 11.6zM3.6 7.2a6.2 6.2 0 0 1 8.8 0l-1.2 1.2a4.5 4.5 0 0 0-6.4 0L3.6 7.2zM1.3 4.9a9.5 9.5 0 0 1 13.4 0l-1.2 1.2a7.8 7.8 0 0 0-11 0L1.3 4.9z\" fill=\"currentColor\"/></svg><svg class=\"phone-battery\" viewBox=\"0 0 27 13\" width=\"27\" height=\"13\" aria-hidden=\"true\" focusable=\"false\"><rect x=\".75\" y=\".75\" width=\"22.5\" height=\"11.5\" rx=\"3.2\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.3\" opacity=\".55\"/><rect x=\"2.6\" y=\"2.6\" width=\"15.5\" height=\"7.8\" rx=\"1.8\" fill=\"currentColor\"/><path d=\"M24.9 4.4v4.2c.9-.3 1.5-1.1 1.5-2.1s-.6-1.8-1.5-2.1z\" fill=\"currentColor\" opacity=\".55\"/></svg>";
