import type { Metadata } from "next";
import "./globals.css";
import { Navigation, Footer } from "../components/navigation";


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
