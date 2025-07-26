'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, MessageCircle, Shuffle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
  model?: string; // Add model information
}

// Base questions that will be shuffled - moved outside component to prevent re-creation
const baseQuestions = [
  "What are Rahul's skills?",
  "Tell me about his projects", 
  "What's his experience?",
  "Why Europe?",
  "Languages spoken?",
  "What's he working on now?",
  "His educational background?",
  "Machine learning expertise?",
  "Computer vision projects?",
  "YOLO experience?",
  "Berlin experience?",
  "Career goals?"
];

const ChatBox = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm RahulAI, trained on Rahul Bedjavalge's portfolio data. Ask me anything about his skills, projects, or experience!",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [quickQuestions, setQuickQuestions] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Shuffle questions on component mount and when user clicks shuffle
  const shuffleQuestions = () => {
    const shuffled = [...baseQuestions].sort(() => Math.random() - 0.5);
    setQuickQuestions(shuffled.slice(0, 6)); // Show 6 random questions
  };

  useEffect(() => {
    shuffleQuestions(); // Initial shuffle on mount
  }, []); // Only run once on mount

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: inputMessage }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch response');
      }
      
      const aiResponse = {
        id: Date.now() + 1,
        text: data.reply,
        isBot: true,
        timestamp: new Date(),
        model: data.model // Include model information
      };
      
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: error instanceof Error ? error.message : "Sorry, I encountered an error. Please try again.",
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuestionClick = (question: string) => {
    setInputMessage(question);
    // Auto-send the question for better UX
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-2 sm:p-4 lg:p-8 flex items-center justify-center">
      <div className="w-full max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-4 sm:mb-6 lg:mb-8">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2 sm:mb-4">
            <Sparkles className="text-yellow-400 w-6 h-6 sm:w-8 sm:h-8" />
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">RahulAI Assistant</h2>
            <Sparkles className="text-yellow-400 w-6 h-6 sm:w-8 sm:h-8" />
          </div>
          <p className="text-blue-200 text-sm sm:text-base lg:text-lg px-4">
            Ask me anything about Rahul&apos;s skills, projects, or experience!
          </p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <MessageCircle className="text-green-400 w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-green-400 text-xs sm:text-sm font-medium">Online & Ready to Chat</span>
          </div>
        </div>

        {/* Chat Container */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl sm:rounded-3xl shadow-2xl border border-white/20">
          {/* Messages Area */}
          <div className="h-[50vh] sm:h-[55vh] lg:h-[60vh] overflow-y-auto p-3 sm:p-4 lg:p-6 space-y-3 sm:space-y-4 chat-scroll">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'} animate-fade-in`}
              >
                <div className={`flex items-start gap-2 sm:gap-3 max-w-[85%] sm:max-w-[80%] ${message.isBot ? '' : 'flex-row-reverse'}`}>
                  {/* Avatar */}
                  <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.isBot 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
                      : 'bg-gradient-to-r from-blue-500 to-cyan-500'
                  }`}>
                    {message.isBot ? <Bot className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" /> : <User className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" />}
                  </div>
                  
                  {/* Message Bubble */}
                  <div className={`rounded-lg sm:rounded-xl lg:rounded-2xl p-2 sm:p-3 lg:p-4 shadow-lg ${
                    message.isBot
                      ? 'bg-white/90 text-gray-800'
                      : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                  }`}>
                    <div className="prose prose-sm sm:prose prose-invert max-w-none">
                      <ReactMarkdown
                        components={{
                          code({ className, children}) {
                            const match = /language-(\w+)/.exec(className || '');
                            const isInline = !match;
                            return isInline ? (
                              <code className="bg-black/20 px-1 py-0.5 rounded text-xs sm:text-sm">
                                {children}
                              </code>
                            ) : (
                              <SyntaxHighlighter
                                language={match[1]}
                                style={atomDark}
                                PreTag="div"
                              >
                                {String(children).replace(/\n$/, '')}
                              </SyntaxHighlighter>
                            );
                          },
                          p: ({ children }) => <p className="mb-1 sm:mb-2 last:mb-0 text-sm sm:text-base">{children}</p>,
                          ul: ({ children }) => <ul className="list-disc list-inside mb-1 sm:mb-2 text-sm sm:text-base">{children}</ul>,
                          ol: ({ children }) => <ol className="list-decimal list-inside mb-1 sm:mb-2 text-sm sm:text-base">{children}</ol>,
                          li: ({ children }) => <li className="mb-0.5 sm:mb-1">{children}</li>,
                          h1: ({ children }) => <h1 className="text-base sm:text-lg lg:text-xl font-bold mb-1 sm:mb-2">{children}</h1>,
                          h2: ({ children }) => <h2 className="text-sm sm:text-base lg:text-lg font-bold mb-1 sm:mb-2">{children}</h2>,
                          h3: ({ children }) => <h3 className="text-sm sm:text-base font-bold mb-1 sm:mb-2">{children}</h3>,
                        }}
                      >
                        {message.text}
                      </ReactMarkdown>
                    </div>
                    <p className={`text-xs mt-1 sm:mt-2 ${message.isBot ? 'text-gray-500' : 'text-blue-100'}`}>
                      {message.timestamp.toLocaleTimeString()}
                      {message.model && message.isBot && (
                        <span className="ml-2 opacity-60">
                          via {message.model.split('/')[1]?.split(':')[0] || message.model}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Loading Animation */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                    <Bot className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" />
                  </div>
                  <div className="bg-white/90 rounded-lg sm:rounded-xl lg:rounded-2xl p-2 sm:p-3 lg:p-4">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-white/20 p-3 sm:p-4 lg:p-6">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about Rahul&apos;s skills, projects, or experience..."
                className="flex-1 bg-white/20 text-white placeholder-white/60 rounded-xl px-3 py-2 sm:px-4 sm:py-3 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent text-sm sm:text-base"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !inputMessage.trim()}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-500 disabled:to-gray-600 text-white rounded-xl px-4 py-2 sm:px-6 sm:py-3 font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:cursor-not-allowed text-sm sm:text-base min-w-[80px] sm:min-w-[100px]"
              >
                <Send className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Send</span>
              </button>
            </div>
            
            {/* Enhanced Quick Questions with Shuffle */}
            <div className="mt-3 sm:mt-4">
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <h3 className="text-white/80 text-xs sm:text-sm font-medium">💡 Try asking:</h3>
                <button
                  onClick={shuffleQuestions}
                  className="flex items-center gap-1 text-white/60 hover:text-white/80 text-xs sm:text-sm px-2 py-1 rounded-lg hover:bg-white/10 transition-all duration-200"
                  title="Shuffle questions"
                >
                  <Shuffle className="w-3 h-3" />
                  <span className="hidden sm:inline">Shuffle</span>
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {quickQuestions.map((question, index) => (
                  <button
                    key={`${question}-${index}`}
                    onClick={() => handleQuestionClick(question)}
                    disabled={isLoading}
                    className="bg-gradient-to-r from-white/15 to-white/10 hover:from-white/25 hover:to-white/20 disabled:from-white/5 disabled:to-white/5 text-white text-xs sm:text-sm px-3 py-2 sm:px-4 sm:py-2 rounded-xl border border-white/20 hover:border-white/30 transition-all duration-200 font-medium shadow-sm hover:shadow-md disabled:cursor-not-allowed text-left min-h-[2.5rem] sm:min-h-[3rem] flex items-center justify-center text-center"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-4 sm:mt-6">
          <p className="text-white/60 text-xs sm:text-sm px-4">
            🎯 Powered by RahulAI - Your personal guide to Rahul&apos;s professional journey
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
