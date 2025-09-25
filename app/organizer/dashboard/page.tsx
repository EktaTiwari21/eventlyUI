// app/(organizer)/dashboard/page.tsx
'use client';

import useUserStore from '@/stores/useUserStore';

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
      <div className={`flex-shrink-0 ${iconColor}`}>
        {icon}
      </div>
      <div>
        <p className="text-white text-base">{description}</p>
        <p className="text-gray-400 text-sm">{time}</p>
      </div>
    </div>
  );
};


const DashboardPage = () => {
  const { fullName } = useUserStore();

  const dashboardStats = [
    { label: 'Total Tickets Sold', value: '12,348' },
    { label: 'Active Events', value: '8' },
    { label: 'Total Revenue', value: '₹30,180' },
  ];

  const recentActivities = [
    { type: 'ticket', description: "Ticket purchased for 'Summer Music Fest'", time: '2 hours ago' },
    { type: 'event', description: "New event 'Tech Conference 2024' created", time: 'Yesterday' },
    { type: 'payment', description: "Payment received for 'Art Exhibition'", time: '2 days ago' },
    { type: 'ticket', description: "Ticket purchased by Ethan Harper on Tech Conference 2024", time: '3 days ago' },
    { type: 'event', description: "New event created: Marketing Summit 2024", time: '4 days ago' },
  ];

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="container mx-auto px-4 lg:px-20 py-12">

        {/* --- CHANGE: Added 'text-center' to this container --- */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold font-spectral">Welcome, {fullName || 'Jayesh Thakkar'}!</h1>
          <p className="text-gray-400 text-lg mt-2">Ready to revolutionize your events?</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {dashboardStats.map((stat, index) => (
            <div key={index} className="bg-[#121212] p-6 rounded-2xl border border-white/10 shadow-lg text-center">
              <p className="text-gray-400 text-lg mb-2">{stat.label}</p>
              <p className="text-white text-4xl font-bold font-spectral">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Recent Activities */}
        <h2 className="text-3xl font-bold mb-6 font-spectral">Recent Activities</h2>
        <div className="bg-[#121212] rounded-2xl border border-white/10 shadow-lg overflow-hidden">
          {recentActivities.map((activity, index) => (
            <RecentActivityItem key={index} {...activity} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;