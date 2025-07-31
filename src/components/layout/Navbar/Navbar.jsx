import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';
import { getThemeFocusRing } from '../../../utils/accessibility';
import { useToast } from '../../ui/common/Toast';

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
    const { currentTheme, themes, switchTheme, isTransitioning } = useTheme();
    const { toast } = useToast();
    const [isOpen, setIsOpen] = useState(false);
    const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');
    const menuRef = useRef(null);
    const buttonRef = useRef(null);
    const themeMenuRef = useRef(null);
    const themeButtonRef = useRef(null);

    // Handle click outside to close menus
    useEffect(() => {
        const handleClickOutside = (event) => {
            const isOutsideMenu = menuRef.current && !menuRef.current.contains(event.target);
            const isOutsideButton = buttonRef.current && !buttonRef.current.contains(event.target);
            const isOutsideThemeMenu = themeMenuRef.current && !themeMenuRef.current.contains(event.target);
            const isOutsideThemeButton = themeButtonRef.current && !themeButtonRef.current.contains(event.target);
            
            if (isOpen && isOutsideMenu && isOutsideButton) {
                setIsOpen(false);
            }
            if (isThemeMenuOpen && isOutsideThemeMenu && isOutsideThemeButton) {
                setIsThemeMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen, isThemeMenuOpen]);

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
    const toggleThemeMenu = () => setIsThemeMenuOpen(prev => !prev);
    
    const currentThemeData = themes[currentTheme];

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
                                        className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${getThemeFocusRing(currentTheme)} ${
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
                                        aria-current={isActive ? 'page' : undefined}
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

                    {/* Theme Switcher */}
                    <div className="relative flex-shrink-0">
                        <motion.button
                            ref={themeButtonRef}
                            onClick={toggleThemeMenu}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`
                                relative w-10 h-10 rounded-full backdrop-blur-md border shadow-lg mr-2
                                transition-all duration-300 overflow-hidden group
                                ${currentTheme === 'minimal'
                                    ? 'bg-white/90 border-gray-200 text-gray-700'
                                    : 'bg-neutral-900/90 border-neutral-700/50 text-white'
                                }
                                ${isTransitioning ? 'animate-pulse' : ''}
                            `}
                            title={`Current theme: ${currentThemeData.name}`}
                        >
                            {/* Background glow effect */}
                            <div className={`
                                absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300
                                ${currentTheme === 'neon'
                                    ? 'bg-gradient-to-r from-cyan-400/20 to-pink-500/20'
                                    : currentTheme === 'minimal'
                                        ? 'bg-gradient-to-r from-gray-400/20 to-gray-600/20'
                                        : 'bg-gradient-to-r from-purple-500/20 to-blue-500/20'
                                }
                            `} />

                            {/* Theme icon */}
                            <span className="relative z-10 text-lg">
                                {currentThemeData.icon}
                            </span>

                            {/* Indicator dot */}
                            <div className={`
                                absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full border-2
                                ${currentTheme === 'minimal' ? 'border-white' : 'border-neutral-900'}
                                ${currentTheme === 'neon'
                                    ? 'bg-cyan-400'
                                    : currentTheme === 'minimal'
                                        ? 'bg-gray-600'
                                        : currentTheme === 'corporate'
                                            ? 'bg-blue-600'
                                            : 'bg-purple-500'
                                }
                            `} />
                        </motion.button>

                        {/* Theme Options Dropdown */}
                        <AnimatePresence>
                            {isThemeMenuOpen && (
                                <motion.div
                                    ref={themeMenuRef}
                                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.8, y: 20 }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                    className={`
                                        absolute top-14 right-0 min-w-48 rounded-xl backdrop-blur-xl border shadow-2xl overflow-hidden z-50
                                        ${currentTheme === 'minimal'
                                            ? 'bg-white/95 border-gray-200'
                                            : 'bg-neutral-900/95 border-neutral-700/50'
                                        }
                                    `}
                                >
                                    {/* Header */}
                                    <div className={`
                                        px-4 py-3 border-b
                                        ${currentTheme === 'minimal'
                                            ? 'border-gray-200 text-gray-700'
                                            : 'border-neutral-700/50 text-white'
                                        }
                                    `}>
                                        <h3 className="font-semibold text-sm">Choose Theme</h3>
                                    </div>

                                    {/* Theme Options */}
                                    <div className="p-2 space-y-1">
                                        {Object.entries(themes).map(([key, theme]) => (
                                            <motion.button
                                                key={key}
                                                onClick={() => {
                                                    const previousTheme = currentTheme;
                                                    switchTheme(key);
                                                    setIsThemeMenuOpen(false);
                                                    
                                                    // Show toast notification
                                                    if (key !== previousTheme) {
                                                        toast.success(`Switched to ${themes[key].name} theme`, {
                                                            duration: 2000
                                                        });
                                                    }
                                                }}
                                                whileHover={{ x: 4 }}
                                                whileTap={{ scale: 0.98 }}
                                                className={`
                                                    w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left
                                                    transition-all duration-200 group
                                                    ${key === currentTheme
                                                        ? currentTheme === 'minimal'
                                                            ? 'bg-gray-100 text-gray-900'
                                                            : 'bg-neutral-800 text-white'
                                                        : currentTheme === 'minimal'
                                                            ? 'hover:bg-gray-50 text-gray-700'
                                                            : 'hover:bg-neutral-800/50 text-neutral-300'
                                                    }
                                                `}
                                            >
                                                {/* Theme icon */}
                                                <span className="text-lg">{theme.icon}</span>

                                                {/* Theme info */}
                                                <div className="flex-1">
                                                    <div className="font-medium text-sm">{theme.name}</div>
                                                    <div className={`
                                                        text-xs opacity-75
                                                        ${currentTheme === 'minimal' ? 'text-gray-500' : 'text-neutral-400'}
                                                    `}>
                                                        {key === 'default' && 'Purple & Blue gradient'}
                                                        {key === 'neon' && 'Cyberpunk vibes'}
                                                        {key === 'minimal' && 'Clean & professional'}
                                                        {key === 'corporate' && 'Business ready'}
                                                    </div>
                                                </div>

                                                {/* Active indicator */}
                                                {key === currentTheme && (
                                                    <motion.div
                                                        layoutId="activeTheme"
                                                        className={`
                                                            w-2 h-2 rounded-full
                                                            ${currentTheme === 'neon'
                                                                ? 'bg-cyan-400'
                                                                : currentTheme === 'minimal'
                                                                    ? 'bg-gray-600'
                                                                    : currentTheme === 'corporate'
                                                                        ? 'bg-blue-600'
                                                                        : 'bg-purple-500'
                                                            }
                                                        `}
                                                        transition={{
                                                            type: 'spring',
                                                            stiffness: 300,
                                                            damping: 30,
                                                        }}
                                                    />
                                                )}
                                            </motion.button>
                                        ))}
                                    </div>

                                    {/* Footer tip */}
                                    <div className={`
                                        px-4 py-3 border-t text-xs
                                        ${currentTheme === 'minimal'
                                            ? 'border-gray-200 text-gray-500'
                                            : 'border-neutral-700/50 text-neutral-400'
                                        }
                                    `}>
                                        💡 Theme saved locally
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
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