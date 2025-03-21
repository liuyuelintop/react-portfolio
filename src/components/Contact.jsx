import { motion } from "framer-motion";
import { CONTACT } from "../constants/constants";

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
    hidden: { opacity: 0, x: -20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            type: "spring",
            stiffness: 120,
            damping: 20
        }
    }
};

export default function Contact() {
    return (
        <section className="py-16 md:py-24 px-4 md:px-8 bg-neutral-950">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    {/* 标题 - 移动端优化 */}
                    <motion.h2
                        variants={itemVariants}
                        className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent text-center mb-8 md:mb-12"
                    >
                        Get in Touch
                    </motion.h2>

                    {/* 统一卡片容器 */}
                    <motion.div
                        variants={containerVariants}
                        className="bg-neutral-900/50 rounded-2xl p-6 md:p-8 shadow-xl shadow-purple-900/20 border border-neutral-800"
                    >
                        {/* 移动端垂直布局 */}
                        <div className="space-y-6 md:space-y-0 md:grid md:grid-cols-3 md:gap-8">
                            {/* 地址区块 */}
                            <motion.div
                                variants={itemVariants}
                                className="group relative pb-6 md:pb-0 md:border-r border-neutral-800/50"
                            >
                                <div className="space-y-2">
                                    <span className="text-xs font-semibold uppercase text-purple-400/80 tracking-wider">
                                        Address
                                    </span>
                                    <p className="text-neutral-300 text-base leading-relaxed">
                                        {CONTACT.address}
                                    </p>
                                </div>
                                <div className="absolute bottom-0 left-0 w-full h-px bg-neutral-800/50 md:hidden group-last:opacity-0" />
                            </motion.div>

                            {/* 电话区块 */}
                            <motion.div
                                variants={itemVariants}
                                className="group relative pb-6 md:pb-0 md:border-r border-neutral-800/50"
                            >
                                <div className="space-y-2">
                                    <span className="text-xs font-semibold uppercase text-purple-400/80 tracking-wider">
                                        Phone
                                    </span>
                                    <p className="text-neutral-300 text-base leading-relaxed">
                                        {CONTACT.phoneNo}
                                    </p>
                                </div>
                                <div className="absolute bottom-0 left-0 w-full h-px bg-neutral-800/50 md:hidden group-last:opacity-0" />
                            </motion.div>

                            {/* 邮箱区块 */}
                            <motion.div
                                variants={itemVariants}
                            >
                                <div className="space-y-2">
                                    <span className="text-xs font-semibold uppercase text-purple-400/80 tracking-wider">
                                        Email
                                    </span>
                                    <div className="text-neural-300 leading-relaxed">
                                        <a
                                            href={`mailto:${CONTACT.email}`}
                                            className="inline-block text-neutral-300 hover:text-purple-400 transition-colors break-all text-base leading-relaxed"
                                        >
                                            {CONTACT.email}
                                        </a>

                                    </div>

                                </div>

                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}