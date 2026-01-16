// components/NotificationsPanel.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import useNotificationStore from '@/stores/useNotificationStore';
import { getMyNotifications, markNotificationsAsRead } from '@/lib/api';

// Define the shape of our notification data
interface INotification {
  _id: string;
  message: string;
  isRead: boolean;
  link?: string;
  createdAt: string;
  type: 'invitation' | 'event_update' | 'new_event' | 'general';
}

const NotificationItem = ({ notification }: { notification: INotification }) => {
  // A simple time ago function
  const timeAgo = (date: string) => {
    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
    let interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + "d ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + "h ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + "m ago";
    return "Just now";
  };

  const content = (
      <div className={`w-full p-6 bg-[#262626]/50 rounded-2xl border border-[#262626] backdrop-blur-sm flex items-center gap-6 transition-opacity ${notification.isRead ? 'opacity-50' : ''}`}>
        {/* ... Your icon logic can go here based on notification.type ... */}
        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
          {!notification.isRead && <div className="w-2.5 h-2.5 rounded-full bg-blue-400 absolute translate-x-4 -translate-y-4"></div>}
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M4 14.899A7 7 0 0 1 12 2a7 7 0 0 1 8 12.899v3.001A2 2 0 0 1 18 20H6a2 2 0 0 1-2-2v-3.001z"></path></svg>
        </div>
        <div className="flex-grow flex flex-col gap-2">
          <p className="font-space text-base text-white">{notification.message}</p>
          <p className="font-space text-sm text-[#A3A3A3]">{timeAgo(notification.createdAt)}</p>
        </div>
      </div>
  );

  // Make the item clickable if it has a link
  return notification.link ? <Link href={notification.link}>{content}</Link> : content;
};


const NotificationsPanel = () => {
  const { isOpen, close } = useNotificationStore();
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchNotifications = async () => {
    setIsLoading(true);
    try {
      const data = await getMyNotifications();
      setNotifications(data);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch notifications only when the panel is opened
  useEffect(() => {
    if (isOpen) {
      fetchNotifications();
    }
  }, [isOpen]);

  const handleMarkAllAsRead = async () => {
    try {
      await markNotificationsAsRead();
      fetchNotifications(); // Refresh the list
    } catch (error) {
      console.error("Failed to mark notifications as read:", error);
    }
  };

  return (
      <div className={`fixed inset-0 z-50 transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/50" onClick={close}></div>
        <div className={`absolute top-0 right-0 h-full w-full max-w-[673px] bg-black shadow-2xl flex flex-col transition-transform duration-300 ease-in-out border-l border-[#262626] ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex-shrink-0 h-20 px-6 flex items-center justify-between border-b border-[#262626]">
            <h2 className="font-spectral text-3xl font-bold text-white">Notifications</h2>
            <button onClick={handleMarkAllAsRead} className="font-spectral text-base font-bold text-[#A3A3A3] hover:text-white transition-colors">
              Mark all as read
            </button>
          </div>
          <div className="flex-grow p-8 overflow-y-auto space-y-6">
            {isLoading ? (
                <p className="text-center text-gray-400">Loading...</p>
            ) : notifications.length === 0 ? (
                <p className="text-center text-gray-400">You have no new notifications.</p>
            ) : (
                notifications.map(item => <NotificationItem key={item._id} notification={item} />)
            )}
          </div>
        </div>
      </div>
  );
};

export default NotificationsPanel;