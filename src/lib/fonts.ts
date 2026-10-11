// Fonts are downloaded at build time and served from the site itself (no request to Google from visitors).
// next/font needs literal options in each call.
import { Geologica, JetBrains_Mono, Onest } from "next/font/google";

export const geologica = Geologica({ subsets: ["latin", "cyrillic"], weight: ["600", "700"], variable: "--font-geologica", display: "swap" });
export const onest = Onest({ subsets: ["latin", "cyrillic"], weight: ["400", "500", "600", "700"], variable: "--font-onest", display: "swap" });
export const jetbrains = JetBrains_Mono({ subsets: ["latin", "cyrillic"], weight: ["500", "700"], variable: "--font-jetbrains", display: "swap", preload: false });

export const fontVars = `${geologica.variable} ${onest.variable} ${jetbrains.variable}`;
