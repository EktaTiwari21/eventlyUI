// components/EventCard.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface EventCardProps {
  id: string;
  title: string;
  category: string;
  date: string;
  location: string;
  imageUrl: string;
  description?: string;
}

const EventCard: React.FC<EventCardProps> = ({ id, title, category, date, location, imageUrl, description }) => {
  return (
    <Link
      href={`/event/${id}`}
      className="relative block group w-full h-[320px] cursor-pointer select-none outline-none z-10 hover:z-50"
    >
      {/* Animated Card Body */}
      <div className="absolute inset-0 bg-[#0f0f0f] rounded-xl overflow-hidden border border-white/5
                      transition-all duration-400 ease-out shadow-lg
                      group-hover:scale-115 group-hover:shadow-[0_25px_60px_rgba(0,0,0,0.95)]
                      group-hover:border-white/20">

        {/* Image Section */}
        <div className="relative h-44 w-full overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent opacity-90" />
        </div>

        {/* Persistent Details */}
        <div className="p-4 space-y-1">
          <p className="text-blue-400 text-[10px] uppercase tracking-[0.2em] font-black">{category}</p>
          <h3 className="text-white font-bold text-base leading-tight line-clamp-1">{title}</h3>
          <div className="flex items-center gap-2 text-gray-500 text-[11px] mt-1">
            <span>{date}</span>
            <span className="w-1 h-1 bg-gray-700 rounded-full" />
            <span className="line-clamp-1">{location}</span>
          </div>
        </div>

        {/* Hotstar Expansion Content (Reveals on Hover) */}
        <div className="px-4 pb-5 space-y-4 opacity-0 h-0 group-hover:opacity-100 group-hover:h-auto transition-all duration-300 ease-in overflow-hidden">
          <p className="text-gray-400 text-[11px] line-clamp-2 leading-relaxed italic border-t border-white/5 pt-3">
            {description || "Join us for this exclusive experience. Click to see full details and availability!"}
          </p>

          <div className="w-full bg-white text-black py-2.5 rounded-lg text-xs font-black flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors uppercase tracking-wider">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M5 3l14 9-14 9V3z"/></svg>
            Watch Details
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;