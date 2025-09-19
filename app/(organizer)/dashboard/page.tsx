// File: app/(organizer)/dashboard/page.tsx

export default function DashboardPage() {
    // Mock data
    const stats = [
        { label: 'Total Tickets Sold', value: '12,348' },
        { label: 'Active Events', value: '8' },
        { label: 'Total Revenue', value: '₹30,180' },
    ];

    const recentActivities = [
        'New event created: Marketing Summit 2024',
        'Ticket purchased by Ethan Harper on Tech Conference 2024',
        'Ticket purchased by Enna on Tech Conference 2025',
    ];

    return (
        <div className="p-8">
            <div className="max-w-7xl mx-auto">
                {/* Welcome Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-white tracking-wider">Welcome, John Doe!</h1>
                    <p className="text-gray-400 mt-2 text-lg">Ready to revolutionize your events?</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-gray-800/50 backdrop-blur-md border border-gray-700/60 rounded-lg p-6 text-center shadow-lg">
                            <p className="text-gray-400 text-sm">{stat.label}</p>
                            <p className="text-3xl font-bold mt-2 text-white">{stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* Recent Activities */}
                <div>
                    <h2 className="text-2xl font-semibold mb-6">Recent Activities</h2>
                    <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700/60 rounded-lg p-6 shadow-lg">
                        <ul className="space-y-4">
                            {recentActivities.map((activity, index) => (
                                <li key={index} className="text-gray-300 border-b border-gray-800 pb-3 last:border-b-0 last:pb-0">
                                    {activity}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}