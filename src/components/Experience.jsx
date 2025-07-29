import { motion } from "framer-motion";
import { EXPERIENCES } from "../constants/experiences";
import { useTheme } from "../contexts/ThemeContext";

export default function Experience() {
    const { currentTheme } = useTheme();
    
    return (
        <section className={`border-b pb-8 sm:pb-12 ${
            currentTheme === 'minimal' ? 'border-gray-200' : 'border-neutral-900/50'
        }`}>
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
                    className={`text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r bg-clip-text text-transparent text-center py-6 sm:py-10 ${
                        currentTheme === 'minimal'
                            ? 'from-gray-800 to-gray-600'
                            : 'from-purple-400 to-blue-400'
                    }`}
                >
                    Professional Journey
                </motion.h2>

                <div className="grid gap-6 sm:gap-8 md:gap-12 relative">
                    {/* Timeline line (hide on mobile) */}
                    <div className={`hidden sm:block absolute left-4 md:left-1/4 w-0.5 h-full ${
                        currentTheme === 'minimal' ? 'bg-gray-300' : 'bg-neutral-800/50'
                    }`} />

                    {EXPERIENCES.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 + 0.3 }}
                            className="relative pl-0 sm:pl-12 md:pl-16 group"
                        >
                            {/* Timeline dot (hide on mobile) */}
                            <div className={`hidden sm:block absolute left-0 top-4 w-4 h-4 rounded-full border-2 transform -translate-x-1/2 ${
                                currentTheme === 'minimal'
                                    ? 'bg-gray-400 border-gray-500'
                                    : 'bg-purple-400/80 border-purple-400'
                            }`} />

                            <div className={`rounded-xl p-4 sm:p-6 border shadow-lg transition-all ${
                                currentTheme === 'minimal'
                                    ? 'bg-white border-gray-200 hover:shadow-gray-200/50'
                                    : 'bg-neutral-900/50 border-neutral-800 hover:shadow-purple-900/20'
                            }`}>
                                <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-4 mb-2 sm:mb-4">
                                    <div className="space-y-1">
                                        <h3 className={`text-lg sm:text-xl font-semibold mb-0.5 ${
                                            currentTheme === 'minimal' ? 'text-gray-900' : 'text-white'
                                        }`}>
                                            {exp.role}
                                            {exp.type && (
                                                <span className={`ml-1 sm:ml-2 text-xs sm:text-sm font-medium ${
                                                    currentTheme === 'minimal' ? 'text-gray-600' : 'text-purple-400'
                                                }`}>
                                                    ({exp.type})
                                                </span>
                                            )}
                                        </h3>
                                        <a
                                            href={exp.company.url}
                                            className={`text-sm sm:text-md transition-colors ${
                                                currentTheme === 'minimal'
                                                    ? 'text-blue-600 hover:text-blue-700'
                                                    : 'text-blue-400 hover:text-blue-300'
                                            }`}
                                        >
                                            @{exp.company.name}
                                        </a>
                                    </div>
                                    <div className={`text-xs sm:text-sm sm:text-right ${
                                        currentTheme === 'minimal' ? 'text-gray-500' : 'text-neutral-400'
                                    }`}>
                                        {exp.period}
                                    </div>
                                </div>

                                <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                                    {exp.highlights.map((highlight, i) => (
                                        <li
                                            key={i}
                                            className={`flex items-start text-base sm:text-lg leading-relaxed ${
                                                currentTheme === 'minimal' ? 'text-gray-700' : 'text-neutral-300'
                                            }`}
                                        >
                                            <span className={`mr-2 mt-1 ${
                                                currentTheme === 'minimal' ? 'text-gray-600' : 'text-purple-400'
                                            }`}>▹</span>
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
                                            <span className={`text-xs sm:text-sm font-semibold uppercase tracking-wider ${
                                                currentTheme === 'minimal' ? 'text-gray-600' : 'text-purple-400/80'
                                            }`}>
                                                {category}
                                            </span>
                                            <div className="flex flex-wrap gap-1 sm:gap-2">
                                                {technologies.slice(0, 4).map((tech, techIndex) => (
                                                    <span
                                                        key={techIndex}
                                                        className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium backdrop-blur-sm transition-colors ${
                                                            currentTheme === 'minimal'
                                                                ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                                : 'bg-neutral-800/50 text-purple-300 hover:bg-purple-400/10'
                                                        }`}
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                                {/* If more than 4, show "+N" badge on mobile */}
                                                {technologies.length > 4 && (
                                                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold sm:hidden ${
                                                        currentTheme === 'minimal'
                                                            ? 'bg-gray-200 text-gray-600'
                                                            : 'bg-purple-800/40 text-purple-200'
                                                    }`}>
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
