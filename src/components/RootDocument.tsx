// The <html> document for one language. Each language has its own root layout so <html lang> is right
// on every pre-rendered page (switching language loads the other document).
import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import SiteEffects from "./SiteEffects";
import { fontVars } from "@/lib/fonts";
import { CONTENT, href, type Lang } from "@/lib/site";
import "@/styles/global.css";

export const sharedMetadata: Metadata = {
  icons: { icon: { url: href("/assets/favicon.svg"), type: "image/svg+xml" }, apple: href("/assets/apple-touch-icon.png") },
};
export const sharedViewport: Viewport = { themeColor: "#FAF8F4", width: "device-width", initialScale: 1 };

export default function RootDocument({ lang, children }: { lang: Lang; children: ReactNode }) {
  return (
    // `no-js` → `js` before first paint; JS-only layouts (menus, demos) key off it. suppressHydrationWarning: the
    // class is changed by that script before React hydrates.
    <html lang={CONTENT[lang].htmlLang} className={`no-js ${fontVars}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `document.documentElement.classList.replace("no-js","js")` }} />
      </head>
      <body>{children}<SiteEffects /></body>
    </html>
  );
}
