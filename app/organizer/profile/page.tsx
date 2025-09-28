// app/organizer/profile/page.tsx
'use client';

import { useState, useEffect } from 'react';
import ImageUploader from '@/components/ImageUploader';
import useUserStore from '@/stores/useUserStore'; // Import the store

const OrganizerProfilePage = () => {
  // --- Get the setUser function from the store ---
  const { setUser, fullName, email, profileImageUrl } = useUserStore();

  const [formData, setFormData] = useState({
    organizerName: '',
    bio: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    website: 'https://awesomeevents.com',
    twitter: 'https://twitter.com/awesomeevents',
    upiId: 'awesomeevents@upi',
    logoUrl: '',
  });

  // Effect to load initial data from the store
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      organizerName: fullName,
      email: email,
      logoUrl: profileImageUrl
    }));
  }, [fullName, email, profileImageUrl]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleImageSelect = (newImageUrl: string) => {
    setFormData(prevState => ({ ...prevState, logoUrl: newImageUrl }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // --- FIX: Update the global store with the new data ---
    setUser({
      fullName: formData.organizerName,
      email: formData.email,
      profileImageUrl: formData.logoUrl,
    });
    console.log('Saving Organizer Profile:', formData);
    alert('Profile updated successfully!');
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="container mx-auto px-4 lg:px-20 py-12">
        <h1 className="text-4xl font-bold mb-8 font-spectral">Organizer Profile</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <div className="lg:col-span-1 bg-[#121212] p-6 rounded-2xl border border-white/10 h-fit">
            <h2 className="text-xl font-bold mb-4">Public Profile</h2>
            <div className="space-y-4">
              <ImageUploader
                onImageSelect={handleImageSelect}
                currentImageUrl={formData.logoUrl}
                variant="circle"
                buttonText="Change Logo"
              />
              <div>
                <label htmlFor="organizerName" className="block text-sm font-medium text-gray-300 mb-2">Organizer / Brand Name</label>
                <input type="text" name="organizerName" id="organizerName" value={formData.organizerName} onChange={handleChange} className="w-full bg-black/20 border border-white/10 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"/>
              </div>
              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-300 mb-2">Organizer Bio</label>
                <textarea name="bio" id="bio" rows={4} value={formData.bio} onChange={handleChange} className="w-full bg-black/20 border border-white/10 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"/>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 flex flex-col gap-8">
            <div className="bg-[#121212] p-6 rounded-2xl border border-white/10">
              <h2 className="text-xl font-bold mb-4">Account & Security</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Contact Email</label>
                  <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="w-full bg-black/20 border border-white/10 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"/>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-300 mb-2">Current Password</label>
                    <input type="password" name="currentPassword" id="currentPassword" value={formData.currentPassword} onChange={handleChange} className="w-full bg-black/20 border border-white/10 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"/>
                  </div>
                  <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
                    <input type="password" name="newPassword" id="newPassword" value={formData.newPassword} onChange={handleChange} className="w-full bg-black/20 border border-white/10 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"/>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#121212] p-6 rounded-2xl border border-white/10">
              <h2 className="text-xl font-bold mb-4">Social & Payouts</h2>
              <div className="space-y-4">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="website" className="block text-sm font-medium text-gray-300 mb-2">Website URL</label>
                      <input type="url" name="website" id="website" value={formData.website} onChange={handleChange} className="w-full bg-black/20 border border-white/10 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="https://"/>
                    </div>
                    <div>
                      <label htmlFor="twitter" className="block text-sm font-medium text-gray-300 mb-2">Twitter URL</label>
                      <input type="url" name="twitter" id="twitter" value={formData.twitter} onChange={handleChange} className="w-full bg-black/20 border border-white/10 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="https://"/>
                    </div>
                 </div>
                 <div>
                    <label htmlFor="upiId" className="block text-sm font-medium text-gray-300 mb-2">Payout UPI ID</label>
                    <input type="text" name="upiId" id="upiId" value={formData.upiId} onChange={handleChange} className="w-full bg-black/20 border border-white/10 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="yourname@bank"/>
                  </div>
              </div>
            </div>

            <div className="flex justify-end">
                <button type="submit" className="bg-white text-black font-bold py-3 px-8 rounded-lg hover:bg-gray-300 transition-colors">
                  Save Changes
                </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrganizerProfilePage;