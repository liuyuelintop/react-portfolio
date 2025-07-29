# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Build & Development
- `npm run dev` - Start development server (Vite) at http://localhost:5173
- `npm run build` - Build for production using Vite
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint with React-specific rules

### Environment Setup
- Copy `.env.example` to `.env` (if exists) or create `.env` with:
  ```
  VITE_GOOGLE_FOLDER_ID=your_google_drive_folder_id
  VITE_GOOGLE_API_KEY=your_google_api_key
  ```

## Architecture Overview

### Tech Stack
- **React 18** with Vite build tool
- **Tailwind CSS** for styling with custom config
- **Framer Motion** for animations and page transitions
- **React.lazy()** and code-splitting for performance optimization
- **Google Drive API** integration for CV downloads

### Component Architecture

**Lazy-loaded main sections** (App.jsx loads all sections via React.lazy):
- `Navbar` - Navigation with smooth scroll anchors
- `Hero` - Animated landing section with gradient background
- `Experience` - Professional timeline with company logos
- `ReferenceSection` - Swipeable carousel of testimonials
- `Projects` - Grid with modal popups for project details
- `Technologies` - Desktop grid + mobile carousel of tech stack
- `LighthouseScoreCard` - Animated performance score display
- `Contact` - Contact info with click-to-copy functionality

**Component Organization:**
- `ProjectSection/` - Contains ProjectCard, ProjectModal, Projects
- `TechnologySection/` - Contains TechCard, Technologies, TechnologiesCarousel  
- `ReferenceSection/` - Contains ReferenceCard and index
- `ui/` - Reusable components (Card, Modal, QuoteText)

### Data Management
All content is stored as constants in `src/constants/`:
- `projects.js` - Project data with images, tech stacks, links
- `experiences.js` - Work experience timeline
- `technologies.js` - Tech stack organized by categories
- `references.js` - Testimonials and recommendations
- `constants.js` - Hero content and contact information
- `lighthouseScores.js` - Performance metrics for display

### Performance Features
- **Code splitting** - All main components lazy loaded
- **Image optimization** - WebP format images in assets/projects/
- **Framer Motion** - Smooth animations with proper exit animations
- **Responsive design** - Mobile-first with desktop enhancements
- **Lighthouse optimized** - 100/89 performance scores (desktop/mobile)

### Key Implementation Patterns

**Modal System:**
- Projects use a modal overlay system with backdrop blur
- Focus trapping and keyboard navigation (Escape to close)
- Mobile swipe-to-close functionality

**Carousel Implementation:**
- References: Swiper.js with navigation bullets
- Technologies: Custom mobile carousel with snap scrolling

**Animation Strategy:**
- Page-level animations with Framer Motion
- Staggered entry animations for cards/grids
- Subtle hover effects on interactive elements

**Responsive Patterns:**
- Desktop: Grid layouts with hover effects
- Mobile: Carousel/swipe patterns for content browsing
- Touch-friendly interactions and appropriate spacing

### Styling Approach
- **Tailwind CSS** with custom extensions in tailwind.config.js
- Custom shadow utilities (glass, project, contact effects)
- Consistent purple/blue gradient color scheme
- Dark theme with neutral-950 backgrounds and neutral-300 text

---

### 📄 `CLAUDE.md` – Claude Code Guide for Portfolio Refactor

```markdown
# Claude Code Project Guide: Portfolio Modernization 🚀

Welcome, Claude! Please follow these standards to contribute safe, clean, and consistent code to this project.

---

## 🔀 Git Workflow Rules

- Always work on a **feature branch** from `dev`, using this format:
```

feature/phase-\[number]-\[feature-name]

```
Example: `feature/phase-1-hero-typing`

- **Never commit to `main` or `dev` directly.**

- Use **descriptive, semantic commits**, e.g.:
```

feat(hero): add typing animation using react-typewriter
fix(nav): resolve mobile menu animation bug

```

- Keep pull requests focused and small (max ~200 lines changed per PR).

---

## 🌲 Folder Structure Guidelines

Organise code inside `src/`:

```

src/
components/       → All React UI components (atomic if possible)
hooks/            → Custom React hooks
assets/           → Images, icons, fonts
utils/            → Animation, theme, SEO helpers
data/             → JSON, Markdown, or static data

```

Each component gets its own folder:
```

Hero/
index.tsx
styles.ts
animations.ts

```

---

## ✨ Design & Animation Standards

- Use `Framer Motion` or `AOS` for scroll-based animations.
- Keep animations subtle and performant (max 300ms).
- Prefer `CSS 3D` for light interactions, `Three.js` only when needed.
- Use responsive, accessible UI techniques (e.g. `prefers-reduced-motion`).
- Loading screens should be fast and non-blocking.

---

## 🎨 Styling & Theming

- Use `Tailwind CSS` with custom config.
- Support multiple themes using class toggles (`dark`, `neon`, etc.).
- Avoid inline styles except for dynamic values.
- Follow a consistent spacing scale (`px-4`, `py-2`, etc.).

---

## 📚 Component Conventions

- All components should be **typed** (if using TypeScript).
- Use `React.FC<Props>` for function components.
- Prefer composition over conditionals.
- Split large components into `SubComponent.tsx` files when >150 lines.

---

## 🧠 Claude Code Usage Expectations

- Claude should:
  - Follow this guide when generating or modifying code.
  - Use atomic commits (one purpose per commit).
  - Summarise all large changes and explain logic in PRs.
  - Avoid suggesting global code changes unless explicitly requested.
  - Refactor only the files related to the current feature branch.

---

## 🧪 Testing & Review

- Use Vercel preview links for PR testing.
- Add visual regressions or before/after screenshots in PRs.
- Manual QA checklist for all features:
  - ✅ Responsive on desktop/tablet/mobile
  - ✅ Smooth animation
  - ✅ Accessible via keyboard/screen reader
  - ✅ SEO and performance verified in Lighthouse

---

## 🧩 Feature Phase Overview

| Phase | Focus                         | Example Branch                       |
|-------|-------------------------------|--------------------------------------|
| 1     | Hero + Animation              | `feature/phase-1-hero-typing`        |
| 2     | Project Cards + Navigation    | `feature/phase-2-project-3d-cards`   |
| 3     | Themes + Branding             | `feature/phase-3-theme-switcher`     |
| 4     | Performance + Accessibility   | `feature/phase-4-pwa-serviceworker`  |
| 5     | Resume + Content              | `feature/phase-5-resume-pdf`         |

---

## ✅ Claude Best Practices Recap

- ❌ Do **not** modify unrelated files.
- ✅ Always explain what and why.
- ✅ Suggest refactors with clear justifications.
- ✅ Keep changes incremental and reversible.

---

Thank you, Claude! Let's build something beautiful—together 💻✨
```

---

