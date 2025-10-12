// app/(public)/signup-organizer/page.tsx
"use client";

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AuthInput from '@/components/AuthInput';
import { registerUser } from '@/lib/api';

// Re-using the same icons
const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const EmailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" /></svg>;
const PasswordIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>;

function OrganizerSignUpForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            // The role is now hardcoded to 'Organizer' for this page
            await registerUser(name, email, password, 'Organizer');
            alert('Organizer account created successfully! Please log in.');
            router.push('/login');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registration failed.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black p-4">
            <div className="w-full max-w-md">
                <div className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-2xl p-8 shadow-2xl">
                    <h2 className="text-center text-3xl font-bold text-white mb-2">Become an Organizer</h2>
                    <p className="text-center text-gray-400 mb-8">Start creating amazing events</p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <AuthInput type="text" placeholder="Full Name or Company" value={name} onChange={(e) => setName(e.target.value)} icon={<UserIcon />}/>
                        <AuthInput type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} icon={<EmailIcon />} />
                        <AuthInput type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} icon={<PasswordIcon />} />

                        {error && <p className="text-sm text-red-500 text-center">{error}</p>}

                        <button type="submit" className="w-full bg-white text-black font-semibold py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors">
                            Create Organizer Account
                        </button>
                    </form>

                    <p className="text-center text-sm text-gray-400 mt-8">
                        Just want to attend events?{' '}
                        <Link href="/signup" className="font-medium text-white hover:underline">
                            Sign up as a Participant
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function OrganizerSignUpPage() {
    return (
        <Suspense>
            <OrganizerSignUpForm />
        </Suspense>
    )
}