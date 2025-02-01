export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  criteria: string;
  earnedAt?: Date;
}

export interface Reminder {
  id: string;
  ideaId: string;
  userId: string;
  title: string;
  description: string;
  dueDate: Date;
  isCompleted: boolean;
  createdAt: Date;
}

export interface UserStats {
  userId: string;
  username: string;
  avatar?: string;
  totalIdeas: number;
  completedIdeas: number;
  totalBadges: number;
  score: number;
}

export interface IdeaWithStats {
  id: string;
  title: string;
  description: string;
  category: string;
  createdAt: Date;
  status: 'draft' | 'in_progress' | 'completed';
  aiAnalysis?: AIAnalysis;
  score: number;
  interactions: number;
} 