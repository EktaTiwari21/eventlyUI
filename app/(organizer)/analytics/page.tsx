// File: app/(organizer)/analytics/page.tsx

export default function AnalyticsPage() {
    // Mock data for the analytics components
    const topStats = [
        { label: 'Total Revenue', value: '₹12,45,280' },
        { label: 'Total Tickets Sold', value: '47,832' },
        { label: 'Average Attendee Rate', value: '91%', change: '+3%' },
    ];

    const topEvents = [
        { name: 'Global Tech Summit 2025', revenue: '₹5,60,000' },
        { name: 'Summer Music Fest', revenue: '₹3,25,000' },
        { name: 'Art & Design Expo 2024', revenue: '₹1,80,500' },
    ];

    return (
        <div className="p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Event Analytics</h1>

                {/* Top Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {topStats.map((stat, index) => (
                        <div key={index} className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-xl p-6 shadow-2xl">
                            <p className="text-gray-400 text-sm">{stat.label}</p>
                            <div className="flex items-baseline space-x-2 mt-2">
                                <p className="text-3xl font-bold text-white">{stat.value}</p>
                                {stat.change && <p className="text-green-400 font-semibold">{stat.change}</p>}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Main Chart Placeholder */}
                <div className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-xl p-6 shadow-2xl mb-8">
                    <h2 className="text-lg font-semibold mb-4">Revenue Over Time</h2>
                    <div className="h-80 flex items-center justify-center text-gray-500">
                        {/* Placeholder for a line chart */}
                        <svg className="w-full h-full" fill="none" viewBox="0 0 400 200">
                            <path stroke="rgba(255,255,255,0.1)" strokeWidth="1" d="M 0 180 H 400 M 0 120 H 400 M 0 60 H 400" />
                            <path stroke="rgba(139, 92, 246, 0.5)" strokeWidth="2" d="M 0 150 C 40 100, 80 120, 120 80 S 200 20, 240 60 S 320 160, 360 120, 400 100" />
                            <path stroke="rgba(255, 255, 255, 0.4)" strokeWidth="2" d="M 0 100 C 40 140, 80 80, 120 100 S 200 180, 240 140 S 320 40, 360 80, 400 60" />
                        </svg>
                    </div>
                </div>

                {/* Top Events List */}
                <div className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-xl p-6 shadow-2xl">
                    <h2 className="text-lg font-semibold mb-4">Top Performing Events</h2>
                    <ul className="divide-y divide-gray-800">
                        {topEvents.map((event, index) => (
                            <li key={index} className="py-3 flex justify-between items-center">
                                <span className="text-white font-medium">{event.name}</span>
                                <span className="text-gray-300">{event.revenue}</span>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
        </div>
    );
}