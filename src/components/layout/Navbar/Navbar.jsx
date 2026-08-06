import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONTACT } from '../../../constants/constants';
import { focusRingClasses } from '../../../utils/accessibility';

const SECTION_LINKS = [
    { label: 'Work', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'How I Build', href: '#how-i-build' },
    { label: 'Writing', href: CONTACT.socials.blog, external: true },
    { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('');
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
            const sections = SECTION_LINKS
                .filter(link => !link.external)
                .map(link => link.href.slice(1));
            const scrollPosition = window.scrollY + 100;
            let current = '';

            for (let i = sections.length - 1; i >= 0; i--) {
                const element = document.getElementById(sections[i]);
                if (element && element.offsetTop <= scrollPosition) {
                    current = sections[i];
                    break;
                }
            }

            setActiveSection(current);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Set initial active section
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => setIsOpen(prev => !prev);

    return (
        <nav className="fixed top-0 z-50 w-full border-b border-neutral-800 bg-neutral-950/90 backdrop-blur">
            <div className="mx-auto max-w-5xl px-4 md:px-8">
                <div className="flex h-16 items-center justify-between">
                    <a
                        href="#hero"
                        className={`text-base font-semibold text-white transition-colors hover:text-cyan-300 ${focusRingClasses}`}
                    >
                        Yuelin Liu
                    </a>

                    {/* Desktop Navigation */}
                    <div className="hidden items-center gap-1 lg:flex">
                        {SECTION_LINKS.map((item) => {
                            const isActive = !item.external && activeSection === item.href.slice(1);
                            return (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    target={item.external ? '_blank' : undefined}
                                    rel={item.external ? 'noopener noreferrer' : undefined}
                                    className={`px-3 py-2 text-sm font-medium transition-colors ${focusRingClasses} ${
                                        isActive ? 'text-white' : 'text-neutral-400 hover:text-white'
                                    }`}
                                    aria-current={isActive ? 'page' : undefined}
                                >
                                    {item.label}
                                </a>
                            );
                        })}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        ref={buttonRef}
                        aria-label="Toggle navigation menu"
                        aria-expanded={isOpen}
                        className={`p-3 text-neutral-300 transition-colors hover:text-white lg:hidden ${focusRingClasses}`}
                        onClick={toggleMenu}
                    >
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d={isOpen ? 'M6 6l12 12M6 18L18 6' : 'M4 6h16M4 12h16M4 18h16'}
                            />
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            ref={menuRef}
                            initial={{ opacity: 0, y: -8 }}
                            animate={{
                                opacity: 1,
                                y: 0,
                                transition: { type: 'tween', ease: [0.4, 0, 0.2, 1], duration: 0.18 },
                            }}
                            exit={{
                                opacity: 0,
                                y: -8,
                                transition: { type: 'tween', ease: [0.4, 0, 0.2, 1], duration: 0.15 },
                            }}
                            className="border-t border-neutral-800 py-3 lg:hidden"
                        >
                            {SECTION_LINKS.map((item) => {
                                const isActive = !item.external && activeSection === item.href.slice(1);
                                return (
                                    <a
                                        key={item.label}
                                        href={item.href}
                                        target={item.external ? '_blank' : undefined}
                                        rel={item.external ? 'noopener noreferrer' : undefined}
                                        className={`flex items-center px-4 py-3 text-base font-medium transition-colors ${focusRingClasses} ${
                                            isActive ? 'text-white' : 'text-neutral-400 hover:text-white'
                                        }`}
                                        onClick={() => setIsOpen(false)}
                                        aria-current={isActive ? 'page' : undefined}
                                    >
                                        {item.label}
                                    </a>
                                );
                            })}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
}
