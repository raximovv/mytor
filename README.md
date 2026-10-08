# Mytor — marketing website

Static, multi-page marketing site for Mytor (planned CRM for oil-change shops, Guliston / Sirdaryo).
Uzbek Latin is the default language; Russian lives under `/ru/`. No runtime dependencies.

## Preview locally

```bash
npm start
```

Builds into `dist/` and serves it at http://localhost:4321 (clean URLs, real 404s). Requires Node 18+ (Node 22+ for the screenshot/audit script).

## Routes

| Page | Uzbek | Russian |
|---|---|---|
| Home | `/` | `/ru/` |
| Features | `/features/` | `/ru/features/` |
| How it works | `/how-it-works/` | `/ru/how-it-works/` |
| Pricing / pilot | `/pricing/` | `/ru/pricing/` |
| About | `/about/` | `/ru/about/` |
| Demo / pilot request | `/demo/` | `/ru/demo/` |
| Privacy | `/privacy/` | `/ru/privacy/` |
| 404 | `404.html` | `ru/404.html` |

Every route is a real `index.html`, so direct loads and refreshes work on any static host.

## Configuration (`site.config.js` or env vars at build time)

- `MYTOR_FORM_ENDPOINT` — URL that accepts the demo request as a JSON POST and returns 2xx.
  **Not set by default:** the form validates, then clearly says it is not connected and that nothing was sent.
  Payload: `{ name, shop, city, phone, branches, note, consent, lang, page }`.
- `MYTOR_SITE_URL` — public origin (e.g. `https://example.uz`). When set, pages get absolute canonical/hreflang URLs and `sitemap.xml` is generated.
  Origin only: the base path below is added automatically.
- `MYTOR_BASE_PATH` — folder the site is served from (e.g. `/mytor` for `https://<user>.github.io/mytor/`). Empty for a domain root.

## Deploy (GitHub Pages)

`.github/workflows/deploy.yml` runs `npm run check` and publishes `dist/` on every push to `main`, with
`MYTOR_BASE_PATH=/<repo name>`. `MYTOR_SITE_URL` and `MYTOR_FORM_ENDPOINT` come from the repository's
Actions variables (Settings → Secrets and variables → Actions → Variables) when set.

GitHub Pages only serves the root `404.html` (Uzbek), so missing `/ru/...` pages show the Uzbek 404.

When a custom domain is attached: add it under Settings → Pages, set `MYTOR_BASE_PATH` to `""` in the
workflow and set the `MYTOR_SITE_URL` variable to `https://<domain>`.

## Checks

```bash
npm run check
```

Build plus static checks: identical Uzbek/Russian content shape, no untranslated text leaking between languages, internal links and anchors, title/description/hreflang per page, one `h1`, labelled form controls, unique ids, language switch keeps the same page, and no fabricated-claim patterns (percentages, app-store links, real-looking phone numbers, theft-prevention wording).

With the server running:

```bash
node scripts/screenshots.js http://localhost:4321 --audit
```

Loads every route in both languages at 320 / 375 / 430 / 1440 px and reports horizontal overflow, console errors, failed requests, touch targets under 24 px, heading-order problems and clipped text.

```bash
node scripts/screenshots.js
```

Saves real full-page and interaction screenshots to `screenshots/`.

## Structure

- `src/content/uz.js`, `src/content/ru.js` — all copy, metadata, form messages and sample (fictional) data
- `src/layout.js` — shared head/header/footer, hreflang, language switch
- `src/components.js` — phone previews, voice demo, stock reconciliation, stamps, FAQ, CTA band
- `src/pages/*.js` — one module per page
- `src/assets/` — `styles.css`, `site.js` (menu, voice demo, sample lookup, form), favicon

All interface previews are labelled "Interfeys namunasi" / "Пример интерфейса" and use fictional data.
The voice demo never requests the microphone, records audio, calls an API or changes data.
