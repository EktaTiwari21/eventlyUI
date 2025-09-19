// File: components/ProfileDropdown.tsx
"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// A simple user object type for our props
type User = {
    name: string;
    avatar: string;
};

export default function ProfileDropdown({ user }: { user: User }) {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleLogout = () => {
        // In a real app, this would also clear auth tokens
        console.log('User logged out');
        setIsOpen(false);
        router.push('/'); // Redirect to landing page on logout
    };

    // Close dropdown if user clicks outside of it
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [dropdownRef]);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-2 focus:outline-none"
            >
                <span className="text-sm mr-1 hidden sm:block">{user.name}</span>
                <Image
                    src={user.avatar}
                    alt="User Avatar"
                    width={32}
                    height={32}
                    className="rounded-full object-cover border-2 border-transparent group-hover:border-white transition"
                />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-md shadow-lg py-1 z-50">
                    <Link
                        href="/profile"
                        onClick={() => setIsOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                    >
                        My Profile
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700"
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
}