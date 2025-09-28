// app/(participant)/discover/page.tsx
'use client'; // <-- This page must be a client component for the fix to work

import { useState, useEffect } from 'react';
import EventCarousel from '@/components/EventCarousel';

const DiscoverPage = () => {
  // --- NEW: A state to ensure carousels render only on the client-side ---
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);


  const upcomingEvents = [
    { id: '1', imageUrl: '/images/concert-bg.jpg', title: 'Indie Fest 2025', category: 'Music' },
    { id: '2', imageUrl: '/images/discover-hero-bg.jpg', title: 'Global Tech Summit', category: 'Technology' },
    { id: '3', imageUrl: '/images/concert-bg.jpg', title: 'Art & Design Expo', category: 'Art' },
    { id: '4', imageUrl: '/images/discover-hero-bg.jpg', title: 'Startup Pitch Night', category: 'Business' },
    { id: '5', imageUrl: '/images/concert-bg.jpg', title: 'Classical Night', category: 'Music' },
    { id: '6', imageUrl: '/images/discover-hero-bg.jpg', title: 'AI Conference', category: 'Technology' },
  ];

  const topPicks = [
    { id: '3', imageUrl: '/images/concert-bg.jpg', title: 'Art & Design Expo', category: 'Art' },
    { id: '5', imageUrl: '/images/concert-bg.jpg', title: 'Classical Night', category: 'Music' },
    { id: '2', imageUrl: '/images/discover-hero-bg.jpg', title: 'Global Tech Summit', category: 'Technology' },
    { id: '1', imageUrl: '/images/concert-bg.jpg', title: 'Indie Fest 2025', category: 'Music' },
  ];

  return (
    <div className="bg-black text-white">
      {/* Hero Section */}
      <div className="relative h-[50vh] flex items-center justify-center">
        <img
          src="/images/discover-hero-bg.jpg"
          alt="Crowd at an event"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-bold font-spectral">Discover Events. Create Memories.</h1>
          <p className="text-lg text-gray-300 mt-4">Where event discovery meets effortless creation.</p>
          <div className="mt-8 max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search for events by name, location, or organizer..."
              className="w-full bg-black/30 border border-white/10 rounded-lg p-4 pl-6 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none backdrop-blur-sm"
            />
          </div>
        </div>
      </div>

      {/* Carousels Section */}
      <div className="py-8">
        {/* --- FIX: We only render the carousels on the client-side --- */}
        {isClient && (
          <>
            <EventCarousel title="Upcoming Events" events={upcomingEvents} />
            <EventCarousel title="Top Picks For You" events={topPicks} />
          </>
        )}
      </div>
    </div>
  );
};

export default DiscoverPage;