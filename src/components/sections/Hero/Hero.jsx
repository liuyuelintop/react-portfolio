import { motion } from "framer-motion";
import { HERO_CONTENT } from "../../../constants/constants";
import { useTypingAnimation } from "../../../hooks/useTypingAnimation";
import { useTheme } from "../../../contexts/ThemeContext";
import { HiDownload, HiMail, HiLocationMarker } from 'react-icons/hi';
import { FaLinkedin, FaGithub, FaBlog } from 'react-icons/fa';
import { useCV } from '../../../hooks/useCV';
import Button from '../../ui/common/Button';
import {
    containerVariants,
    itemVariants,
    titleVariants,
    cursorGlowVariants
} from "./animations";

export default function Hero() {
    const { currentTheme } = useTheme();
    const { cvUrl, isLoading } = useCV();
    const typedRole = useTypingAnimation(HERO_CONTENT.roles, 150, 100, 2000);

    return (
        <section className="relative py-16 md:py-24 px-4 overflow-hidden">
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
                            <p className={`text-sm font-semibold uppercase tracking-[0.18em] ${currentTheme === 'minimal' ? 'text-gray-500' : 'text-cyan-300'
                                }`}>
                                Melbourne Full-Stack Software Engineer
                            </p>
                            <h1 className={`text-5xl md:text-7xl font-bold leading-tight bg-gradient-to-r bg-clip-text text-transparent ${currentTheme === 'minimal'
                                ? 'from-gray-900 via-gray-700 to-gray-800'
                                : 'from-white via-cyan-100 to-blue-200'
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
                            <Button
                                as="a"
                                href={cvUrl}
                                variant="primary"
                                size="lg"
                                loading={isLoading}
                                className="group"
                            >
                                <HiDownload className="text-xl transition-transform group-hover:scale-110" />
                                <span>Download Resume</span>
                            </Button>

                            <Button
                                as="a"
                                href="#contact"
                                variant="secondary"
                                size="lg"
                                className="group"
                            >
                                <HiMail className="text-xl transition-transform group-hover:scale-110" />
                                <span>Discuss a Role</span>
                            </Button>
                        </motion.div>
                    </div>

                    {/* Recruiter Snapshot - Right Side */}
                    <motion.div
                        variants={itemVariants}
                        className={`rounded-lg p-6 md:p-7 border backdrop-blur-sm ${currentTheme === 'minimal'
                            ? 'bg-white/80 border-gray-200 shadow-xl shadow-gray-200/20'
                            : 'bg-neutral-800/80 border-neutral-700 shadow-xl shadow-black/20'
                            }`}
                    >
                        <h3 className={`text-xl font-bold mb-6 flex items-center gap-2 ${currentTheme === 'minimal' ? 'text-gray-900' : 'text-white'
                            }`}>
                            Recruiter Snapshot
                        </h3>

                        <div className="space-y-4 mb-7">
                            {HERO_CONTENT.interviewSignals.map((signal, index) => (
                                <motion.div
                                    key={signal.label}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.45 + index * 0.1, duration: 0.5 }}
                                    className={`rounded-lg border p-3 ${currentTheme === 'minimal'
                                        ? 'bg-gray-50 border-gray-200'
                                        : 'bg-neutral-950/40 border-neutral-700/70'
                                        }`}
                                >
                                    <p className={`text-xs font-semibold uppercase tracking-[0.16em] ${currentTheme === 'minimal' ? 'text-gray-500' : 'text-neutral-500'
                                        }`}>
                                        {signal.label}
                                    </p>
                                    <p className={`mt-2 text-sm leading-relaxed ${currentTheme === 'minimal' ? 'text-gray-800' : 'text-neutral-200'
                                        }`}>
                                        {signal.value}
                                    </p>
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

                                <motion.a
                                    href="https://blog.liuyuelin.dev/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`p-2 rounded-lg transition-all duration-300 ${currentTheme === 'minimal'
                                        ? 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                                        : 'text-neutral-400 hover:text-white hover:bg-white/10'
                                        }`}
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <FaBlog className="text-xl" />
                                </motion.a>


                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
