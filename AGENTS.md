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
│   ├── layout/      # Masthead + LampCord (shared with case studies)
│   ├── sections/    # Hero, Work (+ figures/), FurtherOut, Contact
│   └── ui/          # Reusable: common/ (Toast, ErrorBoundary, HourMark)
│                    #   and diagrams/
├── constants/       # ALL page content lives here (data-driven)
├── hooks/           # useLight, useKeyboardShortcuts
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

The page reads as one day: Morning, Midday, Golden hour, Late. Projects, Experience and How I Build were merged into Work: three chapters, one per working principle, each with one lead story, one interactive figure and compact evidence rows, so a project or role appears once. Do not reintroduce a section unless it is mounted in `App.jsx` and backed by current content data.

Rules that came out of the redesign and are easy to undo by accident:
- **The work is the loudest thing.** In a chapter the principle is a small label; the project name and the decision headline carry the weight. Personal material supports the work and must not out-engineer it.
- **Further out is one sideways strip of five places**, each one photograph and one line. The order is the owner's (field, away, town, sill, table). `verify:static` fails if it grows, and the strip must stay a labelled, keyboard-reachable region. It scrolls natively: no parallax or scroll-driven effects. Alcohol stays understated: one bottle, one line about memory, no counts or preferences.
- **A figure must show the product or the work, not a toy.** All three lead-story figures are one component, `figures/FlowFigure.jsx`: a rail of steps on two lanes and one card per step, with the data in `WORK_FIGURES` (`src/constants/work.js`). Add or change a figure by editing that data; add a payload kind only when no existing one fits. A figure plays once when first seen, never loops, waits while the pointer rests on the card, and does not auto-play under reduced motion. Every step is in the static HTML.
- **Marshal is self-hosted and MIT-licensed, but its repository is private.** The story may describe how it is run (one machine, Docker, or a server over a private Tailscale network) with the boundary that model calls still send input to the chosen provider. It must not be called open source while the repository is private; `verify:static` rejects that wording.
- **ByteCroniX is bounded by the owner's evidence register.** The story may say what that register marks as first-person or corroborated (BFF/REST integrations for web, Android and iOS clients; OpenAI function calling; API testing and delivery workflows; the 26.7s to 5.6s local observation). It must not claim service ownership, coverage figures, deployment mechanics, leadership or production results; `verify:static` rejects that wording.
- **One paper colour.** Every section shares one background, in day and in night. Do not add per-section background colours or a section that is always dark.

### Case-study routes (`app/work/[slug]/`)
Case studies are static Server Component routes, not homepage sections. `app/work/[slug]/page.jsx` owns the layout and its own `generateMetadata`; `src/constants/caseStudies.js` owns every word of the copy. To add one, add an entry to `CASE_STUDIES` — `generateStaticParams` and `app/sitemap.js` both derive from that map, so no route or sitemap edit is needed.

Rules for this route:
- Keep `dynamicParams = false` so an unknown slug emits no file and 404s instead of rendering another case study's content.
- `next.config.js` sets `trailingSlash: true`, so output is `out/work/<slug>/index.html`. Canonical URLs, sitemap entries and `scripts/verify-static-output.mjs` must agree with that; don't flip the global setting to satisfy a check.
- No `"use client"` in the route, no motion, no runtime data. The page must be complete in the exported HTML. The one client component it renders is the shared `Masthead`'s `LampCord`.
- A homepage story or evidence row links to its case study with `caseStudyHref`. Reference `caseStudies.js` for shared fields rather than restating them in `work.js`.
- Claims on a case-study page must trace to a file in a source you can cite. `verify:static` fails the build on absolute-privacy and over-claim wording — extend that list rather than relaxing it.

### Theming
The palette is a set of CSS variables in `src/index.css` (`--paper`, `--ink`, `--body`, `--muted`, `--link`, `--rule`, …), sampled from photographs of Flagstaff Gardens. Day is the default. `data-light="night"` on `<html>` swaps the whole palette, Contact included: the owner found a permanently dark Contact section jarring on the light page. `useLight` and the `LampCord` button own the switch, and an inline script in `app/layout.jsx` restores a stored choice before first paint. Tailwind exposes the same variables as `paper`, `lift`, `ink`, `body`, `muted`, `link` and `rule`, so utility classes follow the light too. Type is Newsreader (serif, headings) and Schibsted Grotesk (sans, body).

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
