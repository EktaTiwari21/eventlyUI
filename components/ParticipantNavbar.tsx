// File: components/ParticipantNavbar.tsx
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const ParticipantNavbar = () => {
    const pathname = usePathname();
    const user = { name: 'John Doe', avatar: '/images/hero-bg.jpg' }; // Placeholder

    const navLinks = [
        { name: 'Discover', href: '/discover' },
        { name: 'My Tickets', href: '/notifications' },
        { name: '$Wallet', href: '/wallet' },
        { name: 'History', href: '/history' },
    ];

    return (
        <header className="bg-gray-900/50 backdrop-blur-md text-white border-b border-gray-800 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link href="/discover" className="text-2xl font-bold tracking-wider">Evently</Link>
                    <nav className="hidden md:flex md:items-center md:space-x-4">
                        {navLinks.map((link) => (
                            <Link key={link.name} href={link.href} className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${pathname === link.href ? 'bg-white text-black' : 'text-gray-300 hover:bg-gray-700'}`}>
                                {link.name}
                            </Link>
                        ))}
                    </nav>
                    <div className="flex items-center">
                        <span className="text-sm mr-3">{user.name}</span>
                        <Image src={user.avatar} alt="User Avatar" width={32} height={32} className="rounded-full object-cover" />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default ParticipantNavbar;