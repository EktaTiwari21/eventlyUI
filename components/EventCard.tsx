// File: components/EventCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

// Define the shape of the data the card will receive
interface EventCardProps {
    event: {
        id: number;
        title: string;
        date: string;
        location: string;
        price: string;
        imageUrl: string;
    };
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
    return (
        <Link href={`/events/${event.id}`} className="block group">
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden shadow-lg hover:border-gray-700 transition-all duration-300">
                <div className="relative h-48">
                    <Image
                        src={event.imageUrl}
                        alt={event.title}
                        layout="fill"
                        objectFit="cover"
                        className="group-hover:scale-105 transition-transform duration-300"
                    />
                </div>
                <div className="p-4">
                    <h3 className="text-lg font-bold text-white">{event.title}</h3>
                    <p className="mt-1 text-sm text-gray-400">{event.date} • {event.location}</p>
                    <p className="mt-2 font-semibold text-white">{event.price}</p>
                </div>
            </div>
        </Link>
    );
};

export default EventCard;