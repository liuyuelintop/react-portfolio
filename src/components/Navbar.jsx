import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { IoBookSharp } from 'react-icons/io5';
import { HiOutlineDocumentDownload } from 'react-icons/hi';
import { useCV } from '../hooks/useCV';
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

const EXTERNAL_LINKS = [
    {
        label: 'LinkedIn',
        icon: <FaLinkedin className="text-xl" />,
        href: 'https://www.linkedin.com/in/liuyuelintop',
        target: '_blank'
    },
    {
        label: 'GitHub',
        icon: <FaGithub className="text-xl" />,
        href: 'https://github.com/liuyuelintop',
        target: '_blank'
    },
    {
        label: 'Blog',
        icon: <IoBookSharp className="text-xl" />,
        href: 'https://blog.liuyuelin.dev/',
        target: '_blank'
    }
];

export default function Navbar() {
    const { cvUrl, isLoading, error, retry } = useCV();
    const { currentTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const buttonRef = useRef(null);

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

    const toggleMenu = () => setIsOpen(prev => !prev);

    const cvContent = useMemo(() => {
        if (isLoading) return <span className="animate-pulse">Loading...</span>;
        if (error) return <span className="text-red-400" title={error}>Retry CV</span>;
        return (
            <>
                <HiOutlineDocumentDownload className="text-xl" />
                <span className="hidden sm:inline">CV</span>
            </>
        );
    }, [isLoading, error]);

    return (
        <nav className={`fixed top-0 w-full backdrop-blur-lg shadow-xl z-50 border-b transition-colors duration-300 ${
            currentTheme === 'minimal' 
                ? 'bg-white/90 border-gray-200' 
                : 'bg-neutral-900/80 border-neutral-800'
        }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <span className={`text-xl font-bold bg-gradient-to-r bg-clip-text text-transparent ${
                            currentTheme === 'minimal'
                                ? 'from-gray-800 to-gray-600'
                                : 'from-purple-400 to-blue-400'
                        }`}>
                            Yuelin's Portfolio
                        </span>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-6">
                        {SECTION_LINKS.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                className={`transition-colors duration-200 text-sm font-medium ${
                                    currentTheme === 'minimal'
                                        ? 'text-gray-600 hover:text-gray-900'
                                        : 'text-neutral-300 hover:text-purple-400'
                                }`}
                            >
                                {item.label}
                            </a>
                        ))}
                        <a
                            href={cvUrl}
                            onClick={(e) => {
                                if (isLoading || error) e.preventDefault();
                                if (error) retry();
                            }}
                            className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all ${
                                currentTheme === 'minimal'
                                    ? `border-gray-300 hover:border-gray-400 ${isLoading ? 'cursor-progress' : 'hover:bg-gray-50'}`
                                    : `border-purple-400/20 hover:border-purple-400/40 ${isLoading ? 'cursor-progress' : 'hover:bg-purple-400/10'}`
                            }`}
                        >
                            {cvContent}
                        </a>
                        {/* External icons */}
                        <div className="flex items-center space-x-3 ml-2">
                            {EXTERNAL_LINKS.map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    target={item.target}
                                    rel="noopener noreferrer"
                                    className={`transition-colors ${
                                        currentTheme === 'minimal'
                                            ? 'text-gray-500 hover:text-gray-700'
                                            : 'text-neutral-400 hover:text-purple-400'
                                    }`}
                                    aria-label={item.label}
                                >
                                    {item.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        ref={buttonRef}
                        aria-label="Toggle navigation menu"
                        aria-expanded={isOpen}
                        className={`md:hidden p-2 rounded-lg transition-colors ${
                            currentTheme === 'minimal'
                                ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                : 'text-neutral-300 hover:text-purple-400 hover:bg-purple-400/10'
                        }`}
                        onClick={toggleMenu}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
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
                            {SECTION_LINKS.map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    className={`block px-4 py-2 rounded-lg transition-colors text-base font-medium ${
                                        currentTheme === 'minimal'
                                            ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                            : 'text-neutral-300 hover:text-purple-400 hover:bg-purple-400/10'
                                    }`}
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.label}
                                </a>
                            ))}
                            <a
                                href={cvUrl}
                                onClick={(e) => {
                                    if (isLoading || error) e.preventDefault();
                                    if (error) retry();
                                    setIsOpen(false);
                                }}
                                className={`flex items-center space-x-2 px-4 py-2 rounded-lg border mt-2 transition-all ${
                                    currentTheme === 'minimal'
                                        ? `border-gray-300 ${isLoading ? 'cursor-progress' : 'hover:border-gray-400 hover:bg-gray-50'}`
                                        : `border-purple-400/20 ${isLoading ? 'cursor-progress' : 'hover:border-purple-400/40 hover:bg-purple-400/10'}`
                                }`}
                            >
                                {cvContent}
                            </a>
                            {/* External icons row */}
                            <div className={`flex items-center space-x-6 px-4 pt-4 border-t ${
                                currentTheme === 'minimal' ? 'border-gray-200' : 'border-neutral-800'
                            }`}>
                                {EXTERNAL_LINKS.map((item) => (
                                    <a
                                        key={item.label}
                                        href={item.href}
                                        target={item.target}
                                        rel="noopener noreferrer"
                                        className={`transition-colors text-2xl ${
                                            currentTheme === 'minimal'
                                                ? 'text-gray-500 hover:text-gray-700'
                                                : 'text-neutral-400 hover:text-purple-400'
                                        }`}
                                        aria-label={item.label}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {item.icon}
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
}