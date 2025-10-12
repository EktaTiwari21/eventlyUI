/** @type {import('next').NextConfig} */
const nextConfig = {
    // We are telling Next.js's Image component that it is safe
    // to accept and optimize images from BOTH Cloudinary AND Unsplash.
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                port: '',
                pathname: '/**', // Allow any path from Cloudinary
            },
            // --- THIS IS THE CRITICAL FIX ---
            // We add a new entry to the list for Unsplash.
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                port: '',
                pathname: '/**', // Allow any path from Unsplash
            },
        ],
    },
};

export default nextConfig;