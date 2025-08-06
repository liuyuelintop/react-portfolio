import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';

const CareerChatbot = () => {
  const { currentTheme } = useTheme();
  const [iframeError, setIframeError] = useState(false);
  const [shouldLoadIframe, setShouldLoadIframe] = useState(false);

  const handleIframeError = () => {
    setIframeError(true);
  };

  const getThemeStyles = () => {
    const themes = {
      default: {
        container: 'bg-white border-gray-200 shadow-lg',
        text: 'text-gray-900',
        loading: 'text-gray-600',
        accent: 'purple'
      },
      neon: {
        container: 'bg-gray-900 border-cyan-400 shadow-cyan-400/30',
        text: 'text-cyan-100',
        loading: 'text-cyan-300',
        accent: 'cyan'
      },
      minimal: {
        container: 'bg-gray-50 border-gray-300 shadow-md',
        text: 'text-gray-800',
        loading: 'text-gray-500',
        accent: 'gray'
      },
      corporate: {
        container: 'bg-blue-50 border-blue-200 shadow-blue-200/30',
        text: 'text-blue-900',
        loading: 'text-blue-600',
        accent: 'blue'
      },
    };
    return themes[currentTheme] || themes.default;
  };

  const themeStyles = getThemeStyles();

  const renderFallbackUI = () => (
    <div className="flex flex-col h-full">
      {/* Enhanced Header */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={`p-6 border-b backdrop-blur-sm ${
          currentTheme === 'minimal' 
            ? 'border-gray-200 bg-white/50' 
            : currentTheme === 'neon'
              ? 'border-cyan-800/50 bg-cyan-900/10'
              : currentTheme === 'corporate'
                ? 'border-blue-200/50 bg-blue-50/50'
                : 'border-purple-700/50 bg-purple-900/10'
        }`}
      >
        <div className="flex items-center gap-4">
          <motion.div 
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="text-3xl"
          >
            🤖
          </motion.div>
          <div>
            <motion.h3 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className={`font-bold text-xl ${themeStyles.text}`}
            >
              Career Chatbot Assistant
            </motion.h3>
            <motion.p 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 0.8, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className={`text-sm ${themeStyles.text}`}
            >
              Your personal AI career representative
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-8 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-5xl sm:text-6xl mb-4 sm:mb-6"
        >
          💼
        </motion.div>
        <motion.h4
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={`text-lg sm:text-xl font-bold mb-3 sm:mb-4 ${themeStyles.text}`}
        >
          Ready to Chat About My Career?
        </motion.h4>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`text-xs sm:text-sm mb-6 max-w-xs sm:max-w-md leading-relaxed opacity-80 ${themeStyles.text}`}
        >
          This AI assistant knows all about my professional background, skills, and experience.
          Ask about my projects, career journey, or technical expertise!
        </motion.p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 max-w-md">
          {[
            { icon: '💼', text: 'Career Information' },
            { icon: '🛠️', text: 'Technical Skills' },
            { icon: '📊', text: 'Project Details' },
            { icon: '📞', text: 'Contact Assistance' }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
              className={`flex items-center gap-3 p-3 rounded-lg backdrop-blur-sm transition-all duration-200 hover:scale-105 ${
                currentTheme === 'neon'
                  ? 'bg-cyan-900/20 border border-cyan-800/30 hover:bg-cyan-900/30'
                  : currentTheme === 'minimal'
                    ? 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                    : currentTheme === 'corporate'
                      ? 'bg-blue-50 border border-blue-200 hover:bg-blue-100'
                      : 'bg-purple-900/20 border border-purple-700/30 hover:bg-purple-900/30'
              }`}
            >
              <span className="text-lg">{feature.icon}</span>
              <span className={`text-sm font-medium ${themeStyles.text} opacity-80`}>
                {feature.text}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Action Button */}
        <motion.a
          href="https://huggingface.co/spaces/liuyuelintop/career_chatbots"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.8 }}
          whileHover={{ 
            scale: 1.05,
            boxShadow: currentTheme === 'neon'
              ? '0 10px 30px rgba(6, 182, 212, 0.4)'
              : currentTheme === 'minimal'
                ? '0 10px 30px rgba(0, 0, 0, 0.15)'
                : currentTheme === 'corporate'
                  ? '0 10px 30px rgba(37, 99, 235, 0.3)'
                  : '0 10px 30px rgba(147, 51, 234, 0.4)'
          }}
          whileTap={{ scale: 0.95 }}
          className={`
            group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 shadow-xl mb-4 overflow-hidden
            ${currentTheme === 'neon'
              ? 'bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-600 hover:from-cyan-400 hover:to-blue-500'
              : currentTheme === 'minimal'
                ? 'bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 hover:from-gray-600 hover:to-gray-800'
                : currentTheme === 'corporate'
                  ? 'bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 hover:from-blue-500 hover:to-blue-700'
                  : 'bg-gradient-to-r from-purple-600 via-blue-600 to-purple-700 hover:from-purple-500 hover:to-blue-500'
            }
          `}
        >
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out" />
          
          <motion.span 
            className="text-xl"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            🚀
          </motion.span>
          <span className="relative z-10">Open Full Chatbot</span>
        </motion.a>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 0.4, delay: 1 }}
          className={`text-xs ${themeStyles.text} flex items-center gap-2 justify-center`}
        >
          <span className="w-1 h-1 bg-current rounded-full animate-pulse" />
          If the embedded chat doesn't load, use the button above
          <span className="w-1 h-1 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
        </motion.p>
      </div>
    </div>
  );

  if (iframeError) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`w-full border-2 rounded-xl overflow-hidden ${themeStyles.container}`}
        style={{ height: '600px' }}
      >
        {renderFallbackUI()}
      </motion.div>
    );
  }

  // Show placeholder with load button initially, iframe only after user clicks
  if (!shouldLoadIframe) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`w-full border-2 rounded-xl overflow-hidden ${themeStyles.container}`}
        style={{ height: '600px' }}
      >
        <div className="flex flex-col h-full">
          {renderFallbackUI()}
          {/* Load Iframe Button */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
            <motion.button
              onClick={() => setShouldLoadIframe(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 shadow-xl
                ${currentTheme === 'neon'
                  ? 'bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-600 hover:from-cyan-400 hover:to-blue-500'
                  : currentTheme === 'minimal'
                    ? 'bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 hover:from-gray-600 hover:to-gray-800'
                    : currentTheme === 'corporate'
                      ? 'bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 hover:from-blue-500 hover:to-blue-700'
                      : 'bg-gradient-to-r from-purple-600 via-blue-600 to-purple-700 hover:from-purple-500 hover:to-blue-500'
                }
              `}
            >
              <span className="text-xl">💬</span>
              <span>Start Chatting</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`w-full border-2 rounded-xl overflow-hidden ${themeStyles.container}`}
      style={{ height: '600px' }}
    >
      <div className="h-full w-full relative">
        <iframe
          src="https://liuyuelintop-career-chatbots.hf.space"
          width="100%"
          height="100%"
          style={{ border: 'none', borderRadius: '0.75rem' }}
          onError={handleIframeError}
          allow="microphone; camera; clipboard-read; clipboard-write"
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-storage-access-by-user-activation"
          title="Career Chatbot Assistant"
          referrerPolicy="no-referrer-when-downgrade"
        />
        {/* Loading indicator */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 2 }}
          className={`absolute top-4 right-4 px-3 py-1.5 rounded-lg text-xs font-medium backdrop-blur-sm ${
            currentTheme === 'minimal'
              ? 'bg-white/90 text-gray-700 border border-gray-200'
              : currentTheme === 'neon'
              ? 'bg-cyan-900/90 text-cyan-200 border border-cyan-700'
              : currentTheme === 'corporate'
              ? 'bg-blue-900/90 text-blue-200 border border-blue-700'
              : 'bg-purple-900/90 text-purple-200 border border-purple-700'
          }`}
          style={{ pointerEvents: 'none' }}
        >
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 bg-current rounded-full animate-pulse" />
            <span>Loading AI Assistant...</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CareerChatbot;