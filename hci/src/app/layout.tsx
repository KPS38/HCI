import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Navigation, Footer } from "../components/navigation";

const jetBrainsMono = localFont({
  src: "./fonts/JetBrainsMono-Regular.woff2",
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
      <body className="flex flex-col min-h-screen">
        <Navigation />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
