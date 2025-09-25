// components/OrganizerNavbar.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import useUserStore from '@/stores/useUserStore';

const OrganizerNavbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { profileImageUrl, logout } = useUserStore();

  // --- NEW: State and logic for the dropdown menu ---
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    logout();
    router.push('/login');
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);


  const links = [
    { href: '/organizer/dashboard', label: 'Dashboard' },
    { href: '/organizer/my-events', label: 'My Events' },
    { href: '/organizer/analytics', label: 'Analytics' },
  ];

  return (
    <nav className="bg-black border-b border-gray-800 px-4 lg:px-20 py-4 flex justify-between items-center">
      <div className="flex items-center space-x-8">
        <Link href="/organizer/dashboard" className="text-2xl font-bold text-white font-spectral">
          Evently
        </Link>
      </div>

      <div className="flex items-center justify-center space-x-4">
        {links.map((link) => {
          const isActive = pathname.startsWith(link.href);
          return (
            <Link key={link.label} href={link.href} className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${ isActive ? 'bg-white text-black' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}>
              {link.label}
            </Link>
          );
        })}
      </div>

      {/* --- CHANGE: The profile icon is now a dropdown --- */}
      <div className="relative" ref={dropdownRef}>
        <button onClick={() => setIsOpen(!isOpen)}>
          <img
            src={profileImageUrl || '/images/hero-bg.jpg'}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover cursor-pointer"
          />
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-[#1E1E1E] border border-gray-700 rounded-md shadow-lg py-1 z-50">
            <Link href="/organizer/profile" onClick={() => setIsOpen(false)} className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">
              Profile
            </Link>
            <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700">
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default OrganizerNavbar;