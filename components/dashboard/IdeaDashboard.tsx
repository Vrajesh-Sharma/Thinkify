'use client';

import React, { useState } from 'react';
import { Badge, Reminder } from '@/lib/types';
import { BadgeCard } from '@/components/badges/BadgeCard';
import { ReminderCard } from '@/components/reminders/ReminderCard';
import { CategoryPieChart } from '@/components/dashboard/CategoryPieChart';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export function IdeaDashboard() {
  const [badges, setBadges] = useState<Badge[]>([
    {
      id: '1',
      name: 'Idea Pioneer',
      description: 'Submit your first idea',
      icon: '🌟',
      criteria: 'Submit 1 idea',
      earnedAt: new Date(),
    },
    {
      id: '2',
      name: 'Innovation Master',
      description: 'Complete 5 ideas',
      icon: '🏆',
      criteria: 'Complete 5 ideas',
    },
  ]);

  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: '1',
      ideaId: '1',
      userId: '1',
      title: 'Review Smart City Planning',
      description: 'Update the implementation timeline',
      dueDate: new Date(Date.now() + 86400000), // Tomorrow
      isCompleted: false,
      createdAt: new Date(),
    },
  ]);

  const [isAddingReminder, setIsAddingReminder] = useState(false);
  const [newReminder, setNewReminder] = useState({
    title: '',
    description: '',
    dueDate: new Date().toISOString().split('T')[0], // Today's date in YYYY-MM-DD format
  });

  const categoryData = [
    { name: 'Technology', value: 5, color: '#8b5cf6' },
    { name: 'Business', value: 3, color: '#ec4899' },
    { name: 'Education', value: 2, color: '#14b8a6' },
    { name: 'Healthcare', value: 4, color: '#f59e0b' },
  ];

  const handleCompleteReminder = (id: string) => {
    setReminders(prev =>
      prev.map(reminder =>
        reminder.id === id ? { ...reminder, isCompleted: true } : reminder
      )
    );
  };

  const handleAddReminder = () => {
    setIsAddingReminder(true);
  };

  const handleSubmitReminder = () => {
    const reminder: Reminder = {
      id: Date.now().toString(),
      ideaId: '0',
      userId: '1',
      title: newReminder.title,
      description: newReminder.description,
      dueDate: new Date(newReminder.dueDate),
      isCompleted: false,
      createdAt: new Date(),
    };

    setReminders(prev => [...prev, reminder]);
    setIsAddingReminder(false);
    setNewReminder({
      title: '',
      description: '',
      dueDate: new Date().toISOString().split('T')[0],
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-purple-600 mb-8">Dashboard</h1>

      <div className="space-y-6">
        {/* Row 1: Pie Chart and Badges */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Category Chart */}
          <div className="bg-white rounded-xl shadow-sm">
            <CategoryPieChart data={categoryData} /> 
          </div>

          {/* Badges Section */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Your Badges</h2>
            <div className="grid grid-cols-2 gap-4">
              {badges.map((badge) => (
                <BadgeCard
                  key={badge.id}
                  badge={badge}
                  isEarned={!!badge.earnedAt}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Row 2: Reminders */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Reminders</h2>
            <Button
              onClick={handleAddReminder}
              className="bg-purple-600 text-white hover:bg-purple-700"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Reminder
            </Button>
          </div>
          <div className="space-y-4">
            {reminders.map((reminder) => (
              <ReminderCard
                key={reminder.id}
                reminder={reminder}
                onComplete={handleCompleteReminder}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Add Reminder Modal */}
      <AnimatePresence>
        {isAddingReminder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl p-6 w-full max-w-md"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Add New Reminder</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsAddingReminder(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Title</label>
                  <Input
                    value={newReminder.title}
                    onChange={(e) => setNewReminder(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter reminder title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <Textarea
                    value={newReminder.description}
                    onChange={(e) => setNewReminder(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Enter reminder description"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Due Date</label>
                  <Input
                    type="date"
                    value={newReminder.dueDate}
                    onChange={(e) => setNewReminder(prev => ({ ...prev, dueDate: e.target.value }))}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setIsAddingReminder(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-purple-600 text-white hover:bg-purple-700"
                    onClick={handleSubmitReminder}
                    disabled={!newReminder.title || !newReminder.description}
                  >
                    Add Reminder
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