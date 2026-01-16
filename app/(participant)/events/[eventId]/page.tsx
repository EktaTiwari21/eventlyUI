// app/(participant)/events/[eventId]/page.tsx
'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';

const allEventsData = [
    { id: 'if-2025', name: 'Indie Fest 2025', description: 'Experience the best of indie music under the stars. Featuring a lineup of breakout artists and beloved bands, this festival is a celebration of creativity and sound.', date: 'October 10-12, 2025', location: 'City Meadows', price: 1500, imageUrl: '/images/concert-bg.jpg' },
    { id: 'gt-2025', name: 'Global Tech Summit', description: 'Join industry leaders from around the globe to discuss the future of technology, innovation, and artificial intelligence. This three-day summit features keynote speeches, hands-on workshops, and unparalleled networking opportunities.', date: 'November 12-14, 2025', location: 'San Francisco, CA', price: 500, imageUrl: '/images/discover-hero-bg.jpg' },
    { id: 'ade-2024', name: 'Art & Design Expo', description: 'A showcase of the finest contemporary art and cutting-edge design. Explore galleries, meet the artists, and find your next masterpiece.', date: 'December 15-18, 2024', location: 'Metropolitan Arts Center', price: 250, imageUrl: '/images/concert-bg.jpg' },
    { id: 'spn-2024', name: 'Startup Pitch Night', description: 'Watch the brightest new startups pitch their ideas to a panel of venture capitalists.', date: 'November 5, 2024', location: 'Innovation Hub', price: 50, imageUrl: '/images/discover-hero-bg.jpg' },
    { id: 'cn-2025', name: 'Classical Night', description: 'An evening of enchanting classical music featuring world-renowned artists.', date: 'September 20, 2025', location: 'The Grand Auditorium', price: 2200, imageUrl: '/images/concert-bg.jpg' },
    { id: 'aic-2025', name: 'AI Conference', description: 'Deep dive into the latest advancements in Artificial Intelligence and Machine Learning.', date: 'October 1-3, 2025', location: 'Tech Park Convention Center', price: 1800, imageUrl: '/images/discover-hero-bg.jpg' },
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
      {/* --- CHANGE: The hero banner is now larger with overlaid content --- */}
      <div className="relative w-full h-[60vh]">
        <Image src={event.imageUrl} alt={event.name} fill className="object-cover"/>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-8 md:p-12 lg:p-20">
          <h1 className="text-5xl md:text-7xl font-bold font-spectral mb-4">{event.name}</h1>
          <div className="flex items-center gap-6 text-lg text-gray-200">
              <p>🗓️ <span className="ml-2">{event.date}</span></p>
              <p>📍 <span className="ml-2">{event.location}</span></p>
          </div>
        </div>
      </div>

      {/* --- CHANGE: The content section is now below the banner --- */}
      <div className="container mx-auto px-4 lg:px-20 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Left Side: Event Description */}
          <div className="md:col-span-2">
             <h2 className="text-3xl font-bold mb-4">About This Event</h2>
             <p className="text-gray-300 leading-relaxed">{event.description}</p>
          </div>

          {/* Right Side: Ticket Purchase Card */}
          <div className="bg-[#121212] p-6 rounded-2xl border border-white/10 h-fit">
            <p className="text-2xl font-bold mb-4">{event.price > 0 ? `₹${event.price.toFixed(2)}` : 'Free Event'}</p>
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-300">Quantity</span>
              <div className="flex items-center gap-4 border border-gray-600 rounded-md p-1">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-2 text-lg">-</button>
                <span className="text-lg">{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} className="px-2 text-lg">+</button>
              </div>
            </div>
            <div className="flex items-center justify-between font-bold text-xl border-t border-gray-600 pt-4">
              <span>Total</span>
              <span>{event.price > 0 ? `₹${total.toFixed(2)}` : 'FREE'}</span>
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