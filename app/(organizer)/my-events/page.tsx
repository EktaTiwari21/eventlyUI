// File: app/(organizer)/my-events/page.tsx

import Link from 'next/link';

// We can install an icon library later for these. For now, we'll use emojis.
const EditIcon = () => <span>✏️</span>;
const DeleteIcon = () => <span>🗑️</span>;

export default function MyEventsPage() {
    // Mock data for the events table
    const events = [
        {
            id: '1',
            name: 'Global Tech Summit 2025',
            status: 'Published',
            ticketsSold: 3500,
            revenue: '₹57,200',
        },
        {
            id: '2',
            name: 'Summer Music Fest',
            status: 'Draft',
            ticketsSold: 0,
            revenue: '₹0',
        },
        {
            id: '3',
            name: 'Art & Design Expo 2024',
            status: 'Ended',
            ticketsSold: 8000,
            revenue: '₹8,88,000',
        },
    ];

    const getStatusClasses = (status: string) => {
        switch (status) {
            case 'Published':
                return 'bg-green-600/30 text-green-300';
            case 'Draft':
                return 'bg-yellow-600/30 text-yellow-300';
            case 'Ended':
                return 'bg-red-600/30 text-red-300';
            default:
                return 'bg-gray-600/30 text-gray-300';
        }
    };

    return (
        <div className="p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">My Events</h1>
                    <Link href="/my-events/create">
                        <button className="bg-white text-black font-semibold py-2 px-4 rounded-lg flex items-center space-x-2 hover:bg-gray-200 transition-colors">
                            <span>+ Create New Event</span>
                        </button>
                    </Link>
                </div>

                {/* Glassmorphism Table Container */}
                <div className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-xl overflow-hidden shadow-2xl">
                    <table className="min-w-full divide-y divide-gray-800">
                        <thead className="bg-gray-800/60">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Event Name</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Tickets Sold</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Revenue</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                        {events.map((event) => (
                            <tr key={event.id} className="hover:bg-gray-700/40 transition-colors duration-150">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{event.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses(event.status)}`}>
                      {event.status}
                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{event.ticketsSold.toLocaleString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{event.revenue}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <div className="flex items-center space-x-4">
                                        <button className="text-gray-300 hover:text-white"><EditIcon /></button>
                                        <button className="text-gray-300 hover:text-white"><DeleteIcon /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}