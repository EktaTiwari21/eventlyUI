// File: app/(participant)/discover/page.tsx

import EventCard from "@/components/EventCard"; // We'll create this component later

export default function DiscoverPage() {
    return (
        <div>
            {/* Hero Section */}
            <div className="relative h-[40vh] flex items-center justify-center text-center p-4">
                <div
                    className="absolute inset-0 bg-cover bg-center z-0"
                    style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
                />
                <div className="absolute inset-0 bg-black/70 z-10" />
                <div className="relative z-20">
                    <h1 className="text-4xl md:text-5xl font-bold">Discover Your Next Experience</h1>
                    <div className="mt-6">
                        <input
                            type="text"
                            placeholder="Search for events by name, location, or organizer..."
                            className="w-full max-w-2xl bg-gray-800/80 border border-gray-600 rounded-full py-3 px-6 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50"
                        />
                    </div>
                </div>
            </div>

            {/* Placeholder for Event Grid */}
            <div className="py-12 px-4 md:px-8">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold mb-8">Upcoming Events</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* We will map over real EventCard components here later */}
                        <div className="h-64 bg-gray-800/50 border border-gray-700 rounded-lg flex items-center justify-center">Event Card Placeholder</div>
                        <div className="h-64 bg-gray-800/50 border border-gray-700 rounded-lg flex items-center justify-center">Event Card Placeholder</div>
                        <div className="h-64 bg-gray-800/50 border border-gray-700 rounded-lg flex items-center justify-center">Event Card Placeholder</div>
                    </div>
                </div>
            </div>
        </div>
    );
}