import React from 'react';
import { TrendingIdeas } from '@/components/trending/TrendingIdeas';
import { Leaderboard } from '@/components/leaderboard/Leaderboard';
import { IdeaList } from '@/components/leaderboard/IdeaList';
import { UserStats } from '@/lib/types';

export default function LeaderboardPage() {
  const mockUsers: UserStats[] = [
    {
      userId: '1',
      username: 'John Doe',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      totalIdeas: 8,
      completedIdeas: 5,
      totalBadges: 3,
      score: 156,
    },
    {
      userId: '2',
      username: 'Jane Smith',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
      totalIdeas: 6,
      completedIdeas: 4,
      totalBadges: 2,
      score: 142,
    },
    {
      userId: '3',
      username: 'Mike Johnson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
      totalIdeas: 5,
      completedIdeas: 3,
      totalBadges: 2,
      score: 128,
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-purple-600 mb-8">Community Leaderboard</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Top Ideas */}
        <div className="lg:col-span-2">
          <IdeaList />
        </div>

        {/* Leaderboard */}
        <div className="lg:col-span-1">
          <div className="sticky top-6">
            <Leaderboard users={mockUsers} />
          </div>
        </div>
      </div>
    </div>
  );
} 