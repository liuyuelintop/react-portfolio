import { motion } from "framer-motion";
import { HERO_CONTENT } from "../constants/constants";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 120, damping: 20 },
    },
};

export default function Hero() {
    return (
        <section className="mt-8 relative py-12 sm:py-20 px-4">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="flex flex-col items-center gap-8"
                >
                    {/* Content Section */}
                    <div className="w-full space-y-6">
                        <motion.h1
                            variants={itemVariants}
                            className="text-3xl md:text-5xl text-white font-bold text-center"
                        >
                            Yuelin Liu
                        </motion.h1>

                        <motion.div variants={itemVariants}>
                            <h2 className="text-lg md:text-xl text-purple-300 font-medium text-center mb-3">
                                Full Stack Developer
                            </h2>
                            <p className="text-lg md:text-xl text-neutral-300 leading-relaxed max-w-2xl mx-auto text-center mb-2">
                                {HERO_CONTENT.summary}
                            </p>
                        </motion.div>

                        {/* Skills Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-2xl mx-auto">
                            {HERO_CONTENT.highlights.map((skill, index) => (
                                <motion.div
                                    key={skill}
                                    variants={itemVariants}
                                    className="group px-4 py-2 rounded-md bg-neutral-800/60 border border-purple-700/30 hover:border-purple-400/60 shadow-sm hover:shadow-md transition-all duration-200 text-center"
                                >
                                    <span className="text-purple-300 text-sm md:text-base font-medium group-hover:text-purple-400">
                                        {skill}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
