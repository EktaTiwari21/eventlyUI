// File: app/(participant)/events/[eventId]/page.tsx
"use client";

import { useState } from 'react';

// Icons for details
const CalendarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const LocationIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;

export default function EventDetailsPage() {
    const [ticketQuantity, setTicketQuantity] = useState(1);
    const ticketPrice = 500; // Mock price

    const handleQuantityChange = (amount: number) => {
        setTicketQuantity((prev) => Math.max(1, prev + amount));
    };

    return (
        <div>
            {/* Event Hero Image */}
            <div className="w-full h-[50vh] bg-cover bg-center" style={{ backgroundImage: "url('/images/hero-bg.jpg')" }} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column: Event Info */}
                    <div className="lg:col-span-2">
                        <div className="bg-gray-900/70 backdrop-blur-md border border-gray-800 rounded-xl p-8 shadow-2xl">
                            <h1 className="text-4xl font-bold text-white mb-4">Global Tech Summit 2025</h1>
                            <p className="text-gray-300 mb-6">
                                Join industry leaders from around the globe to discuss the future of technology, innovation, and artificial intelligence. This three-day summit features keynote speeches, hands-on workshops, and unparalleled networking opportunities.
                            </p>
                            <div className="flex items-center text-lg text-gray-300 mb-2">
                                <CalendarIcon />
                                <span>November 12-14, 2025</span>
                            </div>
                            <div className="flex items-center text-lg text-gray-300">
                                <LocationIcon />
                                <span>San Francisco, CA</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Ticket Purchase */}
                    <div>
                        <div className="bg-gray-900/70 backdrop-blur-md border border-gray-800 rounded-xl p-6 shadow-2xl sticky top-24">
                            <p className="text-2xl font-bold text-white mb-4">₹{ticketPrice.toFixed(2)}</p>

                            <div className="flex items-center justify-between mb-4">
                                <p className="text-gray-300">Quantity</p>
                                <div className="flex items-center border border-gray-600 rounded-md">
                                    <button onClick={() => handleQuantityChange(-1)} className="px-3 py-1 text-lg font-bold hover:bg-gray-700 rounded-l-md">-</button>
                                    <span className="px-4 py-1 text-lg">{ticketQuantity}</span>
                                    <button onClick={() => handleQuantityChange(1)} className="px-3 py-1 text-lg font-bold hover:bg-gray-700 rounded-r-md">+</button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between font-bold text-xl mb-6">
                                <p>Total</p>
                                <p>₹{(ticketPrice * ticketQuantity).toFixed(2)}</p>
                            </div>

                            <button className="w-full bg-white text-black font-semibold py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors">
                                Buy Tickets
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}