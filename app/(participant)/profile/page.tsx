// app/(participant)/profile/page.tsx
'use client';

import { useState, useEffect } from 'react';
import ImageUploader from '@/components/ImageUploader';
import useUserStore from '@/stores/useUserStore';

const ParticipantProfilePage = () => {
  const { setUser, fullName, email, profileImageUrl } = useUserStore();

  // --- States for UI Toggles ---
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    profileUrl: '',
  });

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      fullName: fullName,
      email: email,
      profileUrl: profileImageUrl
    }));
  }, [fullName, email, profileImageUrl]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleImageSelect = (newImageUrl: string) => {
    setFormData(prevState => ({ ...prevState, profileUrl: newImageUrl }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({
      fullName: formData.fullName,
      email: formData.email,
      profileImageUrl: formData.profileUrl,
    });
    alert('Profile updated successfully!');
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="container mx-auto px-4 lg:px-20 py-12">
        <h1 className="text-4xl font-bold mb-8 font-spectral text-white">My Profile & Settings</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Public Profile Sidebar */}
          <div className="lg:col-span-1 bg-[#121212] p-8 rounded-2xl border border-white/10 h-fit flex flex-col items-center">
            <ImageUploader
              onImageSelect={handleImageSelect}
              currentImageUrl={formData.profileUrl}
              variant="circle"
              buttonText="Change Photo"
            />
            <div className="text-center mt-6">
              <h2 className="text-2xl font-bold">{formData.fullName}</h2>
              <p className="text-gray-400 text-sm">{formData.email}</p>
            </div>
          </div>

          {/* Details Section */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-[#121212] p-8 rounded-2xl border border-white/10 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full bg-black/20 border border-white/10 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-black/20 border border-white/10 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"/>
              </div>

              {/* Password Section Toggle */}
              <div className="pt-4 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => setShowPasswordFields(!showPasswordFields)}
                  className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors font-medium text-sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transform transition-transform ${showPasswordFields ? 'rotate-90' : ''}`}><polyline points="9 18 15 12 9 6"></polyline></svg>
                  {showPasswordFields ? "Cancel Password Change" : "Change Password"}
                </button>

                {showPasswordFields && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 animate-fadeIn">

                    {/* Current Password with Visibility Toggle */}
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Current Password</label>
                      <div className="relative">
                        <input
                          type={showCurrentPassword ? 'text' : 'password'}
                          name="currentPassword"
                          value={formData.currentPassword}
                          onChange={handleChange}
                          className="w-full bg-black/20 border border-white/10 rounded-lg p-3 pr-10 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-white"
                        >
                          {showCurrentPassword ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path><line x1="2" y1="2" x2="22" y2="22"></line></svg>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* New Password with Visibility Toggle */}
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">New Password</label>
                      <div className="relative">
                        <input
                          type={showNewPassword ? 'text' : 'password'}
                          name="newPassword"
                          value={formData.newPassword}
                          onChange={handleChange}
                          className="w-full bg-black/20 border border-white/10 rounded-lg p-3 pr-10 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-white"
                        >
                          {showNewPassword ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path><line x1="2" y1="2" x2="22" y2="22"></line></svg>
                          )}
                        </button>
                      </div>
                    </div>

                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end">
              <button type="submit" className="bg-white text-black font-bold py-3 px-10 rounded-lg hover:bg-gray-200 transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ParticipantProfilePage;