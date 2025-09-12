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

This is a React 18 portfolio application built with Vite, featuring a component-driven architecture with performance optimizations and advanced animations.

### Core Technologies
- **React 18** with modern hooks and concurrent features
- **Vite** for fast builds and development
- **Tailwind CSS** with custom theme system (4 themes: Default, Neon, Minimal, Corporate)
- **Framer Motion** for animations and micro-interactions
- **ESLint** with React-specific rules

### Component Structure
```
src/
├── components/
│   ├── layout/           # Navigation & layout (Navbar, FloatingNavigation)
│   ├── sections/         # Main content sections (Hero, Experience, Projects, etc.)
│   └── ui/              # Reusable UI components (animations, forms, common)
├── constants/           # Application data and configuration
├── contexts/           # React contexts (ThemeContext for 4-theme system)
├── hooks/              # Custom React hooks
├── utils/              # Utility functions (accessibility, typography)
└── assets/             # Static assets and images
```

### Key Features
- **4-Theme System**: Complete theming with system preference detection
- **AI Assistant**: Integrated Hugging Face chatbot with iframe embedding
- **Performance Optimized**: Code splitting, lazy loading, memoization
- **Accessibility**: WCAG AA compliance with keyboard shortcuts (Alt+H/A/P/E/S/C)
- **Project Gallery**: 3-component architecture (ProjectCard, ProjectModal, LiveDemoPreview)
- **Animations**: Framer Motion with scroll-triggered effects

### Environment Variables
Create `.env` file with:
```env
VITE_GOOGLE_FOLDER_ID=your_google_drive_folder_id
VITE_GOOGLE_API_KEY=your_google_api_key
VITE_GITHUB_USERNAME=your_github_username
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
- Uses both npm and pnpm (pnpm recommended for faster installs)
- ESLint configured with React 18 and React Refresh rules
- Vite config includes dotenv for environment variables
- Clean component architecture with logical separation of concerns