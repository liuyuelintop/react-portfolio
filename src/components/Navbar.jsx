import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { IoBookSharp } from 'react-icons/io5';
import { HiOutlineDocumentDownload } from 'react-icons/hi';
import { useCV } from '../hooks/useCV';

const NAV_ITEMS = [
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
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const buttonRef = useRef(null);
    // Click outside handler
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Check if click is outside both menu and button
            const isOutsideMenu = menuRef.current && !menuRef.current.contains(event.target);
            const isOutsideButton = buttonRef.current && !buttonRef.current.contains(event.target);

            if (isOpen && isOutsideMenu && isOutsideButton) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);
    // Fixed toggle function

    const toggleMenu = () => {
        setIsOpen(prev => !prev); // Direct state toggle
    };

    // Memoized CV content
    const cvContent = useMemo(() => {
        if (isLoading) return <span className="animate-pulse">Loading...</span>;
        if (error) return <span className="text-red-400" title={error}>Retry CV</span>;
        return (
            <>
                <HiOutlineDocumentDownload className="text-xl" />
                <span>CV</span>
            </>
        );
    }, [isLoading, error]);

    return (
        <nav className="fixed top-0 w-full bg-neutral-900/80 backdrop-blur-lg shadow-xl z-50 border-b border-neutral-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <span className="text-white text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                            Yuelin's Portfolio
                        </span>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-6">
                        {NAV_ITEMS.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                target={item.target}
                                rel="noopener noreferrer"
                                className="flex items-center space-x-2 text-neutral-300 hover:text-purple-400 transition-colors duration-200"
                            >
                                {item.icon}
                                <span className="text-sm font-medium">{item.label}</span>
                            </a>
                        ))}

                        {/* CV Download */}
                        <a
                            href={cvUrl}
                            onClick={(e) => {
                                if (isLoading || error) e.preventDefault();
                                if (error) retry();
                            }}
                            className={`flex items-center space-x-2 px-4 py-2 rounded-lg border border-purple-400/20 hover:border-purple-400/40 transition-all ${isLoading ? 'cursor-progress' : 'hover:bg-purple-400/10'
                                }`}
                        >
                            {cvContent}
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        ref={buttonRef}

                        aria-label="Toggle navigation menu"
                        aria-expanded={isOpen}
                        className="md:hidden p-2 rounded-lg text-neutral-300 hover:text-purple-400 hover:bg-purple-400/10 transition-colors"
                        onClick={toggleMenu} // Use direct toggle function
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
                            className="md:hidden py-4 space-y-4 bg-neutral-900/95 border-t border-neutral-800"
                        >
                            {NAV_ITEMS.map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    target={item.target}
                                    rel="noopener noreferrer"
                                    className="flex items-center space-x-3 px-4 py-2 text-neutral-300 hover:text-purple-400 hover:bg-purple-400/10 rounded-lg transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.icon}
                                    <span className="text-sm font-medium">{item.label}</span>
                                </a>
                            ))}

                            <a
                                href={cvUrl}
                                onClick={(e) => {
                                    if (isLoading || error) e.preventDefault();
                                    if (error) retry();
                                    setIsOpen(false);
                                }}
                                className={`flex items-center space-x-3 px-4 py-2 rounded-lg border border-purple-400/20 ${isLoading ? 'cursor-progress' : 'hover:border-purple-400/40 hover:bg-purple-400/10'
                                    }`}
                            >
                                {cvContent}
                            </a>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
}