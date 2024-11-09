import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Navigation } from "./navigation";


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
      <body
        className={`${jetBrainsMono.variable} antialiased`}
      >
        <Navigation />
        {children}
      </body>
    </html>
  );
}
