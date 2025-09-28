// app/(participant)/discover/page.tsx
'use client';

import { useState, useEffect } from 'react';
import EventCarousel from '@/components/EventCarousel';

const DiscoverPage = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => { setIsClient(true); }, []);

  // --- CHANGE: Updated IDs to be consistent ---
  const allEvents = [
    { id: 'if-2025', imageUrl: '/images/concert-bg.jpg', title: 'Indie Fest 2025', category: 'Music' },
    { id: 'gt-2025', imageUrl: '/images/discover-hero-bg.jpg', title: 'Global Tech Summit', category: 'Technology' },
    { id: 'ade-2024', imageUrl: '/images/concert-bg.jpg', title: 'Art & Design Expo', category: 'Art' },
    { id: 'spn-2024', imageUrl: '/images/discover-hero-bg.jpg', title: 'Startup Pitch Night', category: 'Business' },
    { id: 'cn-2025', imageUrl: '/images/concert-bg.jpg', title: 'Classical Night', category: 'Music' },
    { id: 'aic-2025', imageUrl: '/images/discover-hero-bg.jpg', title: 'AI Conference', category: 'Technology' },
  ];

  // We can derive the top picks from the main list
  const topPicks = [allEvents[2], allEvents[4], allEvents[1], allEvents[0]];

  return (
    <div className="bg-black text-white">
      <div className="relative h-[50vh] flex items-center justify-center">
        <img src="/images/discover-hero-bg.jpg" alt="Crowd at an event" className="absolute inset-0 w-full h-full object-cover opacity-30"/>
        <div className="relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-bold font-spectral">Discover Events. Create Memories.</h1>
          <p className="text-lg text-gray-300 mt-4">Where event discovery meets effortless creation.</p>
          <div className="mt-8 max-w-2xl mx-auto">
            <input type="text" placeholder="Search for events by name, location, or organizer..." className="w-full bg-black/30 border border-white/10 rounded-lg p-4 pl-6 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none backdrop-blur-sm"/>
          </div>
        </div>
      </div>

      <div className="py-8">
        {isClient && (
          <>
            <EventCarousel title="Upcoming Events" events={allEvents} />
            <EventCarousel title="Top Picks For You" events={topPicks} />
          </>
        )}
      </div>
    </div>
  );
};

export default DiscoverPage;