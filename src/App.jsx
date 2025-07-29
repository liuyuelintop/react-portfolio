import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import { ScrollProgressBar } from "./components/ScrollAnimations/ScrollEffects";
import AnimatedSection from "./components/ScrollAnimations/AnimatedSection";

const Navbar = lazy(() => import("./components/Navbar"));
const Hero = lazy(() => import("./components/Hero"));
const Projects = lazy(() => import("./components/ProjectSection/Projects"));
const Experience = lazy(() => import("./components/Experience"));
const SkillsVisualization = lazy(() => import("./components/SkillsVisualization"));
const ReferenceSection = lazy(() => import("./components/ReferenceSection"));
const PersonalBranding = lazy(() => import("./components/PersonalBranding"));
const GitHubActivity = lazy(() => import("./components/GitHubActivity"));
const Contact = lazy(() => import("./components/Contact"));
const FloatingNavigation = lazy(() => import("./components/FloatingNavigation"));
const ThemeSwitcher = lazy(() => import("./components/ThemeSwitcher"));

function AppContent() {
  const { theme, currentTheme } = useTheme();

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

      <main className="container mx-auto px-4 md:px-8 pb-32 md:pb-24">
        <section id="hero">
          <Hero />
        </section>

        <div className="space-y-8 md:space-y-8 [&>section]:scroll-m-20">
          <section id="experience">
            <Experience />
          </section>

          <section id="skills">
            <SkillsVisualization />
          </section>

          <section id="projects">
            <Projects />
          </section>

          <section id="references">
            <ReferenceSection />
          </section>

          <section id="brand">
            <PersonalBranding />
          </section>

          <section id="github">
            <GitHubActivity />
          </section>

          <section id="contact">
            <Contact />
          </section>
        </div>
      </main>

      {/* Floating Navigation */}
      <FloatingNavigation />

      {/* Theme Switcher */}
      <ThemeSwitcher />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
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
    </ThemeProvider>
  );
}

export default App;