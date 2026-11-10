import "server-only";
import { SITE_URL, site, mapsHref } from "@/lib/site";
import type { MenuCategory } from "@/lib/sheets";

// Machine-readable copies of today's menu: JSON-LD for search engines and
// Markdown for AI assistants and crawlers that don't run JavaScript. Both
// are built from the same sheet data as the visible cards, so they never
// disagree with what people see.

/** schema.org Menu for today's lunch menu, linked to the shop in the layout. */
export function menuJsonLd(categories: MenuCategory[], weekday: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    "@id": `${SITE_URL}/#menu`,
    name: `Обедно меню за ${weekday}`,
    url: `${SITE_URL}/#menu`,
    inLanguage: "bg-BG",
    publisher: { "@id": `${SITE_URL}/#shop` },
    hasMenuSection: categories.map((category) => ({
      "@type": "MenuSection",
      name: category.title,
      hasMenuItem: category.items.map((item) => ({
        "@type": "MenuItem",
        name: item.name,
        ...(item.quantity ? { description: `${item.quantity} ${category.unit}` } : {}),
        ...(item.amount !== null
          ? { offers: { "@type": "Offer", price: item.amount.toFixed(2), priceCurrency: "EUR" } }
          : {}),
      })),
    })),
  };
}

/** The shop and today's menu as Markdown, served at /llms.txt. */
export function menuMarkdown(categories: MenuCategory[], weekday: string): string {
  const lines = [
    `# Кулинарен Магазин ${site.name} (${site.latinName}) — ${site.address.locality}`,
    "",
    `> ${site.description}`,
    "",
    "## За магазина",
    "",
    `- Адрес: ${site.address.street}, ${site.address.postalCode} ${site.address.locality}, България ([карта](${mapsHref}))`,
    `- Телефон: ${site.phoneDisplay} (+359 87 604 2408)`,
    `- Работно време: ${site.hours.label}; ${site.hours.closedLabel.toLowerCase()}`,
    "- Домашно приготвена храна за вкъщи, с ново обедно меню всеки работен ден.",
    "- Цените са в евро (EUR).",
    `- Сайт: ${SITE_URL}`,
    "",
    `## Обедно меню за ${weekday}`,
    "",
  ];

  if (categories.length === 0) {
    lines.push("Менюто за днес още не е публикувано. Обадете се на телефона по-горе.", "");
  }

  for (const category of categories) {
    lines.push(`### ${category.title}`, "");
    for (const item of category.items) {
      const details = [item.quantity && `${item.quantity} ${category.unit}`, item.price].filter(Boolean);
      lines.push(`- ${item.name}${details.length ? ` — ${details.join(", ")}` : ""}`);
    }
    lines.push("");
  }

  lines.push(
    "Менюто се сменя всеки работен ден. Актуалната версия винаги е на " +
      `${SITE_URL}/#menu и на ${SITE_URL}/llms.txt.`,
    ""
  );
  return lines.join("\n");
}
