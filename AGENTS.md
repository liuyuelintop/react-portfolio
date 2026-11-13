# AGENTS.md

Guidance for AI coding agents (Codex, etc.) working in this repository. Read this before making changes.

## Working Principles

These bias toward caution over speed. For trivial edits, use judgment.

### 1. Think before coding
- State assumptions explicitly. If uncertain, ask instead of guessing.
- If multiple interpretations exist, surface them — don't silently pick one.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop and name what's confusing.

### 2. Simplicity first
- Write the minimum code that solves the problem. Nothing speculative.
- No features, abstractions, "flexibility", or error handling that wasn't asked for.
- This is a content-driven portfolio site, not a framework. Prefer plain data + small components over new layers.
- If you wrote 200 lines and it could be 50, rewrite it.

### 3. Surgical changes
- Touch only what the task requires. Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken. Match existing style even if you'd do it differently.
- Remove imports/variables YOUR changes orphaned; leave pre-existing dead code alone (mention it instead).
- The test: every changed line should trace directly to the request.

### 4. Verify your work
- Turn tasks into checkable goals (e.g. "add validation" → "handle invalid input X without crashing").
- After any change, run `npm run lint` and `npm run build`. There are no unit tests, so the build + a manual look in `npm run dev` are your safety net.
- For recruiter-journey or release-boundary changes, also run `npm run verify`, which includes the static-output and Playwright browser gates.
- `lint` runs with `--max-warnings 0`: a single warning fails it.

## Development Commands

```bash
# Dev server (npm or pnpm; pnpm recommended for faster installs)
npm run dev          # or pnpm run dev

# Production build / local preview of the build
npm run build
npm run verify:static
npm run verify       # lint + build + static and browser journey checks
npm run preview

# Lint (ESLint, React rules, zero-warning policy)
npm run lint
```

## Tech Stack

- **React 19** (function components + hooks only) on **Next.js 16 App Router**
- Fully static production output via `output: "export"`; no server runtime features
- **Tailwind CSS 3** plus palette variables and page styles in `src/index.css` (see Theming below)
- **Framer Motion** for the toast and error-boundary transitions only; page motion is CSS and SVG
- **ESLint 9** flat config with Next.js Core Web Vitals, React, and hooks rules
- **prop-types** for runtime prop validation (no TypeScript)
- Icons via `lucide-react` and `react-icons`

## Architecture

```
app/                # Route-owned layout, homepage metadata, robots and sitemap
src/
├── components/
│   ├── layout/      # Masthead + LightSwitch (shared with case studies)
│   ├── sections/    # Hero, Work (overview cards, FlicksideStory, figures/), FurtherOut, Contact
│   └── ui/          # Reusable: common/ (Toast, ErrorBoundary, Phone)
│                    #   and diagrams/
├── constants/       # ALL page content lives here (data-driven)
├── hooks/           # useLight, useKeyboardShortcuts, useFirstSight
├── utils/           # Accessibility utilities
├── assets/          # Bundled images
└── ../public/resume # Static resume PDF copied into the export
```

### Content is data-driven — edit `constants/`, not JSX
The single most important thing to know: **page content (hero copy, work chapters, figure copy, Further out, etc.) is data in `src/constants/`, not hardcoded in components.** To change what the site says, edit the relevant constants file (`constants.js` or `work.js`). Components map over that data. Homepage constants re-export through `src/constants/index.js`, so import them from the barrel; case-study route data is imported directly from `caseStudies.js` as described below:

```javascript
import { HERO_CONTENT, TOOLBOX, WORK } from '../constants';
import { useKeyboardShortcuts, useLight } from '../hooks';
```

Hooks are barrelled in `src/hooks/index.js`; UI components are imported from their folder paths.

### App composition (`app/page.jsx`, `src/App.jsx`)
`app/page.jsx` is the static Server Component route and owns homepage metadata plus JSON-LD. `src/App.jsx` is the client boundary for interactive figures, the toast, and browser effects. Provider order is `MotionConfig > ToastProvider`. Sections are imported synchronously so the production export contains their meaningful HTML, and each remains wrapped in an `ErrorBoundary`.

The **currently rendered** sections, in order, are:
`Hero (#hero) → Work (#projects) → Further out (#further-out) → Contact (#contact)`.

The page answers three questions in order: who Yuelin is, what kinds of work he has done, and which piece a reader wants to open.

- **Hero (`#hero`) belongs to the person.** Name, role, one sentence about the kind of work, the range in one paragraph, and two actions: browse the work, download the résumé. The field photograph stays here because it is where Flickside came from. No project owns the first screen, and no product screen appears in it.
- **Work (`#projects`) is an overview first.** Its heading is the first thing inside the anchor, then four cards in this order: Flickside (mobile product, the lead and largest), ByteCroniX (work experience), Marshal (workflow design), MoneyGuard (calculation boundary). The hero button, the Work link and every case study's "Back to all work" land here. Nothing may be placed between the `#projects` anchor and the overview, and no project may become a homepage section of its own.
- **Depth lives on the case-study pages.** A card carries a kind, a name, one decision, one small picture of its own kind and one way in: enough to choose by. The Flickside flow, the limit's proof and the website live on `/work/flickside/`; Marshal's and MoneyGuard's full figures live on their pages.
- **ByteCroniX is employment**, with no case-study page, so its account follows the overview in full under "Work experience". The 26.7s to 5.6s result is one local integration-test observation, and the card says so beside the bars.
- Further evidence is listed once, then the plain-facts strip (at a glance + toolbox), so a project or role appears once. Do not reintroduce a section unless it is mounted in `App.jsx` and backed by current content data.

Rules that came out of the redesigns and are easy to undo by accident:
- **The work is the loudest thing.** The page itself is quiet (one paper colour, one display face, one link colour) so product screens carry the colour. Personal material supports the work and must not out-engineer it. There is no day-narrative wrapper (hour marks, lamp cord, flying disc); do not bring one back.
- **The four cards must be tellable apart at a glance.** Each states its kind in the label and carries a different kind of picture: the app's own screens, two totals on one scale, three lines of the tracked-changes sheet, three lines of the receipt. From 900px all four sit in one view, Flickside on the left; on a phone the four are named first (`.picks`) and then shown. Keep cards short: a long card pushes the others out of the first view.
- **Flickside is shown, not illustrated.** Every Flickside picture is the app's own demo capture (fictional people, example places) in `public/images/flickside/`, and the page says so. The reel's and the lead card's plates use the app's own light (afternoon, golden hour, under lights) and do not follow the page's light. "Friends can see where I’m throwing. For two hours." is the headline of `/work/flickside/`, not of the homepage. Status stays "Private iPhone beta on TestFlight"; the website and its location demo are public. Claims about the limit are bounded by the app repository's `docs/backend.md`; `verify:static` rejects store, user-count and tracking wording.
- **Clay marks the limit and nothing else.** `--clay` is the colour of Flickside's two-hour ring. It is used for "For two hours.", the app's question and the "2 hours" connector. Links and controls use `--link`.
- **Further out is one sideways strip of four places**, each one photograph and one line, and it carries less weight than the work. The order is the owner's (away, town, sill, table); the field photograph opens the page instead and must not be repeated on the homepage. `verify:static` fails if the strip changes size, and it must stay a labelled, keyboard-reachable region. It scrolls natively: no parallax or scroll-driven effects. Alcohol stays understated: one bottle, one line about memory, no counts or preferences.
- **On a phone the navigation is a bar at the bottom of the screen**, the same `<nav>` moved by CSS. Keep it to short labels; it must fit at 320px.
- **A figure must show the product or the work, not a toy, and each story has its own kind.** Marshal's is `figures/RevisionFigure.jsx` (the workflow under tracked changes), drawn on `/work/marshal/`; MoneyGuard's is `figures/ReceiptFigure.jsx` (the report as a receipt, each line traced back across the model boundary), drawn on `/work/moneyguard/`; ByteCroniX's is `figures/TraceFigure.jsx` (one request as a trace, walked through the method), drawn on the homepage beside its account. The data lives in `WORK_FIGURES` (`src/constants/work.js`); change a figure by editing that data. Do not fold them back into one shared component: the owner asked for each figure to match its story. Across all three, you are outlined, code is solid and a model is dashed. A figure performs once when first seen (`useFirstSight`), never loops, and stays static under reduced motion. Every step and trace is in the static HTML. The trace's spans are a sketch; only its two totals are observed, and its caption says so. A homepage card may show a few static lines of a figure, labelled as an illustration.
- **Marshal is self-hosted and MIT-licensed, but its repository is private.** The story may describe how it is run (one machine, Docker, or a server over a private Tailscale network) with the boundary that model calls still send input to the chosen provider. It must not be called open source while the repository is private; `verify:static` rejects that wording.
- **ByteCroniX is bounded by the owner's evidence register.** The story may say what that register marks as first-person or corroborated (BFF/REST integrations for web, Android and iOS clients; OpenAI function calling; API testing and delivery workflows; the 26.7s to 5.6s local observation). It must not claim service ownership, coverage figures, deployment mechanics, leadership or production results; `verify:static` rejects that wording.
- **One paper colour.** Every section shares one background, in day and in night. Do not add per-section background colours or a section that is always dark. (The Flickside reel's plate is product imagery, not a section background.)

### Case-study routes (`app/work/[slug]/`)
Case studies are static Server Component routes, not homepage sections. `app/work/[slug]/page.jsx` owns the layout and its own `generateMetadata`; `src/constants/caseStudies.js` owns every word of the copy. A study may open on its decision instead of its name (`headline`, `limit`), as Flickside does. To add one, add an entry to `CASE_STUDIES` — `generateStaticParams` and `app/sitemap.js` both derive from that map, so no route or sitemap edit is needed.

Rules for this route:
- Keep `dynamicParams = false` so an unknown slug emits no file and 404s instead of rendering another case study's content.
- `next.config.js` sets `trailingSlash: true`, so output is `out/work/<slug>/index.html`. Canonical URLs, sitemap entries and `scripts/verify-static-output.mjs` must agree with that; don't flip the global setting to satisfy a check.
- No `"use client"` in the route and no runtime data. The page must be complete in the exported HTML. The only client components it renders are the shared `Masthead`'s `LightSwitch` and a study's figure (`kind: "figure"`), which holds every step in its static HTML. Flickside's own section kinds (`origin`, `moments`, `pair`, `site`, in `Work/FlicksideStory.jsx`) are plain markup with no hooks and no motion.
- Keep a figure outside a closed `<details>`: its controls must be reachable by keyboard without opening anything.
- Every study's "Back to all work" goes to `/#projects`, the overview. Do not point it at a single project.
- A homepage card or evidence row links to its case study with `caseStudyHref`. Reference `caseStudies.js` for shared fields rather than restating them in `work.js`.
- Claims on a case-study page must trace to a file in a source you can cite. `verify:static` fails the build on absolute-privacy and over-claim wording — extend that list rather than relaxing it.

### Theming
The palette is a set of CSS variables in `src/index.css` (`--paper`, `--ink`, `--body`, `--muted`, `--link`, `--rule`, `--clay`, …). Day is the default. `data-light="night"` on `<html>` swaps the whole palette, Contact included: the owner found a permanently dark Contact section jarring on the light page. `useLight` and the `LightSwitch` button own the switch, and an inline script in `app/layout.jsx` restores a stored choice before first paint. Tailwind exposes the same variables as `paper`, `lift`, `ink`, `body`, `muted`, `link` and `rule`, so utility classes follow the light too. Type is Archivo (one variable family at two widths: narrow for headlines, wide for small labels; `font-display` in Tailwind) and Schibsted Grotesk (body). The `font` shorthand resets `font-stretch`, so set the width after it.

### Accessibility
Targets WCAG AA. A skip link is injected at runtime, and keyboard shortcuts (defined in `src/hooks/useKeyboardShortcuts.js`) use **Alt + key**:
`H` hero · `W` work · `F` further out · `C` contact · `?` help.

### Environment variables
Next.js loads `.env` automatically. Only variables intentionally exposed to browser code should be `NEXT_PUBLIC_`-prefixed. The current live portfolio does not require environment variables for the resume link.

```env
# Add only variables used by live code.
```

## Conventions

- **No TypeScript.** Validate props with `prop-types`.
- Keep new content in `constants/`; keep components presentational and mapping over that data.
- New sections should be synchronously mounted and wrapped in `ErrorBoundary` in `App.jsx` so static output remains content-complete.
- Don't commit secrets. `.env` is local; never hardcode keys.
