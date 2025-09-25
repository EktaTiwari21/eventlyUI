// File: app/(organizer)/layout.tsx

import OrganizerNavbar from "@/components/OrganizerNavbar";
import Footer from "@/components/Footer"; // Import Footer

export default function OrganizerLayout({
                                            children,
                                        }: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col min-h-screen">
            <OrganizerNavbar />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
        </div>
    );
}