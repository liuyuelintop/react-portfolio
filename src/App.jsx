import { lazy, Suspense } from "react";

const Navbar = lazy(() => import("./components/Navbar"));
const Hero = lazy(() => import("./components/Hero"));
const Technologies = lazy(() => import("./components/Technologies"));
const Experience = lazy(() => import("./components/Experience"));
const Projects = lazy(() => import("./components/Projects"));
const Contact = lazy(() => import("./components/Contact"));

function App() {
  return (
    <Suspense fallback={<div className="text-center text-white">Loading...</div>}>
      {/* Global Wrapper */}
      <div className="overflow-x-hidden text-neutral-300 antialiased selection:bg-cyan-300 selection:text-cyan-900">

        {/* Background */}
        <div className="fixed top-0 -z-10 h-full w-full">
          <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
          </div>
        </div>

        {/* ✅ 将 Navbar 独立于 container 外部 */}
        <Navbar />

        {/* ✅ 主要内容区域 */}
        <div className="container mx-auto px-8 pt-20 md:pt-24">
          <Hero />
          <Technologies />
          <Experience />
          <Projects />
          <Contact />
        </div>
      </div>
    </Suspense>
  );
}

export default App;
