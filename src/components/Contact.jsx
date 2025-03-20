import { motion, AnimatePresence } from "framer-motion";
import { CONTACT } from "../constants/constants";

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

export default function Contact() {
    return (
        <section className="py-24 px-8">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                        visible: {
                            transition: {
                                staggerChildren: 0.15,
                                delayChildren: 0.3
                            }
                        }
                    }}
                >
                    {/* 标题 - 匹配Projects标题样式 */}
                    <motion.h2
                        variants={itemVariants}
                        className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent text-center mb-12"
                    >
                        Get in Touch
                    </motion.h2>

                    {/* 内容网格 - 匹配Projects卡片布局 */}
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* 地址卡片 */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-neutral-800/50 rounded-xl p-6 border border-neutral-700/50 shadow-lg shadow-purple-900/20 hover:shadow-purple-900/40 transition-all"
                        >
                            <div className="space-y-4">
                                <span className="text-xs font-semibold uppercase text-purple-400/80 tracking-wider">
                                    Address
                                </span>
                                <p className="text-neutral-300 leading-relaxed">
                                    {CONTACT.address}
                                </p>
                            </div>
                        </motion.div>

                        {/* 电话卡片 */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-neutral-800/50 rounded-xl p-6 border border-neutral-700/50 shadow-lg shadow-purple-900/20 hover:shadow-purple-900/40 transition-all"
                        >
                            <div className="space-y-4">
                                <span className="text-xs font-semibold uppercase text-purple-400/80 tracking-wider">
                                    Phone
                                </span>
                                <p className="text-neutral-300 leading-relaxed">
                                    {CONTACT.phoneNo}
                                </p>
                            </div>
                        </motion.div>

                        {/* 邮箱卡片 */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-neutral-800/50 rounded-xl p-6 border border-neutral-700/50 shadow-lg shadow-purple-900/20 hover:shadow-purple-900/40 transition-all"
                        >
                            <div className="space-y-4">
                                <span className="text-xs font-semibold uppercase text-purple-400/80 tracking-wider">
                                    Email
                                </span>
                                <div className="text-neutral-300 leading-relaxed"> {/* 新增容器保证对齐 */}
                                    <a
                                        href={`mailto:${CONTACT.email}`}
                                        className="text-neural-300  hover:text-white transition-colors break-all"
                                    >
                                        {CONTACT.email}
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}