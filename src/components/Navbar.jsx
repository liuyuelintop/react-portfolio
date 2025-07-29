import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const SECTION_LINKS = [
    { label: 'Me', href: '#hero' },
    { label: 'Experience', href: '#experience' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'References', href: '#references' },
    { label: 'Brand', href: '#brand' },
    { label: 'GitHub', href: '#github' },
    { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
    const { currentTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');
    const menuRef = useRef(null);
    const buttonRef = useRef(null);

    // Handle click outside to close menu
    useEffect(() => {
        const handleClickOutside = (event) => {
            const isOutsideMenu = menuRef.current && !menuRef.current.contains(event.target);
            const isOutsideButton = buttonRef.current && !buttonRef.current.contains(event.target);
            if (isOpen && isOutsideMenu && isOutsideButton) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    // Track active section based on scroll position
    useEffect(() => {
        const handleScroll = () => {
            const sections = SECTION_LINKS.map(link => link.href.slice(1));
            const scrollPosition = window.scrollY + 100;

            for (let i = sections.length - 1; i >= 0; i--) {
                const element = document.getElementById(sections[i]);
                if (element && element.offsetTop <= scrollPosition) {
                    setActiveSection(sections[i]);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Set initial active section
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => setIsOpen(prev => !prev);

    return (
        <motion.nav 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={`fixed top-0 w-full backdrop-blur-xl shadow-xl z-50 border-b transition-all duration-500 ${
                currentTheme === 'minimal' 
                    ? 'bg-white/95 border-gray-200/50 shadow-gray-200/20' 
                    : 'bg-neutral-900/90 border-neutral-800/50 shadow-black/20'
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <motion.span 
                            className={`text-xl font-bold bg-gradient-to-r bg-clip-text text-transparent ${
                                currentTheme === 'minimal'
                                    ? 'from-gray-800 to-gray-600'
                                    : 'from-purple-400 to-blue-400'
                            }`}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                        >
                            Yuelin&apos;s Portfolio
                        </motion.span>
                    </div>

                    {/* Desktop Navigation - Centered */}
                    <div className="hidden md:flex items-center justify-center flex-1">
                        <div className="flex items-center space-x-2">
                            {SECTION_LINKS.map((item) => {
                                const isActive = activeSection === item.href.slice(1);
                                return (
                                    <motion.a
                                        key={item.label}
                                        href={item.href}
                                        className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                                            isActive
                                                ? currentTheme === 'minimal'
                                                    ? 'text-white bg-gray-900 shadow-lg'
                                                    : 'text-white bg-purple-600 shadow-lg shadow-purple-500/25'
                                                : currentTheme === 'minimal'
                                                    ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                                    : 'text-neutral-300 hover:text-purple-400 hover:bg-purple-400/10'
                                        }`}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {item.label}
                                        {isActive && (
                                            <motion.div
                                                layoutId="activeNavItem"
                                                className={`absolute inset-0 rounded-xl ${
                                                    currentTheme === 'minimal'
                                                        ? 'bg-gray-900 shadow-lg'
                                                        : 'bg-purple-600 shadow-lg shadow-purple-500/25'
                                                }`}
                                                style={{ zIndex: -1 }}
                                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                            />
                                        )}
                                    </motion.a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <motion.button
                        ref={buttonRef}
                        aria-label="Toggle navigation menu"
                        aria-expanded={isOpen}
                        className={`md:hidden p-3 rounded-xl transition-all duration-300 ${
                            currentTheme === 'minimal'
                                ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                : 'text-neutral-300 hover:text-purple-400 hover:bg-purple-400/10'
                        }`}
                        onClick={toggleMenu}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <motion.svg 
                            className="w-6 h-6" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                            animate={{ rotate: isOpen ? 45 : 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <motion.path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                animate={{
                                    d: isOpen 
                                        ? "M6 6l12 12M6 18L18 6" 
                                        : "M4 6h16M4 12h16M4 18h16"
                                }}
                                transition={{ duration: 0.3 }}
                            />
                        </motion.svg>
                    </motion.button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            ref={menuRef}
                            initial={{ opacity: 0, y: -10, backdropFilter: 'blur(0px)' }}
                            animate={{
                                opacity: 1,
                                y: 0,
                                backdropFilter: 'blur(12px)',
                                transition: {
                                    type: "tween",
                                    ease: [0.4, 0, 0.2, 1],
                                    duration: 0.18
                                }
                            }}
                            exit={{
                                opacity: 0,
                                y: -10,
                                backdropFilter: 'blur(0px)',
                                transition: {
                                    type: "tween",
                                    ease: [0.4, 0, 0.2, 1],
                                    duration: 0.15
                                }
                            }}
                            className={`md:hidden py-4 space-y-2 border-t transition-colors ${
                                currentTheme === 'minimal'
                                    ? 'bg-white/95 border-gray-200'
                                    : 'bg-neutral-900/95 border-neutral-800'
                            }`}
                        >
                            {SECTION_LINKS.map((item, index) => {
                                const isActive = activeSection === item.href.slice(1);
                                return (
                                    <motion.a
                                        key={item.label}
                                        href={item.href}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className={`flex items-center px-4 py-3 rounded-xl transition-all duration-300 text-base font-medium ${
                                            isActive
                                                ? currentTheme === 'minimal'
                                                    ? 'text-white bg-gray-900 shadow-lg'
                                                    : 'text-white bg-purple-600 shadow-lg shadow-purple-500/25'
                                                : currentTheme === 'minimal'
                                                    ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                                    : 'text-neutral-300 hover:text-purple-400 hover:bg-purple-400/10'
                                        }`}
                                        onClick={() => setIsOpen(false)}
                                        whileHover={{ x: 5 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <span className="mr-3 text-lg">
                                            {isActive ? '→' : '·'}
                                        </span>
                                        {item.label}
                                    </motion.a>
                                );
                            })}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    );
}