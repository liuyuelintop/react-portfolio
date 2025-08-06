import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUI } from '../../../contexts/UIContext';
import useMobile from '../../../hooks/useMobile';

const NAVIGATION_SECTIONS = [
  { id: 'hero', label: 'Hero', icon: '🏠' },
  { id: 'chatbot', label: 'AI Assistant', icon: '🤖' },
  { id: 'experience', label: 'Experience', icon: '💼' },
  { id: 'skills', label: 'Skills', icon: '📊' },
  { id: 'projects', label: 'Projects', icon: '🚀' },
  { id: 'references', label: 'References', icon: '⭐' },
  { id: 'brand', label: 'Brand', icon: '💎' },
  { id: 'github', label: 'GitHub', icon: '🐙' },
  { id: 'contact', label: 'Contact', icon: '📧' },
];

export default function FloatingNavigation() {
  const { isProjectModalOpen } = useUI();
  const isMobile = useMobile();
  const [activeSection, setActiveSection] = useState('me');
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const windowHeight = window.innerHeight;
          const documentHeight = document.documentElement.scrollHeight;

          // Show floating nav after scrolling past hero with smoother transition
          setIsVisible(scrollY > windowHeight * 0.2);

          // Calculate scroll progress with smoother calculation
          const progress = (scrollY / (documentHeight - windowHeight)) * 100;
          setScrollProgress(Math.min(100, Math.max(0, progress)));

          // Determine active section with improved detection
          const sections = NAVIGATION_SECTIONS.map(section => ({
            ...section,
            element: document.getElementById(section.id),
          })).filter(section => section.element);

          let mostVisibleSection = null;
          let maxVisibleHeight = 0;

          sections.forEach(section => {
            const rect = section.element.getBoundingClientRect();
            const visibleTop = Math.max(0, rect.top);
            const visibleBottom = Math.min(windowHeight, rect.bottom);
            const visibleHeight = Math.max(0, visibleBottom - visibleTop);

            // Check if this section is the most visible or near the top
            if (visibleHeight > maxVisibleHeight || (rect.top >= -50 && rect.top < 50)) {
              maxVisibleHeight = visibleHeight;
              mostVisibleSection = section;
            }
          });

          if (mostVisibleSection) {
            setActiveSection(mostVisibleSection.id);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const navVariants = {
    hidden: {
      y: 120,
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40,
        delay: 0.1,
      },
    },
    exit: {
      y: 120,
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const pillVariants = {
    inactive: {
      scale: 1,
      backgroundColor: 'rgba(23, 23, 33, 0.9)',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    active: {
      scale: 1.15,
      backgroundColor: 'rgba(126, 34, 206, 0.95)',
      boxShadow: '0 8px 25px rgba(147, 51, 234, 0.4), 0 4px 12px rgba(0, 0, 0, 0.3)',
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.08,
      backgroundColor: 'rgba(126, 34, 206, 0.8)',
      boxShadow: '0 6px 20px rgba(147, 51, 234, 0.3), 0 4px 12px rgba(0, 0, 0, 0.2)',
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
  };

  return (
    <AnimatePresence>
      {/* 桌面端布局 */}
      {!isMobile && isVisible && (
        <div className="fixed bottom-8 inset-x-0 z-40 flex justify-center px-4">
          <motion.nav
            key="desktop-nav"
            variants={navVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-auto max-w-[95vw] z-50"
            role="navigation"
            aria-label="Main navigation"
            style={{ willChange: 'transform' }}
          >

            {/* 进度条 */}
            <div className="mb-3 w-full bg-neutral-800/60 backdrop-blur-sm rounded-full h-2 overflow-hidden border border-neutral-700/30 shadow-lg">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 shadow-lg"
                style={{ width: `${scrollProgress}%` }}
                transition={{
                  duration: 0.1,
                  ease: "easeOut"
                }}
              />
              {/* Glow effect for progress bar */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-500/30 via-blue-500/30 to-cyan-500/30 blur-sm"
                style={{ width: `${scrollProgress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>

            {/* 导航按钮容器 */}
            <div className="flex items-center gap-2 bg-neutral-900/95 backdrop-blur-xl rounded-full px-4 py-3 border border-neutral-600/40 shadow-2xl relative">
              {/* 背景发光效果 */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-blue-500/5 rounded-full" />

              {NAVIGATION_SECTIONS.map((section) => (
                <motion.button
                  key={section.id}
                  variants={pillVariants}
                  animate={activeSection === section.id ? 'active' : 'inactive'}
                  whileHover={activeSection !== section.id ? "hover" : "active"}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => scrollToSection(section.id)}
                  className="relative flex items-center gap-2 px-4 py-2 rounded-full text-base font-medium text-white transition-all duration-300"
                  title={section.label}
                  aria-label={`Navigate to ${section.label} section`}
                  role="link"
                >
                  <span className={`text-lg transition-transform duration-200 ${activeSection === section.id ? 'scale-110' : ''}`}>
                    {section.icon}
                  </span>

                  {/* 标签显示优化 - 仅在空间允许时显示 */}
                  <AnimatePresence mode="wait">
                    {activeSection === section.id && (
                      <motion.span
                        initial={{ width: 0, opacity: 0, x: -10 }}
                        animate={{ width: 'auto', opacity: 1, x: 0 }}
                        exit={{ width: 0, opacity: 0, x: 10 }}
                        transition={{
                          duration: 0.3,
                          ease: "easeInOut"
                        }}
                        className="overflow-hidden whitespace-nowrap font-semibold"
                      >
                        {section.label}
                      </motion.span>
                    )}
                  </AnimatePresence>

                  {/* 活动指示器 */}
                  {activeSection === section.id && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full shadow-lg"
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 30,
                        duration: 0.3
                      }}
                    >
                      {/* 脉冲效果 */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full"
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.8, 0.4, 0.8],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>
          </motion.nav>
        </div>
      )}

      {/* 移动端布局 */}
      {isMobile && isVisible && !isProjectModalOpen && (
        <motion.nav
          key="mobile-nav"
          variants={navVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed z-50 bottom-4 left-4 right-4"
          role="navigation"
          aria-label="Main navigation"
        >
          {/* 进度条 */}
          <div className="mb-3 w-full bg-neutral-800/60 backdrop-blur-sm rounded-full h-2 overflow-hidden border border-neutral-700/30 shadow-lg">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 shadow-lg"
              style={{ width: `${scrollProgress}%` }}
              transition={{
                duration: 0.1,
                ease: "easeOut"
              }}
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-500/30 via-blue-500/30 to-cyan-500/30 blur-sm"
              style={{ width: `${scrollProgress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>

          {/* 紧凑型按钮容器 */}
          <div className="flex justify-between items-center gap-1 bg-neutral-900/95 backdrop-blur-xl rounded-full px-3 py-2 border border-neutral-600/40 shadow-2xl relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-blue-500/5 rounded-full" />

            {NAVIGATION_SECTIONS.map((section) => (
              <motion.button
                key={section.id}
                variants={pillVariants}
                animate={activeSection === section.id ? 'active' : 'inactive'}
                whileHover={activeSection !== section.id ? "hover" : "active"}
                whileTap={{ scale: 0.9 }}
                onClick={() => scrollToSection(section.id)}
                className="relative flex flex-col items-center px-2 py-1 rounded-full text-sm font-medium text-white"
              >
                <span className={`text-lg ${activeSection === section.id ? 'scale-110' : ''}`}>
                  {section.icon}
                </span>

                {activeSection === section.id && (
                  <motion.span
                    className="text-xs mt-1"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {section.label}
                  </motion.span>
                )}
              </motion.button>
            ))}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}