// components/ProfileDropdown.tsx
'use client';

import useUserStore from '@/stores/useUserStore';
import Link from 'next/link';

const ProfileDropdown = () => {
  const { profileImageUrl } = useUserStore();

  return (
    // This component is now just a simple link wrapping the profile image
    <Link href="/profile">
      <img
        src={profileImageUrl}
        alt="Profile"
        className="w-10 h-10 rounded-full object-cover cursor-pointer"
      />
    </Link>
  );
};

export default ProfileDropdown;