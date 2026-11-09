# Deploying to Netlify

This is a server-rendered Next.js 16 app (App Router, Partial Prerendering,
server-side Google Sheets fetch). It runs on Netlify via the official
[`@netlify/plugin-nextjs`](https://github.com/opennextjs/opennextjs-netlify)
runtime, wired up in [`netlify.toml`](./netlify.toml).

## 1. Connect the repo

Netlify UI → **Add new site → Import an existing project** → GitHub → pick
`miller-website`. Build settings are read from `netlify.toml`, so leave them as-is:

- Build command: `npm run build`
- Publish directory: `.next`
- Node version: `22`

(Or deploy from your machine with `npx netlify deploy --build --prod`.)

## 2. Set environment variables

Netlify UI → **Site configuration → Environment variables**. They are *not*
committed (`.env*` is git-ignored), so add them here:

| Variable | Required | Example | Notes |
| --- | --- | --- | --- |
| `GOOGLE_API_KEY` | ✅ | `AIza…` | **Secret.** Read server-side only — never reaches the browser. |
| `SPREAD_SHEET_ID` | ✅ | `1146WRc9…` | The menu spreadsheet ID. |
| `SHEETS_REFERER` | ⛳ optional | `https://miller-bg.com` | Only needed if the API key is HTTP-referrer restricted. |

The public domain, `https://miller-bg.com`, is fixed in `src/lib/site.ts`
(`SITE_URL`) and drives canonical URLs, the sitemap, Open Graph and shared
links — it is not an environment variable.

After changing variables, trigger a **redeploy**.

## 3. Google Sheet & API key

- The spreadsheet must be shared as **Anyone with the link → Viewer**, otherwise the
  API returns `403 The caller does not have permission`.
- Recommended: in Google Cloud Console → *APIs & Services → Credentials*, restrict the
  key to the **Google Sheets API**. If you also add an HTTP-referrer restriction, set
  `SHEETS_REFERER` to one of the allowed referrers.
- If the menu shows „Менюто за днес очаквайте съвсем скоро“ after deploy, check the
  function logs for `[sheets] batchGet -> HTTP …`.

## 4. Notes

- The menu is read from the sheet on every request; the rest of the page is
  prerendered and served from Netlify's CDN.
- `next/image` is optimized automatically by Netlify's Image CDN.
