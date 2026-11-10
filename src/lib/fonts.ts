import localFont from "next/font/local";
import { Caveat, Lobster, Manrope } from "next/font/google";

// Decorative script used for menu titles / item names (supports Cyrillic).
export const marck = localFont({
  src: "../fonts/MarckScript-Regular.ttf",
  variable: "--ff-marck",
  weight: "400",
  display: "swap",
});

// Cleaner, bolder handwritten script (Cyrillic) for the menu cards — same
// hand-lettered spirit as Marck but more legible and characterful.
export const caveat = Caveat({
  subsets: ["cyrillic", "latin"],
  weight: ["500", "700"],
  variable: "--ff-caveat",
  display: "swap",
});

// Decorative script used for the "Сподели" label.
export const pacifico = localFont({
  src: "../fonts/Pacifico-Regular.ttf",
  variable: "--ff-pacifico",
  weight: "400",
  display: "swap",
});

// Body typeface (Neue Haas Unica) — regular + bold in one family.
export const neue = localFont({
  src: [
    { path: "../fonts/NeueHaasUnicaW1G-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/NeueHaasUnicaW1G-Regular.woff", weight: "400", style: "normal" },
    { path: "../fonts/NeueHaasUnicaW1G-Bold.woff2", weight: "700", style: "normal" },
    { path: "../fonts/NeueHaasUnicaW1G-Bold.woff", weight: "700", style: "normal" },
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
});

// Modern Cyrillic type for dish names, portions and prices.
export const menuFont = Manrope({
  subsets: ["cyrillic", "latin"],
  variable: "--ff-menu",
  display: "swap",
});
