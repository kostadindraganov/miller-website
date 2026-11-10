# Кулинарен Магазин Миллер — Next.js

One-page site for **Кулинарен Магазин Миллер, Пловдив** (храна за вкъщи). It shows
today's lunch menu, read live from a Google Sheet, plus contacts, a Google Maps map
and social sharing. Domain vocabulary lives in [`CONTEXT.md`](./CONTEXT.md).

## Stack

- **Next.js 16.4.5** (App Router, Turbopack, Cache Components, React 19.3)
- **Tailwind CSS v4**
- **react-share** for social sharing
- Fonts via `next/font`: Neue Haas Unica (local) + Caveat, Lobster and Manrope (Google)

## Getting started

```bash
cp .env.example .env.local   # then fill in GOOGLE_API_KEY and SPREAD_SHEET_ID
npm install
npm run dev                  # http://localhost:3000
```

`npm run build && npm start` for a production build.

## How the menu works

There is only one menu — today's lunch menu. The staff update the spreadsheet every
day; there are no per-weekday tabs.

- Each **category** is its own sheet tab: `Супи`, `Аламинути`, `Основни ястия`,
  `Салати`, `Скара`, `Десерти`, `Други`.
- Columns: `A = ИМЕ`, `B = ГРАМАЖ` (or `Брой`), `C = ЦЕНА`. Row 1 is the header.
- The unit comes from the column B header: `ГРАМАЖ` → „гр.“, `Брой` → „бр.“.
- Prices may be typed as `2.15` or `1,79`; both render as `2,15 €`.
- A category with no items today is hidden.

All 7 tabs are fetched in **one** `values:batchGet` request, server-side, on every
request (`src/lib/sheets.ts`). The page shell is prerendered; the menu streams in
inside `<Suspense>` (Partial Prerendering), so the site stays fast and always shows
the current sheet. The spreadsheet must be shared as **Anyone with the link → Viewer**.

To add a category: add a tab to the sheet and an entry to `CATEGORIES` in
`src/lib/sheets.ts` (title = tab name).

### Environment variables

| Var | Purpose |
| --- | --- |
| `GOOGLE_API_KEY` | Google Sheets API key (server-side only) |
| `SPREAD_SHEET_ID` | The menu spreadsheet ID |
| `SHEETS_REFERER` | Optional `Referer` header, needed only if the key is referrer-restricted |

## Placeholders to replace

- **Logo** — `src/components/Logo.tsx`
- **Hero image** — `src/components/Hero.tsx`
- **Category photos** — `public/assets/img/*.webp` (temporary stock photos)
- **Facebook URL** — `site.facebook` in `src/lib/site.ts` (icon hidden while empty)
- **Open Graph image & app icons** — `src/app/layout.tsx`, `src/app/manifest.ts`

## Project layout

```
src/
  app/         layout, page, sitemap/robots/manifest, globals.css
  components/  Hero, Logo, LunchMenu, MenuCard, ShareRow, Footer, CallButton, ScrollTopButton, Reveal
  lib/         site (business config), fonts, sheets (server-side fetch)
  fonts/       local font files
```

Deployment: see [`DEPLOY.md`](./DEPLOY.md).
