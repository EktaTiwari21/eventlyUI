// File: app/signup/page.tsx
"use client";

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import AuthInput from '@/components/AuthInput';

// Simple SVG icons for the input fields
const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const EmailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" /></svg>;
const PasswordIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>;

function SignUpForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isOrganizer, setIsOrganizer] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        // Check if the URL has ?role=organizer
        if (searchParams.get('role') === 'organizer') {
            setIsOrganizer(true);
        }
    }, [searchParams]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In the future, we'll connect this to our backend API
        console.log({ name, email, password, role: isOrganizer ? 'organizer' : 'participant' });
        // Navigate to login after successful signup
        router.push('/login');
    };

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

// We wrap the form in a Suspense boundary because useSearchParams must be used in a Client Component.
export default function SignUpPage() {
    return (
        <Suspense>
            <SignUpForm />
        </Suspense>
    )
}