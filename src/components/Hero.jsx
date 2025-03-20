import { HERO_CONTENT } from "../constants/constants";
import { generalImages } from "../constants/assets";
import { motion } from "framer-motion";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3
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
        <section className="py-20 lg:py-32 px-4 lg:px-8 ">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="flex flex-col lg:flex-row items-center gap-12"
                >
                    {/* 文本内容 - 完全匹配Projects标题风格 */}
                    <div className="flex-1 space-y-6">
                        <motion.h1
                            variants={itemVariants}
                            className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
                        >
                            Yuelin Liu
                        </motion.h1>

                        <motion.span
                            variants={itemVariants}
                            className="block text-2xl md:text-3xl bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent"
                        >
                            Full Stack Developer
                        </motion.span>

                        <motion.p
                            variants={itemVariants}
                            className="text-lg text-neutral-300 leading-relaxed max-w-2xl"
                        >
                            {HERO_CONTENT}
                        </motion.p>
                    </div>

                    {/* 头像区域 - 匹配Projects卡片图片效果 */}
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 150 }}
                        className="relative group flex-1 max-w-md"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/10 blur-xl rounded-3xl -z-10" />

                        <img
                            src={generalImages.profilePic}
                            alt="Profile"
                            className="w-full rounded-2xl border-2 border-purple-900/50 group-hover:border-purple-400/30 transition-all duration-300 shadow-2xl shadow-purple-900/20"
                        />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}