// app/(public)/page.tsx
import Link from 'next/link';

const LandingPage = () => {
  return (
    <div className="relative h-screen flex items-center justify-center text-center text-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-bg.jpg"
          alt="Events background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 p-4">
        <h1 className="text-5xl md:text-7xl font-bold font-spectral tracking-tight">
          Discover & Create<br />Amazing Events
        </h1>
        <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
          Your one-stop platform to find exciting experiences or bring your own vision to life.
        </p>

        {/* --- CHANGE: The href now points to /signup --- */}
        <Link
          href="/signup"
          className="mt-8 inline-block bg-white text-black font-bold py-3 px-8 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;