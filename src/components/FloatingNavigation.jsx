import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAVIGATION_SECTIONS = [
  { id: 'hero', label: 'Hero', icon: '🏠' },
  { id: 'experience', label: 'Experience', icon: '💼' },
  { id: 'references', label: 'References', icon: '⭐' },
  { id: 'projects', label: 'Projects', icon: '🚀' },
  { id: 'technologies', label: 'Tech', icon: '⚡' },
  { id: 'contact', label: 'Contact', icon: '📧' },
];

export default function FloatingNavigation() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Show floating nav after scrolling past hero
      setIsVisible(scrollY > windowHeight * 0.3);
      
      // Calculate scroll progress
      const progress = (scrollY / (documentHeight - windowHeight)) * 100;
      setScrollProgress(Math.min(100, Math.max(0, progress)));

      // Determine active section
      const sections = NAVIGATION_SECTIONS.map(section => ({
        ...section,
        element: document.getElementById(section.id),
      })).filter(section => section.element);

      const currentSection = sections.find(section => {
        const rect = section.element.getBoundingClientRect();
        return rect.top <= windowHeight * 0.3 && rect.bottom >= windowHeight * 0.3;
      });

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
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
      y: 100, 
      opacity: 0,
      scale: 0.8,
    },
    visible: { 
      y: 0, 
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      y: 100,
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2,
      },
    },
  };

  const pillVariants = {
    inactive: {
      scale: 1,
      backgroundColor: 'rgba(63, 63, 70, 0.8)',
    },
    active: {
      scale: 1.1,
      backgroundColor: 'rgba(147, 51, 234, 0.9)',
    },
    hover: {
      scale: 1.05,
      backgroundColor: 'rgba(147, 51, 234, 0.7)',
    },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          variants={navVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50"
        >
          {/* Progress Bar */}
          <div className="mb-2 w-full bg-neutral-700/50 rounded-full h-1 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
              style={{ width: `${scrollProgress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          
          {/* Navigation Pills */}
          <div className="flex items-center gap-2 bg-neutral-900/90 backdrop-blur-md rounded-full px-4 py-3 border border-neutral-700/50 shadow-2xl">
            {NAVIGATION_SECTIONS.map((section) => (
              <motion.button
                key={section.id}
                variants={pillVariants}
                animate={activeSection === section.id ? 'active' : 'inactive'}
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection(section.id)}
                className="relative flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
                title={section.label}
              >
                <span className="text-base">{section.icon}</span>
                
                {/* Label appears on hover or when active */}
                <AnimatePresence>
                  {activeSection === section.id && (
                    <motion.span
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: 'auto', opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden whitespace-nowrap"
                    >
                      {section.label}
                    </motion.span>
                  )}
                </AnimatePresence>
                
                {/* Active indicator dot */}
                {activeSection === section.id && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}