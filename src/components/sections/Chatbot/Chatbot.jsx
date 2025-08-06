import { motion } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';
import SectionHeading from '../../ui/common/SectionHeading';
import { CareerChatbot } from '../CareerChatbot';

export default function Chatbot() {
  const { currentTheme } = useTheme();

  return (
    <section className="max-w-7xl mx-auto py-12 px-4 lg:px-8">
      <div className="text-center mb-12">
        <SectionHeading level="section">
          Ask My AI Assistant
        </SectionHeading>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className={`text-lg max-w-3xl mx-auto ${currentTheme === 'minimal' ? 'text-gray-600' : 'text-neutral-400'
            }`}
        >
          Have questions about my experience, skills, or projects? Chat with my AI assistant
          for instant, personalized answers about my career and expertise.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="max-w-4xl mx-auto"
      >
        {/* Main Chatbot Interface */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="relative"
        >
          <CareerChatbot />

          {/* Decorative elements */}
          <div className={`absolute -top-4 -left-4 w-8 h-8 rounded-full opacity-20 ${currentTheme === 'neon' ? 'bg-cyan-400'
            : currentTheme === 'minimal' ? 'bg-gray-400'
              : currentTheme === 'corporate' ? 'bg-blue-400'
                : 'bg-purple-400'
            }`} />
          <div className={`absolute -bottom-4 -right-4 w-6 h-6 rounded-full opacity-30 ${currentTheme === 'neon' ? 'bg-cyan-400'
            : currentTheme === 'minimal' ? 'bg-gray-400'
              : currentTheme === 'corporate' ? 'bg-blue-400'
                : 'bg-purple-400'
            }`} />
        </motion.div>

        {/* Usage Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-6 text-center px-4"
        >
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm border flex-nowrap max-w-full
      ${currentTheme === 'minimal'
                ? 'bg-gray-50 border-gray-200 text-gray-600'
                : currentTheme === 'neon'
                  ? 'bg-cyan-900/20 border-cyan-800 text-cyan-300'
                  : currentTheme === 'corporate'
                    ? 'bg-blue-50 border-blue-200 text-blue-700'
                    : 'bg-purple-900/20 border-purple-700 text-purple-300'
              }`}
          >
            <span className="text-base">💡</span>
            <span className="text-left break-words">
              Try asking: "What's your most successful achievements?"
            </span>
          </div>
        </motion.div>


      </motion.div>
    </section>
  );
}