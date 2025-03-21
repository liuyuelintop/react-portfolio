import { motion } from "framer-motion";
import { TECH_STACK } from "../constants/technologies"; // New data structure

export default function Technologies() {
    return (
        <section className="border-b border-neutral-900/50 py-24 px-8 ">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="max-w-7xl mx-auto"
            >
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent text-center mb-12">
                    Tech Stack
                </h2>

                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 px-4">
                    {TECH_STACK.map((tech, index) => (
                        <motion.div
                            key={tech.name}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            whileHover={{ y: -6 }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 20,
                                delay: index * 0.03
                            }}
                            className="group relative flex justify-center"
                        >
                            <div className="absolute inset-0 bg-purple-400/5 rounded-xl blur-lg group-hover:opacity-30 transition-opacity" />
                            <div className="relative bg-neutral-900/50 rounded-xl p-4 border border-neutral-800/50 group-hover:border-purple-400/20 transition-all w-full">
                                <tech.icon className={`text-4xl mx-auto ${tech.color}`} />
                                <span className="block text-center text-xs md:text-sm text-neutral-300 mt-2 font-medium leading-tight">
                                    {tech.name}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}