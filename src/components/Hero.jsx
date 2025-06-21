import { motion } from "framer-motion";
import { HERO_CONTENT } from "../constants/constants";


const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 120,
            damping: 20
        }
    }
};

export default function Hero() {
    return (
        <section className="mt-8 relative py-16 md:py-24 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="flex flex-col items-center gap-12"
                >
                    {/* Content Section */}
                    <div className="flex-1 space-y-6 w-full max-w-3xl">
                        <motion.h1
                            variants={itemVariants}
                            className="text-3xl md:text-5xl text-white font-bold drop-shadow-[0_4px_12px_rgba(255,255,255,0.25)] text-center"
                        >
                            Yuelin Liu
                        </motion.h1>

                        <motion.div variants={itemVariants} className="space-y-8">
                            <div className="space-y-4">
                                <h2 className="text-xl md:text-2xl text-purple-300 font-medium text-center">
                                    Full Stack Developer
                                </h2>

                                <p className="text-lg text-neutral-300 leading-relaxed max-w-2xl mx-auto text-center">
                                    {HERO_CONTENT.summary}
                                </p>
                            </div>

                            {/* Skills Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {HERO_CONTENT.highlights.map((skill, index) => (
                                    <motion.div
                                        key={skill}
                                        variants={itemVariants}
                                        className="group px-4 py-2 rounded-lg bg-neutral-800/60 border border-purple-700/30 hover:border-purple-400/60 shadow-sm hover:shadow-md transition-all duration-200"
                                    >
                                        <span className="text-purple-300 text-sm md:text-base font-medium group-hover:text-purple-400 text-center block">
                                            {skill}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>


                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}