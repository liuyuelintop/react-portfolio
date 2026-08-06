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
- `lint` runs with `--max-warnings 0`: a single warning fails it.

## Development Commands

```bash
# Dev server (npm or pnpm; pnpm recommended for faster installs)
npm run dev          # or pnpm run dev

# Production build / local preview of the build
npm run build
npm run verify:static
npm run preview

# Lint (ESLint, React rules, zero-warning policy)
npm run lint
```

## Tech Stack

- **React 19** (function components + hooks only) on **Next.js 16 App Router**
- Fully static production output via `output: "export"`; no server runtime features
- **Tailwind CSS 3** with a custom theme system (see Theming below)
- **Framer Motion** for animation and scroll-triggered effects
- **ESLint 9** flat config with Next.js Core Web Vitals, React, and hooks rules
- **prop-types** for runtime prop validation (no TypeScript)
- Icons via `lucide-react` and `react-icons`

## Architecture

```
app/                # Route-owned layout, homepage metadata, robots and sitemap
src/
├── components/
│   ├── layout/      # Navbar
│   ├── sections/    # Page sections (Hero, Experience, Projects, …)
│   └── ui/          # Reusable: common/ (Toast, ErrorBoundary,
│                    #   OptimizedImage, Reveal, …) and animations/
├── constants/       # ALL page content lives here (data-driven)
├── contexts/        # ThemeContext, UIContext
├── hooks/           # Custom hooks (animation, UI)
├── utils/           # Accessibility utilities
├── assets/          # Bundled images
└── ../public/resume # Static resume PDF copied into the export
```

### Content is data-driven — edit `constants/`, not JSX
The single most important thing to know: **page content (hero copy, experiences, projects, How I Build, etc.) is data in `src/constants/`, not hardcoded in components.** To change what the site says, edit the relevant constants file (`constants.js`, `experiences.js`, or `projects.js`). Components map over that data. Everything re-exports through `src/constants/index.js`, so import from the barrel:

```javascript
import { HERO_CONTENT, HOW_I_BUILD, PROJECTS } from '../constants';
import { useKeyboardShortcuts, useUI } from '../hooks';
```

Hooks are barrelled in `src/hooks/index.js`; UI components are imported from their folder paths.

### App composition (`app/page.jsx`, `src/App.jsx`)
`app/page.jsx` is the static Server Component route and owns homepage metadata plus JSON-LD. `src/App.jsx` is the client boundary for motion, contexts, modal state, and browser effects. Provider order is `MotionConfig > ThemeProvider > UIProvider > ToastProvider`. Sections are imported synchronously so the production export contains their meaningful HTML, and each remains wrapped in an `ErrorBoundary`.

The **currently rendered** sections, in order, are:
`Hero → Selected Work → Experience → How I Build → Contact`.

The old unmounted Blog, Chatbot, CareerChatbot, GitHubActivity, PersonalBranding and References sections were removed, and the CareerSnapshot, WorkingStyle and Skills sections were consolidated into HowIBuild. Do not reintroduce a section unless it is mounted in `App.jsx` and backed by current content data.

### Theming
The runtime exposes a single hard-coded dark theme via `ThemeContext`. The dormant Neon, Minimal, and Corporate styling branches were removed from the components the content-first redesign rewrote.

### Accessibility
Targets WCAG AA. A skip link is injected at runtime, and keyboard shortcuts (defined in `src/hooks/useKeyboardShortcuts.js`) use **Alt + key**:
`H` hero · `W` selected work · `E` experience · `B` how I build · `C` contact · `?` help.

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
