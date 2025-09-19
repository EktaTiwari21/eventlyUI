// File: components/Header.tsx
import Link from 'next/link';
import React from 'react';

const Header = () => {
    return (
        <header className="bg-gray-900/50 backdrop-blur-md text-white border-b border-gray-800 sticky top-0 z-50">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="text-2xl font-bold tracking-wider">
                            Evently
                        </Link>
                    </div>

                    {/* Login/Signup Buttons */}
                    <div className="flex items-center space-x-4">
                        <Link href="/login" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
                            Log In
                        </Link>
                        <Link href="/signup" className="bg-white text-black font-semibold py-2 px-4 rounded-lg text-sm hover:bg-gray-200 transition-colors">
                            Sign Up
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;