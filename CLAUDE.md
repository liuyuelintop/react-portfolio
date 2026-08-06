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
```

## Project Architecture

This is a React 19 portfolio application built with the Next.js 16 App Router and fully static export.

### Core Technologies
- **React 19** with modern hooks
- **Next.js 16** App Router with `output: "export"`
- **Tailwind CSS** with the current default theme and preserved theme-aware branches
- **Framer Motion** for animations and micro-interactions
- **ESLint** with React-specific rules

### Component Structure
```
app/                       # Static route, metadata, robots and sitemap
src/
├── components/
│   ├── layout/           # Navigation & layout (Navbar, FloatingNavigation)
│   ├── sections/         # Main content sections (Hero, Experience, Projects, etc.)
│   └── ui/              # Reusable UI components (animations, forms, common)
├── constants/           # Application data and configuration
├── contexts/           # React contexts for theme and UI state
├── hooks/              # Custom React hooks
├── utils/              # Utility functions (accessibility, typography)
└── assets/             # Static assets and images
```

### Key Features
- **Static-first rendering**: Meaningful homepage HTML before JavaScript
- **Client interactions**: Motion, modal, navigation, form, and browser effects
- **Accessibility**: WCAG AA compliance with keyboard shortcuts (Alt+H/W/E/B/C)
- **Project Gallery**: 3-component architecture (ProjectCard, ProjectModal, LiveDemoPreview)
- **Animations**: Framer Motion with scroll-triggered effects

### Environment Variables
The live portfolio does not require environment variables. Browser-exposed values must use the Next.js public prefix:
```env
# NEXT_PUBLIC_SOME_CONFIG=
```

### Import Patterns
The project uses organized imports:
```javascript
// Components are exported from index.js files
import { Hero, Projects, Experience } from '../components';
import { HERO_CONTENT, PROJECTS, SKILLS_DATA } from '../constants';
import { useTypingAnimation, useScrollAnimation } from '../hooks';
```

### Development Notes
- No existing tests - determine testing approach by examining codebase
- npm and `package-lock.json` are the production package-manager contract
- ESLint uses the Next.js Core Web Vitals flat configuration
- `npm run verify:static` checks the generated homepage HTML and required public assets
- Clean component architecture with logical separation of concerns
