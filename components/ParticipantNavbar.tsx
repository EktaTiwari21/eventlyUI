// components/ParticipantNavbar.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ProfileDropdown from './ProfileDropdown';
import useUserStore from '@/stores/useUserStore';

const ParticipantNavbar = ({ onRegionClick }: { onRegionClick: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { toggleNotifications, selectedRegion } = useUserStore();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) { setIsScrolled(true); } else { setIsScrolled(false); }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- CHANGE: The "History" link has been removed ---
  const links = [
    { href: '/discover', label: 'Discover' },
    { href: '/events', label: 'My Tickets' },
    { href: '/notifications', label: 'Notifications' },
    { href: '/wallet', label: '$ Wallet' },
  ];

  return (
    <nav className={`px-4 lg:px-20 py-4 flex justify-between items-center sticky top-0 z-50 transition-all duration-300 ease-in-out outline-none ${isScrolled ? 'bg-black/50 backdrop-blur-lg' : 'bg-black'}`}>
      <div className="flex-1">
        <Link href="/" className="text-2xl font-bold text-white font-spectral">Evently</Link>
      </div>
      <div className="hidden md:flex flex-1 justify-center items-center space-x-6">
        {links.map((link) => {
          if (link.label === 'Notifications') {
            return (<button key={link.label} onClick={() => toggleNotifications(true)} className="text-gray-300 hover:text-white transition-colors duration-200">{link.label}</button>);
          }
          return (<Link key={link.href} href={link.href} className="text-gray-300 hover:text-white transition-colors duration-200">{link.label}</Link>);
        })}
      </div>
      <div className="flex flex-1 justify-end items-center space-x-4">
        <button onClick={onRegionClick} className="hidden md:flex items-center gap-2 text-gray-300 hover:text-white border border-gray-600 px-3 py-1 rounded-lg">
          {selectedRegion ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              <span>{selectedRegion}</span>
            </>
          ) : (
            <span>Choose the Region</span>
          )}
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform transition-transform"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </button>
        <ProfileDropdown />
        <button onClick={() => window.history.back()} title="Go back">
           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white transform rotate-180"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
      </div>
    </nav>
  );
};

export default ParticipantNavbar;