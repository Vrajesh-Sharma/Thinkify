'use client';

import React from 'react';
import { TrendingUp, ThumbsUp, MessageSquare, Award } from 'lucide-react';
import { motion } from 'framer-motion';

interface Idea {
  id: string;
  title: string;
  description: string;
  author: {
    name: string;
    avatar: string;
  };
  likes: number;
  comments: number;
  category: string;
  trending_score: number;
}

export function TrendingIdeas() {
  // Mock data - replace with real data from your backend
  const trendingIdeas: Idea[] = [
    {
      id: '1',
      title: 'AI-Powered Smart City Infrastructure',
      description: 'Using artificial intelligence to optimize city resources and improve citizen life quality.',
      author: {
        name: 'John Doe',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      },
      likes: 156,
      comments: 32,
      category: 'Technology',
      trending_score: 98,
    },
    // Add more mock ideas here
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="h-6 w-6 text-purple-500" />
        <h2 className="text-2xl font-bold">Trending Ideas</h2>
      </div>

      <div className="space-y-6">
        {trendingIdeas.map((idea) => (
          <motion.div
            key={idea.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="border rounded-lg p-4 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">{idea.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{idea.description}</p>
                
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="h-4 w-4" />
                    {idea.likes}
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4" />
                    {idea.comments}
                  </div>
                  <span className="text-purple-500 font-medium">{idea.category}</span>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <Award className="h-6 w-6 text-yellow-500 mb-1" />
                <span className="text-sm font-bold text-yellow-500">
                  #{idea.trending_score}
                </span>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <img
                src={idea.author.avatar}
                alt={idea.author.name}
                className="w-6 h-6 rounded-full"
              />
              <span className="text-sm text-gray-600">{idea.author.name}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6">
        <button className="w-full py-2 text-center text-purple-600 hover:text-purple-700 font-medium">
          View All Trending Ideas
        </button>
      </div>
    </div>
  );
} 