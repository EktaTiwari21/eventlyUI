// app/(participant)/events/[eventId]/page.tsx
'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';

// This data would normally come from an API call
const allEventsData = [
    { id: 'gt-2025', name: 'Global Tech Summit 2025', description: 'Join industry leaders from around the globe to discuss the future of technology, innovation, and artificial intelligence. This three-day summit features keynote speeches, hands-on workshops, and unparalleled networking opportunities.', date: 'November 12-14, 2025', location: 'San Francisco, CA', price: 500, imageUrl: '/images/discover-hero-bg.jpg' },
    { id: 'ad-2024', name: 'Art & Design Expo', description: 'A showcase of the finest contemporary art and cutting-edge design. Explore galleries, meet the artists, and find your next masterpiece.', date: 'December 15-18, 2024', location: 'Metropolitan Arts Center', price: 250, imageUrl: '/images/concert-bg.jpg' },
];


const EventDetailPage = () => {
  const params = useParams();
  const eventId = params.eventId;
  const event = allEventsData.find(e => e.id === eventId);

  const [quantity, setQuantity] = useState(1);

  if (!event) {
    return <div className="min-h-screen flex items-center justify-center text-white">Event not found.</div>;
  }

  const total = event.price * quantity;

  return (
    <div className="bg-black min-h-screen text-white">
      {/* --- NEW: Hero Section with Banner Image --- */}
      <div className="relative w-full h-[50vh]">
        <Image
          src={event.imageUrl}
          alt={event.name}
          fill
          className="object-cover opacity-40"
        />
      </div>

      <div className="container mx-auto px-4 lg:px-20 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Left Side: Event Details */}
          <div className="md:col-span-2">
            <h1 className="text-5xl font-bold font-spectral mb-4">{event.name}</h1>
            <p className="text-gray-300 leading-relaxed mb-6">{event.description}</p>
            <div className="flex items-center gap-6 text-lg">
                <p>🗓️ <span className="ml-2">{event.date}</span></p>
                <p>📍 <span className="ml-2">{event.location}</span></p>
            </div>
          </div>

          {/* Right Side: Ticket Purchase Card */}
          <div className="bg-[#121212] p-6 rounded-2xl border border-white/10 h-fit">
            <p className="text-2xl font-bold mb-4">{`₹${event.price.toFixed(2)}`}</p>
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-300">Quantity</span>
              <div className="flex items-center gap-4 border border-gray-600 rounded-md p-1">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-2">-</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} className="px-2">+</button>
              </div>
            </div>
            <div className="flex items-center justify-between font-bold text-lg border-t border-gray-600 pt-4">
              <span>Total</span>
              <span>{`₹${total.toFixed(2)}`}</span>
            </div>
            <button className="w-full mt-6 bg-white text-black font-bold py-3 rounded-lg hover:bg-gray-300 transition-colors">
              Buy Tickets
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;