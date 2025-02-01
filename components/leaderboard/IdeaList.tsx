'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ThumbsUp, MessageCircle, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { IdeaWithStats } from '@/lib/types';

export function IdeaList() {
  const [ideas, setIdeas] = useState<IdeaWithStats[]>([
    {
      id: '1',
      title: 'Smart City Planning',
      description: 'An AI-powered system that optimizes city infrastructure and resource allocation based on real-time data and citizen needs.',
      category: 'Urban Development',
      createdAt: new Date(),
      status: 'in_progress',
      score: 42,
      interactions: 12,
    },
    // Add more sample ideas...
  ]);

  const handleVote = (ideaId: string) => {
    setIdeas(prev =>
      prev.map(idea =>
        idea.id === ideaId
          ? { ...idea, score: idea.score + 1 }
          : idea
      )
    );
  };

  return (
    <div className="space-y-6">
      {ideas.map((idea) => (
        <motion.div
          key={idea.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 shadow-sm"
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                <User className="w-6 h-6 text-purple-600" />
              </div>
            </div>

            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2">{idea.title}</h3>
              <p className="text-gray-600 mb-4">{idea.description}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleVote(idea.id)}
                    className="flex items-center gap-2 text-gray-600 hover:text-purple-600"
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span>{idea.score}</span>
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-2 text-gray-600"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{idea.interactions}</span>
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    {idea.category}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(idea.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
} 