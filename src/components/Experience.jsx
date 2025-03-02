import { EXPERIENCES } from "../constants/experiences";
import { motion } from "framer-motion";

export default function Experience() {
    return (
        <section className="border-b border-neutral-900 pb-12 lg:pb-24">
            <motion.h2
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: -100 }}
                transition={{ duration: 0.5 }}
                className="my-10 text-center text-3xl sm:text-4xl"
            >
                Experience
            </motion.h2>

            <div className="grid gap-10 md:gap-12">
                {EXPERIENCES.map((experience, index) => (
                    <motion.div
                        key={index}
                        whileInView={{ opacity: 1, y: 0 }}
                        initial={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.8 }}
                        className="grid md:grid-cols-4 gap-4 items-start px-4"
                    >
                        {/* 年份部分 */}
                        <div className="md:col-span-1 text-center md:text-left text-neutral-400 text-sm">
                            {experience.year}
                        </div>

                        {/* 详情部分 */}
                        <div className="md:col-span-3 space-y-3">
                            <h6 className="text-lg sm:text-xl font-semibold text-white">
                                {experience.role} -{" "}
                                <span className="text-purple-300">{experience.company}</span>
                            </h6>
                            <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
                                {experience.description}
                            </p>

                            {/* 技术标签 */}
                            <div className="flex flex-wrap gap-2">
                                {experience.technologies.map((tech, index) => (
                                    <span
                                        key={index}
                                        className="rounded bg-neutral-900 px-3 py-1 text-xs sm:text-sm font-medium text-purple-800"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
