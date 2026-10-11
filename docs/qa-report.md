# Mytor redesign: QA report

Run on 10 October 2026 against the final local build (`npm run build`, served by `scripts/serve.js`, form endpoint
not set unless stated). Browser: headless Chrome via the repository's own DevTools-protocol scripts, plus manual
checks in an interactive browser pane.

## Results

| Check | Command | Result |
|---|---|---|
| Static checks: translation parity, links, anchors, metadata, hreflang, one `h1`, labels, unique ids, forbidden claims, language-switch targets | `npm run check` | **Pass** (16 pages, 26 files) |
| Browser audit: 16 routes × **7 widths** (320, 375, 390, 430, 768, 1024, 1440): overflow, off-screen elements, console errors, failed requests, touch targets < 24 px, heading order, clipped text, **text < 12 px (new)** | `node scripts/screenshots.js <url> --audit` | **Pass**: no issues |
| Phone journey (390 × 844), both languages, form not connected | `node scripts/journey.js <url>` | **110 passed, 0 failed** |
| Same journey, endpoint answers 2xx (mock `/ok`) | `--expect=success --mock=http://localhost:4400` | **105 passed, 0 failed**; the endpoint received exactly one request per language |
| Same journey, endpoint fails (mock `/fail`) | `--expect=error` | **105 passed, 0 failed**; typed data kept and button usable again |
| Loading state (mock `/slow`) | manual capture | Spinner and "Yuborilmoqda…", `aria-busy="true"`, button disabled |
| Keyboard focus | browser pane, Tab from top | Skip link first, then header links; `:focus-visible` outline 3 px ink (amber on dark surfaces) |
| Mobile menu (RU, 375 px) | browser pane | Opens as a full-width sheet with large links and CTA; Escape closes it and returns focus (journey) |
| Reduced motion | journey, `prefers-reduced-motion: reduce` | All sections visible without scrolling, hero shows the saved record, loop does not run |
| Landing lab (uncommitted dev tool) | `node scripts/lab.js` | Still renders 8 option pages |

### What the journey now covers (additions)

The home page's pinned scroll story was deliberately replaced by the compact step-through voice demo. Its two
checks were **replaced with equivalent checks on the new demo, not removed**: 5 steps; Next advances; the caption
follows. New checks:

- the secondary CTA "Qanday ishlaydi?" / "Как это работает?" is in the hero and links to How it works;
- the comparison has 3 rows, there are 4 benefit tiles, and the flow shows 3 worker steps leading to 4 automatic results;
- the home page is shorter than the 11,473 px it measured at 390 px before the redesign (now ≈ 10,000 px);
- pricing: demo and pilot are marked free, post-pilot price is "sinovda"/"проверяется", with no buy buttons or card fields;
- the reduced-motion pass described above.

## Issues found during QA and fixed

| Issue | Where | Fix |
|---|---|---|
| "Конфиденциальности" overflowed the page at 320/375 px. Chrome's Russian hyphenation dictionary is not available in this environment | `/ru/privacy/` h1 | Soft hyphen in the content string, plus `hyphens: auto` restored for headings |
| Phase legend and step cards wider than the screen at 320 px (implicit grid column sized to content) | How it works | `grid-template-columns: minmax(0, 1fr)`, tighter rail under 480 px |
| Labels inside previews at 11.5–11.8 px | phone status bar, record field labels | Raised to 12.2 px |
| Segmented branch-count control stretched full width | Demo form | `justify-self: start` |
| Preview shown above its heading on phones | Features → owner messages | DOM order: copy first; desktop order kept with `split-rev` |
| Mobile home still 11,159 px | Home | Phone density rules (section spacing, tile and card padding) → ≈ 10,000 px |
| Full-page screenshots captured mid-reveal; "first screen" shots were full pages | `scripts/screenshots.js` | Captures settle reveals; first-screen shots capture the viewport only |

## Performance

| Asset | Before (gzip) | After (gzip) |
|---|---|---|
| `styles.css` | 13.5 KB | 15.4 KB |
| `site.js` | 4.1 KB | 4.8 KB |
| Home HTML | n/a | 12.2 KB |
| Images | 2 flag SVGs | unchanged (no photos, no new images) |
| Fonts | Geologica 500–800, Onest 400–700, JetBrains Mono | Geologica **600–700**, Onest 400–700, JetBrains Mono |

No new dependencies, requests or third-party scripts. Every animation uses transform, opacity or filter, and the
looping demo pauses off screen and in hidden tabs.

## Remaining limitations (honest list)

1. **Brand-new copy needs a native read-through.** I wrote the new Uzbek and Russian strings (home comparison and
   flow, feature problem/benefit lines, pricing ladder). They keep to the existing vocabulary and facts, but a native
   speaker from Sirdaryo should proofread them before launch.
2. **Pricing and pilot facts were not independently verified.** The only source is the repository. The site still
   says what it said before: a 6-week free pilot, and 99 000 / 199 000 / 149 000 so‘m prices "being tested". No
   payment flow exists or was added.
3. **Deployment is Cloudflare Workers only** (GitHub Pages and its workflow were removed by the owner). The
   remote `main` has a `wrangler.jsonc` that serves `./dist` (the old static build). This branch's config serves
   `./out` (the Next.js export) and must replace it when merged, or the deploy would publish an empty or stale folder.
   `MYTOR_SITE_URL` is not set, so canonical/OG tags (and URL-dependent JSON-LD fields) are not emitted yet.
4. **The form is not connected** (`MYTOR_FORM_ENDPOINT` unset). It says so honestly. Success and error states were
   verified against the local mock only.
5. **No Lighthouse/axe run.** Neither tool is installed and none was added. Accessibility evidence comes from the
   repository's audit and journey (labels, focus, heading order, targets, contrast-checked tokens; see
   `design-direction.md`), not from a third-party scanner.
6. **Disclosure placement.** At the owner's request the status notes (footer "screens are examples, data is
   fictional", the About "Hozirgi holat" card, the Features intro sentence) were removed. The single disclosure is now
   the fixed "Sayt demo versiyada" / "Сайт в демо-версии" strip on every page, and `npm run check` enforces it. The
   previews no longer say on the page that names, plates and phone numbers in them are fictional.
7. **Lapa.ninja and Toast** could not be reviewed (bot verification). See `design-research.md`.
8. **Hero loop has no pause control at all** (owner's decision). It keeps playing on hover and only pauses when it is
   off-screen or the tab is hidden; under reduced motion it does not run. Nobody can pause it, which falls short of
   WCAG 2.2.2 ("Pause, Stop, Hide") for animation lasting over five seconds.
9. The dev-only landing **lab** still builds, but it was designed against the old stylesheet, so its options now
   render with the new tokens.

## Visual evidence

The `screenshots/redesign/` folders are kept on the development machine only (about 50 MB, not committed).

- `screenshots/redesign/before/`: 77 captures of the site before any change.
- `screenshots/redesign/after/`: the same 77 captures after the redesign.
- `screenshots/redesign/compare/`: side-by-side before/after for Home (1440, 390), Features, How it works
  (1440, RU 390), Pricing, About and Demo.
- `screenshots/*.png`: the repository's standard set, refreshed (menu open, FAQ open, form errors, not-connected
  result, voice demo steps, 404).

## React (Next.js) migration: 10 October 2026

At the owner's request the site was rebuilt on Next.js 16 (React 19, TypeScript) with a static export, for
deployment to Cloudflare Workers (the only deployment target). The earlier static generator is kept in `legacy-static/` for reference.

- Same content files, markup classes and design system, so every page looks and behaves as before. The old
  `site.js` behaviour is now React client components (menu, hero loop, voice demo, lookup, form, scroll reveal,
  section index, progress rail).
- Links inside a language navigate client-side. New pages open at the top, back/forward keeps the scroll position,
  and switching language loads the other document (its own `<html lang>`).
- Fonts are self-hosted at build time. The privacy page no longer mentions Google Fonts.
- Issues found while porting and fixed: link-prefetch payloads were written as nested folders while the client
  requests flat names (fixed in `scripts/postbuild.js`); the build's CSS minifier dropped standalone `translate`
  next to `transform` (now `transform` only); pages kept the old scroll position after client-side navigation;
  React key warnings in development.
- QA scripts adapted, not weakened: `check.js` reads `out/` and accepts React's `hrefLang` / self-closing `<meta>`;
  the journey's link taps wait for the address to change (client-side navigation fires no load event).

| Check | Result |
|---|---|
| `npm run check` (build, TypeScript, 16 pages) | Pass |
| Browser audit, 16 routes × 7 widths | No issues (includes failed requests and console errors) |
| Journey: not connected / success (mock) / failure (mock) | 110 / 112 / 112 passed, 0 failed |
| Development mode (`next dev`), all 16 pages | No React warnings |
| `wrangler deploy --dry-run` | 184 files ready, config valid |
| Build with a sub-folder base path (`MYTOR_BASE_PATH=/mytor`) + checks | Pass (kept as an option; Cloudflare uses the root) |

Not done: no deploy was run (it needs the owner's Cloudflare login: `npx wrangler login`, then `npm run deploy`).
`wrangler dev` (local Workers runtime) was not tested: npm blocked the `workerd` install script, and the
static export is served the same way by `npm start`.
