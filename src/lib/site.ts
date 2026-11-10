// Central site configuration, so SEO, sharing, structured data and the footer
// all read the same business details.

// The permanent public domain. Fixed in code (not an env var) so canonical
// URLs, the sitemap, Open Graph and shared links never point at a preview or
// localhost address.
export const SITE_URL = "https://miller-bg.com";

export const site = {
  name: "Миллер",
  // The same name in Latin letters, for people who search "Miller Plovdiv".
  latinName: "Miller",
  title: "Кулинарен Магазин Миллер — Пловдив",
  tagline: "Храна за вкъщи",
  description:
    "Кулинарен Магазин Миллер в Пловдив — домашно приготвена храна за вкъщи. Ново обедно меню всеки ден: супи, основни ястия, салати, скара и десерти.",
  shareDescription:
    "Кулинарен Магазин Миллер, Пловдив — храна за вкъщи и ново обедно меню всеки ден",
  keywords: [
    "кулинарен магазин пловдив",
    "храна за вкъщи пловдив",
    "обедно меню пловдив",
    "миллер пловдив",
    "кулинарен магазин миллер",
    "miller пловдив",
    "miller plovdiv",
    "домашна кухня пловдив",
  ],
  locale: "bg_BG",
  url: SITE_URL,
  phoneDisplay: "087 604 2408",
  phoneHref: "tel:+359876042408",
  address: {
    street: "ул. „Никола Карев“ 49-51",
    locality: "Пловдив",
    postalCode: "4000",
    country: "BG",
  },
  hours: {
    label: "Понеделник – Петък · 10:00–19:00",
    closedLabel: "Събота и Неделя — почивни дни",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "10:00",
    closes: "19:00",
  },
  // TODO: Facebook page URL — the Facebook icon in the footer stays hidden until set.
  facebook: "",
} as const;

const mapQuery = "улица Никола Карев 49-51, Пловдив, България";

export const mapEmbed = `https://maps.google.com/maps?q=${encodeURIComponent(
  mapQuery
)}&z=16&hl=bg&output=embed`;

export const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  mapQuery
)}`;
