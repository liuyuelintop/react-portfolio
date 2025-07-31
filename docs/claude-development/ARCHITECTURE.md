# Project Architecture & Development Rules

## 📋 Documentation Management Rules

### Core Principles
1. **Minimize Files**: Only create new documentation when absolutely necessary
2. **Consolidate Information**: Use existing files and merge related content
3. **Avoid Duplication**: Never repeat information across multiple files
4. **Keep It Current**: Update existing docs rather than creating new ones

### File Creation Guidelines
- **❌ DON'T CREATE** new files for component analysis, feature docs, or implementation notes
- **✅ ONLY CREATE** for major phase changes, critical references, or when nothing fits

## 🗂️ Project Structure

```
src/
├── components/
│   ├── layout/                    # Navigation & layout components
│   │   ├── Navbar/
│   │   └── FloatingNavigation/
│   │
│   ├── sections/                  # Main content sections
│   │   ├── Hero/                  # Landing with animations
│   │   ├── Experience/            # Professional timeline
│   │   ├── Skills/                # Interactive visualizations
│   │   ├── Projects/              # Revolutionary 3-component system
│   │   │   ├── ProjectCard.jsx    # Clean hover, tech previews
│   │   │   ├── ProjectModal.jsx   # Mobile-first tabbed interface
│   │   │   └── LiveDemoPreview.jsx # Adaptive controls
│   │   ├── References/            # Testimonials carousel
│   │   ├── Contact/               # Professional forms
│   │   ├── PersonalBranding/      # Brand showcase
│   │   └── GitHubActivity/        # Live activity feed
│   │
│   └── ui/                        # Reusable components
│       ├── animations/            # Animation utilities
│       ├── common/                # Shared components
│       │   ├── Button.jsx         # Theme-aware buttons
│       │   ├── Toast.jsx          # Notification system
│       │   ├── ErrorBoundary.jsx  # Error handling
│       │   ├── SectionHeading.jsx # Unified typography
│       │   └── OptimizedImage.jsx # Performance optimized
│       └── forms/                 # Form components
│
├── constants/                     # Application data
├── contexts/                      # React contexts (theme, etc.)
├── hooks/                         # Custom React hooks
├── utils/                         # Utility functions
│   ├── accessibility.js           # WCAG compliance utilities
│   └── typography.js              # Unified heading system
└── assets/                        # Static assets
```

## 🎯 Component Design Principles

### Theme System
- **4 Complete Themes**: Default, Neon, Minimal, Corporate
- **Consistent Patterns**: All components support all themes
- **Theme-Aware Utilities**: Focus rings, colors, and styling functions

### Accessibility Standards
- **WCAG AA Compliance**: Perfect 100/100 accessibility scores
- **Keyboard Navigation**: Alt+H/P/E/S/C shortcuts
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Focus Management**: Theme-aware focus rings and trapping

### Performance Optimization
- **Code Splitting**: React.lazy() for route-level splitting
- **Bundle Optimization**: Reduced ProjectModal from 67.69 kB to 33.38 kB
- **Lazy Loading**: Components load only when needed
- **Optimized Images**: WebP format with aspect ratio maintenance

## 🚀 Revolutionary Project System

### ProjectCard.jsx - Problem Solver
**Issue**: Messy 3D flip animations causing hover/interaction conflicts  
**Solution**: Clean hover effects (lift -8px + scale 1.02) with tech stack previews  
**Result**: Professional, accessible cards with clear CTAs

### ProjectModal.jsx - Mobile Excellence
**Issue**: Poor mobile experience with desktop-oriented layout  
**Solution**: Mobile-first responsive design with adaptive sizing  
**Features**: Tabbed interface, stackable layouts, scrollable tabs, responsive text

### LiveDemoPreview.jsx - Adaptive Innovation
**Issue**: Desktop-only controls poor on mobile devices  
**Innovation**: Different control systems per device type  
**Desktop**: Floating overlay controls (compact, efficient)  
**Mobile**: Full-width control panel (touch-optimized)

## 📱 Mobile-First Approach

### Responsive Design Patterns
- **Breakpoint System**: `sm:` (640px), `md:` (768px), `lg:` (1024px), `xl:` (1280px)
- **Text Scaling**: `text-xs sm:text-sm`, `text-lg sm:text-2xl`
- **Layout Adaptation**: Stackable buttons, scrollable tabs, adaptive spacing
- **Touch Optimization**: Minimum 44px tap targets, proper gesture handling

### Real-Time Responsive Detection
```javascript
const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  const checkMobile = () => setIsMobile(window.innerWidth < 768);
  checkMobile();
  window.addEventListener("resize", checkMobile);
  return () => window.removeEventListener("resize", checkMobile);
}, []);
```

## 🔄 Import Strategy

### Clean Import Patterns
```javascript
// Unified component imports
import { Hero, Projects, Experience } from '../components';

// Organized constants
import { HERO_CONTENT, PROJECTS, SKILLS_DATA } from '../constants';

// Custom hooks
import { useTypingAnimation, useScrollAnimation } from '../hooks';
```

### Component Organization
- Each component in its own folder with index.jsx for re-exports
- Animations and utilities co-located with components
- Theme-aware styling functions in component files
- PropTypes validation for development quality

## ⚡ Performance Standards

### Bundle Management
- **Code Splitting**: Strategic component lazy loading
- **Tree Shaking**: Optimized imports and exports
- **Asset Optimization**: WebP images, proper compression
- **Memory Management**: Event listener cleanup, ref management

### Lighthouse Targets
- **Performance**: 100 (desktop), 89+ (mobile)
- **Accessibility**: 100 (both)
- **Best Practices**: 96+ (both)
- **SEO**: 100 (both)

## 🔧 Development Workflow

### Component Creation
1. Create folder in appropriate section (layout/sections/ui)
2. Follow naming conventions and structure patterns
3. Implement theme support and accessibility
4. Add PropTypes validation
5. Test across all themes and devices
6. Document any architectural decisions

### Code Quality Standards
- TypeScript-ready patterns
- Consistent error handling
- Proper semantic HTML
- Theme-aware styling
- Mobile-first responsive design
- Performance optimization

This architecture represents enterprise-grade organization while maintaining simplicity and developer experience.