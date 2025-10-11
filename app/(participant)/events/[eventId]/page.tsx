// app/(participant)/events/[eventId]/page.tsx
'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { getEventById, purchaseSingleTicket, requestGroupTickets } from '@/lib/api'; // <-- 1. Import new functions

interface IEventDetails {
    _id: string;
    name: string;
    description: string;
    date: string;
    location: string;
    ticketPrice: number;
    imageUrl: string;
}

const EventDetailPage = () => {
    const params = useParams();
    const eventId = params.eventId as string;
    const [event, setEvent] = useState<IEventDetails | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [quantity, setQuantity] = useState(1);

    // --- 2. ADD STATE FOR FRIEND EMAILS ---
    const [friendEmails, setFriendEmails] = useState<string[]>([]);

    useEffect(() => {
        if (eventId) {
            const fetchEventDetails = async () => {
                try {
                    const data = await getEventById(eventId);
                    setEvent(data);
                } catch (err) {
                    console.error("Failed to fetch event details:", err);
                    setError('Could not load event details. Please try again later.');
                } finally {
                    setIsLoading(false);
                }
            };
            fetchEventDetails();
        }
    }, [eventId]);

    // This effect dynamically adjusts the number of email fields
    useEffect(() => {
        setFriendEmails(Array(Math.max(0, quantity - 1)).fill(''));
    }, [quantity]);

    const handleEmailChange = (index: number, value: string) => {
        const updatedEmails = [...friendEmails];
        updatedEmails[index] = value;
        setFriendEmails(updatedEmails);
    };

    // --- 3. THE NEW "BUY TICKETS" HANDLER ---
    const handleBuyTickets = async () => {
        if (!event) return;

        try {
            if (quantity === 1) {
                // Single ticket purchase
                await purchaseSingleTicket(event._id);
                alert('Ticket purchased successfully! Check the "My Tickets" tab.');
            } else {
                // Group ticket reservation
                const emailsToSubmit = friendEmails.filter(email => email.trim() !== '');
                if (emailsToSubmit.length !== quantity - 1) {
                    alert('Please fill out all email fields for your friends.');
                    return;
                }
                await requestGroupTickets(event._id, emailsToSubmit);
                alert('Reservation successful! Your friends have been sent an invitation.');
            }
        } catch (err: any) {
            console.error("Ticket purchase/reservation failed:", err.response?.data || err);
            alert(`Error: ${err.response?.data?.message || 'An unexpected error occurred.'}`);
        }
    };

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center text-white bg-black">Loading Event...</div>;
    }

    if (error) {
        return <div className="min-h-screen flex items-center justify-center text-red-500 bg-black">{error}</div>;
    }

    if (!event) {
        return <div className="min-h-screen flex items-center justify-center text-white bg-black">Event not found.</div>;
    }

    const total = event.ticketPrice * quantity;

    // --- 4. YOUR UI IS PRESERVED, WITH NEW DYNAMIC FIELDS ---
    return (
        <div className="bg-black min-h-screen text-white">
            <div className="relative w-full h-[60vh]">
                <Image src={event.imageUrl || '/images/concert-bg.jpg'} alt={event.name} fill className="object-cover"/>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8 md:p-12 lg:p-20">
                    <h1 className="text-5xl md:text-7xl font-bold font-spectral mb-4">{event.name}</h1>
                    <div className="flex items-center gap-6 text-lg text-gray-200">
                        <p>🗓️ <span className="ml-2">{new Date(event.date).toLocaleDateString()}</span></p>
                        <p>📍 <span className="ml-2">{event.location}</span></p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 lg:px-20 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="md:col-span-2">
                        <h2 className="text-3xl font-bold mb-4">About This Event</h2>
                        <p className="text-gray-300 leading-relaxed">{event.description}</p>
                    </div>
                    <div className="bg-[#121212] p-6 rounded-2xl border border-white/10 h-fit">
                        <p className="text-2xl font-bold mb-4">{event.ticketPrice > 0 ? `₹${event.ticketPrice.toFixed(2)}` : 'Free Event'}</p>
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-gray-300">Quantity</span>
                            <div className="flex items-center gap-4 border border-gray-600 rounded-md p-1">
                                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-2 text-lg">-</button>
                                <span className="text-lg">{quantity}</span>
                                <button onClick={() => setQuantity(q => q + 1)} className="px-2 text-lg">+</button>
                            </div>
                        </div>

                        {/* --- 5. DYNAMIC EMAIL INPUTS --- */}
                        {quantity > 1 && (
                            <div className="space-y-4 my-4">
                                <p className="text-sm text-gray-300">Enter your friends' emails to invite them:</p>
                                {friendEmails.map((email, index) => (
                                    <input
                                        key={index}
                                        type="email"
                                        placeholder={`Friend ${index + 1}'s Email`}
                                        value={email}
                                        onChange={(e) => handleEmailChange(index, e.target.value)}
                                        className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    />
                                ))}
                            </div>
                        )}

                        <div className="flex items-center justify-between font-bold text-xl border-t border-gray-600 pt-4">
                            <span>Total</span>
                            <span>{event.ticketPrice > 0 ? `₹${total.toFixed(2)}` : 'FREE'}</span>
                        </div>
                        <button
                            onClick={handleBuyTickets}
                            className="w-full mt-6 bg-white text-black font-bold py-3 rounded-lg hover:bg-gray-300 transition-colors"
                        >
                            {quantity > 1 ? 'Request Group Tickets' : 'Buy Ticket'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetailPage;