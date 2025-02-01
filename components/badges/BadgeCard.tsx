import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/lib/types';

interface BadgeCardProps {
  badge: Badge;
  isEarned?: boolean;
}

export function BadgeCard({ badge, isEarned = false }: BadgeCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`relative p-4 rounded-xl ${
        isEarned ? 'bg-purple-600' : 'bg-gray-100'
      }`}
    >
      <div className={`text-center space-y-2 ${isEarned ? 'text-white' : 'text-gray-700'}`}>
        <div className="w-16 h-16 mx-auto mb-3">
          <div className="w-full h-full rounded-full bg-white/20 flex items-center justify-center text-2xl">
            {badge.icon}
          </div>
        </div>
        <h3 className="font-semibold">{badge.name}</h3>
        <p className="text-sm opacity-90">{badge.description}</p>
        {isEarned && (
          <div className="mt-2 text-xs">
            Earned on {badge.earnedAt?.toLocaleDateString()}
          </div>
        )}
      </div>
    </motion.div>
  );
} 