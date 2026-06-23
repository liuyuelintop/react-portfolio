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
npm run preview

# Lint (ESLint, React rules, zero-warning policy)
npm run lint
```

## Tech Stack

- **React 18** (function components + hooks only) on **Vite 5**
- **Tailwind CSS 3** with a custom theme system (see Theming below)
- **Framer Motion** for animation and scroll-triggered effects
- **ESLint 8** (`.eslintrc.cjs`) with `react`, `react-hooks`, `react-refresh` plugins
- **prop-types** for runtime prop validation (no TypeScript)
- Icons via `lucide-react` and `react-icons`

## Architecture

```
src/
├── components/
│   ├── layout/      # Navbar
│   ├── sections/    # Page sections (Hero, Experience, Projects, …)
│   └── ui/          # Reusable: common/ (Button, Toast, ErrorBoundary,
│                    #   OptimizedImage, …) and animations/
├── constants/       # ALL page content lives here (data-driven)
├── contexts/        # ThemeContext, UIContext
├── hooks/           # Custom hooks (animation, UI)
├── utils/           # accessibility, typography
├── assets/          # Bundled images
└── ../public/resume # Static resume PDF served by Vite
```

### Content is data-driven — edit `constants/`, not JSX
The single most important thing to know: **page content (hero copy, experiences, projects, skills, etc.) is data in `src/constants/`, not hardcoded in components.** To change what the site says, edit the relevant constants file (`constants.js`, `experiences.js`, `projects.js`, `skills.js`, …). Components map over that data. Everything re-exports through `src/constants/index.js`, so import from the barrel:

```javascript
import { HERO_CONTENT, PROJECTS, SKILLS_DATA } from '../constants';
import { useTypingAnimation, useScrollProgress } from '../hooks';
```

Hooks are barrelled in `src/hooks/index.js`; UI components are imported from their folder paths.

### App composition (`src/App.jsx`)
Provider order is `ThemeProvider > UIProvider > ToastProvider`, then a `Suspense` boundary. Every section is **lazy-loaded** and individually wrapped in an `ErrorBoundary` so one failing section can't take down the page.

The **currently rendered** sections, in order, are:
`Hero → CareerSnapshot → WorkingStyle → Experience → Skills → Projects → Contact`.

The old unmounted Blog, Chatbot, CareerChatbot, GitHubActivity, PersonalBranding and References sections were removed. Do not reintroduce a section unless it is mounted in `App.jsx` and backed by current content data.

### Theming
Four themes — Default, Neon, Minimal, Corporate — defined in `src/contexts/ThemeContext.jsx` (`THEMES`), with system-preference detection. Theme-dependent styling switches on `currentTheme`; when adding visual elements, account for all four themes (see `getBackgroundGradient` in `App.jsx` for the pattern).

### Accessibility
Targets WCAG AA. A skip link is injected at runtime, and keyboard shortcuts (defined in `src/hooks/useKeyboardShortcuts.js`) use **Alt + key**:
`H` hero · `W` working style · `E` experience · `S` skills · `P` projects · `C` contact · `?` help.

### Environment variables
Vite loads `.env` automatically. Variables must be `VITE_`-prefixed. The current live portfolio does not require environment variables for the resume link.

```env
# Add only variables used by live code.
```

## Conventions

- **No TypeScript.** Validate props with `prop-types`.
- Keep new content in `constants/`; keep components presentational and mapping over that data.
- New sections should be lazy-loaded and wrapped in `ErrorBoundary` in `App.jsx`, matching the existing pattern.
- Don't commit secrets. `.env` is local; never hardcode keys.
