'use client';

import React, { useState } from 'react';
import { Plus, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { IdeaChat } from '@/components/chat/IdeaChat';
import type { AIAnalysis } from '@/lib/ai-service';
import { IoMdClose } from "react-icons/io";

interface Idea {
  id: string;
  title: string;
  description: string;
  category: string;
  createdAt: Date;
  status: 'draft' | 'in_progress' | 'completed';
  aiAnalysis?: AIAnalysis;
}

export function IdeaDashboard() {
  const [ideas, setIdeas] = useState<Idea[]>([
    {
      id: '1',
      title: 'Smart City Planning',
      description: 'An AI-powered system that optimizes city infrastructure and resource allocation based on real-time data and citizen needs.',
      category: 'Urban Development',
      createdAt: new Date(),
      status: 'in_progress',
    },
  ]);

  const [isAddingIdea, setIsAddingIdea] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState<Idea | null>(null);

  const handleIdeaComplete = (newIdea: { title: string; description: string; aiAnalysis: AIAnalysis }) => {
    const idea: Idea = {
      id: Date.now().toString(),
      title: newIdea.title,
      description: newIdea.description,
      category: newIdea.aiAnalysis.category,
      createdAt: new Date(),
      status: 'draft',
      aiAnalysis: newIdea.aiAnalysis,
    };
    setIdeas([idea, ...ideas]);
    setIsAddingIdea(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">Your Ideas</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* New Idea Card */}
        <motion.div
          className="relative h-64 rounded-xl border-2 border-dashed border-gray-300 hover:border-purple-400 transition-colors cursor-pointer bg-gray-50 hover:bg-gray-100"
          onClick={() => setIsAddingIdea(true)}
          whileHover={{ scale: 1.02 }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Plus className="h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-500">Add New Idea</p>
          </div>
        </motion.div>

        {/* Existing Idea Cards */}
        {ideas.map((idea) => (
          <motion.div
            key={idea.id}
            className="relative h-64 rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer p-6"
            onClick={() => setSelectedIdea(idea)}
            whileHover={{ scale: 1.02 }}
          >
            <div className="h-full flex flex-col">
              <h3 className="text-xl font-semibold mb-2 line-clamp-2">{idea.title}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">{idea.description}</p>
              <div className="mt-auto">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  {idea.category}
                </span>
                <div className="mt-2 text-xs text-gray-500">
                  Created {new Date(idea.createdAt).toLocaleDateString()}
                </div>
              </div>
              <ChevronRight className="absolute bottom-4 right-4 h-5 w-5 text-gray-400" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Chat Interface */}
      <AnimatePresence>
        {isAddingIdea && (
          <IdeaChat
            onComplete={handleIdeaComplete}
            onClose={() => setIsAddingIdea(false)}
          />
        )}
      </AnimatePresence>

      {/* Idea Details Modal */}
      <AnimatePresence>
        {selectedIdea && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">{selectedIdea.title}</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedIdea(null)}
                  className=''
                >
                  <IoMdClose className='fixed ' /> 

                </Button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-gray-600">{selectedIdea.description}</p>
                </div>

                {selectedIdea.aiAnalysis && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">AI Analysis</h3>
                    <div className="prose prose-sm">
                      {selectedIdea.aiAnalysis.content.split('\n').map((line, i) => {
                        // Handle headings (###)
                        if (line.trim().startsWith('###')) {
                          return (
                            <h4 key={i} className="text-md font-bold text-purple-800 mt-4 mb-2">
                              {line.replace(/^###\s*/, '').trim()}
                            </h4>
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
                      })}
                    </div>
                  </div>
                )}

                {/* <div className="flex items-center gap-4">
                  <div>
                    <span className="text-sm text-gray-500">Category</span>
                    <div className="mt-1">
                      <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                        {selectedIdea.category}
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Status</span>
                    <div className="mt-1">
                      <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        {selectedIdea.status.replace('_', ' ').charAt(0).toUpperCase() + selectedIdea.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div> */}

                <div className="border-t pt-6">
                  <Button
                    className="w-full"
                    onClick={() => setSelectedIdea(null)}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 