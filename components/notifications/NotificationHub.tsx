'use client';

import React, { useEffect, useState } from 'react';
import { Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'idea' | 'reminder' | 'trending' | 'achievement';
  timestamp: Date;
}

export function NotificationHub() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // TODO: Connect to WebSocket here
    const mockNotification = {
      id: Date.now().toString(),
      title: 'New Insight Available',
      message: 'AI has generated new perspectives for your idea "Smart City Planning"',
      type: 'idea',
      timestamp: new Date(),
    };

    // Mock notification for demo
    const timer = setInterval(() => {
      setNotifications(prev => [mockNotification, ...prev]);
      setUnreadCount(prev => prev + 1);
    }, 30000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="relative"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed md:absolute right-0 mt-2 w-full md:w-80 bg-white rounded-lg shadow-lg border border-gray-200 max-h-[90vh] md:max-h-96 overflow-y-auto z-50"
            style={{
              top: "4rem",
              left: 0,
              right: 0,
              bottom: 0,
            }}
          >
            <div className="p-4 bg-white">
              <h3 className="font-semibold text-lg mb-4">Notifications</h3>
              {notifications.length === 0 ? (
                <p className="text-gray-500 text-center">No notifications yet</p>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="mb-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <h4 className="font-medium">{notification.title}</h4>
                    <p className="text-sm text-gray-600">{notification.message}</p>
                    <span className="text-xs text-gray-400">
                      {new Date(notification.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 