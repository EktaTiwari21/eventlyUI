// File: components/Footer.tsx
import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 border-t border-gray-800 text-gray-400">
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="text-center text-sm">
                    <p>&copy; {new Date().getFullYear()} Evently. All rights reserved.</p>
                    <p className="mt-2">Designed to bring people together.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;