'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ProfileDropdown from './ProfileDropdown';
import useUserStore from '@/stores/useUserStore';

const ParticipantNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { toggleNotifications, isNotificationsOpen } = useUserStore();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { href: '/discover', label: 'Discover' },
    { href: '/events', label: 'My Tickets' },
    { href: '/notifications', label: 'Notifications' },
    { href: '/wallet', label: '$ Wallet' },
    { href: '/history', label: 'History' },
  ];

  return (
    <nav
      className={`
        px-4 lg:px-20 py-4 flex justify-between items-center sticky top-0 z-50
        transition-all duration-300 ease-in-out
        {/* --- CHANGE: Set background to pure black to match the page and remove any perceived border line --- */}
        ${isScrolled
          ? 'bg-black/50 backdrop-blur-lg' // Semi-transparent black on scroll
          : 'bg-black'                  // Solid black at the top
        }
      `}
    >
      {/* Left Column (Logo) */}
      <div className="flex-1">
        <Link href="/" className="text-2xl font-bold text-white font-spectral">
          Evently
        </Link>
      </div>

      {/* Center Column (Nav Links) */}
      <div className="hidden md:flex flex-1 justify-center items-center space-x-6">
        {links.map((link) => {
          if (link.label === 'Notifications') {
            return (
              <button
                key={link.label}
                onClick={() => toggleNotifications(true)}
                className="text-gray-300 hover:text-white transition-colors duration-200"
              >
                {link.label}
              </button>
            );
          }
          return (
            <Link key={link.href} href={link.href} className="text-gray-300 hover:text-white transition-colors duration-200">
              {link.label}
            </Link>
          );
        })}
      </div>

      {/* Right Column (Profile & Back Arrow) */}
      <div className="flex flex-1 justify-end items-center space-x-4">
        <ProfileDropdown />
        <button onClick={() => window.history.back()} title="Go back">
           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white transform rotate-180">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default ParticipantNavbar;