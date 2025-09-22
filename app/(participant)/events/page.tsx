// app/(participant)/events/page.tsx

// A placeholder component for a single ticket card
const TicketCard = ({ eventName, date, ticketCount }: { eventName: string, date: string, ticketCount: number }) => (
  <div className="bg-white/5 border border-white/10 p-4 rounded-lg flex items-center justify-between shadow-lg">
    <div className="flex items-center space-x-4">
      <img src="/images/hero-bg.jpg" alt="Event" className="w-20 h-12 object-cover rounded-md" />
      <div>
        <h3 className="font-semibold text-lg">{eventName}</h3>
        <p className="text-sm text-gray-400">{date}</p>
        <p className="text-sm font-bold text-blue-400 mt-1">{ticketCount} Ticket{ticketCount > 1 ? 's' : ''}</p>
      </div>
    </div>
    <button className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg">
      View Event
    </button>
  </div>
);


const MyTicketsPage = () => {
  return (
    <div className="bg-black min-h-screen text-white">
      <div className="container mx-auto px-4 lg:px-20 py-12">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold">My Tickets</h1>
          <button className="text-sm text-gray-400 hover:text-white">
            View past tickets
          </button>
        </div>

        <h2 className="text-2xl font-semibold mb-6">Active Tickets</h2>
        <div className="space-y-4">
          <TicketCard eventName="Global Tech Summit 2025" date="November 12-14, 2025" ticketCount={2} />
          <TicketCard eventName="Art & Design Expo" date="December 15-18, 2024" ticketCount={1} />
        </div>

      </div>
    </div>
  );
};

export default MyTicketsPage;