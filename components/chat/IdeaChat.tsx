'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { analyzeIdea, type AIAnalysis } from '@/lib/ai-service';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  isAnalysis?: boolean;
  isProcessing?: boolean;
}

interface IdeaChatProps {
  onComplete: (idea: { title: string; description: string; aiAnalysis: AIAnalysis }) => void;
  onClose: () => void;
}

export function IdeaChat({ onComplete, onClose }: IdeaChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! Please share your idea with me, and I\'ll help you develop it further.'
    }
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async () => {
    if (!input.trim() || isProcessing) return;

    // Add user message
    const userMessage = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsProcessing(true);

    try {
      const analysis = await analyzeIdea(input);
      
      // Add AI response
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: analysis.content,
      }]);

      // Create the idea
      onComplete({
        title: input.split('\n')[0].slice(0, 50), // First line as title
        description: input,
        aiAnalysis: analysis
      });
    } catch (error) {
      console.error('Error in chat:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'I apologize, but I encountered an error while processing your idea. Please try again.'
      }]);
    } finally {
      setIsProcessing(false);
    }
  };

  const formatMarkdown = (text: string) => {
    return text
      .split('\n')
      .map((line, i) => {
        // Handle headings (###)
        if (line.trim().startsWith('###')) {
          return (
            <h3 key={i} className="text-lg font-bold text-purple-800 mt-4 mb-2">
              {line.replace(/^###\s*/, '').trim()}
            </h3>
          );
        }

        // Handle regular text with bold
        const parts = line.split(/(\*\*.*?\*\*)/g);
        const formattedParts = parts.map((part, j) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={j}>{part.slice(2, -2)}</strong>;
          }
          return part;
        });

        return (
          <p key={i} className="text-gray-700 my-1">
            {formattedParts}
          </p>
        );
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <div className="bg-white rounded-xl w-full max-w-2xl h-[80vh] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">Share Your Idea</h2>
          <p className="text-sm text-gray-500">Chat with AI to develop your idea</p>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-start gap-3 ${
                message.role === 'assistant' ? 'justify-start' : 'justify-end'
              }`}
            >
              {message.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-purple-600" />
                </div>
              )}
              <div
                className={`rounded-lg p-3 max-w-[80%] ${
                  message.role === 'assistant'
                    ? 'bg-gray-100'
                    : 'bg-purple-100 text-purple-900'
                }`}
              >
                {message.isProcessing ? (
                  <div className="flex items-center gap-2 text-gray-500">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {message.content}
                  </div>
                ) : (
                  <div className="prose prose-sm max-w-none">
                    {formatMarkdown(message.content)}
                  </div>
                )}
              </div>
              {message.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                  <User className="w-5 h-5 text-purple-600" />
                </div>
              )}
            </div>
          ))}
          {isProcessing && (
            <div className="flex items-center gap-2 text-gray-500">
              <Loader2 className="w-4 h-4 animate-spin" />
              Processing...
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your idea here..."
              className="flex-1 resize-none"
              rows={3}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
            />
            <Button
              onClick={handleSubmit}
              disabled={!input.trim() || isProcessing}
              className="self-end"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 