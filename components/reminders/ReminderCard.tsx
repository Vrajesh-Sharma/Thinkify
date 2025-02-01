import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Check, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Reminder } from '@/lib/types';

interface ReminderCardProps {
  reminder: Reminder;
  onComplete: (id: string) => void;
}

export function ReminderCard({ reminder, onComplete }: ReminderCardProps) {
  const isOverdue = new Date(reminder.dueDate) < new Date();

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`p-4 rounded-xl border ${
        reminder.isCompleted
          ? 'bg-gray-50 border-gray-200'
          : isOverdue
          ? 'bg-red-50 border-red-200'
          : 'bg-white border-purple-200'
      }`}
    >
      <div className="flex items-start gap-4">
        <div className={`p-2 rounded-full ${
          reminder.isCompleted
            ? 'bg-gray-100'
            : isOverdue
            ? 'bg-red-100'
            : 'bg-purple-100'
        }`}>
          <Bell className="w-5 h-5 text-gray-600" />
        </div>
        
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{reminder.title}</h3>
          <p className="text-sm text-gray-600 mt-1">{reminder.description}</p>
          
          <div className="flex items-center gap-2 mt-3 text-sm text-gray-500">
            <Calendar className="w-4 h-4" />
            <span>Due {new Date(reminder.dueDate).toLocaleDateString()}</span>
          </div>
        </div>

        {!reminder.isCompleted && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onComplete(reminder.id)}
            className="hover:bg-green-100"
          >
            <Check className="w-5 h-5 text-green-600" />
          </Button>
        )}
      </div>
    </motion.div>
  );
} 