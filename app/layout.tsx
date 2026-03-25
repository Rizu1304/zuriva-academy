import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="de" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>{children}</body>
    </html>
  );
}
