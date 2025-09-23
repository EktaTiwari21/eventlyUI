'use client';

import { useState } from 'react';
import Link from 'next/link'; // Import the Link component for navigation

// Updated TicketCard component
const TicketCard = ({ eventName, date, ticketCount, eventId }: any) => (
  <div className="bg-white/5 border border-white/10 p-4 rounded-lg flex items-center justify-between shadow-lg">
    <div className="flex items-center space-x-4">
      <img src="/images/hero-bg.jpg" alt="Event" className="w-20 h-12 object-cover rounded-md" />
      <div>
        <h3 className="font-semibold text-lg">{eventName}</h3>
        <p className="text-sm text-gray-400">{date}</p>
        <p className="text-sm font-bold text-blue-400 mt-1">{ticketCount} Ticket{ticketCount > 1 ? 's' : ''}</p>
      </div>
    </div>
    {/* --- CHANGE: The button is now a Link that navigates to the specific event page --- */}
    <Link href={`/events/${eventId}`} className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg">
      View Event
    </Link>
  </div>
);

// New component for past tickets
const PastTicketCard = ({ eventName, date }: any) => (
   <div className="bg-white/5 border border-white/10 p-4 rounded-lg flex items-center justify-between shadow-lg opacity-60">
    <div className="flex items-center space-x-4">
      <img src="/images/hero-bg.jpg" alt="Event" className="w-20 h-12 object-cover rounded-md" />
      <div>
        <h3 className="font-semibold text-lg">{eventName}</h3>
        <p className="text-sm text-gray-400">{date}</p>
      </div>
    </div>
    <span className="text-sm text-gray-400">Attended</span>
  </div>
)


const MyTicketsPage = () => {
  // --- NEW: State to toggle visibility of past tickets ---
  const [showPastTickets, setShowPastTickets] = useState(false);

  // Updated data with IDs and status
  const allTickets = [
    { id: 'gt-2025', eventName: "Global Tech Summit 2025", date: "November 12-14, 2025", ticketCount: 2, status: 'active' },
    { id: 'ad-2024', eventName: "Art & Design Expo", date: "December 15-18, 2024", ticketCount: 1, status: 'active' },
    { id: 'ms-2023', eventName: "Music Fest 2023", date: "August 20, 2023", ticketCount: 4, status: 'past' },
  ];

  const activeTickets = allTickets.filter(ticket => ticket.status === 'active');
  const pastTickets = allTickets.filter(ticket => ticket.status === 'past');

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="container mx-auto px-4 lg:px-20 py-12">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold">My Tickets</h1>
          {/* --- CHANGE: This button now toggles the state --- */}
          <button
            onClick={() => setShowPastTickets(!showPastTickets)}
            className="text-sm text-gray-400 hover:text-white"
          >
            {showPastTickets ? 'Hide past tickets' : 'View past tickets'}
          </button>
        </div>

        <h2 className="text-2xl font-semibold mb-6">Active Tickets</h2>
        <div className="space-y-4">
          {activeTickets.map(ticket => (
            <TicketCard key={ticket.id} {...ticket} eventId={ticket.id} />
          ))}
        </div>

        {/* --- NEW: Conditionally rendered section for past tickets --- */}
        {showPastTickets && (
          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-6">Past Tickets</h2>
            <div className="space-y-4">
              {pastTickets.map(ticket => (
                <PastTicketCard key={ticket.id} {...ticket} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default MyTicketsPage;