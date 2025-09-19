// File: app/(participant)/layout.tsx

import ParticipantNavbar from "@/components/ParticipantNavbar";
import Footer from "@/components/Footer"; // Import Footer

export default function ParticipantLayout({
                                              children,
                                          }: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col min-h-screen">
            <ParticipantNavbar />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
        </div>
    );
}