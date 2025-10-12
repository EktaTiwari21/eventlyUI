// app/organizer/my-events/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image'; // <-- 1. Import the Image component
import { getMyEvents, deleteEvent } from '@/lib/api';

// --- 2. UPDATE THE INTERFACE TO INCLUDE THE IMAGE ---
interface IMyEvent {
  _id: string;
  name: string;
  date: string;
  status: 'Published' | 'Draft' | 'Ended';
  ticketsSold: number;
  ticketPrice: number;
  eventImage: string; // The URL from Cloudinary
}

const MyEventsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [myEvents, setMyEvents] = useState<IMyEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      const data = await getMyEvents();
      setMyEvents(data);
    } catch (err) {
      console.error("Failed to fetch organizer's events:", err);
      setError('Could not load your events. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const filteredEvents = myEvents.filter(event =>
      event.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (eventId: string, eventName: string) => {
    if (window.confirm(`Are you sure you want to delete the event "${eventName}"?`)) {
      try {
        await deleteEvent(eventId);
        alert(`${eventName} has been deleted successfully.`);
        fetchEvents();
      } catch (err: any) {
        console.error("Failed to delete event:", err);
        alert(`Error: ${err.response?.data?.message || 'Could not delete event.'}`);
      }
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
            <Link href="/organizer/my-events/create" className="bg-white text-black font-bold py-2 px-4 rounded-lg hover:bg-gray-300">
              + Create New Event
            </Link>
          </div>

          <div className="relative mb-6">
            <input type="text" placeholder="Search events by name..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-[#121212] border border-white/10 rounded-lg p-3 pl-10 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </div>
          </div>

          <div className="bg-[#121212] rounded-lg border border-white/10 overflow-x-auto">
            <table className="w-full text-left">
              {/* --- 3. ADD THE 'IMAGE' COLUMN TO THE HEADER --- */}
              <thead><tr><th className="p-4">IMAGE</th><th className="p-4">EVENT NAME</th><th className="p-4">STATUS</th><th className="p-4">TICKETS SOLD</th><th className="p-4">REVENUE</th><th className="p-4">ACTIONS</th></tr></thead>
              <tbody>
              {isLoading ? (
                  <tr><td colSpan={6} className="text-center p-8 text-gray-400">Loading your events...</td></tr>
              ) : error ? (
                  <tr><td colSpan={6} className="text-center p-8 text-red-500">{error}</td></tr>
              ) : filteredEvents.length === 0 ? (
                  <tr><td colSpan={6} className="text-center p-8 text-gray-400">You haven't created any events yet.</td></tr>
              ) : (
                  filteredEvents.map((event) => (
                      <tr key={event._id} className="border-b border-white/10 last:border-b-0">
                        {/* --- 4. ADD THE IMAGE CELL TO EACH ROW --- */}
                        <td className="p-4">
                          <div className="relative w-24 h-16 rounded-md overflow-hidden">
                            <Image src={event.eventImage || '/images/concert-bg.jpg'} alt={event.name} fill className="object-cover"/>
                          </div>
                        </td>
                        <td className="p-4 font-semibold">{event.name}</td>
                        <td className="p-4"><span className={`text-xs font-bold px-2 py-1 rounded-full ${getStatusClass(event.status)}`}>{event.status}</span></td>
                        <td className="p-4">{event.ticketsSold.toLocaleString('en-IN')}</td>
                        <td className="p-4">{formatCurrency(event.ticketsSold * event.ticketPrice)}</td>
                        <td className="p-4 flex items-center gap-4">
                          <Link href={`/organizer/my-events/edit/${event._id}`} title="Edit">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white hover:text-blue-400"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
                          </Link>
                          <button onClick={() => handleDelete(event._id, event.name)} title="Delete">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white hover:text-red-500"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                          </button>
                        </td>
                      </tr>
                  ))
              )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
  );
};

export default MyEventsPage;