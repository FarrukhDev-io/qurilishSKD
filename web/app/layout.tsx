import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "SKDqurilish — UrbanPulse Samarqand AI & Yo'ldosh Monitoringi Platformasi",
  description: "Samarqand viloyat hokimligi va qurilish nazorati uchun Sentinel-1/2 yo'ldosh va AI foto monitoringi platformasi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="uz"
      className={`${outfit.variable} ${plusJakartaSans.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://server.arcgisonline.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://basemaps.cartocdn.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://unpkg.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://server.arcgisonline.com" />
        <link rel="dns-prefetch" href="https://basemaps.cartocdn.com" />
      </head>
      <body className="min-h-full flex flex-col font-body bg-[#F4F6F9] text-[#0F172A] relative">
        {/* Subtle Ambient Background Mesh Lights */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-radial from-[#82C91E]/10 via-[#95E616]/4 to-transparent rounded-full blur-3xl opacity-70" />
          <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] bg-radial from-sky-400/5 via-indigo-400/2 to-transparent rounded-full blur-3xl opacity-50" />
          <div className="absolute top-2/3 -left-40 w-[600px] h-[600px] bg-radial from-emerald-400/5 via-teal-400/2 to-transparent rounded-full blur-3xl opacity-50" />
          <div className="absolute inset-0 global-grid-bg opacity-40" />
        </div>
        <div className="relative z-10 flex-1 flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
