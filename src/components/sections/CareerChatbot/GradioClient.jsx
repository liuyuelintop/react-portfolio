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

  const callGradioAPI = async (message, chatHistory = []) => {
    try {
      // Try multiple API endpoints that Gradio spaces commonly use
      const possibleEndpoints = [
        'https://liuyuelintop-career-chatbots.hf.space/api/predict',
        'https://liuyuelintop-career-chatbots.hf.space/run/predict',
        'https://liuyuelintop-career-chatbots.hf.space/call/chat'
      ];

      let response;
      let data;

      // First, try to get the space info to understand the interface
      try {
        const infoResponse = await fetch('https://liuyuelintop-career-chatbots.hf.space/info');
        const info = await infoResponse.json();
        console.log('Space info:', info);
      } catch (e) {
        console.log('Could not fetch space info:', e);
      }

      // Try different API call formats
      for (let i = 0; i < possibleEndpoints.length; i++) {
        try {
          // Format 1: Standard Gradio predict API
          response = await fetch(possibleEndpoints[i], {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              data: [message, chatHistory],
              fn_index: 0
            })
          });

          if (response.ok) {
            data = await response.json();
            console.log('API Response:', data);
            
            if (data.data && data.data.length > 0) {
              // Extract the response - it might be in different formats
              const botResponse = data.data[0];
              if (typeof botResponse === 'string') {
                return botResponse;
              } else if (Array.isArray(botResponse) && botResponse.length > 0) {
                return botResponse[botResponse.length - 1][1]; // Get last message
              }
            }
            break;
          }
        } catch (e) {
          console.log(`Failed endpoint ${possibleEndpoints[i]}:`, e);
          continue;
        }
      }

      // If all endpoints fail, try a simple GET request to test connectivity
      const testResponse = await fetch('https://liuyuelintop-career-chatbots.hf.space/', {
        method: 'HEAD',
        mode: 'no-cors'
      });

      // Fallback message with more helpful information
      return `I'm having trouble connecting to the chatbot API right now. This might be because:

1. The Hugging Face Space is starting up (cold start)
2. API endpoint configuration needs adjustment
3. CORS restrictions

You can try:
• Waiting a moment and trying again
• Opening the full chatbot: https://huggingface.co/spaces/liuyuelintop/career_chatbots
• Switching to the "Embed" mode using the toggle above

The embedded version should work even if the API is having issues.`;

    } catch (error) {
      console.error('Error calling Gradio API:', error);
      return `Connection error: ${error.message}. Please try the embedded version or visit https://huggingface.co/spaces/liuyuelintop/career_chatbots directly.`;
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
    const currentMessage = inputMessage.trim();
    setInputMessage('');
    setIsLoading(true);

    try {
      // Build chat history in the format Gradio expects
      const chatHistory = messages
        .filter(msg => msg.type === 'user' || msg.type === 'bot')
        .map(msg => [msg.type === 'user' ? msg.content : '', msg.type === 'bot' ? msg.content : ''])
        .filter(pair => pair[0] || pair[1]);

      // Call Gradio API with current message and chat history
      const botResponse = await callGradioAPI(currentMessage, chatHistory);
      
      const botMessage = {
        type: 'bot',
        content: botResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error in sendMessage:', error);
      const errorMessage = {
        type: 'bot',
        content: "I'm experiencing technical difficulties. Please try again or use the embedded chatbot mode.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
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