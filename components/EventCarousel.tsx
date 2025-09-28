// components/EventCarousel.tsx
'use client';

import useEmblaCarousel from 'embla-carousel-react';
import EventCard from './EventCard'; // We'll use the card we just built

// Define the shape of a single event
type Event = {
  id: string;
  imageUrl: string;
  title: string;
  category: string;
};

// Define the props for our carousel
interface EventCarouselProps {
  title: string;
  events: Event[];
}

const EventCarousel = ({ title, events }: EventCarouselProps) => {
  // Initialize the carousel using the useEmblaCarousel hook
  const [emblaRef] = useEmblaCarousel({
    align: 'start',     // Align slides to the start
    dragFree: true,     // Allows for free scrolling without snapping
    containScroll: 'trimSnaps', // Helps with scrolling behavior
  });

  return (
    <section className="py-8">
      <h2 className="text-3xl font-bold mb-6 px-4 lg:px-20">{title}</h2>

      {/* Embla Carousel Viewport */}
      <div className="overflow-hidden" ref={emblaRef}>
        {/* Embla Container */}
        <div className="flex">
          {/* Map over the events and render an EventCard for each */}
          {events.map(event => (
            // Each slide needs a specific class for Embla to work
            <div className="flex-shrink-0 w-1/2 md:w-1/4 lg:w-1/5 xl:w-1/6 pl-4" key={event.id}>
              <EventCard {...event} />
            </div>
          ))}
          {/* Add an extra empty slide for better spacing at the end */}
          <div className="flex-shrink-0 w-4 lg:w-20"></div>
        </div>
      </div>
    </section>
  );
};

export default EventCarousel;