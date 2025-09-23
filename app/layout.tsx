// app/layout.tsx
import type { Metadata } from "next";
import { Poppins, Space_Grotesk, Stylish, Spectral } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins'
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-space-grotesk'
});

const stylish = Stylish({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-stylish'
});

const spectral = Spectral({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-spectral'
});

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
      <body className={`${poppins.variable} ${spaceGrotesk.variable} ${stylish.variable} ${spectral.variable} font-sans bg-black text-white`}>
        {children}
      </body>
    </html>
  );
}