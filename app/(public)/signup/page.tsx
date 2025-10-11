// File: app/(public)/signup/page.tsx
"use client";

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import AuthInput from '@/components/AuthInput';
import { registerUser } from '@/lib/api'; // <-- 1. Import our REAL register function

// Your SVG icons remain exactly the same
const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const EmailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" /></svg>;
const PasswordIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>;

function SignUpForm() {
    // All your state and hooks are preserved
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isOrganizer, setIsOrganizer] = useState(false);
    const [error, setError] = useState(''); // Added for showing backend errors
    const router = useRouter();
    const searchParams = useSearchParams();

    // Your useEffect is preserved
    useEffect(() => {
        if (searchParams.get('role') === 'organizer') {
            setIsOrganizer(true);
        }
    }, [searchParams]);

    // --- 2. THIS IS THE UPDATED SUBMIT FUNCTION ---
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(''); // Clear previous errors

        // We can add more validation here if needed, e.g., for password length

        try {
            // Translate the checkbox boolean to the role string the backend expects
            const backendRole = isOrganizer ? 'Organizer' : 'Attendee';

            // We now call our real backend API
            const result = await registerUser(name, email, password, backendRole);
            console.log('Registration successful:', result);

            // On success, we alert the user and redirect them to the login page
            alert('Account created successfully! Please log in.');
            router.push('/login');

        } catch (err: any) {
            console.error('Registration failed:', err.response?.data?.message || err.message);
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        }
    };

    // --- 3. YOUR ENTIRE UI REMAINS EXACTLY THE SAME ---
    return (
        <div className="min-h-screen flex items-center justify-center bg-black p-4">
            <div className="w-full max-w-md">
                <div className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-2xl p-8 shadow-2xl">
                    <h2 className="text-center text-3xl font-bold text-white mb-2">Create an Account</h2>
                    <p className="text-center text-gray-400 mb-8">Join the Evently community</p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <AuthInput
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            icon={<UserIcon />}
                        />
                        <AuthInput
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            icon={<EmailIcon />}
                        />
                        <AuthInput
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            icon={<PasswordIcon />}
                        />

                        <div className="flex items-center">
                            <input
                                id="is-organizer"
                                type="checkbox"
                                checked={isOrganizer}
                                onChange={(e) => setIsOrganizer(e.target.checked)}
                                className="h-4 w-4 bg-gray-700 border-gray-600 text-white focus:ring-white/50 rounded"
                            />
                            <label htmlFor="is-organizer" className="ml-2 block text-sm text-gray-300">
                                I want to create events
                            </label>
                        </div>

                        {/* Added to display errors from the backend */}
                        {error && <p className="text-sm text-red-500 text-center">{error}</p>}

                        <button
                            type="submit"
                            className="w-full bg-white text-black font-semibold py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                            Create Account
                        </button>
                    </form>

                    <p className="text-center text-sm text-gray-400 mt-8">
                        Already have an account?{' '}
                        <Link href="/login" className="font-medium text-white hover:underline">
                            Log In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

// Your Suspense boundary is preserved
export default function SignUpPage() {
    return (
        <Suspense>
            <SignUpForm />
        </Suspense>
    )
}