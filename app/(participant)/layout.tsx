// app/(participant)/layout.tsx
'use client'; // This must now be a client component

import { useState } from 'react'; // Import useState
import ParticipantNavbar from "@/components/ParticipantNavbar";
import Footer from "@/components/Footer";
import NotificationsPanel from "@/components/NotificationsPanel";
import RegionSelectModal from "@/components/RegionSelectModal";

export default function ParticipantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // --- NEW: We manage the modal's state here locally ---
  const [isRegionModalOpen, setIsRegionModalOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <NotificationsPanel />
      {/* --- We now pass the state and a closing function to the modal --- */}
      <RegionSelectModal
        isOpen={isRegionModalOpen}
        onClose={() => setIsRegionModalOpen(false)}
      />

      {/* --- We pass an opening function to the navbar --- */}
      <ParticipantNavbar
        onRegionClick={() => setIsRegionModalOpen(true)}
      />

      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}