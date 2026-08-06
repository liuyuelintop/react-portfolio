"use client";

import { useEffect } from "react";
import { MotionConfig } from "framer-motion";
import { ThemeProvider } from "./contexts/ThemeContext";
import { UIProvider } from "./contexts/UIContext";
import ErrorBoundary from "./components/ui/common/ErrorBoundary";
import useKeyboardShortcuts from "./hooks/useKeyboardShortcuts";
import { createSkipLink } from "./utils/accessibility";
import { ToastProvider } from "./components/ui/common/Toast";
import Navbar from "./components/layout/Navbar/Navbar";
import Hero from "./components/sections/Hero/Hero";
import Projects from "./components/sections/Projects";
import Experience from "./components/sections/Experience/Experience";
import HowIBuild from "./components/sections/HowIBuild/HowIBuild";
import Contact from "./components/sections/Contact/Contact";

function AppContent() {
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

  return (
    <div className="overflow-x-hidden bg-neutral-950 text-neutral-300 antialiased">
      <Navbar />

      <main id="main-content" className="pb-24" tabIndex="-1">
        <ErrorBoundary sectionName="hero section">
          <section id="hero" className="scroll-mt-24">
            <Hero />
          </section>
        </ErrorBoundary>

        <ErrorBoundary sectionName="selected work section">
          <section id="projects" className="scroll-mt-24">
            <Projects />
          </section>
        </ErrorBoundary>

        <ErrorBoundary sectionName="experience section">
          <section id="experience" className="scroll-mt-24">
            <Experience />
          </section>
        </ErrorBoundary>

        <ErrorBoundary sectionName="how i build section">
          <section id="how-i-build" className="scroll-mt-24">
            <HowIBuild />
          </section>
        </ErrorBoundary>

        <ErrorBoundary sectionName="contact section">
          <section id="contact" className="scroll-mt-24">
            <Contact />
          </section>
        </ErrorBoundary>
      </main>
    </div>
  );
}

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ThemeProvider>
        <UIProvider>
          <ToastProvider>
            <AppContent />
          </ToastProvider>
        </UIProvider>
      </ThemeProvider>
    </MotionConfig>
  );
}

export default App;
