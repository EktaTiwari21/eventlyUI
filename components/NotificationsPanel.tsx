'use client';

import useUserStore from '@/stores/useUserStore';
import { useEffect } from 'react';

const NotificationItem = ({ icon, eventName, date, status, statusColor, remaining, isFaded = false }: any) => (
  <div className={`w-full p-6 bg-[#262626]/50 rounded-2xl border border-[#262626] backdrop-blur-sm flex items-center gap-6 ${isFaded ? 'opacity-60' : ''}`}>
    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
      {icon}
    </div>
    <div className="flex-grow flex flex-col gap-4">
      <div className="flex justify-between items-start">
        <div className="flex flex-col">
          <h3 className="font-space text-lg font-bold leading-7 text-white">{eventName}</h3>
          <p className="font-space text-sm text-[#A3A3A3]">{date}</p>
        </div>
        <p className={`font-space text-sm font-medium text-nowrap pl-4 ${remaining === 'Event Ended' ? 'text-[#A3A3A3]' : 'text-white'}`}>{remaining}</p>
      </div>
      <p className="font-space text-sm">
        <span className={isFaded ? "text-[#A3A3A3]" : "text-white"}>Status Update: </span>
        <span className={`font-bold`} style={{ color: statusColor }}>{status}</span>
      </p>
    </div>
  </div>
);

const NotificationsPanel = () => {
  const { isNotificationsOpen, toggleNotifications } = useUserStore();

  useEffect(() => {
    if (isNotificationsOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isNotificationsOpen]);


  return (
    <div
      className={`
        fixed inset-0 z-50 transition-opacity duration-300 ease-in-out
        ${isNotificationsOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
      `}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => toggleNotifications(false)}
      ></div>

      {/* --- CHANGE: Panel is now positioned on the right and slides in --- */}
      <div
        className={`
          absolute top-0 right-0 h-full w-full max-w-[673px] bg-black shadow-2xl
          flex flex-col transition-transform duration-300 ease-in-out
          border-l border-[#262626]
          ${isNotificationsOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* Header */}
        <div className="flex-shrink-0 h-20 px-6 flex items-center justify-between border-b border-[#262626]">
          <h2 className="font-spectral text-3xl font-bold text-white">Notifications</h2>
          <button className="font-spectral text-base font-bold text-[#A3A3A3] hover:text-white transition-colors">
            Mark all as read
          </button>
        </div>

        {/* Scrollable content area */}
        <div className="flex-grow p-8 overflow-y-auto space-y-6">
          <NotificationItem
            eventName="Summer Beats Festival"
            date="July 20, 2024"
            remaining="25 days remaining"
            status="Postponed due to weather"
            statusColor="#FACC15"
            icon={<div className="w-6 h-6 border-2 border-white rounded-sm"></div>}
          />
          <NotificationItem
            eventName="Modern Art Exhibition"
            date="August 5, 2024"
            remaining="41 days remaining"
            status="New time announced: 7 PM"
            statusColor="#22D3EE"
            icon={<div className="w-6 h-6 relative"><div className="w-2 h-4 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-r-2 border-t-2 border-b-2 border-white"></div><div className="w-4 h-1 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white"></div></div>}
          />
          <NotificationItem
            eventName="Tech Innovators Summit"
            date="September 12, 2024"
            remaining="79 days remaining"
            status="Tickets available now"
            statusColor="#4ADE80"
            icon={<div className="w-5 h-4 border-2 border-white rounded-sm"></div>}
          />
          <NotificationItem
            eventName="Indie Rock Night"
            date="October 28, 2024"
            remaining="Event Ended"
            status="Event cancelled"
            statusColor="#EF4444"
            isFaded={true}
            icon={<div className="w-6 h-6 border-2 border-white rounded-sm"></div>}
          />
        </div>
      </div>
    </div>
  );
};

export default NotificationsPanel;