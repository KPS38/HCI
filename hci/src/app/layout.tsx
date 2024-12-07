import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Navigation } from "../components/navigation";

const jetBrainsMono = localFont({
  src: "./fonts/JetBrainsMono-Regular.woff2", // Ensure this file is in your /fonts directory
  variable: "--font-jetbrains-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "cyOps",
  description: "Enterprise Security Solutions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jetBrainsMono.variable} antialiased`}>
        <Navigation />
        {children}
        <footer className="bg-black text-white py-8 mt-12">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              Copyright © {new Date().getFullYear()} cyOps, Inc. All rights reserved.
            </div>
            <div className="flex space-x-4 text-green-500">
              <a href="#">Facebook</a>
              <a href="#">LinkedIn</a>
              <a href="#">YouTube</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
