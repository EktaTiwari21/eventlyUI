// app/(public)/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import useUserStore from '@/stores/useUserStore';
import { loginUser } from '@/lib/api'; // <-- 1. Import our REAL login function

const LoginPage = () => {
  // All your state and hooks are preserved
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('participant'); // This is still useful for the UI
  const [error, setError] = useState('');
  const router = useRouter();
  const { setUser } = useUserStore();

  // --- 2. THIS IS THE UPDATED SUBMIT FUNCTION ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // We now call our real backend API
      const userData = await loginUser(email, password);
      console.log('Backend login successful:', userData);

      // Update the global store with the REAL user data from the API
      setUser({
        fullName: userData.name,
        email: userData.email,
        profileImageUrl: '/images/hero-bg.jpg', // You can update this later
        role: userData.role, // Use the role from the backend
      });

      // --- Redirect based on the REAL role from the backend ---
      if (userData.role === 'Organizer') {
        router.push('/organizer/dashboard');
      } else {
        router.push('/discover');
      }

    } catch (err: any) {
      console.error('Login failed:', err.response?.data?.message || err.message);
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    }
  };

  // --- 3. YOUR ENTIRE UI REMAINS EXACTLY THE SAME ---
  return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="w-full max-w-md p-8 space-y-6 bg-[#121212] rounded-2xl shadow-lg border border-white/10">
          <h1 className="text-3xl font-bold text-center text-white">Login to Evently</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email Address</label>
              <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full mt-1 bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
              <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full mt-1 bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-300">Login as</label>
              <select
                  id="role"
                  name="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full mt-1 bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="participant">Participant</option>
                <option value="organizer">Organizer</option>
              </select>
            </div>
            {error && <p className="text-sm text-red-500 text-center">{error}</p>}
            <div>
              <button
                  type="submit"
                  className="w-full py-3 px-4 bg-white text-black font-bold rounded-lg hover:bg-gray-300 transition-colors"
              >
                Sign In
              </button>
            </div>
          </form>
          <p className="text-sm text-center text-gray-400">
            Don't have an account?{' '}
            <Link href="/signup" className="font-medium text-blue-400 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
  );
};

export default LoginPage;