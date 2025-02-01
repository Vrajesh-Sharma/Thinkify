'use client';

import { IdeaDashboard } from '@/components/dashboard/IdeaDashboard';
import { NotificationHub } from '@/components/notifications/NotificationHub';
import { TrendingIdeas } from '@/components/ideas/TrendingIdeas';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      {/* <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-purple-600">Thinkify</h1>
            </div>
            <div className="flex items-center gap-4">
              <NotificationHub />
            </div>
          </div>
        </div>
      </header> */}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Dashboard Area */}
          <div className="lg:col-span-3">
            <IdeaDashboard />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <TrendingIdeas />
            {/* Add other sidebar components here */}
          </div>
        </div>
      </main>
    </div>
  );
}