// components/ProfileDropdown.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import useUserStore from '@/stores/useUserStore';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Import the router

const ProfileDropdown = () => {
  const { profileImageUrl, logout } = useUserStore();
  const router = useRouter(); // Initialize the router
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    logout(); // Call the logout action from the store
    router.push('/login'); // Redirect to the login page
    setIsOpen(false); // Close the dropdown
  };

  // Effect to close the dropdown if you click outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);


  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)}>
        <img
          src={profileImageUrl || '/images/hero-bg.jpg'} // Fallback image
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover cursor-pointer"
        />
      </button>

      {/* The Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-[#1E1E1E] border border-gray-700 rounded-md shadow-lg py-1 z-50">
          <Link href="/profile" onClick={() => setIsOpen(false)} className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">
            Profile & Settings
          </Link>
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;