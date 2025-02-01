import React from 'react';
import { IdeasGrid } from '@/components/ideas/IdeasGrid';

export default function MyIdeasPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-purple-600 mb-8">My Ideas</h1>
      <IdeasGrid />
    </div>
  );
} 