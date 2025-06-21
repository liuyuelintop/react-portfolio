import { lazy, Suspense } from "react";
import { motion } from "framer-motion";

const Navbar = lazy(() => import("./components/Navbar"));
const Hero = lazy(() => import("./components/Hero"));
const Projects = lazy(() => import("./components/Projects"));
const Experience = lazy(() => import("./components/Experience"));
const ReferenceSection = lazy(() => import("./components/ReferenceSection"));
const Technologies = lazy(() => import("./components/Technologies"));
const Contact = lazy(() => import("./components/Contact"));

function App() {
  return (
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
      <div className="overflow-x-hidden text-neutral-300 antialiased selection:bg-cyan-300 selection:text-cyan-900">
        {/* Enhanced Animated Background */}
        <div className="fixed top-0 -z-10 h-full w-full">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute top-0 h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]"
          >
            <motion.div
              className="absolute inset-0 bg-[url('./assets/grid.svg')] opacity-10"
              animate={{ opacity: [0.1, 0.15, 0.1] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </motion.div>
        </div>

        <Navbar />

        <main className="container mx-auto px-4 md:px-8">
          <section id="hero">
            <Hero />
          </section>
          <div className="space-y-8 md:space-y-8 [&>section]:scroll-m-20">
            <section id="experience">
              <Experience />
            </section>

            <section id="references">
              <ReferenceSection />
            </section>

            <section id="projects">
              <Projects />
            </section>

            <section id="technologies">
              <Technologies />
            </section>

            <section id="contact">
              <Contact />
            </section>
          </div>
        </main>

      </div>
    </Suspense>
  );
}

export default App;