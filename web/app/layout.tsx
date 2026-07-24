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
      <body className="min-h-full flex flex-col font-body bg-[#F8FAFC] text-[#0F172A]">
        {children}
      </body>
    </html>
  );
}
