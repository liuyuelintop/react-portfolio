import React from 'react';
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
          className={`text-lg max-w-3xl mx-auto ${
            currentTheme === 'minimal' ? 'text-gray-600' : 'text-neutral-400'
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
        {/* Key Features */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: '💼', label: 'Career Info', desc: 'Professional background' },
            { icon: '🛠️', label: 'Technical Skills', desc: 'Technologies & tools' },
            { icon: '📊', label: 'Project Details', desc: 'Portfolio insights' },
            { icon: '📞', label: 'Contact Help', desc: 'Get in touch easily' }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className={`text-center p-4 rounded-xl border transition-all duration-300 hover:scale-105 ${
                currentTheme === 'minimal' 
                  ? 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-md'
                  : currentTheme === 'neon'
                  ? 'bg-gray-900/50 border-cyan-800 hover:border-cyan-600 hover:shadow-cyan-900/20'
                  : currentTheme === 'corporate'
                  ? 'bg-blue-50/50 border-blue-200 hover:border-blue-300 hover:shadow-blue-200/30'
                  : 'bg-neutral-900/50 border-neutral-700 hover:border-purple-600 hover:shadow-purple-900/20'
              }`}
            >
              <div className="text-2xl mb-2">{feature.icon}</div>
              <div className={`font-medium text-sm mb-1 ${
                currentTheme === 'minimal' ? 'text-gray-900' : 'text-white'
              }`}>
                {feature.label}
              </div>
              <div className={`text-xs opacity-70 ${
                currentTheme === 'minimal' ? 'text-gray-600' : 'text-neutral-400'
              }`}>
                {feature.desc}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Chatbot Interface */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="relative"
        >
          <CareerChatbot theme={currentTheme} />
          
          {/* Decorative elements */}
          <div className={`absolute -top-4 -left-4 w-8 h-8 rounded-full opacity-20 ${
            currentTheme === 'neon' ? 'bg-cyan-400' 
            : currentTheme === 'minimal' ? 'bg-gray-400'
            : currentTheme === 'corporate' ? 'bg-blue-400'
            : 'bg-purple-400'
          }`} />
          <div className={`absolute -bottom-4 -right-4 w-6 h-6 rounded-full opacity-30 ${
            currentTheme === 'neon' ? 'bg-cyan-400' 
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
          className="mt-8 text-center"
        >
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm border ${
            currentTheme === 'minimal'
              ? 'bg-gray-50 border-gray-200 text-gray-600'
              : currentTheme === 'neon'
              ? 'bg-cyan-900/20 border-cyan-800 text-cyan-300'
              : currentTheme === 'corporate'
              ? 'bg-blue-50 border-blue-200 text-blue-700'
              : 'bg-purple-900/20 border-purple-700 text-purple-300'
          }`}>
            <span className="text-xs">💡</span>
            <span>Try asking: "Tell me about Yuelin's React experience" or "What projects has he worked on?"</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}