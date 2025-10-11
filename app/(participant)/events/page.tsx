// app/(participant)/events/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getMyTickets, acceptTicketInvitation, declineTicketInvitation } from '@/lib/api'; // Import our API functions

// Define the shape of our ticket data from the backend
interface ITicket {
  _id: string;
  status: 'confirmed' | 'pending_acceptance' | 'used' | 'declined';
  event: {
    _id: string;
    name: string;
    date: string;
    imageUrl: string; // Assuming the backend provides an imageUrl for the event
  };
}

// Your existing UI components are preserved
const TicketCard = ({ eventName, date, eventId, imageUrl }: any) => (
    <div className="bg-white/5 border border-white/10 p-4 rounded-lg flex items-center justify-between shadow-lg">
      <div className="flex items-center space-x-4">
        <div className="relative w-20 h-12 rounded-md overflow-hidden">
          <Image src={imageUrl || '/images/concert-bg.jpg'} alt={eventName} fill className="object-cover" />
        </div>
        <div>
          <h3 className="font-semibold text-lg">{eventName}</h3>
          <p className="text-sm text-gray-400">{date}</p>
        </div>
      </div>
      <Link href={`/events/${eventId}`} className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg">
        View Event
      </Link>
    </div>
);

const PastTicketCard = ({ eventName, date, imageUrl }: any) => (
    <div className="bg-white/5 border border-white/10 p-4 rounded-lg flex items-center justify-between shadow-lg opacity-60">
      <div className="flex items-center space-x-4">
        <div className="relative w-20 h-12 rounded-md overflow-hidden">
          <Image src={imageUrl || '/images/concert-bg.jpg'} alt={eventName} fill className="object-cover"/>
        </div>
        <div>
          <h3 className="font-semibold text-lg">{eventName}</h3>
          <p className="text-sm text-gray-400">{date}</p>
        </div>
      </div>
      <span className="text-sm text-gray-400">Attended</span>
    </div>
);

// This is a new component specifically for invitations
const InvitationCard = ({ ticket, onAccept, onDecline }: { ticket: ITicket, onAccept: () => void, onDecline: () => void }) => (
    <div className="bg-blue-900/20 border border-blue-400/30 p-4 rounded-lg flex items-center justify-between shadow-lg">
      <div className="flex items-center space-x-4">
        <div className="relative w-20 h-12 rounded-md overflow-hidden">
          <Image src={ticket.event.imageUrl || '/images/concert-bg.jpg'} alt={ticket.event.name} fill className="object-cover" />
        </div>
        <div>
          <h3 className="font-semibold text-lg">{ticket.event.name}</h3>
          <p className="text-sm text-gray-400">You have a pending invitation!</p>
        </div>
      </div>
      <div className="flex gap-2">
        <button onClick={onDecline} className="bg-red-600/50 hover:bg-red-600/80 text-white font-bold py-2 px-4 rounded-lg text-sm">Decline</button>
        <button onClick={onAccept} className="bg-green-600/50 hover:bg-green-600/80 text-white font-bold py-2 px-4 rounded-lg text-sm">Accept</button>
      </div>
    </div>
);


const MyTicketsPage = () => {
  const [showPastTickets, setShowPastTickets] = useState(false);

  // State for live data
  const [allTickets, setAllTickets] = useState<ITicket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchTickets = async () => {
    setIsLoading(true);
    try {
      const data = await getMyTickets();
      setAllTickets(data);
    } catch (err) {
      setError("Could not load your tickets.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleAccept = async (ticketId: string) => {
    try {
      await acceptTicketInvitation(ticketId);
      alert('Invitation accepted!');
      fetchTickets(); // Refresh the list
    } catch (err: any) {
      alert(`Error: ${err.response?.data?.message || 'Could not accept invitation.'}`);
    }
  };

  const handleDecline = async (ticketId: string) => {
    try {
      await declineTicketInvitation(ticketId);
      alert('Invitation declined.');
      fetchTickets(); // Refresh the list
    } catch (err: any) {
      alert(`Error: ${err.response?.data?.message || 'Could not decline invitation.'}`);
    }
  };

  // Filter the live data
  const pendingTickets = allTickets.filter(ticket => ticket.status === 'pending_acceptance');
  const activeTickets = allTickets.filter(ticket => ticket.status === 'confirmed' && new Date(ticket.event.date) >= new Date());
  const pastTickets = allTickets.filter(ticket => ticket.status === 'used' || (ticket.status === 'confirmed' && new Date(ticket.event.date) < new Date()));

  if (isLoading) {
    return <div className="bg-black min-h-screen text-white text-center py-20">Loading tickets...</div>;
  }

  if (error) {
    return <div className="bg-black min-h-screen text-white text-center py-20 text-red-500">{error}</div>;
  }

  return (
      <div className="bg-black min-h-screen text-white">
        <div className="container mx-auto px-4 lg:px-20 py-12">
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-4xl font-bold">My Tickets</h1>
            <button onClick={() => setShowPastTickets(!showPastTickets)} className="text-sm text-gray-400 hover:text-white">
              {showPastTickets ? 'Hide past tickets' : 'View past tickets'}
            </button>
          </div>

          {/* New Invitations Section */}
          {pendingTickets.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-semibold mb-6">Pending Invitations</h2>
                <div className="space-y-4">
                  {pendingTickets.map(ticket => (
                      <InvitationCard
                          key={ticket._id}
                          ticket={ticket}
                          onAccept={() => handleAccept(ticket._id)}
                          onDecline={() => handleDecline(ticket._id)}
                      />
                  ))}
                </div>
              </div>
          )}

          <h2 className="text-2xl font-semibold mb-6">Active Tickets</h2>
          {activeTickets.length > 0 ? (
              <div className="space-y-4">
                {activeTickets.map(ticket => (
                    <TicketCard
                        key={ticket._id}
                        eventName={ticket.event.name}
                        date={new Date(ticket.event.date).toLocaleDateString()}
                        eventId={ticket.event._id}
                        imageUrl={ticket.event.imageUrl}
                    />
                ))}
              </div>
          ) : (
              <p className="text-gray-500">You have no active tickets.</p>
          )}

          {showPastTickets && (
              <div className="mt-12">
                <h2 className="text-2xl font-semibold mb-6">Past Tickets</h2>
                {pastTickets.length > 0 ? (
                    <div className="space-y-4">
                      {pastTickets.map(ticket => ( <PastTicketCard key={ticket._id} eventName={ticket.event.name} date={new Date(ticket.event.date).toLocaleDateString()} imageUrl={ticket.event.imageUrl} /> ))}
                    </div>
                ) : (
                    <p className="text-gray-500">You have no past tickets.</p>
                )}
              </div>
          )}
        </div>
      </div>
  );
};

export default MyTicketsPage;