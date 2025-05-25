'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, MessageCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

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
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

      if (!response.ok) {
        throw new Error('Failed to fetch response');
      }

      const data = await response.json();
      
      const aiResponse = {
        id: Date.now() + 1,
        text: data.reply,
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: "Sorry, I encountered an error. Please try again.",
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

  const quickQuestions = [
    "What are Rahul's skills?",
    "Tell me about his projects",
    "What's his experience?",
    "Why Europe?",
    "Languages spoken?"
  ];

  return (
    <div className="min-h-[600px] bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4 rounded-2xl shadow-2xl">
      <div className="h-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="text-yellow-400 w-8 h-8" />
            <h2 className="text-3xl font-bold text-white">RahulAI Assistant</h2>
            <Sparkles className="text-yellow-400 w-8 h-8" />
          </div>
          <p className="text-blue-200 text-lg">
            Ask me anything about Rahul's skills, projects, or experience!
          </p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <MessageCircle className="text-green-400 w-5 h-5" />
            <span className="text-green-400 text-sm font-medium">Online & Ready to Chat</span>
          </div>
        </div>

        {/* Chat Container */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20">
          {/* Messages Area */}
          <div className="h-96 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`flex items-start gap-3 max-w-[80%] ${message.isBot ? '' : 'flex-row-reverse'}`}>
                  {/* Avatar */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.isBot 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
                      : 'bg-gradient-to-r from-blue-500 to-cyan-500'
                  }`}>
                    {message.isBot ? <Bot className="w-5 h-5 text-white" /> : <User className="w-5 h-5 text-white" />}
                  </div>
                  
                  {/* Message Bubble */}
                  <div className={`rounded-2xl p-4 shadow-lg ${
                    message.isBot
                      ? 'bg-white/90 text-gray-800'
                      : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                  }`}>
                    <ReactMarkdown
                      components={{
                        code({node, inline, className, children, ...props}) {
                          const match = /language-(\w+)/.exec(className || '');
                          return !inline && match ? (
                            <SyntaxHighlighter
                              language={match[1]}
                              style={atomDark}
                              PreTag="div"
                              {...props}
                            >
                              {String(children).replace(/\n$/, '')}
                            </SyntaxHighlighter>
                          ) : (
                            <code className={className} {...props}>
                              {children}
                            </code>
                          );
                        },
                      }}
                    >
                      {message.text}
                    </ReactMarkdown>
                    <p className={`text-xs mt-2 ${message.isBot ? 'text-gray-500' : 'text-blue-100'}`}>
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Loading Animation */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-white/90 rounded-2xl p-4">
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
          <div className="border-t border-white/20 p-4">
            <div className="flex gap-3">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about Rahul's skills, projects, or experience..."
                className="flex-1 bg-white/20 text-white placeholder-white/60 rounded-xl px-4 py-3 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !inputMessage.trim()}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-500 disabled:to-gray-600 text-white rounded-xl px-6 py-3 font-medium transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
                Send
              </button>
            </div>
            
            {/* Quick Questions */}
            <div className="mt-3 flex flex-wrap gap-2">
              {quickQuestions.map((question) => (
                <button
                  key={question}
                  onClick={() => setInputMessage(question)}
                  className="bg-white/20 hover:bg-white/30 text-white text-xs px-3 py-1 rounded-full border border-white/30 transition-all duration-200"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-white/60 text-sm">
            🎯 Powered by RahulAI - Your personal guide to Rahul's professional journey
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
