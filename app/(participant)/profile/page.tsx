// File: app/(participant)/profile/page.tsx
"use client";

// We'll reuse our AuthInput for consistency
import AuthInput from "@/components/AuthInput";

// Simple SVG Icons for the form fields
const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const EmailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" /></svg>;
const PasswordIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>;


export default function ProfilePage() {
    // In a real app, this data would come from our user store
    const user = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        avatar: '/images/hero-bg.jpg'
    };

    return (
        <div className="p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">My Profile & Settings</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Left Column: Avatar and Details */}
                    <div className="md:col-span-1">
                        <div className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-xl p-6 text-center shadow-2xl">
                            <img
                                src={user.avatar}
                                alt="User Avatar"
                                className="w-32 h-32 rounded-full mx-auto mb-4 border-2 border-gray-700 object-cover"
                            />
                            <h2 className="text-2xl font-bold text-white">{user.name}</h2>
                            <p className="text-gray-400 text-sm">{user.email}</p>
                            <button className="mt-4 w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm">
                                Change Photo
                            </button>
                        </div>
                    </div>

                    {/* Right Column: Edit Form */}
                    <div className="md:col-span-2">
                        <div className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-xl p-8 shadow-2xl">
                            <form className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                                    <AuthInput type="text" placeholder="Your full name" value={user.name} onChange={() => {}} icon={<UserIcon />} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                                    <AuthInput type="email" placeholder="Your email address" value={user.email} onChange={() => {}} icon={<EmailIcon />} />
                                </div>

                                <div className="border-t border-gray-800 pt-6">
                                    <h3 className="text-lg font-semibold text-white mb-4">Change Password</h3>
                                    <div className="space-y-6">
                                        <AuthInput type="password" placeholder="Current Password" value="" onChange={() => {}} icon={<PasswordIcon />} />
                                        <AuthInput type="password" placeholder="New Password" value="" onChange={() => {}} icon={<PasswordIcon />} />
                                    </div>
                                </div>

                                <div className="flex justify-end pt-4">
                                    <button type="submit" className="bg-white text-black font-semibold py-2 px-6 rounded-lg hover:bg-gray-200 transition-colors">
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}