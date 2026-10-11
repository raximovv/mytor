# Mytor redesign: design research

Research date: 10 October 2026. Every reference below was opened during this session, either in a real browser
pane or in headless Chrome at 1440 × 900 (first screen plus a full-page capture). Where a site blocked access or
did not render, that is stated; nothing below is described from memory alone.

**Access limitations, stated plainly**

- `getjobber.com`, `pos.toasttab.com`, `land-book.com` and `lapa.ninja` answered headless Chrome with a bot-verification
  or "you have been blocked" page. I did not try to get around those checks. Jobber and Land-book loaded normally in
  the interactive browser pane and were reviewed there. **Lapa.ninja and Toast were not reviewed.**
- Awwwards' SaaS listing loaded, but its thumbnails are lazy images that did not render in the capture. I could see
  only the studio names, so Awwwards was not used as a visual reference.
- React Bits opened behind a full-screen "Pro" promotion modal. Its components are described from the page structure
  and component names, not from a clean preview.
- shadcnblocks' live block previews (iframes) did not finish rendering in the capture. The block pages' own written
  specifications and static thumbnails were used instead.
- `originui.com` now redirects to **coss.com ui** (a Base UI component library). The research covers what is published there now.

---

## 1. Industry: software for automotive shops

### 1.1 Shopmonkey: home page and Quick Lube page
- https://www.shopmonkey.io/ and https://www.shopmonkey.io/oil-change-software
- **What it shows:** a white page, a large product screenshot overlapping a photo of a technician, then three
  alternating "pillar" sections (Shop management, POS, CRM). Each pillar has three bold benefit headings with one
  sentence under each. Next come "Smart. Simple. Built for shop life." (three image cards), a "Pick your lane" grid of
  shop types and a support section. The Quick Lube page reuses the same template with oil-change wording.
- **What works:** benefit headings come first and features second ("Keep your bays full while boosting your bottom
  line"). Every claim is tied to one concrete action ("Automatically send appointment confirmations and reminders").
  A quote from a real owner, "I'm not a computer geek… I'm a grease monkey", is aimed squarely at non-technical owners.
- **Fit for Mytor:** high for the copy pattern, low for the visuals. Mytor has no customers, so the testimonials,
  "8,000 shops" proof and review badges **cannot be copied**. The photo-heavy pillars depend on a large photo library
  Mytor does not have.
- **Adapt:** the three-part structure (problem the owner feels, what the software does, the result) becomes the
  features-page template: *Muammo / Mytor nima qiladi / Egasiga foydasi*.

### 1.2 Tekmetric
- https://www.tekmetric.com/
- **What it shows:** a dark hero over a workshop photo with a mono, all-caps display face ("BRING EVERY PART OF YOUR
  SHOP – TOGETHER") and an orange accent. Below are three bold coloured tabs (Run your shop / Secure payments /
  Engage your customers), then sections that alternate dark and light, each pairing a small screenshot with a
  bordered list of sub-features. The founder story is set as a huge typographic block ("THE BUILDERS THE FIXERS THE
  GEARHEADS").
- **What works:** strong automotive character without cars everywhere. Orange on graphite feels like a workshop,
  not a fintech. Sections are clearly separated by their background colour.
- **Fit:** the colour logic suits Mytor (graphite plus amber). The all-caps mono display and the angular cut cards
  are too loud for a first-time, non-technical reader, especially in Uzbek, where long words in caps get hard to read.
- **Adapt:** graphite surfaces for product moments, with amber used only for the main CTA and highlights.
  Typographic confidence without all-caps.

### 1.3 AutoLeap
- https://autoleap.com/
- **What it shows:** a clean white SaaS page. A short headline sits next to a product collage. There are rows of
  partner logos, tabbed "results" (Revenue / Communication / Profit margins…), a three-step numbered selector, video
  case studies with large percentage stats, **"Go Live in 3 Easy Steps"** and a grid of shop types.
- **What works:** "Go Live in 3 Easy Steps" answers the owner's real worry ("how much work is it to switch?"). It
  maps directly onto Mytor's pilot steps (introduction, setup, training, staying in touch).
- **What to avoid:** the page leans on large percentage claims ("Grow your sales by 30%", "300%+"). Mytor's
  `npm run check` forbids invented percentages, and rightly so. The tab strip of six metrics adds clicks without adding meaning.
- **Adapt:** a plain, numbered onboarding sequence on the home page and the pricing page.

### 1.4 Fullbay (heavy-duty repair)
- https://www.fullbay.com/
- **What it shows:** a near-black page with condensed heavy display type, red accents, a three-number stat row, and
  two large audience cards ("You repair trucks & equipment" / "You run a fleet").
- **What works:** the audience split lets the visitor recognise themselves in one click.
- **Fit:** low. Too dark and aggressive for Mytor's audience, and close to the "gaming-style" look the brief warns
  against. Listed here as **an example to avoid**.

### 1.5 Housecall Pro (home-service trades)
- https://www.housecallpro.com/
- **What it shows:** a bento grid of real product moments ("Manage jobs", "Capture leads", "Get paid", "Build
  trust"), where each tile is a real UI fragment (a map, an invoice, a review request) set on a photo. A yellow stat
  band and a community section follow.
- **What works:** each bento tile shows **one** product moment that makes sense on its own. This is the
  "meaningful bento" the brief asks for, as opposed to decorative tiles.
- **Adapt:** the home-page benefits use four tiles, and each one holds one Mytor moment: a Telegram reminder with
  loyalty stamps, a stock reconciliation, the owner's message feed, and a voice correction.

### 1.6 Jobber (home-service businesses), reviewed in the browser pane
- https://www.getjobber.com/
- **What it shows:** a dark navy hero with a grid of real customer photos, a plain-language headline ("Run a stronger
  service business"), two CTAs, store ratings, then four outcome tabs (Get noticed / Win jobs / Work smarter / Boost profits).
- **What works:** the headline is about the business, not the software, and it is short enough to read in two seconds.
- **Fit:** the copy approach fits well. The social proof (ratings, customer names) is not available to Mytor and must not be imitated.

---

## 2. Component libraries: specific components reviewed

### 2.1 shadcnblocks: Process 1, Timeline 1, Book a Demo, FAQ
- https://www.shadcnblocks.com/block/process1: "a two-column process section with a sticky heading and contact
  button on the left, numbered step cards on the right… on smaller screens the sidebar unsticks and stacks above the step list."
- https://www.shadcnblocks.com/block/timeline1: centred three-step timeline.
- https://www.shadcnblocks.com/blocks/book-a-demo: three demo-booking layouts (form plus benefits, form plus testimonials).
- https://www.shadcnblocks.com/blocks/faq: 26 FAQ variants. The useful ones put a sticky heading on the left and an accordion on the right.
- **Licence:** a mix of free and paid ("Free" badge on Process 1, paid "All Access" for others). React, Tailwind and shadcn/ui.
- **Fit:** the *layouts* fit well. The code does not, because Mytor is a dependency-free static site. Adapted in plain HTML/CSS:
  - *Process 1* → the "How it works" page: a sticky phase legend on the left, steps on the right, stacking on mobile.
  - *Book a Demo 1* → the demo page: form plus a "what happens next" panel.
  - *FAQ with sticky heading* → home FAQ (already close; kept).

### 2.2 Aceternity UI: Timeline, Bento Grid
- https://ui.aceternity.com/components/timeline: "A timeline component with sticky header and scroll beam follow".
  Large sticky year labels on the left, content on the right, and a vertical line that fills as you scroll.
- https://ui.aceternity.com/components/bento-grid
- **Licence:** free components, plus paid "All-Access" templates. Requires React, Tailwind and Framer Motion.
- **Fit:** the *scroll-beam* idea, a progress line that fills as the reader moves through the steps, is the right
  metaphor for an eight-step workflow. Dark-only demo styling and Framer Motion are not needed. Rebuilt with CSS and a
  small IntersectionObserver (about 20 lines) on the How-it-works page.

### 2.3 Magic UI: Animated List, Bento Grid
- https://magicui.design/docs/components/animated-list: "a list that animates each item in sequence with a delay. Used
  to showcase notifications or events". The demo shows stacked notification cards (icon, title, time ago, source).
- https://magicui.design/docs/components/bento-grid: white cards, each with an icon, a heading, one line of copy and a background visual.
- **Licence:** MIT (free). Pro templates are paid ($199). React, Tailwind and Motion.
- **Fit:** the Animated List is exactly the owner's Telegram feed ("Yangi xizmat 14:32", "Moy kam qoldi"…). Recreated
  as a CSS staggered entrance on the owner feed, played once when it scrolls into view and turned off for reduced motion.

### 2.4 21st.dev: Hero and Features categories
- https://21st.dev/s/hero (1,152 hero components) and https://21st.dev/s/features (318)
- **Observed:** "Split Hero With Image Cards", "Tabbed Feature Categories", "Feature Problem Cards", "Bento Feature
  Grid", "Hero with group of images, text and two buttons". Most heroes are dark with gradients, glows, planets and
  image fans: the generic look the brief rules out.
- **Licence:** community components with licences set by each author. React/Next.js.
- **Fit:** useful as a catalogue of *patterns* (split hero with product on the right; problem cards). The visual style
  of most entries is **to be avoided** for Mytor (gradient glows, cosmic backgrounds).

### 2.5 React Bits: Spotlight Card, Split Text
- https://reactbits.dev/components/spotlight-card (a card with a light that follows the cursor),
  https://reactbits.dev/text-animations/split-text (letter-by-letter text reveal). The page opened behind a Pro promo modal.
- **Licence:** MIT/Commons Clause for free components; Pro is paid. Split Text depends on GSAP.
- **Fit: avoid.** Cursor spotlights don't work on phones, which are the main device for this audience. Letter-by-letter
  headline animation slows reading and breaks Uzbek apostrophe letters (o‘, g‘) into separate pieces.

### 2.6 coss.com ui (formerly Origin UI)
- https://originui.com/ → coss.com ui: "A new, modern UI component library built on top of Base UI"
- **Observed:** Field, Fieldset, Input, Radio Group, Segmented Control, Toggle Group, Alert, Toast, Spinner, and more.
  Quiet neutral styling, clear labels and clear focus rings.
- **Licence:** open source (MIT). React plus Base UI.
- **Fit:** good reference for **form states**: label above the field, hint below, error text under the field, a
  segmented control for small choices, alerts with an icon. Mytor's form already uses this pattern. The redesign
  tightens it: a segmented branch-count control, a spinner in the submit button, and a status alert with an icon.

### 2.7 ReUI
- https://reui.io/: "1,175 free shadcn UI components" plus paid templates. The page is built with dense dark grids and app templates.
- **Fit:** low for a marketing site aimed at shop owners. Noted as a source of app-UI patterns (stepper, timeline,
  badge) rather than marketing sections.

---

## 3. Design galleries

### 3.1 Land-book (reviewed in the browser pane)
- https://land-book.com/?search=saas%20dashboard
- **Observed:** the results are dominated by sellable Framer/Webflow templates (Sunbeam, Receivio, ShipOS, Corekit…),
  mostly with floating 3D blobs, gradient headlines or centred "Launch your SaaS" heroes.
- **Lesson:** this is the generic "AI-template SaaS" look Mytor must not become. The one useful exception is
  *Receivio* ("B2B SaaS template for automation and workflow software"), which explains a workflow with a calm
  diagram. That supports the "one record → several results" diagram already on the site.

### 3.2 Refero
- https://refero.design/: a research tool of real product screens and flows (Atlassian, Plaid, Ramp…), with
  categories such as "Pricing pages with plan comparison" and "Signup with email verification".
- **Lesson:** pricing pages that work label every plan's status and keep the comparison short. The Mytor pricing page
  adopts that: each row says what it is (*Bepul*, *Sinovda*).

### 3.3 Awwwards and Lapa.ninja
- Not used: see the access limitations at the top.

---

## 4. Patterns selected for Mytor (and why)

| Pattern | Source | Why it fits | How it is built in Mytor |
|---|---|---|---|
| Benefit-first headings, one concrete action each | Shopmonkey, Tekmetric | Non-technical owners read the result, not the feature name | Feature page: *Muammo / Mytor nima qiladi / Foydasi* |
| Graphite product stage with amber accents | Tekmetric (toned down) | Workshop character without loud imagery | Voice-demo stage, owner feed, dark CTA band and footer (hero phone stands on the page) |
| Bento of real product moments | Housecall Pro, Magic UI | Each tile proves one benefit with a real-looking fragment | Four home benefit tiles, each with a distinct preview |
| "Go live in N steps" onboarding | AutoLeap | Answers "how hard is it to start?" | Pilot section (4 steps) and pricing ladder |
| Sticky heading + numbered steps, scroll progress | shadcnblocks Process 1, Aceternity Timeline | Eight steps need orientation, not animation | How-it-works: sticky phase legend, progress rail, coloured phases |
| Notification list entrance | Magic UI Animated List | The owner's Telegram feed is the product's emotional payoff | CSS stagger on the owner feed, once, reduced-motion safe |
| Quiet form states | coss.com ui | Trust and clarity at the moment of conversion | Demo page: segmented choice, inline errors, spinner, honest result panel |

## 5. Examples to avoid

- **Gradient or "cosmic" heroes, glow borders, cursor spotlights** (21st.dev hero catalogue, React Bits): generic,
  slow on phones, and unrelated to oil-change shops.
- **Invented proof**: review stars, "trusted by 8,000 shops", percentage uplift stats (Shopmonkey, AutoLeap,
  Housecall Pro, Jobber). Mytor has no customers yet. `npm run check` blocks percentages and testimonial wording.
- **All-caps mono display type and angular cut cards** (Tekmetric) and **near-black aggressive pages** (Fullbay): hard
  to read in Uzbek and Russian, and close to "gaming" styling.
- **Photo-heavy layouts**: Mytor has no licensed photography, and stock car photos would be generic.

## 6. Technical conclusion

All the reference libraries ship React components (shadcn/ui, Tailwind, Framer Motion or GSAP). The Mytor site is a
dependency-free static generator with two languages, a base path for GitHub Pages and its own QA scripts. None of the
selected patterns needs React. Each one is a layout or a short IntersectionObserver. **No framework migration and no
new dependencies.** Each pattern is rebuilt in plain HTML, CSS and a few lines of JS, so no third-party licence is involved.
