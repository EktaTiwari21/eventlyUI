// File: components/OrganizerNavbar.tsx
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ProfileDropdown from './ProfileDropdown'; // Import the new component

const OrganizerNavbar = () => {
    const pathname = usePathname();
    const user = { name: 'John Doe', avatar: '/images/hero-bg.jpg' }; // Placeholder

    const navLinks = [
        { name: 'Dashboard', href: '/dashboard' },
        { name: 'My Events', href: '/my-events' },
        { name: 'Analytics', href: '/analytics' },
    ];

    return (
        <header className="bg-gray-900/50 backdrop-blur-md text-white border-b border-gray-800 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link href="/dashboard" className="text-2xl font-bold tracking-wider">Evently</Link>
                    <nav className="hidden md:flex md:items-center md:space-x-4">
                        {navLinks.map((link) => (
                            <Link key={link.name} href={link.href} className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${pathname === link.href ? 'bg-white text-black' : 'text-gray-300 hover:bg-gray-700'}`}>
                                {link.name}
                            </Link>
                        ))}
                    </nav>
                    {/* Replace the static profile with the interactive dropdown */}
                    <ProfileDropdown user={user} />
                </div>
            </div>
        </header>
    );
};

export default OrganizerNavbar;