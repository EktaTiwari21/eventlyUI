// app/organizer/dashboard/page.tsx
'use client';

import { useState, useEffect } from 'react';
import useUserStore from '@/stores/useUserStore';
import { getMyEvents, getRecentActivities } from '@/lib/api';

interface IActivity {
  _id: string;
  message: string;
  type: 'ticket' | 'event' | 'payment';
  createdAt: string;
}

const RecentActivityItem = ({ type, description, time }: { type: 'ticket' | 'event' | 'payment'; description: string; time: string; }) => {
  let icon;
  let iconColor;
  if (type === 'ticket') {
    icon = <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14.899A7 7 0 0 1 12 2a7 7 0 0 1 8 12.899v3.001A2 2 0 0 1 18 20H6a2 2 0 0 1-2-2v-3.001zM12 7h.01M16 7h.01M8 7h.01M9 13h6"></path></svg>;
    iconColor = 'text-blue-400';
  } else if (type === 'event') {
    icon = <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>;
    iconColor = 'text-green-400';
  } else if (type === 'payment') {
    icon = <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>;
    iconColor = 'text-yellow-400';
  }
  return (
      <div className="flex items-start gap-4 p-4 border-b border-white/10 last:border-b-0">
        <div className={`flex-shrink-0 ${iconColor}`}>{icon}</div>
        <div>
          <p className="text-white text-base">{description}</p>
          <p className="text-gray-400 text-sm">{time}</p>
        </div>
      </div>
  );
};

const timeAgo = (date: string) => {
  const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
  if (seconds < 60) return "Just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
};


const DashboardPage = () => {
  const { fullName } = useUserStore();
  const [stats, setStats] = useState({ totalTicketsSold: 0, activeEvents: 0, totalRevenue: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [recentActivities, setRecentActivities] = useState<IActivity[]>([]);

  useEffect(() => {
    const fetchOrganizerData = async () => {
      try {
        const [myEvents, activities] = await Promise.all([
          getMyEvents(),
          getRecentActivities()
        ]);

        const totalTicketsSold = myEvents.reduce((acc: number, event: any) => acc + event.ticketsSold, 0);
        const activeEvents = myEvents.length;
        const totalRevenue = myEvents.reduce((acc: number, event: any) => acc + (event.ticketsSold * event.ticketPrice), 0);

        setStats({ totalTicketsSold, activeEvents, totalRevenue });
        setRecentActivities(activities);

      } catch (err) {
        console.error("Failed to fetch organizer data:", err);
        setError("Could not load your dashboard data.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrganizerData();
  }, []);

  const formatCurrency = (amount: number) => `₹${new Intl.NumberFormat('en-IN').format(amount)}`;

  return (
      <div className="bg-black min-h-screen text-white">
        <div className="container mx-auto px-4 lg:px-20 py-12">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold font-spectral">Welcome, {fullName || 'Organizer'}!</h1>
            <p className="text-gray-400 text-lg mt-2">Ready to revolutionize your events?</p>
          </div>

          {isLoading ? (
              <p className="text-center text-gray-400">Loading dashboard...</p>
          ) : error ? (
              <p className="text-center text-red-500">{error}</p>
          ) : (
              // --- THIS IS THE CORRECTED STATS GRID ---
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-[#121212] p-6 rounded-2xl border border-white/10 shadow-lg text-center">
                  <p className="text-gray-400 text-lg mb-2">Total Tickets Sold</p>
                  <p className="text-white text-4xl font-bold font-spectral">{stats.totalTicketsSold.toLocaleString('en-IN')}</p>
                </div>
                <div className="bg-[#121212] p-6 rounded-2xl border border-white/10 shadow-lg text-center">
                  <p className="text-gray-400 text-lg mb-2">Active Events</p>
                  <p className="text-white text-4xl font-bold font-spectral">{stats.activeEvents}</p>
                </div>
                <div className="bg-[#121212] p-6 rounded-2xl border border-white/10 shadow-lg text-center">
                  <p className="text-gray-400 text-lg mb-2">Total Revenue</p>
                  <p className="text-white text-4xl font-bold font-spectral">{formatCurrency(stats.totalRevenue)}</p>
                </div>
              </div>
          )}

          <h2 className="text-3xl font-bold mb-6 font-spectral">Recent Activities</h2>
          <div className="bg-[#121212] rounded-2xl border border-white/10 shadow-lg overflow-hidden">
            {isLoading ? (
                <p className="text-center text-gray-400 p-8">Loading activities...</p>
            ) : recentActivities.length === 0 ? (
                <p className="text-center text-gray-400 p-8">No recent activities to show.</p>
            ) : (
                recentActivities.map((activity) => (
                    <RecentActivityItem
                        key={activity._id}
                        type={activity.type}
                        description={activity.message}
                        time={timeAgo(activity.createdAt)}
                    />
                ))
            )}
          </div>
        </div>
      </div>
  );
};

export default DashboardPage;