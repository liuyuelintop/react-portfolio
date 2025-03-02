import { HERO_CONTENT } from "../constants/constants";
import { generalImages } from "../constants/assets";
import { motion } from "framer-motion";

const container = (delay) => ({
    hidden: { opacity: 0, x: -50 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.5, delay: delay },
    },
});

export default function Hero() {
    return (
        <section className="border-b border-neutral-900 pb-12 lg:pb-24">
            <div className="flex flex-col-reverse md:flex-row items-center md:items-start">

                {/* 文本区域 */}
                <div className="w-full md:w-1/2 text-center md:text-left px-4">
                    <motion.h1
                        variants={container(0)}
                        initial="hidden"
                        animate="visible"
                        className="text-4xl sm:text-5xl md:text-6xl font-thin tracking-tight lg:mt-16 lg:text-7xl"
                    >
                        Yuelin Liu
                    </motion.h1>

                    <motion.span
                        variants={container(0.5)}
                        initial="hidden"
                        animate="visible"
                        className="bg-gradient-to-r from-pink-300 via-slate-500 to-purple-500 bg-clip-text text-xl sm:text-2xl md:text-3xl tracking-tight text-transparent"
                    >
                        Full Stack Developer
                    </motion.span>

                    <motion.p
                        variants={container(1)}
                        initial="hidden"
                        animate="visible"
                        className="my-4 max-w-xl py-4 font-light tracking-tight text-sm sm:text-base md:text-lg leading-relaxed"
                    >
                        {HERO_CONTENT}
                    </motion.p>
                </div>

                {/* 头像区域 */}
                <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0">
                    <motion.img
                        className="rounded-2xl w-40 sm:w-48 md:w-64 lg:w-80"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 1.2 }}
                        src={generalImages.profilePic}
                        alt="Profile Picture"
                    />
                </div>
            </div>
        </section>
    );
}
