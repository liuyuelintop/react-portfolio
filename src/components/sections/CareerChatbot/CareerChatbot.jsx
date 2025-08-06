import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';

const CareerChatbot = () => {
  const { currentTheme } = useTheme();
  const [iframeError, setIframeError] = useState(false);

  const handleIframeError = () => {
    setIframeError(true);
  };

  const getThemeStyles = () => {
    const themes = {
      default: {
        container: 'bg-white border-gray-200',
        text: 'text-gray-900',
        loading: 'text-gray-600',
      },
      neon: {
        container: 'bg-gray-900 border-cyan-400 shadow-cyan-400/20',
        text: 'text-cyan-100',
        loading: 'text-cyan-300',
      },
      minimal: {
        container: 'bg-gray-50 border-gray-300',
        text: 'text-gray-800',
        loading: 'text-gray-500',
      },
      corporate: {
        container: 'bg-blue-50 border-blue-200',
        text: 'text-blue-900',
        loading: 'text-blue-600',
      },
    };
    return themes[currentTheme] || themes.default;
  };

  const themeStyles = getThemeStyles();

  const renderFallbackUI = () => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className={`p-4 border-b ${currentTheme === 'minimal' ? 'border-gray-200' : 'border-gray-600'}`}>
        <div className="flex items-center gap-3">
          <div className="text-2xl">🤖</div>
          <div>
            <h3 className={`font-bold text-lg ${themeStyles.text}`}>
              Career Chatbot Assistant
            </h3>
            <p className={`text-sm opacity-70 ${themeStyles.text}`}>
              Your personal AI career representative
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        <div className="text-6xl mb-6">💼</div>
        <h4 className={`text-xl font-bold mb-4 ${themeStyles.text}`}>
          Ready to Chat About My Career?
        </h4>
        <p className={`text-sm mb-6 max-w-md leading-relaxed opacity-80 ${themeStyles.text}`}>
          This AI assistant knows all about my professional background, skills, and experience.
          Ask about my projects, career journey, or technical expertise!
        </p>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 max-w-md text-sm">
          {[
            '💼 Career Information',
            '🛠️ Technical Skills',
            '📊 Project Details',
            '📞 Contact Assistance'
          ].map((feature, index) => (
            <div key={index} className={`flex items-center gap-2 ${themeStyles.text} opacity-70`}>
              <span>{feature}</span>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <motion.a
          href="https://huggingface.co/spaces/liuyuelintop/career_chatbots"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`
            inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg mb-4
            ${currentTheme === 'neon'
              ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:shadow-cyan-400/50'
              : currentTheme === 'minimal'
                ? 'bg-gradient-to-r from-gray-800 to-gray-900 text-white hover:shadow-gray-400/50'
                : currentTheme === 'corporate'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:shadow-blue-400/50'
                  : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-purple-400/50'
            }
          `}
        >
          <span className="text-xl">🚀</span>
          <span>Open Full Chatbot</span>
        </motion.a>

        <p className={`text-xs opacity-60 ${themeStyles.text}`}>
          If the embedded chat doesn't load, use the button above
        </p>
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
        <div
          className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs"
          style={{ pointerEvents: 'none' }}
        >
          Loading Career Chatbot...
        </div>
      </div>
    </motion.div>
  );
};

export default CareerChatbot;