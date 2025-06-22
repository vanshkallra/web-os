import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Trash2, Copy, ThumbsUp, ThumbsDown } from 'lucide-react';

const AIAssistant = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hello! I'm your AI assistant. I can help you with questions about web development, provide coding assistance, or discuss any topics you're curious about. How can I help you today?",
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

 const generateAIResponse = async (userMessage) => {
  setIsTyping(true);
  const backendURL = 'https://ai-response-backend-7s17.onrender.com/api/ask';

  const modifiedMessage = `You are a helpful and concise assistant. Answer the following question in **strictly under 50 words**. 
  Avoid greetings or filler text. Provide direct and accurate information without assumptions. 

  Question: ${userMessage}`;

  try {
    const res = await fetch(backendURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: modifiedMessage })
    });

    const data = await res.json();
    setIsTyping(false);

    return data.content?.trim() || "I couldn't generate a response.";
  } catch (error) {
    console.error('AI error:', error);
    setIsTyping(false);
    return "Sorry, something went wrong.";
  }
};


  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');

    try {
      const aiResponse = await generateAIResponse(currentInput);
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: aiResponse,
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: "Sorry, something went wrong. Please try again later.",
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        type: 'bot',
        content: "Chat cleared! How can I help you today?",
        timestamp: new Date().toLocaleTimeString()
      }
    ]);
  };

  const copyMessage = (content) => {
    navigator.clipboard.writeText(content);
  };

  const quickPrompts = [
    "How do I optimize React performance?",
    "Explain JavaScript closures",
    "What are the best practices for CSS?",
    "Help me debug this code",
    "What's new in web development?"
  ];

  const handleQuickPrompt = (prompt) => {
    setInputValue(prompt);
    inputRef.current?.focus();
  };

  return (
    <div className="ai-assistant-container flex flex-col bg-black text-white" style= {{ height: '100%', overflowY: 'auto' }}>
      {/* Header */}
      <div className="ai-header bg-gray-900 border-b border-gray-800 p-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="ai-avatar bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center">
            <Bot size={18} />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-white">AI Assistant</h1>
            <p className="text-xs text-gray-400">Always here to help</p>
          </div>
        </div>
        <button
          onClick={clearChat}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
        >
          <Trash2 size={16} />
          Clear Chat
        </button>
      </div>

      {/* Messages Area */}
      <div className="messages-area flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs lg:max-w-md xl:max-w-lg p-3 shadow-sm ${
              message.type === 'user'
                ? 'bg-blue-600 text-white rounded-l-lg rounded-tr-lg'
                : 'bg-gray-800 text-gray-100 rounded-r-lg rounded-tl-lg border border-gray-700'
            }`}>
              <div className="flex items-center gap-2 mb-1">
                {message.type === 'bot' ? (
                  <Bot size={14} className="text-blue-400" />
                ) : (
                  <User size={14} className="text-white" />
                )}
                <span className={`text-xs ${message.type === 'user' ? 'text-blue-200' : 'text-gray-400'}`}>
                  {message.timestamp}
                </span>
              </div>

              <p className="text-sm whitespace-pre-wrap">{message.content}</p>

              {message.type === 'bot' && (
                <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-700">
                  <button
                    onClick={() => copyMessage(message.content)}
                    className="text-gray-400 hover:text-white transition"
                    title="Copy"
                  >
                    <Copy size={12} />
                  </button>
                  <button className="text-gray-400 hover:text-green-500 transition" title="Good response">
                    <ThumbsUp size={12} />
                  </button>
                  <button className="text-gray-400 hover:text-red-500 transition" title="Poor response">
                    <ThumbsDown size={12} />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-800 text-white rounded-r-lg rounded-tl-lg border border-gray-700 p-3 shadow-sm">
              <div className="flex items-center gap-2">
                <Bot size={14} className="text-blue-400" />
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

       {/* Quick Prompts */}
      {/* <div className="quick-prompts p-4 border-t border-gray-800 bg-gray-900">
        <p className="text-xs text-gray-400 mb-2">Quick prompts:</p>
        <div className="flex flex-wrap gap-2">
          {quickPrompts.map((prompt, index) => (
            <button
              key={index}
              onClick={() => handleQuickPrompt(prompt)}
              className="text-xs bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-full transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div> */}

      {/* Input Area */}
      <div className="input-area p-4 border-t border-gray-800 bg-gray-900">
        <div className="flex gap-2">
          <textarea
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about web development, coding, or tech..."
            className="flex-1 resize-none border border-gray-700 bg-black text-white rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 max-h-24"
            rows="1"
            style={{ minHeight: '44px' }}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
