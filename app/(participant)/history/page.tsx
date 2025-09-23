'use client';

import { useState } from 'react';

// Reusable component for the search bar
const SearchInput = ({ placeholder, value, onChange }: any) => (
  <div className="relative mb-6">
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full bg-black/20 border border-white/10 rounded-lg p-3 pl-10 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
    />
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
    </div>
  </div>
);

const HistoryPage = () => {
  // --- NEW: State for our search inputs ---
  const [eventSearch, setEventSearch] = useState('');
  const [transactionSearch, setTransactionSearch] = useState('');

  // Placeholder data
  const eventHistoryData = [
    { name: 'Tech Conference 2023', date: 'Oct 20, 2023', status: 'Attended' },
    { name: 'Music Festival 2023', date: 'Aug 15, 2023', status: 'Cancelled' },
    { name: 'Art Exhibition 2023', date: 'Jul 22, 2023', status: 'Attended' },
  ];

  const transactionHistoryData = [
    { description: 'Ticket Purchase: Tech Conference 2023', date: 'Oct 20, 2023', amount: -75.00 },
    { description: 'Refund: Music Festival 2023', date: 'Aug 16, 2023', amount: 120.00 },
    { description: 'Ticket Purchase: Art Exhibition 2023', date: 'Jul 15, 2023', amount: -30.00 },
  ];

  // --- NEW: Filtering logic based on search state ---
  const filteredEvents = eventHistoryData.filter(event =>
    event.name.toLowerCase().includes(eventSearch.toLowerCase())
  );

  const filteredTransactions = transactionHistoryData.filter(transaction =>
    transaction.description.toLowerCase().includes(transactionSearch.toLowerCase())
  );

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Attended': return 'bg-green-500/20 text-green-400';
      case 'Cancelled': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="container mx-auto px-4 lg:px-20 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Event History Column */}
          <div>
            <h1 className="text-4xl font-bold mb-4 font-spectral">Event History</h1>
            {/* --- NEW: Event Search Bar --- */}
            <SearchInput
              placeholder="Search events by name..."
              value={eventSearch}
              onChange={(e: any) => setEventSearch(e.target.value)}
            />
            <div className="space-y-4">
              {filteredEvents.map((event, index) => (
                <div key={index} className="bg-white/5 p-4 rounded-lg flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{event.name}</h3>
                    <p className="text-sm text-gray-400">{event.date}</p>
                  </div>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${getStatusClass(event.status)}`}>
                    {event.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Transaction History Column */}
          <div>
            <h1 className="text-4xl font-bold mb-4 font-spectral">Transaction History</h1>
            {/* --- NEW: Transaction Search Bar --- */}
            <SearchInput
              placeholder="Search transactions..."
              value={transactionSearch}
              onChange={(e: any) => setTransactionSearch(e.target.value)}
            />
            <div className="space-y-4">
              {filteredTransactions.map((tx, index) => (
                <div key={index} className="bg-white/5 p-4 rounded-lg flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{tx.description}</h3>
                    <p className="text-sm text-gray-400">{tx.date}</p>
                  </div>
                  <span className={tx.amount > 0 ? 'text-green-400' : 'text-red-400'}>
                    {tx.amount > 0 ? `+₹${tx.amount.toFixed(2)}` : `-₹${Math.abs(tx.amount).toFixed(2)}`}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HistoryPage;