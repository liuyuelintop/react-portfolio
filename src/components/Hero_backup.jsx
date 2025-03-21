import { motion } from "framer-motion";
import { HERO_CONTENT, CONTACT } from "../constants/constants";
import { generalImages } from "../constants/assets";
import { HiMail as EnvelopeIcon, HiPhone as PhoneIcon } from "react-icons/hi";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const textVariants = {
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
    <section className="relative py-24 md:py-32 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24"
        >
          {/* Text Content - Enhanced Hierarchy */}
          <div className="flex-1 space-y-8 order-2 lg:order-1">
            <motion.h1
              variants={textVariants}
              className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
            >
              Yuelin Liu
            </motion.h1>

            <motion.div variants={textVariants} className="space-y-6">
              <h2 className="text-2xl md:text-3xl text-purple-300 font-medium">
                Full Stack Developer
              </h2>

              <div className="space-y-4">
                <p className="text-lg text-neutral-300 leading-relaxed max-w-2xl">
                  {HERO_CONTENT.summary}
                </p>

                <div className="flex flex-wrap gap-4">
                  {HERO_CONTENT.highlights.map((highlight, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 rounded-full bg-neutral-900/50 text-purple-300 text-sm border border-purple-900/50"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact Quick Links */}
            <motion.div
              variants={textVariants}
              className="flex flex-wrap gap-6 text-neutral-300"
            >
              <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-2 hover:text-purple-300 transition-colors">
                <EnvelopeIcon className="h-5 w-5" />
                {CONTACT.email}
              </a>
              <a href={`tel:${CONTACT.phoneNo}`} className="flex items-center gap-2 hover:text-purple-300 transition-colors">
                <PhoneIcon className="h-5 w-5" />
                {CONTACT.phoneNo}
              </a>
            </motion.div>
          </div>

          {/* Profile Image - Enhanced Effects */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 150 }}
            className="relative group flex-1 max-w-md order-1 lg:order-2"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/10 blur-2xl rounded-3xl animate-pulse" />
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