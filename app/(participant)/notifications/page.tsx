// File: app/(participant)/notifications/page.tsx

import Link from 'next/link';

export default function NotificationsPage() {
    // Mock data
    const tickets = [
        { eventId: '1', name: 'Global Tech Summit 2025', date: 'November 12-14, 2025', count: 2, imageUrl: '/images/hero-bg.jpg' },
        { eventId: '2', name: 'Art & Design Expo', date: 'December 15-18, 2024', count: 1, imageUrl: '/images/hero-bg.jpg' },
    ];

    const notifications = [
        { message: 'Summer Beats Festival: Your event has been postponed due to weather. New dates will be announced soon.', time: '2h ago' },
        { message: 'Modern Art Exhibition: A new artist has been added to the lineup!', time: '1 day ago' },
        { message: 'Welcome to Evently! Start discovering amazing events near you.', time: '3 days ago' },
    ];

    return (
        <div className="p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">My Tickets & Notifications</h1>
                    <button className="text-sm text-gray-400 hover:text-white">Mark all as read</button>
                </div>

                {/* My Tickets Section */}
                <h2 className="text-xl font-semibold mb-4 text-gray-300">Active Tickets</h2>
                <div className="space-y-4 mb-12">
                    {tickets.map((ticket, index) => (
                        <div key={index} className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-xl p-4 flex items-center justify-between shadow-lg hover:border-gray-700 transition-all">
                            <div className="flex items-center space-x-4">
                                <img src={ticket.imageUrl} alt={ticket.name} className="w-24 h-16 object-cover rounded-md" />
                                <div>
                                    <h3 className="font-semibold text-white">{ticket.name}</h3>
                                    <p className="text-xs text-gray-400">{ticket.date}</p>
                                    <p className="text-sm font-bold text-white mt-1">{ticket.count} Tickets</p>
                                </div>
                            </div>
                            <Link href={`/events/${ticket.eventId}`} className="bg-white text-black font-semibold py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                                View Event
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Notifications Section */}
                <h2 className="text-xl font-semibold mb-4 text-gray-300">Notifications</h2>
                <div className="space-y-4">
                    {notifications.map((notification, index) => (
                        <div key={index} className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-xl p-4 flex justify-between items-start shadow-lg">
                            <p className="text-sm text-gray-300 leading-relaxed">{notification.message}</p>
                            <p className="text-xs text-gray-500 flex-shrink-0 ml-6 mt-1">{notification.time}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};