import "server-only";

export type MenuItem = {
  name: string;
  /** Portion size as written in the sheet, e.g. "350" — shown with the category's unit. */
  quantity: string;
  /** Display-ready price, e.g. "2,15 €". */
  price: string;
};

export type Category = {
  /** Google Sheet tab name — also the card title. */
  title: string;
  /** Image file in /public/assets/img used as the card header. */
  picture: string;
};

export type MenuCategory = Category & {
  /** "гр." or "бр.", read from the tab's column B header. */
  unit: string;
  items: MenuItem[];
};

// The categories in display order. Each one is its own tab in the spreadsheet
// with columns A = ИМЕ, B = ГРАМАЖ (or Брой), C = ЦЕНА and a header in row 1.
export const CATEGORIES: Category[] = [
  { title: "Супи", picture: "soups.webp" },
  { title: "Аламинути", picture: "alaminuti.webp" },
  { title: "Основни ястия", picture: "main-dishes.webp" },
  { title: "Салати", picture: "salads.webp" },
  { title: "Скара", picture: "grill.webp" },
  { title: "Десерти", picture: "desserts.webp" },
  { title: "Други", picture: "other.webp" },
];

/**
 * Whether a sheet row is a real menu item. The Sheets API only trims *trailing*
 * empty rows, so a stray cell far down a tab (e.g. a lone "`" or a space) makes
 * it return every blank row above it too. A real item always has a name with at
 * least one letter or digit — that filters the blanks and junk out.
 */
function isMenuItem(row: string[]): boolean {
  return /[\p{L}\p{N}]/u.test(row[0] ?? "");
}

/** Column B's header says whether the tab counts pieces ("Брой") or grams ("ГРАМАЖ"). */
function unitFromHeader(header: string | undefined): string {
  return /брой|бр\./i.test(header ?? "") ? "бр." : "гр.";
}

const priceFormat = new Intl.NumberFormat("bg-BG", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/** Staff type prices as "2.15" or "1,79" — normalise both to "2,15 €". */
function formatPrice(raw: string | undefined): string {
  const value = Number((raw ?? "").trim().replace(",", "."));
  if (!raw?.trim() || Number.isNaN(value)) return raw?.trim() ?? "";
  return `${priceFormat.format(value)} €`;
}

/**
 * Fetches today's lunch menu in a SINGLE request (server-side only).
 *
 * Every category is its own tab, so one `values:batchGet` with one range per
 * tab returns the whole menu in a single round-trip. Row 1 is kept so the unit
 * can be read from the column B header. `cache: "no-store"` makes the page
 * reflect the sheet on every load.
 *
 * The API key never reaches the client bundle. If it is HTTP-referrer
 * restricted, `SHEETS_REFERER` must be one of its allowed referrers.
 *
 * Returns only the categories that have items today — an empty category is
 * hidden rather than shown as an empty card.
 */
export async function getLunchMenu(): Promise<MenuCategory[]> {
  const id = process.env.SPREAD_SHEET_ID;
  const key = process.env.GOOGLE_API_KEY;
  const referer = process.env.SHEETS_REFERER;

  if (!id || !key) {
    console.warn("[sheets] Missing SPREAD_SHEET_ID or GOOGLE_API_KEY env vars");
    return [];
  }

  const ranges = CATEGORIES.map(
    (c) => `ranges=${encodeURIComponent(`'${c.title}'!A1:C200`)}`
  ).join("&");
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${id}/values:batchGet?${ranges}&key=${key}`;

  try {
    const res = await fetch(url, {
      headers: referer ? { Referer: referer } : undefined,
      // Read the sheet on every page load; never serve a cached copy.
      cache: "no-store",
      // Don't let a slow Sheets response hang the menu.
      signal: AbortSignal.timeout(3000),
    });

    if (!res.ok) {
      console.error(`[sheets] batchGet -> HTTP ${res.status}`);
      return [];
    }

    // valueRanges come back in the same order the ranges were requested, so we
    // map them straight back onto CATEGORIES by index.
    const data: { valueRanges?: { values?: string[][] }[] } = await res.json();
    const valueRanges = data.valueRanges ?? [];

    return CATEGORIES.map((c, i) => {
      const [header = [], ...rows] = valueRanges[i]?.values ?? [];
      return {
        ...c,
        unit: unitFromHeader(header[1]),
        items: rows.filter(isMenuItem).map((r) => ({
          name: r[0].trim(),
          quantity: r[1]?.trim() ?? "",
          price: formatPrice(r[2]),
        })),
      };
    }).filter((c) => c.items.length > 0);
  } catch (err) {
    console.error("[sheets] batchGet fetch failed", err);
    return [];
  }
}

/**
 * The weekday the shown menu belongs to, in the shop's timezone, e.g. "сряда".
 * The shop is closed at the weekend and the sheet still holds Friday's menu,
 * so Saturday and Sunday read "петък".
 */
export function menuWeekday(): string {
  const now = new Date();
  const day = new Intl.DateTimeFormat("en-US", { timeZone: "Europe/Sofia", weekday: "short" }).format(now);
  if (day === "Sat" || day === "Sun") return "петък";
  return new Intl.DateTimeFormat("bg-BG", { timeZone: "Europe/Sofia", weekday: "long" }).format(now);
}
