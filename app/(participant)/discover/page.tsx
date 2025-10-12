// app/(participant)/discover/page.tsx
'use client';

import { useState, useEffect } from 'react';
import EventCarousel from '@/components/EventCarousel';
import { getEvents } from '@/lib/api';

// Define a type for our event data to keep TypeScript happy
interface IEvent {
  id: string;
  imageUrl: string;
  title: string;
  category: string; // We'll keep category for now, but it will be static
}

const DiscoverPage = () => {
  const [allEvents, setAllEvents] = useState<IEvent[]>([]);
  const [topPicks, setTopPicks] = useState<IEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const dataFromBackend = await getEvents();

        // --- THIS IS THE CRITICAL FIX ---
        // We now map the backend's 'eventImage' field to our component's 'imageUrl' prop.
        const formattedEvents: IEvent[] = dataFromBackend.map((event: any) => ({
          id: event._id,
          imageUrl: event.eventImage || '/images/discover-hero-bg.jpg', // Use the live image URL
          title: event.name,
          category: event.category || 'General',
        }));

        setAllEvents(formattedEvents);

        // For now, let's make the "Top Picks" the first 4 events, shuffled
        setTopPicks([...formattedEvents].sort(() => 0.5 - Math.random()).slice(0, 4));

      } catch (err) {
        console.error("Failed to fetch events:", err);
        setError('Could not load events. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []); // The empty array ensures this runs only once on mount

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
          {isLoading ? (
              <p className="text-center text-gray-400">Loading events...</p>
          ) : error ? (
              <p className="text-center text-red-500">{error}</p>
          ) : (
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