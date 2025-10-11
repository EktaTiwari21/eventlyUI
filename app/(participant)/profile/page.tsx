// app/(participant)/profile/page.tsx
'use client';

import { useState, useEffect } from 'react';
import useUserStore from '@/stores/useUserStore';
import ImageUploader from '@/components/ImageUploader';
import { getUserProfile, submitKyc } from '@/lib/api';

// Define a type for the full user profile data from the backend
interface UserProfile {
  name: string;
  email: string;
  isVerified: boolean;
  isCardActivated: boolean; // <-- 1. Add the new property
  kyc: {
    fullName: string;
    address: string;
    governmentId: string;
  }
}

const ProfilePage = () => {
  const { setUser, profileImageUrl } = useUserStore();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [kycData, setKycData] = useState({ fullName: '', address: '', governmentId: '' });
  const [isLoading, setIsLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const data = await getUserProfile();
      setProfile(data);
      setKycData({
        fullName: data.kyc?.fullName || data.name,
        address: data.kyc?.address || '',
        governmentId: data.kyc?.governmentId || ''
      });
    } catch (error) {
      console.error("Failed to fetch profile", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleKycChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setKycData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleKycSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitKyc(kycData);
      alert('KYC details submitted successfully! You are now verified.');
      fetchProfile();
    } catch (err: any) {
      alert(`Error: ${err.response?.data?.message || 'Failed to submit KYC.'}`);
    }
  };

  if (isLoading) {
    return <div className="bg-black min-h-screen text-white text-center py-20">Loading Profile...</div>;
  }

  // --- 2. THE UI LOGIC IS UPGRADED TO HANDLE ALL THREE STATES ---
  const renderVerificationStatus = () => {
    if (!profile) return null;

    if (profile.isCardActivated) {
      return (
          <div className="bg-green-900/20 border border-green-400/30 p-6 rounded-2xl shadow-lg text-center">
            <h3 className="text-xl font-semibold text-green-300">✓ NFC Pass Activated</h3>
            <p className="text-gray-400 text-sm mt-1">You are ready for tap-and-go entry at events.</p>
          </div>
      );
    }

    if (profile.isVerified) {
      return (
          <div className="space-y-8">
            <div className="bg-green-900/20 border border-green-400/30 p-6 rounded-2xl shadow-lg text-center">
              <h3 className="text-xl font-semibold text-green-300">✓ Account Verified</h3>
              <p className="text-gray-400 text-sm mt-1">You are eligible to activate an NFC pass.</p>
            </div>
            <div className="bg-white/5 backdrop-filter backdrop-blur-lg border border-white/10 p-8 rounded-2xl shadow-lg">
              <h3 className="text-xl font-semibold mb-1 text-white">Next Step: Activate Your Pass</h3>
              <p className="text-gray-400 mb-6">To complete your setup and enable tap-and-go entry, please visit an official Evently Kiosk at any upcoming event. Present your government-issued ID to an authorized admin to have your physical NFC pass securely linked to your account.</p>
            </div>
          </div>
      );
    }

    return (
        <form onSubmit={handleKycSubmit} className="bg-white/5 backdrop-filter backdrop-blur-lg border border-blue-400/30 p-8 rounded-2xl shadow-lg">
          <h3 className="text-xl font-semibold mb-1 text-white">Verify Your Account</h3>
          <p className="text-gray-400 mb-6 text-sm">Submit your KYC details to become eligible for an NFC pass.</p>
          <div className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-400 mb-2">Full Legal Name</label>
              <input type="text" id="fullName" name="fullName" value={kycData.fullName} onChange={handleKycChange} className="w-full bg-black/20 border border-white/10 rounded-lg p-3 pl-4 focus:ring-2 focus:ring-blue-500 focus:outline-none text-white" required/>
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-400 mb-2">Full Address</label>
              <textarea id="address" name="address" value={kycData.address} onChange={handleKycChange} rows={3} className="w-full bg-black/20 border border-white/10 rounded-lg p-3 pl-4 focus:ring-2 focus:ring-blue-500 focus:outline-none text-white" required/>
            </div>
            <div>
              <label htmlFor="governmentId" className="block text-sm font-medium text-gray-400 mb-2">Government ID Number (e.g., Aadhar)</label>
              <input type="text" id="governmentId" name="governmentId" value={kycData.governmentId} onChange={handleKycChange} className="w-full bg-black/20 border border-white/10 rounded-lg p-3 pl-4 focus:ring-2 focus:ring-blue-500 focus:outline-none text-white" required/>
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-400 transition-colors">Submit for Verification</button>
          </div>
        </form>
    );
  };

  // --- 3. YOUR MAIN UI REMAINS THE SAME, BUT CALLS THE NEW RENDER FUNCTION ---
  return (
      <div className="bg-black min-h-screen text-white">
        <div className="container mx-auto px-4 lg:px-20 py-12">
          <h1 className="text-4xl font-bold mb-10">My Profile</h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="col-span-1 flex flex-col items-center bg-white/5 backdrop-filter backdrop-blur-lg border border-white/10 p-8 rounded-2xl shadow-lg">
              <ImageUploader
                  currentImageUrl={profileImageUrl}
                  onImageSelect={(newUrl) => setUser({ profileImageUrl: newUrl })}
                  variant="circle"
                  buttonText="Change Photo"
              />
              <h2 className="text-xl font-semibold mt-4">{profile?.name}</h2>
              <p className="text-gray-300">{profile?.email}</p>
            </div>

            <div className="col-span-1 lg:col-span-2 space-y-8">
              {renderVerificationStatus()}
            </div>
          </div>
        </div>
      </div>
  );
};

export default ProfilePage;