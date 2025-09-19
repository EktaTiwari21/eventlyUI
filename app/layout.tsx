// File: app/layout.tsx

import type { Metadata } from "next";
import { Poppins } from "next/font/google";
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

// This is now a "bare" layout. It does NOT include any navbars or footers.
export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={`${poppins.variable} font-sans bg-black text-white`}>
        {children}
        </body>
        </html>
    );
}