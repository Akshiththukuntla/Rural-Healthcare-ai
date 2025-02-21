import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { getMistralResponse } from "../../services/mistral"; 




function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Hello! I'm your Rural Healthcare Assistant. I can help you with general health information, finding medical services, and answering basic health questions. Please note that I provide general guidance only - for specific medical concerns, always consult a healthcare professional.",
      isBot: true,
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [apiKeyMissing, setApiKeyMissing] = useState(false);

  useEffect(() => {
    setApiKeyMissing(false); // API key is now inside mistral.js
  }, []);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isProcessing || apiKeyMissing) return;

    const userMessage = {
      text: inputMessage,
      isBot: false,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsProcessing(true);

    // Add loading message
    const loadingMessage = {
      text: "...",
      isBot: true,
      timestamp: new Date().toLocaleTimeString(),
      isLoading: true,
    };
    setMessages(prev => [...prev, loadingMessage]);

    try {
      const response = await getMistralResponse(inputMessage);
      
      // Remove loading message and add actual response
      setMessages(prev => {
        const filtered = prev.filter(msg => !msg.isLoading);
        return [...filtered, {
          text: response,
          isBot: true,
          timestamp: new Date().toLocaleTimeString(),
        }];
      });
    } catch (error) {
      // Remove loading message and add error message
      setMessages(prev => {
        const filtered = prev.filter(msg => !msg.isLoading);
        return [...filtered, {
          text: "I apologize, but I'm having trouble connecting to Mistral AI right now. Please try again later.",
          isBot: true,
          timestamp: new Date().toLocaleTimeString(),
        }];
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (

          <div className={`fixed bottom-4 right-4 z-50 ${isChatOpen ? 'w-96' : 'w-auto'}`}>
        {!isChatOpen && (
          <button
            onClick={toggleChat}
            className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
          >
            <MessageCircle className="w-6 h-6" />
          </button>
        )}

        {isChatOpen && (
          <div className="bg-white rounded-lg shadow-xl flex flex-col h-[600px]">
            {/* Chat Header */}
            <div className="p-4 bg-blue-600 text-white rounded-t-lg flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Bot className="w-6 h-6" />
                <span className="font-semibold">Healthcare Assistant</span>
              </div>
              <button onClick={toggleChat} className="hover:bg-blue-700 p-1 rounded">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex gap-2 ${message.isBot ? 'justify-start' : 'justify-end'}`}>
                  {message.isBot && (
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <Bot className="w-5 h-5 text-blue-600" />
                    </div>
                  )}
                  <div className={`max-w-[80%] p-3 rounded-lg ${message.isBot ? 'bg-gray-100 text-gray-800' : 'bg-blue-600 text-white'}`}>
                    {message.isLoading ? (
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    ) : (
                      <p>{message.text}</p>
                    )}
                    <span className="text-xs opacity-70 mt-1 block">
                      {message.timestamp}
                    </span>
                  </div>
                  {!message.isBot && (
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <form onSubmit={sendMessage} className="p-4 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder={apiKeyMissing ? "Chat disabled - API key not configured" : "Type your message..."}
                  className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-600"
                  disabled={isProcessing || apiKeyMissing}
                />
                <button 
                  type="submit" 
                  className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-400" 
                  disabled={isProcessing || apiKeyMissing}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
  );
}

export default App;