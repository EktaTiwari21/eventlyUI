// app/layout.tsx
import type { Metadata } from "next";
import { Poppins, Space_Grotesk, Stylish, Spectral, Kreon, Junge, Inter } from "next/font/google";
import "./globals.css";

const poppins = Poppins({ subsets: ["latin"], weight: ['400', '500', '600', '700'], variable: '--font-poppins' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], weight: ['400', '500', '700'], variable: '--font-space-grotesk' });
const stylish = Stylish({ subsets: ['latin'], weight: ['400'], variable: '--font-stylish' });
const spectral = Spectral({ subsets: ['latin'], weight: ['700'], variable: '--font-spectral' });
// --- NEW FONTS FOR ANALYTICS PAGE ---
const kreon = Kreon({ subsets: ['latin'], weight: ['400'], variable: '--font-kreon' });
const junge = Junge({ subsets: ['latin'], weight: ['400'], variable: '--font-junge' });
const inter = Inter({ subsets: ['latin'], weight: ['400'], variable: '--font-inter' });

export const metadata = {
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
      <body className={`${poppins.variable} ${spaceGrotesk.variable} ${stylish.variable} ${spectral.variable} ${kreon.variable} ${junge.variable} ${inter.variable} font-sans bg-black text-white`}>
        {children}
      </body>
    </html>
  );
}