// app/(participant)/event/[id]/page.tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';

const EventDetailsPage = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const ticketPrice = 500;

  // Mock data - This will eventually be fetched from your database using the 'id'
  const event = {
    title: "Global Tech Summit",
    date: "November 12-14, 2025",
    location: "San Francisco, CA",
    imageUrl: "/images/hero-bg.jpg",
    description: "Join industry leaders from around the globe to discuss the future of technology, innovation, and artificial intelligence. This summit features keynote speeches, workshops, and networking opportunities."
  };

  return (
    <div className="bg-black min-h-screen text-white pb-20">
      {/* --- CINEMATIC HERO BANNER --- */}
      <div className="relative h-[450px] w-full flex items-end">
        <Image
          src={event.imageUrl}
          alt={event.title}
          fill
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

        <div className="container mx-auto px-4 lg:px-20 relative z-10 pb-12">
          <h1 className="text-4xl md:text-6xl font-bold font-spectral mb-4 tracking-tight drop-shadow-lg">
            {event.title}
          </h1>
          <div className="flex flex-wrap gap-6 text-gray-300 text-sm md:text-base">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              <span>{event.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* --- CONTENT GRID --- */}
      <div className="container mx-auto px-4 lg:px-20 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">

        {/* Left Side: About */}
        <div className="lg:col-span-2 space-y-8">
          <h2 className="text-2xl font-bold font-spectral border-l-4 border-white pl-4 uppercase tracking-wider">About This Event</h2>
          <p className="text-gray-400 leading-relaxed text-lg italic">
            {event.description}
          </p>
        </div>

        {/* Right Side: Ticket Card --- */}
        <div className="lg:col-span-1">
          <div className="bg-[#121212] border border-white/10 p-8 rounded-2xl sticky top-28 shadow-2xl">
            <div className="mb-8">
              <span className="text-gray-400 text-sm uppercase tracking-widest font-bold">Ticket Price</span>
              <h3 className="text-3xl font-bold mt-1">₹{ticketPrice.toFixed(2)}</h3>
            </div>

            <div className="flex items-center justify-between mb-8 border-t border-white/5 pt-6">
              <span className="text-gray-400 font-medium">Quantity</span>
              <div className="flex items-center gap-4 bg-black/40 border border-white/10 rounded-lg px-3 py-2">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-xl hover:text-blue-400 transition-colors px-2">–</button>
                <span className="w-6 text-center font-bold text-lg">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="text-xl hover:text-blue-400 transition-colors px-2">+</button>
              </div>
            </div>

            <div className="flex justify-between items-center mb-8">
              <span className="text-gray-400">Total Amount</span>
              <span className="text-2xl font-bold text-white">₹{(ticketPrice * quantity).toFixed(2)}</span>
            </div>

            <button className="w-full bg-white text-black font-black py-4 rounded-xl hover:bg-gray-200 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.1)] uppercase tracking-tighter">
              Buy Tickets
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default EventDetailsPage;