import localFont from "next/font/local";
import { Caveat, Lobster, Manrope } from "next/font/google";

// Only the body font is preloaded. Every preloaded font downloads before the
// hero photo (the LCP), and on mobile 4G each 75 KB of font costs ~0.4 s of
// LCP. The scripts swap in as soon as they arrive; until then the fallback
// is a system font.

// Bold handwritten script (Cyrillic) for the wordmark and the menu cards.
export const caveat = Caveat({
  subsets: ["cyrillic", "latin"],
  weight: ["500", "700"],
  variable: "--ff-caveat",
  display: "swap",
  preload: false,
});

// Body typeface (Neue Haas Unica) — regular + bold in one family. WOFF2 only:
// every browser the site supports reads it, and a .woff fallback would be
// preloaded too.
export const neue = localFont({
  src: [
    { path: "../fonts/NeueHaasUnicaW1G-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/NeueHaasUnicaW1G-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--ff-neue",
  display: "swap",
});

// Retro sign-painter script (Cyrillic) for painted headings like "за днес".
export const lobster = Lobster({
  subsets: ["cyrillic", "latin"],
  weight: "400",
  variable: "--ff-lobster",
  display: "swap",
  preload: false,
});

// Modern Cyrillic type for dish names, portions and prices.
export const menuFont = Manrope({
  subsets: ["cyrillic", "latin"],
  variable: "--ff-menu",
  display: "swap",
  preload: false,
});
