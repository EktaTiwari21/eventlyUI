// File: app/(public)/layout.tsx

import Header from "@/components/Header";
import Footer from "@/components/Footer";

// This layout is ONLY for public pages (Landing, Login, Signup)
export default function PublicLayout({
                                         children,
                                     }: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
        </div>
    );
}