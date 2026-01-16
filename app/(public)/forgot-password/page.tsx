// app/(public)/forgot-password/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Requesting password reset for: ${email}`);
    // Simulate API call
    setIsSubmitted(true);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-full max-w-md p-8 space-y-6 bg-[#121212] rounded-2xl shadow-lg border border-white/10">

        {/* Header Section */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white font-spectral">Reset Password</h1>
          <p className="text-gray-400 mt-2 text-sm">
            {isSubmitted
              ? "Check your inbox for reset instructions."
              : "Enter your email address to receive a reset link."}
          </p>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full mt-1 bg-black/20 border border-white/10 rounded-lg p-3 text-white placeholder-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-white text-black font-bold rounded-lg hover:bg-gray-300 transition-colors"
            >
              Send Reset Link
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg text-blue-400 text-sm text-center">
              A recovery email has been sent to <span className="font-bold text-white">{email}</span>.
            </div>
            <button
              onClick={() => setIsSubmitted(false)}
              className="w-full py-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              Didn't get the email? Try again.
            </button>
          </div>
        )}

        {/* Navigation Footer */}
        <div className="text-center pt-2">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-sm text-blue-400 hover:underline transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;