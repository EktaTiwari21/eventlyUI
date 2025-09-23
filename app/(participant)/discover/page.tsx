// app/(participant)/discover/page.tsx

const DiscoverPage = () => {
  return (
    <div className="bg-black text-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] flex items-center justify-center">
        <img
          src="/images/hero-bg.jpg"
          alt="Concert"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="relative z-10 text-center">
          {/* --- CHANGE: The heading text has been updated --- */}
          <h1 className="text-5xl md:text-7xl font-bold font-spectral">
            Discover Events. Create Memories.
          </h1>
          <p className="text-lg text-gray-300 mt-4">
            Where event discovery meets effortless creation.
          </p>
          <div className="mt-8 max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search for events by name, location, or organizer..."
              className="w-full bg-black/30 border border-white/10 rounded-lg p-4 pl-6 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none backdrop-blur-sm"
            />
          </div>
        </div>
      </div>

      {/* Upcoming Events Section */}
      <div className="container mx-auto px-4 lg:px-20 py-16">
        <h2 className="text-4xl font-bold mb-8">Upcoming Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Placeholder cards */}
          <div className="bg-white/5 aspect-video rounded-lg flex items-center justify-center">
            <p className="text-gray-400">Event Card Placeholder</p>
          </div>
          <div className="bg-white/5 aspect-video rounded-lg flex items-center justify-center">
            <p className="text-gray-400">Event Card Placeholder</p>
          </div>
          <div className="bg-white/5 aspect-video rounded-lg flex items-center justify-center">
            <p className="text-gray-400">Event Card Placeholder</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscoverPage;