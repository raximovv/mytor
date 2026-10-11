# Pitch Day 3.0 local preview

The homepage explains the problem, solution, team, team fit, roadmap and implementation plan. `/demo/` presents the video area, video description and an interactive UI walkthrough. Uzbek and Russian use the same page structure.

Keep the existing warm-white, graphite and amber design, product phone preview and plain clickable language flags. Use readable sections, accessible anchor navigation and a mobile menu. The user's final reference restores the original hero description and the Demo request / Download coming soon buttons, with the new headline. The demo button opens `/demo/`.

Confirmed role mapping: Humoyun Nasipkulov (Strategy), Rahim Raximov (Code), Mexroj Ergashev (Ops), Firdavs Juraev (Growth). Rahim's first name follows his direct correction. Other names and background labels come from the supplied Canva deck. Skill tags, expandable skill descriptions and the team-fit paragraph were removed at the user's request. Portrait crops center all four faces at a similar height.

The current product is an illustrative UI prototype. Database, live speech recognition, reminders and analytics belong to the proposed MVP plan. Do not imply these services are running.

The approved 90-second English demo is configured in `src/content/pitch-assets.ts`. Available public member profile links remain a content follow-up. Team skill and problem-fit explanations are not currently rendered after the user's removals. Do not present the Canva deck as a demo video.

User-approved consolidation completed on 11 October: `/features/`, `/how-it-works/`, `/pricing/`, `/about/` and their Russian equivalents have been removed. Their content is covered by the homepage and demo. Privacy and bilingual 404 handling remain. The separate `Nega bu jamoa?` section was removed.

Local previews were reviewed first; the user authorized committing and pushing on 11 October. Deployment remains a separate action.

## Selected designs incorporated — 11 October

The user chose the dark, wide demo-video presentation and the open horizontal roadmap from the local concepts. Homepage order is hero, problem/solution, demo-video, service flow, team, roadmap, implementation/AI plan, then the closing demo link. The shared video section also appears on `/demo/`, followed by its written description, chapters and interactive prototype. Both languages use the same structure.

The video frame gently expands once when entering view. The roadmap line draws once, with all four stage labels always present. At phone/tablet widths the roadmap becomes a readable vertical list; reduced-motion users get the static presentation. These effects reuse the existing observer and CSS, without a new animation dependency. The hero keeps its original styling and looping phone preview; its headline is now "Qaysi moshinaga qancha moy quyildi?" and the competition badge is removed.

Final refinements: three comparison cards use illustrative photos and subtle cursor tilt. The control card names the notification recipient explicitly as Asoschi. Prototype buttons omit "UI". Team code links to `https://github.com/raximovv/mytor`. All website apostrophes use the straight character (`'`).

The shared video player serves `public/assets/demo/mytor-demo.mp4` on the homepage and `/demo/` in both languages. It includes English AI narration, captions, current-prototype captures, the proposed MVP, pilot plan and team. Planned capabilities are clearly labeled. The "English demo / first draft" label has been removed from every scene and the poster.

## Verification

- `npm run check`: passed, including production build, TypeScript, locale parity, links, anchors, metadata and Pitch Day section checks across 8 HTML pages.
- Browser: Uzbek and Russian home/demo pages checked at 320, 768, 1024 and 1440 px; demo pages additionally checked at 390 px. No horizontal overflow after fixes.
- All five interactive demo steps work in both languages. Reset, mobile menu, demo-to-team navigation and equivalent-page language switching verified.
- Fresh production-preview browser console: no errors or warnings during the checked journey.
- Screenshots: `screenshots/pitch-day-preview/`.
- Selected-design evidence: `screenshots/pitch-incorporated/`; 16 responsive cases across home/demo in both languages at 320, 390, 768 and 1440 px, plus both prototypes' five keyboard-selectable steps and restart.
- Local static preview: `http://localhost:4321/` and `http://localhost:4321/demo/`.
- The older shop-request `scripts/journey.js` is not applicable to this presentation preview. Remaining team profile links are a content follow-up.
