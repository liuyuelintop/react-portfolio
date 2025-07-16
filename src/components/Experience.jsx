import { motion } from "framer-motion";
import { EXPERIENCES } from "../constants/experiences";

export default function Experience() {
    return (
        <section className="border-b border-neutral-900/50 pb-8 sm:pb-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="max-w-md sm:max-w-3xl mx-auto px-2 sm:px-6 lg:px-8"
            >
                <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent text-center py-6 sm:py-10"
                >
                    Professional Journey
                </motion.h2>

                <div className="grid gap-6 sm:gap-8 md:gap-12 relative">
                    {/* Timeline line (hide on mobile) */}
                    <div className="hidden sm:block absolute left-4 md:left-1/4 w-0.5 h-full bg-neutral-800/50" />

                    {EXPERIENCES.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 + 0.3 }}
                            className="relative pl-0 sm:pl-12 md:pl-16 group"
                        >
                            {/* Timeline dot (hide on mobile) */}
                            <div className="hidden sm:block absolute left-0 top-4 w-4 h-4 rounded-full bg-purple-400/80 border-2 border-purple-400 transform -translate-x-1/2" />

                            <div className="bg-neutral-900/50 rounded-xl p-4 sm:p-6 border border-neutral-800 shadow-lg hover:shadow-purple-900/20 transition-all">
                                <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-4 mb-2 sm:mb-4">
                                    <div className="space-y-1">
                                        <h3 className="text-lg sm:text-xl font-semibold text-white mb-0.5">
                                            {exp.role}
                                            {exp.type && (
                                                <span className="ml-1 sm:ml-2 text-purple-400 text-xs sm:text-sm font-medium">
                                                    ({exp.type})
                                                </span>
                                            )}
                                        </h3>
                                        <a
                                            href={exp.company.url}
                                            className="text-sm sm:text-md text-blue-400 hover:text-blue-300 transition-colors"
                                        >
                                            @{exp.company.name}
                                        </a>
                                    </div>
                                    <div className="text-xs sm:text-sm text-neutral-400 sm:text-right">
                                        {exp.period}
                                    </div>
                                </div>

                                <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                                    {exp.highlights.map((highlight, i) => (
                                        <li
                                            key={i}
                                            className="flex items-start text-neutral-300 text-base sm:text-lg leading-relaxed"
                                        >
                                            <span className="text-purple-400 mr-2 mt-1">▹</span>
                                            {highlight}
                                        </li>
                                    ))}
                                </ul>

                                {/* Tech Stack: limit visible categories/tags on mobile, show all on desktop */}
                                <div className="space-y-2 sm:space-y-3">
                                    {Object.entries(exp.techStack).map(([category, technologies]) => (
                                        <div
                                            key={category}
                                            className={`
                                                ${["frontend", "backend"].includes(category) ? "" : "hidden sm:block"}
                                                space-y-1
                                            `}
                                        >
                                            <span className="text-xs sm:text-sm font-semibold text-purple-400/80 uppercase tracking-wider">
                                                {category}
                                            </span>
                                            <div className="flex flex-wrap gap-1 sm:gap-2">
                                                {technologies.slice(0, 4).map((tech, techIndex) => (
                                                    <span
                                                        key={techIndex}
                                                        className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-neutral-800/50 text-purple-300 text-xs sm:text-sm font-medium backdrop-blur-sm hover:bg-purple-400/10 transition-colors"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                                {/* If more than 4, show "+N" badge on mobile */}
                                                {technologies.length > 4 && (
                                                    <span className="px-2 py-0.5 rounded-full bg-purple-800/40 text-purple-200 text-xs font-semibold sm:hidden">
                                                        +{technologies.length - 4}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
