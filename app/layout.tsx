// File: app/layout.tsx

import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Header from "@/components/Header"; // Import Header
import Footer from "@/components/Footer"; // Import Footer
import "./globals.css";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ['400', '500', '600', '700'],
    variable: '--font-poppins'
});

export const metadata: Metadata = {
    title: "Evently",
    description: "Your platform for discovering and creating events.",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={`${poppins.variable} font-sans bg-black text-white`}>
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
        </div>
        </body>
        </html>
    );
}