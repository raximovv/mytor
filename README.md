# Mytor — marketing website

Marketing site for Mytor (planned software for oil-change shops, Guliston / Sirdaryo).
Uzbek Latin is the default language; Russian lives under `/ru/`.

The current **Pitch Day 3.0 presentation** puts the problem/solution, team, roadmap and implementation
plan on the homepage. `/demo/` contains a demo-video area, its description and an interactive UI walkthrough.
Add the actual 1–5 minute recording to `src/content/pitch-assets.ts` before submission; the page currently says
the video is being prepared. Team roles and backgrounds come from the supplied deck; expanded skills were
removed at the user's request. Add available public member profile links. See `docs/pitch-day-preview.md`.

Features, How it works, Pricing and About were removed with the user's approval.
Navigation now points to the homepage sections.

**Stack:** [Next.js](https://nextjs.org/) 16 (App Router, React 19, TypeScript), exported as static files
(`output: "export"`) and deployed to **Cloudflare Workers** static assets. Every page is pre-rendered to plain HTML
at build time; React adds the interactive parts (menu, hero loop, voice demo, sample lookup, demo form, scroll
effects). Ready for motion libraries such as [Motion](https://motion.dev/) (`npm install motion`) in client components.

## Preview locally

Node 20.9+ (Node 22+ for the screenshot/audit/journey scripts).

```bash
npm install
npm run dev
```

Development server with hot reload at http://localhost:3000.

```bash
npm start
```

Production build (`out/`) served at http://localhost:4321 with real 404s, the same files Cloudflare serves.

## Deploy (Cloudflare Workers only)

The site is deployed only to Cloudflare Workers static assets (config: `wrangler.jsonc`, worker `mytor` →
`https://mytor.<account>.workers.dev`). The build output is `out/` (the older static generator used `dist/`).

**From Git (Workers Builds):** in the Cloudflare dashboard → Workers → mytor → Settings → Build, use
build command `npm run check` (builds and runs the static checks, so a broken page fails the deploy) and
deploy command `npx wrangler deploy`. Put `MYTOR_SITE_URL` / `MYTOR_FORM_ENDPOINT` under *Build variables*: they
are read at build time.

**From this computer:**

```bash
npx wrangler login
npm run deploy
```

Unknown paths get the nearest `404.html` (`ru/404.html` under `/ru/`) with a real 404 status.

## Configuration (environment variables at build time)

- `MYTOR_FORM_ENDPOINT`: URL that accepts the demo request as a JSON POST and returns 2xx.
  **Not set by default:** the form validates, then clearly says it is not connected and that nothing was sent.
  Payload: `{ name, phone, city, shop, branches, note, consent, lang, page }`. Required: `name`, `phone`, `city`, `consent: true`.
  Optional fields are `null` when empty; `branches` is `"1"`, `"2"` or `"3+"`. The form gives up after 15 s and keeps the typed data on any failure.
- `MYTOR_SITE_URL`: public origin (e.g. `https://mytor.uz`). When set, pages get canonical URLs, absolute
  hreflang links, `og:image` and the large social preview, and `sitemap.xml` is generated.
- `MYTOR_BASE_PATH`: only if the site is ever served from a sub-folder (e.g. `/mytor`). Leave empty (default) on
  Cloudflare, which serves it from the domain root.

## Routes

| Page | Uzbek | Russian |
|---|---|---|
| Home | `/` | `/ru/` |
| Demo video / UI prototype | `/demo/` | `/ru/demo/` |
| Privacy | `/privacy/` | `/ru/privacy/` |
| 404 | `404.html` | `ru/404.html` |

## Checks

```bash
npm run check
```

Build plus static checks on `out/`: identical Uzbek/Russian content shape, no untranslated text leaking between
languages, internal links and anchors, title/description/hreflang per page, one `h1`, labelled form controls,
unique ids, language switch keeps the same page, the "site is a demo" strip on every page, and no
fabricated-claim patterns (percentages, app-store links, real-looking phone numbers, theft-prevention wording).

With `npm start` (or `npm run serve`) running:

```bash
node scripts/screenshots.js http://localhost:4321 --audit
```

Loads every route in both languages at 320 / 375 / 390 / 430 / 768 / 1024 / 1440 px and reports horizontal
overflow, console errors, failed requests, touch targets under 24 px, heading-order problems, clipped text and
visible text under 12 px.

```bash
node scripts/screenshots.js
node scripts/screenshots.js http://localhost:4321 --matrix --out=redesign/after
```

Real screenshots in `screenshots/` (standard set), or every page in both languages at all QA widths.

The older `scripts/journey.js` below tests the former shop-request funnel; it is not the acceptance check for
this Pitch Day preview, whose demo page no longer renders the request form. Use `npm run check` plus browser
checks of homepage anchors, the mobile menu, language switching and all five demo steps for this preview.

```bash
node scripts/journey.js http://localhost:4321 --expect=not-connected
```

A shop owner's journey on a 390 px phone in both languages, with real taps and typing: home → menu → pricing →
FAQ → «Demo so‘rash» → empty and wrong submits → fixed form → result, plus the hero loop, the home sections, both
voice demos, the pricing status ladder, sample lookup, language switch, remembered language, the demo strip and a
reduced-motion pass. `--expect` must match the build: `not-connected` (default), `success` or `error`.

To test response handling without a real endpoint, run `node scripts/form-mock.js` (localhost:4400; `/ok`, `/fail`,
`/reject`, `/slow`), build with `MYTOR_FORM_ENDPOINT=http://localhost:4400/ok`, then run the journey with
`--expect=success --mock=http://localhost:4400`.

```bash
node scripts/images.js
```

Re-renders `public/assets/og-uz.png`, `og-ru.png` and `apple-touch-icon.png` from the current headline copy.

## Structure

- `app/(uz)/…`, `app/(ru)/ru/…` — routes; each language has its own root layout (correct `<html lang>`)
- `src/views/*.tsx` — one component per retained page (Home, Demo, Privacy, NotFound)
- `src/components/` — `Shell` (header, footer, demo strip, hreflang, structured data), `ui` (shared pieces),
  `previews` (phone screens), client components: `Header`, `HeroLoop`, `VoiceDemo`, `Lookup`, `DemoForm`, `Toc`,
  `HowProgress`, `SiteEffects` (scroll reveal, scroll-to-top on navigation, remembered language)
- `src/content/uz.js`, `src/content/ru.js` — all copy, metadata, form messages and sample (fictional) data
- `src/styles/global.css` — the whole design system (tokens at the top)
- `src/lib/` — routes and config (`site.ts`), page metadata (`meta.ts`), self-hosted fonts (`fonts.ts`)
- `public/assets/` — favicon, flags, social images, real team portraits
- `scripts/` — `postbuild.js` (404 pages, robots/sitemap, prefetch payloads), QA scripts, local server, form mock
- `docs/` — design research, audit, selected direction and tokens, QA report
- `legacy-static/` — snapshot of the earlier dependency-free static generator (reference only; also runs the landing lab)

Fonts are self-hosted at build time (no requests to Google from visitors). The language switch remembers the choice
on the device (`localStorage`, key `mytor-lang`); it is only used to send someone who chose Russian from the bare
`/` to `/ru/`. The voice demo never requests the microphone, records audio, calls an API or changes data.

## Local design options

Run `node scripts/pitch-lab.js` after `npm run check`, then open http://localhost:4322/. Three homepage directions and three demo layouts, each in Uzbek and Russian, are kept in `lab/pitch/`. They are outside the production route tree and are not included in deployment. Research, motion choices and competition coverage: `docs/pitch-motion-research.md`.
