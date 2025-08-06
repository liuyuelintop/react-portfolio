import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import GradioClient from './GradioClient';
import ApiTester from './ApiTester';

const CareerChatbot = ({ theme = 'default' }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

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
    return themes[theme] || themes.default;
  };

  const themeStyles = getThemeStyles();

  // Chat interface options
  const [iframeError, setIframeError] = useState(false);
  const [showIframe, setShowIframe] = useState(true);
  const [chatMode, setChatMode] = useState('iframe'); // 'iframe', 'api', 'fallback'

  const handleIframeError = () => {
    setIframeError(true);
    setShowIframe(false);
    setChatMode('api'); // Try API mode if iframe fails
  };

  const renderChatInterface = () => {
    switch (chatMode) {
      case 'iframe':
        return (
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
              Loading Hugging Face Space...
            </div>
          </div>
        );
      case 'api':
        return <GradioClient theme={theme} />;
      case 'debug':
        return <ApiTester />;
      default:
        return renderFallbackUI();
    }
  };

  const renderFallbackUI = () => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className={`p-4 border-b ${theme === 'minimal' ? 'border-gray-200' : 'border-gray-600'}`}>
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
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <motion.button
            onClick={() => setChatMode('api')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`
              inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg
              ${theme === 'neon' 
                ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:shadow-cyan-400/50' 
                : theme === 'minimal'
                ? 'bg-gradient-to-r from-gray-800 to-gray-900 text-white hover:shadow-gray-400/50'
                : theme === 'corporate'
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:shadow-blue-400/50'
                : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-purple-400/50'
              }
            `}
          >
            <span className="text-xl">💬</span>
            <span>Chat Here</span>
          </motion.button>
          
          <motion.a
            href="https://huggingface.co/spaces/liuyuelintop/career_chatbots"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`
              inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 border-2
              ${theme === 'neon' 
                ? 'border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-gray-900' 
                : theme === 'minimal'
                ? 'border-gray-400 text-gray-700 hover:bg-gray-400 hover:text-white'
                : theme === 'corporate'
                ? 'border-blue-400 text-blue-700 hover:bg-blue-400 hover:text-white'
                : 'border-purple-400 text-purple-300 hover:bg-purple-400 hover:text-white'
              }
            `}
          >
            <span className="text-xl">🤗</span>
            <span>Open HF Space</span>
          </motion.a>
        </div>
        
        <p className={`text-xs opacity-60 ${themeStyles.text}`}>
          Choose your preferred chat experience
        </p>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`w-full border-2 rounded-xl overflow-hidden ${themeStyles.container}`}
      style={{ height: '600px' }}
    >
      {/* Mode Toggle Header */}
      <div className={`flex items-center justify-between p-2 border-b ${theme === 'minimal' ? 'border-gray-200' : 'border-gray-600'}`}>
        <div className="flex gap-1">
          {[
            { key: 'iframe', label: '🖥️ Embed', title: 'Embedded Interface' },
            { key: 'api', label: '💬 Chat', title: 'Direct Chat API' },
            { key: 'debug', label: '🔧 Debug', title: 'API Debug Tool' },
            { key: 'fallback', label: '🔗 Link', title: 'External Link' }
          ].map(mode => (
            <button
              key={mode.key}
              onClick={() => setChatMode(mode.key)}
              title={mode.title}
              className={`px-3 py-1 text-xs rounded-lg transition-colors ${
                chatMode === mode.key
                  ? theme === 'neon'
                    ? 'bg-cyan-500 text-gray-900'
                    : theme === 'minimal'
                    ? 'bg-gray-800 text-white'
                    : theme === 'corporate'
                    ? 'bg-blue-600 text-white'
                    : 'bg-purple-600 text-white'
                  : theme === 'minimal'
                  ? 'text-gray-600 hover:bg-gray-200'
                  : 'text-gray-400 hover:bg-gray-700'
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>
        <div className={`text-xs opacity-60 ${themeStyles.text}`}>
          Mode: {chatMode}
        </div>
      </div>
      
      {/* Chat Interface */}
      <div className="h-full">
        {renderChatInterface()}
      </div>
    </motion.div>
  );
};

export default CareerChatbot;