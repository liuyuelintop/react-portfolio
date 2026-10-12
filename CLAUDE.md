# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Development server (both npm and pnpm supported)
npm run dev          # or pnpm run dev
pnpm run dev         # Recommended - faster installation

# Production build
npm run build        # or pnpm run build
npm run preview      # Preview production build locally

# Code quality
npm run lint         # Run ESLint with React rules
npm run verify       # Full static + recruiter-journey release gate
```

## Project Architecture

This is a React 19 portfolio application built with the Next.js 16 App Router and fully static export.

### Core Technologies
- **React 19** with modern hooks
- **Next.js 16** App Router with `output: "export"`
- **Tailwind CSS** plus a small palette of CSS variables in `src/index.css` (day by default, night via the lamp cord)
- **Framer Motion** for the toast and error-boundary transitions only; page motion is CSS and SVG
- **ESLint** with React-specific rules

### Component Structure
```
app/                       # Static routes, metadata, robots and sitemap
  work/[slug]/page.jsx     # Static case-study route (see AGENTS.md)
src/
├── components/
│   ├── layout/           # Masthead and lamp cord (shared with case studies)
│   ├── sections/         # Hero, Work (+ figures), FurtherOut, Contact
│   └── ui/              # Reusable UI components (common, diagrams)
├── constants/           # Application data and configuration
├── hooks/              # Custom React hooks (useLight, useKeyboardShortcuts)
├── utils/              # Accessibility utilities
└── assets/             # Static assets and images
```

### Key Features
- **Static-first rendering**: Meaningful homepage HTML before JavaScript
- **One day, one page**: Morning (hero) → Midday (work) → Golden hour (Further out) → Late (Contact)
- **Day and night**: `data-light` on `<html>`, toggled by the lamp cord and restored before paint by an inline script in `app/layout.jsx`
- **Work chapters**: three principles, each with one lead story, one interactive figure and evidence rows (`src/constants/work.js`)
- **Accessibility**: WCAG AA compliance with keyboard shortcuts (Alt+H/W/F/C)
- **Case studies**: static `/work/<slug>/` routes driven by `src/constants/caseStudies.js`; a story or row links to one with `caseStudyHref`
- **Motion**: CSS transitions, one SVG disc throw, all respecting reduced motion

### Environment Variables
The live portfolio does not require environment variables. Browser-exposed values must use the Next.js public prefix:
```env
# NEXT_PUBLIC_SOME_CONFIG=
```

### Import Patterns
The project uses organized imports:
```javascript
// Components are imported from their folder paths; constants and hooks are barrelled
import Work from './components/sections/Work/Work';
import { HERO_CONTENT, TOOLBOX, WORK } from '../constants';
import { useKeyboardShortcuts, useLight } from '../hooks';
```

### Development Notes
- Playwright recruiter-journey coverage lives in `tests/recruiter-journeys.spec.js`
- npm and `package-lock.json` are the production package-manager contract
- ESLint uses the Next.js Core Web Vitals flat configuration
- `npm run verify:static` checks the generated homepage and case-study HTML, the sitemap, and required public assets
- Clean component architecture with logical separation of concerns
