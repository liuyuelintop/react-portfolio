import { motion } from "framer-motion";
import { HERO_CONTENT } from "../constants/constants";
import { useTypingAnimation } from "../hooks/useTypingAnimation";
import { 
  containerVariants, 
  itemVariants, 
  titleVariants, 
  floatingShapeVariants,
  floatingShapeVariantsReduced,
  cursorGlowVariants 
} from "./Hero/animations";

export default function Hero() {
    const typedRole = useTypingAnimation(HERO_CONTENT.roles, 150, 100, 2000);
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const shapeVariants = prefersReducedMotion ? floatingShapeVariantsReduced : floatingShapeVariants;

    return (
        <section className="mt-8 relative py-12 sm:py-20 px-4 overflow-hidden">
            {/* Floating Geometric Shapes Background */}
            <div className="absolute inset-0 pointer-events-none">
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
            </div>

            <div className="max-w-4xl mx-auto relative z-10">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="flex flex-col items-center gap-8"
                >
                    {/* Content Section */}
                    <div className="w-full space-y-6">
                        <motion.h1
                            variants={titleVariants}
                            className="text-4xl md:text-6xl text-white font-bold text-center bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent"
                        >
                            {HERO_CONTENT.name}
                        </motion.h1>

                        <motion.div variants={itemVariants} className="text-center">
                            <div className="text-xl md:text-2xl text-purple-300 font-medium mb-4 h-8 flex items-center justify-center">
                                <span className="mr-2">{typedRole}</span>
                                <motion.span
                                    variants={cursorGlowVariants}
                                    animate="blink"
                                    className="inline-block w-0.5 h-6 bg-purple-400 rounded-full"
                                />
                            </div>
                            <p className="text-lg md:text-xl text-neutral-300 leading-relaxed max-w-2xl mx-auto mb-2">
                                {HERO_CONTENT.summary}
                            </p>
                        </motion.div>

                        {/* Skills Grid with Enhanced Hover Effects */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-2xl mx-auto">
                            {HERO_CONTENT.highlights.map((skill) => (
                                <motion.div
                                    key={skill}
                                    variants={itemVariants}
                                    whileHover={{ 
                                        scale: 1.05, 
                                        y: -2,
                                        transition: { duration: 0.2 }
                                    }}
                                    className="group px-4 py-3 rounded-lg bg-neutral-800/70 border border-purple-700/40 hover:border-purple-400/80 shadow-lg hover:shadow-purple-500/20 backdrop-blur-sm transition-all duration-300 text-center cursor-pointer"
                                >
                                    <span className="text-purple-300 text-sm md:text-base font-medium group-hover:text-purple-100 transition-colors duration-200">
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
