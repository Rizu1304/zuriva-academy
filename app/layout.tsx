import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zuriva Academy",
  description: "Die Lernplattform fuer Versicherungsvermittler",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="h-full antialiased">
      <body className="min-h-full flex flex-col" style={{ fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif" }}>{children}</body>
    </html>
  );
}
