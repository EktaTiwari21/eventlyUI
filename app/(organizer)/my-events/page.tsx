// app/(organizer)/my-events/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';

const MyEventsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // --- CHANGE: Added a unique 'id' to each event ---
  const allEvents = [
    {
      id: 'gt-2025',
      name: 'Global Tech Summit 2025',
      status: 'Published',
      ticketsSold: 3500,
      revenue: 57200,
    },
    {
      id: 'smf-2024',
      name: 'Summer Music Fest 2024',
      status: 'Draft',
      ticketsSold: 0,
      revenue: 0,
    },
    {
      id: 'ade-2024',
      name: 'Art & Design Expo 2024',
      status: 'Ended',
      ticketsSold: 8000,
      revenue: 88000,
    },
  ];

  const filteredEvents = allEvents.filter(event =>
    event.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // --- NEW: Handler for the delete button ---
  const handleDelete = (eventName: string) => {
    if (window.confirm(`Are you sure you want to delete the event "${eventName}"?`)) {
      // In a real app, you would make an API call to delete the event here
      console.log(`Deleting event: ${eventName}`);
      alert(`${eventName} has been deleted.`);
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Published': return 'bg-green-500/20 text-green-400';
      case 'Draft': return 'bg-yellow-500/20 text-yellow-400';
      case 'Ended': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const formatCurrency = (amount: number) => {
     return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="container mx-auto px-4 lg:px-20 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">My Events</h1>
          <Link href="/my-events/create" className="bg-white text-black font-bold py-2 px-4 rounded-lg hover:bg-gray-300">
            + Create New Event
          </Link>
        </div>

        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search events by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#121212] border border-white/10 rounded-lg p-3 pl-10 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
              <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
        </div>

        <div className="bg-[#121212] rounded-lg border border-white/10 overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-white/10">
              <tr>
                <th className="p-4">EVENT NAME</th>
                <th className="p-4">STATUS</th>
                <th className="p-4">TICKETS SOLD</th>
                <th className="p-4">REVENUE</th>
                <th className="p-4">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.map((event, index) => (
                <tr key={event.id} className="border-b border-white/10 last:border-b-0">
                  <td className="p-4 font-semibold">{event.name}</td>
                  <td className="p-4">
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${getStatusClass(event.status)}`}>
                      {event.status}
                    </span>
                  </td>
                  <td className="p-4">{event.ticketsSold.toLocaleString('en-IN')}</td>
                  <td className="p-4">{formatCurrency(event.revenue)}</td>
                  {/* --- CHANGE: Replaced emojis with styled SVG icons and added functionality --- */}
                  <td className="p-4 flex items-center gap-4">
                    <Link href={`/my-events/edit/${event.id}`} title="Edit">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white hover:text-blue-400">
                        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                      </svg>
                    </Link>
                    <button onClick={() => handleDelete(event.name)} title="Delete">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white hover:text-red-500">
                        <polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line>
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyEventsPage;