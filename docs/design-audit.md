# Mytor marketing site: design audit (before the redesign)

Audited 10 October 2026, before any redesign work, on two versions:

- **Local branch `home-landing-d`** (commit `dd90bb6` plus uncommitted work: pricing FAQ removed and a landing "lab").
  All findings below refer to this version.
- **Published site** https://raximovv.github.io/mytor/, which serves `main` (`884d557`), two commits behind the branch.
  It has no `canonical`/`og:image` (the `MYTOR_SITE_URL` Actions variable is not set) and `data-endpoint=""` (the
  form is not connected).

Method: I read every source file (`src/**`, `scripts/**`), ran `npm run check`, the browser audit
(`scripts/screenshots.js --audit`, 16 routes × 320/375/430/1440) and the phone journey (`scripts/journey.js`). I also
captured 77 screenshots at 320, 375, 390, 430, 768, 1024 and 1440 px in both languages
(`screenshots/redesign/before/`).

**Baseline results:** `npm run check` passes (16 pages). The browser audit reports no issues. The journey passes 89/89.
The site is technically sound, so the problems below concern design, structure and conversion, not broken code.

---

## What is already good and must be kept

1. **Honest content model.** Status chip "Ishlab chiqilmoqda", a footer note saying the screens are examples, an
   honest "not connected" form state, and no invented customers or stats. `npm run check` enforces it.
2. **Real product demonstrations.** The looping hero app (voice → draft → "4 emas, 3 litr" fix → stamp → owner
   message), the step-through voice demo, the sample plate lookup, the stock reconciliation, the owner feed and the
   Telegram driver chat. These explain the product better than any copy.
3. **A clear eight-step workflow model** (once / per car / afterwards) and the "one confirmed record → several
   results" idea.
4. **Solid engineering.** No dependencies, real files per route, `/mytor/` base path, hreflang, a remembered language,
   accessible form (labels, `aria-describedby`, error summary, focus management), and a `prefers-reduced-motion` path.
5. **The brand assets:** the running-mascot logo (#01377F), the stamp motif and the Uzbek licence-plate component.

---

## Prioritised findings

### P1: affects understanding or conversion

| # | Area | Finding | Evidence | Action |
|---|---|---|---|---|
| 1 | Home: length | The home page is **9,046 px at 1440** and **11,727 px at 375**. The pinned voice story gives each of its 5 steps `min-height: 74svh`, so desktop visitors scroll through about 3.7 screens of mostly empty sand to read five short sentences. On phones the same 5 phone screens are repeated inline. | `home-uz-1440-full.png`, `home-uz-375.png` | **Rebuild**: replace the scroll story on the home page with the compact interactive step demo (one phone, 5 step buttons, play/pause). |
| 2 | Home: hero CTA | The secondary hero action is a greyed "Yuklab olish · Tez orada" item, so the second most prominent thing in the hero is something the visitor *cannot* do. The brief's secondary CTA "Qanday ishlaydi?" is missing from the hero. | first screen at 375/1440 | Replace it with a ghost button "Qanday ishlaydi?". |
| 3 | Home: missing benefits | The `home.benefits` copy (four owner benefits) exists in both content files but **is never rendered**. Owner value is spread across "one record → three results" and a roles section, which repeats the How-it-works page word for word. | `src/pages/home.js`, `src/content/*.js` | Add a four-tile benefits section, each tile with its own preview. Drop the duplicated roles section from home. |
| 4 | Home: problem → solution | The two problems are long paragraphs with three bullet lists each, and the answer only comes two sections later. An owner has to hold the problem in mind while scrolling. | `problems-split` | Restructure as a three-row "Daftar bilan / Mytor bilan" comparison: problem and answer side by side. |
| 5 | Features: structure | The five feature sections use five different layouts, and their copy mixes "what it does" with "why it matters" differently each time. The table of contents is not sticky, so after the first section you lose your place. | `features-uz-1440-full.png` | Give every feature the same three labelled lines (*Muammo / Mytor nima qiladi / Foydasi*) and make the section index sticky. |
| 6 | How it works: legibility | The four "afterwards" cards sit in a 4-column navy grid at 1440 with 13–14 px text, and the previews inside are about 230 px wide. Phase colours mean nothing until you read the headings. | `how-uz-1440-full.png` | Rebuild as a vertical timeline with a sticky phase legend, a progress rail and full-width rows with readable previews. |
| 7 | Pricing: status of each offer | Demo (free), pilot (free, 6 weeks) and post-pilot prices ("sinovda") sit in separate sections. A skimming reader can take 99 000 so‘m as the price of the pilot. | `pricing-uz-1440-full.png` | Add a three-stage "Bugun / 6 hafta / Pilotdan keyin" ladder with an explicit status on each stage. |

### P2: visual quality and brand

| # | Finding | Action |
|---|---|---|
| 8 | **The palette reads as "craft/vintage" rather than premium software.** The parchment background (#F6F1E7), sand bands (#EEE5D4) and saturated navy blocks produce three competing background tones per page. | A warm white base, one stone band, and graphite for product moments, the CTA band and the footer. |
| 9 | **Visual noise**: 3 px top rules, dashed dividers, dashed amber bus lines, mono uppercase micro-labels (0.72 rem ≈ 11.5 px) and outlined bullet rings all appear on the same screen. | One divider style (1 px hairline), mono only for numbers and plates, labels at least 12.5 px. |
| 10 | **Inconsistent radii**: 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 16, 18, 22, 27, 28 and 36 px are all in use. | A scale of 6 / 10 / 14 / 20 px (plus the phone shell). |
| 11 | Heavy display type: Geologica 800 at −0.032em makes large Uzbek headlines dense ("Mijoz qaytib keladi, moy hisobi aniq bo‘ladi" wraps to 4 heavy lines). | Geologica 700 at a calmer size scale; Onest for body. |
| 12 | Hero visual: a sand box with a phone that is cropped at the first-screen fold at 1440×900, with the owner notification below the fold. | The phone alone on the page (no panel), sized to fit the first screen, with the notification beside it. A graphite panel was tried first and removed after review. |
| 13 | Footer and CTA band use two different navy blocks back to back, and the CTA band repeats the same stamp each time. | One graphite CTA band and a calmer footer. |

### P3: details

| # | Finding | Action |
|---|---|---|
| 14 | No structured data (JSON-LD). | Add `Organization` + `WebSite`, and `FAQPage` on the home page (questions that are on the page). No `SoftwareApplication` offers, because prices are not final. |
| 15 | `theme-color` is the parchment colour. | Update to the new base. |
| 16 | The submit button changes its label to "Yuborilmoqda…" but has no visual progress indicator. | Add an inline spinner and `aria-busy`. |
| 17 | The Google Fonts request loads Geologica 500–800 and Onest 400–700 (wide ranges). | Narrow to the weights actually used. |
| 18 | The screenshot tool's "first screen" shots (`full: false`) were in fact full pages (`captureBeyondViewport` always on). | Fix in `scripts/screenshots.js`. |
| 19 | The live site lacks canonical/OG tags because `MYTOR_SITE_URL` is unset in the repository variables. | Not a code issue. Listed for the owner (README already explains it). |

---

## Section-by-section decisions

| Page | Keep | Improve | Consolidate / move | Rebuild |
|---|---|---|---|---|
| Home | hero app loop, FAQ, pilot steps, CTA band | hero layout, copy hierarchy | roles → How page only; "one record" → compact flow | voice story → step demo; problems → comparison; add benefits |
| Features | all five previews (lookup, voice demo, reconciliation, owner feed, driver chat) | consistent three-line structure; sticky index | | layout system for all five sections |
| How it works | 8 steps, 3 groups, fan-out record, roles, pilot link | larger previews | | timeline with phase legend and progress rail |
| Pricing | facts, weeks, provisional plans, "no payment" note | plan cards show status | weeks bar merged into the weeks timeline | status ladder at the top |
| About | all copy | editorial layout | stamp card | |
| Demo | every field, consent, validation, honest states | segmented choice, spinner, layout | | |
| Privacy / 404 | content | typography and layout | | |

## Accessibility and performance baseline

- Skip link, landmarks, one `h1`, labelled controls and keyboard-operable demos are all in place. Focus rings are
  visible (3 px). Reduced motion is handled.
- Smallest text: 0.72 rem mono labels (≈ 11.5 px) inside previews. Raise to at least 0.78 rem.
- No raster images except two flag SVGs and the OG PNGs. CSS is ~36 KB unminified and JS ~13 KB. The main cost is the
  render-blocking Google Fonts stylesheet (three families).
