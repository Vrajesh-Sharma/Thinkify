'use client';

import React, { useState } from 'react';
import { Calendar, Clock, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';

interface ReminderSettings {
  frequency: 'daily' | 'weekly' | 'monthly' | 'custom';
  customDays?: number;
  time?: string;
  notifications: boolean;
}

export function IdeaReminder({ ideaId, ideaTitle }: { ideaId: string; ideaTitle: string }) {
  const [settings, setSettings] = useState<ReminderSettings>({
    frequency: 'weekly',
    notifications: true,
  });

  const handleSaveReminder = () => {
    // TODO: Implement reminder saving logic
    console.log('Saving reminder settings:', settings);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <Bell className="h-5 w-5 text-blue-500" />
        <h3 className="font-semibold">Reminder Settings for "{ideaTitle}"</h3>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Review Frequency</Label>
          <Select
            value={settings.frequency}
            onValueChange={(value: any) =>
              setSettings({ ...settings, frequency: value })
            }
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="custom">Custom</option>
          </Select>
        </div>

        {settings.frequency === 'custom' && (
          <div>
            <Label>Custom Days</Label>
            <Input
              type="number"
              min="1"
              value={settings.customDays || ''}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  customDays: parseInt(e.target.value),
                })
              }
              placeholder="Enter number of days"
            />
          </div>
        )}

        <div>
          <Label>Preferred Time</Label>
          <Input
            type="time"
            value={settings.time || ''}
            onChange={(e) =>
              setSettings({ ...settings, time: e.target.value })
            }
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="notifications"
            checked={settings.notifications}
            onChange={(e) =>
              setSettings({
                ...settings,
                notifications: e.target.checked,
              })
            }
          />
          <Label htmlFor="notifications">
            Enable notifications
          </Label>
        </div>

        <Button
          className="w-full"
          onClick={handleSaveReminder}
        >
          Save Reminder Settings
        </Button>
      </div>

      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-600">
          <span className="font-medium">Pro tip:</span> Regular review of your ideas
          helps in refining them and keeping the momentum going!
        </p>
      </div>
    </div>
  );
} 