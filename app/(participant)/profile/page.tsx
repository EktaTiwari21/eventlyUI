'use client';

import { useState, useEffect } from 'react';
import useUserStore from '@/stores/useUserStore';
import ImageUploader from '@/components/ImageUploader';

const ProfilePage = () => {
  const { fullName, email, profileImageUrl, setUser } = useUserStore();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    currentPassword: '',
    newPassword: '',
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  useEffect(() => {
    setFormData({
      fullName: fullName,
      email: email,
      currentPassword: '',
      newPassword: '',
    });
  }, [fullName, email]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageSelect = (newImageUrl: string) => {
    setUser({ profileImageUrl: newImageUrl });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({
      fullName: formData.fullName,
      email: formData.email,
    });
    alert('Changes saved successfully!');
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="container mx-auto px-4 lg:px-20 py-12">
        <h1 className="text-4xl font-bold mb-10">My Profile & Settings</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* --- CHANGE 1: Added glassmorphism classes to the profile photo card --- */}
          <div className="col-span-1 flex flex-col items-center bg-white/5 backdrop-filter backdrop-blur-lg border border-white/10 p-8 rounded-2xl shadow-lg">
            <ImageUploader
              currentImageUrl={profileImageUrl}
              onImageSelect={handleImageSelect}
            />
            <h2 className="text-xl font-semibold mt-4">{formData.fullName}</h2>
            <p className="text-gray-300">{formData.email}</p>
          </div>

          {/* --- CHANGE 2: Added glassmorphism classes to the form fields card --- */}
          <div className="col-span-1 lg:col-span-2 bg-white/5 backdrop-filter backdrop-blur-lg border border-white/10 p-8 rounded-2xl shadow-lg">
            <div className="space-y-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full bg-black/20 border border-white/10 rounded-lg p-3 pl-4 focus:ring-2 focus:ring-blue-500 focus:outline-none text-white"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-black/20 border border-white/10 rounded-lg p-3 pl-4 focus:ring-2 focus:ring-blue-500 focus:outline-none text-white"
                />
              </div>
            </div>

            <div className="mt-8 border-t border-white/10 pt-6">
              <h3 className="text-lg font-semibold mb-4">Change Password</h3>
              <div className="space-y-6">
                 <div>
                  <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-400 mb-2">Current Password</label>
                   <div className="relative">
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      id="currentPassword"
                      name="currentPassword"
                      value={formData.currentPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full bg-black/20 border border-white/10 rounded-lg p-3 pl-4 pr-10 focus:ring-2 focus:ring-blue-500 focus:outline-none text-white"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <button type="button" onClick={() => setShowCurrentPassword(!showCurrentPassword)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 hover:text-white">
                          {showCurrentPassword ?
                            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z M12 15a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"></path> :
                            <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24 M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z M12 15a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z M2 2l20 20"></path>
                          }
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-400 mb-2">New Password</label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      id="newPassword"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full bg-black/20 border border-white/10 rounded-lg p-3 pl-4 pr-10 focus:ring-2 focus:ring-blue-500 focus:outline-none text-white"
                    />
                     <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <button type="button" onClick={() => setShowNewPassword(!showNewPassword)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 hover:text-white">
                          {showNewPassword ?
                            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z M12 15a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"></path> :
                            <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24 M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z M12 15a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z M2 2l20 20"></path>
                          }
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-8">
              <button type="submit" className="bg-white text-black font-bold py-2 px-6 rounded-lg hover:bg-gray-300 transition-colors">
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;