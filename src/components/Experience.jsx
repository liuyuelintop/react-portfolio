import { motion } from "framer-motion";
import { EXPERIENCES } from "../constants/experiences";

export default function Experience() {
    return (
        <section className="border-b border-neutral-900/50 pb-12 lg:pb-24">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
            >
                <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent text-center py-12"
                >
                    Professional Journey
                </motion.h2>

                <div className="grid gap-8 md:gap-12 relative">
                    {/* Timeline line */}
                    <div className="absolute left-4 md:left-1/4 w-0.5 h-full bg-neutral-800/50" />

                    {EXPERIENCES.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 + 0.3 }}
                            className="relative pl-12 md:pl-16 group"
                        >
                            {/* Timeline dot */}
                            <div className="absolute left-0 top-4 w-4 h-4 rounded-full bg-purple-400/80 border-2 border-purple-400 transform -translate-x-1/2" />

                            <div className="bg-neutral-900/50 rounded-xl p-6 border border-neutral-800 shadow-lg hover:shadow-purple-900/20 transition-all">
                                <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
                                    <div className="space-y-1">
                                        <h3 className="text-xl font-semibold text-white mb-1">
                                            {exp.role}
                                            {exp.type && (
                                                <span className="ml-2 text-purple-400 text-sm font-medium">
                                                    ({exp.type})
                                                </span>
                                            )}
                                        </h3>
                                        <a
                                            href={exp.company.url}
                                            className="text-md text-blue-400 hover:text-blue-300 transition-colors"
                                        >
                                            @{exp.company.name}
                                        </a>
                                    </div>
                                    <div className="text-sm text-neutral-400 md:text-right">
                                        {exp.period}
                                    </div>
                                </div>

                                <ul className="space-y-3 mb-6">
                                    {exp.highlights.map((highlight, i) => (
                                        <li
                                            key={i}
                                            className="flex items-start text-neutral-300 leading-relaxed"
                                        >
                                            <span className="text-purple-400 mr-2 mt-1">▹</span>
                                            {highlight}
                                        </li>
                                    ))}
                                </ul>

                                <div className="space-y-3">
                                    {Object.entries(exp.techStack).map(([category, technologies]) => (
                                        <div key={category} className="space-y-2">
                                            <span className="text-sm font-semibold text-purple-400/80 uppercase tracking-wider">
                                                {category}
                                            </span>
                                            <div className="flex flex-wrap gap-2">
                                                {technologies.map((tech, techIndex) => (
                                                    <span
                                                        key={techIndex}
                                                        className="px-3 py-1 rounded-full bg-neutral-800/50 text-purple-300 text-md font-medium backdrop-blur-sm hover:bg-purple-400/10 transition-colors"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
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