// app/(participant)/layout.tsx

import ParticipantNavbar from "@/components/ParticipantNavbar";
import Footer from "@/components/Footer";
// --- NEW: We import the panel component ---
import NotificationsPanel from "@/components/NotificationsPanel";

export default function ParticipantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* --- NEW: The NotificationsPanel is placed here --- */}
      {/* It will be invisible by default until opened */}
      <NotificationsPanel />

      <ParticipantNavbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}