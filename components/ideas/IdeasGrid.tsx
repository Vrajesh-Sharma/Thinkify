'use client';

import React, { useState } from 'react';
import { Plus, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { IdeaChat } from '@/components/chat/IdeaChat';
import { IoMdClose } from "react-icons/io";
import type { AIAnalysis } from '@/lib/ai-service';

interface Idea {
  id: string;
  title: string;
  description: string;
  category: string;
  createdAt: Date;
  status: 'draft' | 'in_progress' | 'completed';
  aiAnalysis?: AIAnalysis;
}

export function IdeasGrid() {
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
    <div>
      <div className="flex justify-end mb-6">
        <Button
          onClick={() => setIsAddingIdea(true)}
          className="bg-purple-600 text-white hover:bg-purple-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          New Idea
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                >
                  <IoMdClose className="w-6 h-6" />
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
                      {selectedIdea.aiAnalysis.content}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 