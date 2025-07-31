import { lazy, Suspense, useEffect } from "react";
import { motion } from "framer-motion";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import { ScrollProgressBar } from "./components/ui/animations/ScrollAnimations/ScrollEffects";
import ErrorBoundary from "./components/ui/common/ErrorBoundary";
import useKeyboardShortcuts from "./hooks/useKeyboardShortcuts";
import { createSkipLink } from "./utils/accessibility";
import { ToastProvider } from "./components/ui/common/Toast";

const Navbar = lazy(() => import("./components/layout/Navbar"));
const Hero = lazy(() => import("./components/sections/Hero/Hero"));
const Projects = lazy(() => import("./components/sections/Projects"));
const Experience = lazy(() => import("./components/sections/Experience"));
const SkillsVisualization = lazy(() => import("./components/sections/Skills"));
const ReferenceSection = lazy(() => import("./components/sections/References"));
const PersonalBranding = lazy(() => import("./components/sections/PersonalBranding"));
const GitHubActivity = lazy(() => import("./components/sections/GitHubActivity"));
const Contact = lazy(() => import("./components/sections/Contact"));
const FloatingNavigation = lazy(() => import("./components/layout/FloatingNavigation"));

function AppContent() {
  const { currentTheme } = useTheme();
  
  // Enable keyboard shortcuts
  useKeyboardShortcuts();
  
  // Add skip link for accessibility
  useEffect(() => {
    const skipLink = createSkipLink();
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    return () => {
      if (skipLink.parentNode) {
        skipLink.parentNode.removeChild(skipLink);
      }
    };
  }, []);

  const getBackgroundGradient = () => {
    switch (currentTheme) {
      case 'neon':
        return 'bg-black bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(0,255,255,0.15),rgba(255,0,255,0.1))]';
      case 'minimal':
        return 'bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(0,0,0,0.05),rgba(255,255,255,0))]';
      case 'corporate':
        return 'bg-slate-50 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(59,130,246,0.1),rgba(255,255,255,0))]';
      default:
        return 'bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]';
    }
  };

  return (
    <div className={`overflow-x-hidden antialiased transition-colors duration-500 ${currentTheme === 'minimal' ? 'text-gray-700' : 'text-neutral-300'
      }`}>
      {/* Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* Enhanced Parallax Background */}
      {/* <ParallaxBackground /> */}

      {/* Theme-aware Animated Background */}
      <div className="fixed top-0 -z-20 h-full w-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`absolute top-0 h-screen w-screen transition-all duration-500 ${getBackgroundGradient()}`}
        >
          <div
            className={`absolute inset-0 ${currentTheme === 'minimal'
              ? 'bg-[url("./assets/grid.svg")] opacity-5'
              : 'bg-[url("./assets/grid.svg")] opacity-10'
              }`}
          />
        </motion.div>
      </div>

      <Navbar />

      <main id="main-content" className="container mx-auto px-4 md:px-8 pb-32 md:pb-24" tabIndex="-1">
        <ErrorBoundary sectionName="hero section">
          <section id="hero">
            <Hero />
          </section>
        </ErrorBoundary>

        <div className="space-y-8 md:space-y-8 [&>section]:scroll-m-20">
          <ErrorBoundary sectionName="experience section">
            <section id="experience">
              <Experience />
            </section>
          </ErrorBoundary>

          <ErrorBoundary sectionName="skills section">
            <section id="skills">
              <SkillsVisualization />
            </section>
          </ErrorBoundary>

          <ErrorBoundary sectionName="projects section">
            <section id="projects">
              <Projects />
            </section>
          </ErrorBoundary>

          <ErrorBoundary sectionName="references section">
            <section id="references">
              <ReferenceSection />
            </section>
          </ErrorBoundary>

          <ErrorBoundary sectionName="personal branding section">
            <section id="brand">
              <PersonalBranding />
            </section>
          </ErrorBoundary>

          <ErrorBoundary sectionName="GitHub activity section">
            <section id="github">
              <GitHubActivity />
            </section>
          </ErrorBoundary>

          <ErrorBoundary sectionName="contact section">
            <section id="contact">
              <Contact />
            </section>
          </ErrorBoundary>
        </div>
      </main>

      {/* Floating Navigation */}
      <FloatingNavigation />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <Suspense
          fallback={
            <div className="flex h-screen items-center justify-center bg-neutral-950">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="h-12 w-12 rounded-full border-4 border-t-purple-500 border-transparent"
              />
            </div>
          }
        >
          <AppContent />
        </Suspense>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;