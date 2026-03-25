import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zuriva Academy — Premium Learning Platform",
  description: "Die Premium-Lernplattform fuer Versicherungsprofis. VBV-Zertifizierung, Kurse, Pruefungen und mehr.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" style={{ fontFamily: "var(--font-geist-sans), system-ui, -apple-system, sans-serif" }}>{children}</body>
    </html>
  );
}
