// File: app/page.tsx
import Link from 'next/link';

export default function Home() {
    return (
        // We use a React Fragment <> to wrap both sections
        <>
            {/* Hero Section (from last step) */}
            <section className="relative h-[calc(100vh-4rem)] flex items-center justify-center text-center text-white">
                <div
                    className="absolute inset-0 bg-cover bg-center z-0"
                    style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
                />
                <div className="absolute inset-0 bg-black/60 z-10" />
                <div className="relative z-20 max-w-4xl px-4">
                    <h1 className="text-5xl md:text-7xl font-bold leading-tight" style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700 }}>
                        Discover & Create Amazing Events
                    </h1>
                    <p className="mt-4 text-lg md:text-xl text-gray-300">
                        Your one-stop platform to find exciting experiences or bring your own vision to life.
                    </p>
                    <div className="mt-8">
                        <Link href="/discover" className="bg-white text-black font-semibold py-3 px-8 rounded-lg text-lg hover:bg-gray-200 transition-transform transform hover:scale-105 duration-300 inline-block">
                            Get Started
                        </Link>
                    </div>
                </div>
            </section>

            {/* NEW: Features Section */}
            <section className="bg-black text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Everything You Need in One Place</h2>
                        <p className="mt-4 text-lg text-gray-400">
                            From finding your next adventure to managing your own successful event.
                        </p>
                    </div>
                    <div className="mt-12 grid gap-8 md:grid-cols-3">

                        {/* Feature 1: Discover */}
                        <div className="bg-gray-900/50 border border-gray-800 p-8 rounded-lg text-center">
                            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-white text-black mx-auto">
                                {/* SVG Icon for Search/Discover */}
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <h3 className="mt-6 text-lg font-medium">Discover Events</h3>
                            <p className="mt-2 text-base text-gray-400">
                                Explore a vast collection of events, from local meetups to global conferences. Find your next great experience.
                            </p>
                        </div>

                        {/* Feature 2: Create */}
                        <div className="bg-gray-900/50 border border-gray-800 p-8 rounded-lg text-center">
                            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-white text-black mx-auto">
                                {/* SVG Icon for Create */}
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                            </div>
                            <h3 className="mt-6 text-lg font-medium">Create & Host</h3>
                            <p className="mt-2 text-base text-gray-400">
                                Easily set up and manage your own events with our intuitive creation tools. Sell tickets and engage your audience.
                            </p>
                        </div>

                        {/* Feature 3: Manage */}
                        <div className="bg-gray-900/50 border border-gray-800 p-8 rounded-lg text-center">
                            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-white text-black mx-auto">
                                {/* SVG Icon for Manage/Analytics */}
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <h3 className="mt-6 text-lg font-medium">Manage & Analyze</h3>
                            <p className="mt-2 text-base text-gray-400">
                                Track your ticket sales, monitor attendee engagement, and gain valuable insights with our analytics dashboard.
                            </p>
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
}