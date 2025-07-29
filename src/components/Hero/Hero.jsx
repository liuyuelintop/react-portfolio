import { motion } from "framer-motion";
import { HERO_CONTENT } from "../../constants/constants";
import { useTypingAnimation } from "../../hooks/useTypingAnimation";
import { useTheme } from "../../contexts/ThemeContext";
import { HiDownload, HiMail, HiLocationMarker } from 'react-icons/hi';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { useCV } from '../../hooks/useCV';
import {
    containerVariants,
    itemVariants,
    titleVariants,
    floatingShapeVariants,
    floatingShapeVariantsReduced,
    cursorGlowVariants
} from "./animations";

export default function Hero() {
    const { currentTheme } = useTheme();
    const { cvUrl, isLoading } = useCV();
    const typedRole = useTypingAnimation(HERO_CONTENT.roles, 150, 100, 2000);

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const shapeVariants = prefersReducedMotion ? floatingShapeVariantsReduced : floatingShapeVariants;

    return (
        <section className="relative py-16 md:py-24 px-4 overflow-hidden">
            {/* Floating Geometric Shapes Background with Beautiful Animations */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Enhanced background glow with subtle scale animation */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl ${currentTheme === 'minimal'
                            ? 'bg-gradient-to-r from-blue-100/40 to-purple-100/40'
                            : 'bg-gradient-to-r from-purple-500/10 to-blue-500/10'
                        }`}
                />

                {/* Original floating geometric shapes */}
                <motion.div
                    variants={shapeVariants}
                    animate="animate"
                    className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-sm will-change-transform"
                />
                <motion.div
                    variants={shapeVariants}
                    animate="animate"
                    style={{ animationDelay: "2s" }}
                    className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-r from-blue-500/15 to-cyan-500/15 rotate-45 blur-sm will-change-transform"
                />
                <motion.div
                    variants={shapeVariants}
                    animate="animate"
                    style={{ animationDelay: "4s" }}
                    className="absolute bottom-20 left-1/4 w-12 h-12 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full blur-sm will-change-transform"
                />
                <motion.div
                    variants={shapeVariants}
                    animate="animate"
                    style={{ animationDelay: "6s" }}
                    className="absolute bottom-40 right-1/3 w-24 h-24 bg-gradient-to-r from-indigo-500/15 to-purple-500/15 rotate-12 blur-sm will-change-transform"
                />

                {/* Additional smaller floating elements */}
                <motion.div
                    variants={shapeVariants}
                    animate="animate"
                    style={{ animationDelay: "1s" }}
                    className="absolute top-32 left-1/3 w-8 h-8 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-sm will-change-transform"
                />
                <motion.div
                    variants={shapeVariants}
                    animate="animate"
                    style={{ animationDelay: "5s" }}
                    className="absolute bottom-32 right-1/4 w-6 h-6 bg-gradient-to-r from-purple-400/25 to-pink-400/25 rotate-45 blur-sm will-change-transform"
                />
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="grid lg:grid-cols-3 gap-12 items-center"
                >
                    {/* Main Content - Left Side */}
                    <div className="lg:col-span-2 space-y-8">
                        <motion.div variants={titleVariants} className="space-y-4">
                            <h1 className={`text-5xl md:text-7xl font-bold leading-tight bg-gradient-to-r bg-clip-text text-transparent ${currentTheme === 'minimal'
                                    ? 'from-gray-900 via-gray-700 to-gray-800'
                                    : 'from-white via-purple-200 to-blue-200'
                                }`}>
                                {HERO_CONTENT.name}
                            </h1>

                            <div className={`text-2xl md:text-3xl font-medium h-12 flex items-center ${currentTheme === 'minimal' ? 'text-gray-700' : 'text-purple-300'
                                }`}>
                                <span className="mr-3">{typedRole}</span>
                                <motion.span
                                    variants={cursorGlowVariants}
                                    animate="blink"
                                    className={`inline-block w-1 h-8 rounded-full ${currentTheme === 'minimal' ? 'bg-gray-600' : 'bg-purple-400'
                                        }`}
                                />
                            </div>
                        </motion.div>

                        <motion.p
                            variants={itemVariants}
                            className={`text-lg md:text-xl leading-relaxed ${currentTheme === 'minimal' ? 'text-gray-600' : 'text-neutral-300'
                                }`}
                        >
                            {HERO_CONTENT.summary}
                        </motion.p>

                        {/* Action Buttons */}
                        <motion.div
                            variants={itemVariants}
                            className="flex flex-wrap gap-4"
                        >
                            <motion.a
                                href={cvUrl}
                                className={`group flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${currentTheme === 'minimal'
                                        ? 'bg-gray-900 text-white hover:bg-gray-800 shadow-lg hover:shadow-xl'
                                        : 'bg-purple-600 text-white hover:bg-purple-700 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40'
                                    } ${isLoading ? 'cursor-progress opacity-75' : ''}`}
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <HiDownload className="text-xl transition-transform group-hover:scale-110" />
                                <span>Download CV</span>
                            </motion.a>

                            <motion.a
                                href="#contact"
                                className={`group flex items-center gap-3 px-6 py-3 rounded-xl font-semibold border-2 transition-all duration-300 ${currentTheme === 'minimal'
                                        ? 'border-gray-300 text-gray-700 hover:border-gray-900 hover:bg-gray-900 hover:text-white'
                                        : 'border-purple-400/50 text-purple-400 hover:border-purple-400 hover:bg-purple-400 hover:text-white'
                                    }`}
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <HiMail className="text-xl transition-transform group-hover:scale-110" />
                                <span>Get In Touch</span>
                            </motion.a>
                        </motion.div>
                    </div>

                    {/* Skills & Info Card - Right Side */}
                    <motion.div
                        variants={itemVariants}
                        className={`rounded-2xl p-8 border backdrop-blur-sm ${currentTheme === 'minimal'
                                ? 'bg-white/80 border-gray-200 shadow-xl shadow-gray-200/20'
                                : 'bg-neutral-800/80 border-neutral-700 shadow-xl shadow-black/20'
                            }`}
                    >
                        <h3 className={`text-xl font-bold mb-6 flex items-center gap-2 ${currentTheme === 'minimal' ? 'text-gray-900' : 'text-white'
                            }`}>
                            <span className="text-2xl">🚀</span>
                            Core Expertise
                        </h3>

                        <div className="space-y-3 mb-8">
                            {HERO_CONTENT.highlights.map((skill, index) => (
                                <motion.div
                                    key={skill}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                                    className={`group flex items-center gap-3 p-3 rounded-xl transition-all duration-300 cursor-pointer ${currentTheme === 'minimal'
                                            ? 'hover:bg-gray-100'
                                            : 'hover:bg-purple-400/10'
                                        }`}
                                    whileHover={{ x: 5 }}
                                >
                                    <div className={`w-2 h-2 rounded-full ${currentTheme === 'minimal' ? 'bg-gray-400' : 'bg-purple-400'
                                        }`} />
                                    <span className={`text-sm font-medium ${currentTheme === 'minimal' ? 'text-gray-700' : 'text-neutral-300'
                                        }`}>
                                        {skill}
                                    </span>
                                </motion.div>
                            ))}
                        </div>

                        {/* Quick Contact Info */}
                        <div className={`pt-6 border-t space-y-3 ${currentTheme === 'minimal' ? 'border-gray-200' : 'border-neutral-700'
                            }`}>
                            <div className={`flex items-center gap-3 text-sm ${currentTheme === 'minimal' ? 'text-gray-600' : 'text-neutral-400'
                                }`}>
                                <HiLocationMarker className="text-lg" />
                                <span>Melbourne, Australia</span>
                            </div>

                            <div className="flex items-center gap-4">
                                <motion.a
                                    href="https://linkedin.com/in/liuyuelintop"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`p-2 rounded-lg transition-all duration-300 ${currentTheme === 'minimal'
                                            ? 'text-gray-500 hover:text-blue-600 hover:bg-blue-50'
                                            : 'text-neutral-400 hover:text-blue-400 hover:bg-blue-400/10'
                                        }`}
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <FaLinkedin className="text-xl" />
                                </motion.a>

                                <motion.a
                                    href="https://github.com/liuyuelintop"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`p-2 rounded-lg transition-all duration-300 ${currentTheme === 'minimal'
                                            ? 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                                            : 'text-neutral-400 hover:text-white hover:bg-white/10'
                                        }`}
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <FaGithub className="text-xl" />
                                </motion.a>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}