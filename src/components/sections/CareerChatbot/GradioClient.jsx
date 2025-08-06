import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const GradioClient = ({ theme = 'default' }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const messagesEndRef = useRef(null);

  const getThemeStyles = () => {
    const themes = {
      default: {
        container: 'bg-white border-gray-200',
        message: 'bg-gray-100',
        userMessage: 'bg-blue-500 text-white',
        input: 'border-gray-300 focus:border-blue-500',
        button: 'bg-blue-500 hover:bg-blue-600 text-white',
        text: 'text-gray-900',
      },
      neon: {
        container: 'bg-gray-900 border-cyan-400',
        message: 'bg-gray-800 text-cyan-100',
        userMessage: 'bg-cyan-500 text-gray-900',
        input: 'border-cyan-500 focus:border-cyan-400 bg-gray-800 text-cyan-100',
        button: 'bg-cyan-500 hover:bg-cyan-400 text-gray-900',
        text: 'text-cyan-100',
      },
      minimal: {
        container: 'bg-gray-50 border-gray-300',
        message: 'bg-white',
        userMessage: 'bg-gray-800 text-white',
        input: 'border-gray-300 focus:border-gray-500',
        button: 'bg-gray-800 hover:bg-gray-700 text-white',
        text: 'text-gray-800',
      },
      corporate: {
        container: 'bg-blue-50 border-blue-200',
        message: 'bg-white',
        userMessage: 'bg-blue-600 text-white',
        input: 'border-blue-300 focus:border-blue-500',
        button: 'bg-blue-600 hover:bg-blue-700 text-white',
        text: 'text-blue-900',
      },
    };
    return themes[theme] || themes.default;
  };

  const themeStyles = getThemeStyles();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initialize with welcome message
  useEffect(() => {
    setMessages([
      {
        type: 'bot',
        content: "Hi! I'm Yuelin's career assistant. Ask me anything about his professional background, skills, projects, or experience!",
        timestamp: new Date()
      }
    ]);
    setIsConnected(true);
  }, []);

  const callGradioAPI = async (message) => {
    try {
      const response = await fetch('https://liuyuelintop-career-chatbots.hf.space/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: [message, []], // message and chat history
          fn_index: 0 // This might need adjustment based on your Gradio interface
        })
      });

      const data = await response.json();
      return data.data[0]; // Adjust based on your API response structure
    } catch (error) {
      console.error('Error calling Gradio API:', error);
      return "I'm sorry, I'm having trouble connecting right now. You can visit the full chatbot at https://huggingface.co/spaces/liuyuelintop/career_chatbots";
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      type: 'user',
      content: inputMessage.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Call Gradio API
    const botResponse = await callGradioAPI(inputMessage.trim());
    
    const botMessage = {
      type: 'bot',
      content: botResponse,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMessage]);
    setIsLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`w-full border-2 rounded-xl overflow-hidden ${themeStyles.container}`}
      style={{ height: '600px' }}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className={`p-4 border-b ${theme === 'minimal' ? 'border-gray-200' : 'border-gray-600'} flex items-center justify-between`}>
          <div className="flex items-center gap-3">
            <div className="text-2xl">🤖</div>
            <div>
              <h3 className={`font-bold text-lg ${themeStyles.text}`}>
                Career Assistant
              </h3>
              <p className={`text-sm opacity-70 ${themeStyles.text}`}>
                Ask me about Yuelin's career
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className={`text-xs ${themeStyles.text} opacity-70`}>
              {isConnected ? 'Connected' : 'Disconnected'}
            </span>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] p-3 rounded-2xl ${
                message.type === 'user' 
                  ? themeStyles.userMessage 
                  : themeStyles.message
              }`}>
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                <p className="text-xs opacity-50 mt-1">
                  {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </p>
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className={`p-3 rounded-2xl ${themeStyles.message}`}>
                <div className="flex items-center gap-2">
                  <div className="animate-bounce w-2 h-2 bg-current rounded-full opacity-50"></div>
                  <div className="animate-bounce w-2 h-2 bg-current rounded-full opacity-50" style={{ animationDelay: '0.1s' }}></div>
                  <div className="animate-bounce w-2 h-2 bg-current rounded-full opacity-50" style={{ animationDelay: '0.2s' }}></div>
                  <span className="text-xs opacity-50 ml-2">Thinking...</span>
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={sendMessage} className="p-4 border-t border-gray-200">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask about Yuelin's career, skills, or projects..."
              className={`flex-1 px-4 py-2 rounded-xl border-2 focus:outline-none transition-colors ${themeStyles.input}`}
              disabled={isLoading}
            />
            <motion.button
              type="submit"
              disabled={isLoading || !inputMessage.trim()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${themeStyles.button}`}
            >
              Send
            </motion.button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default GradioClient;