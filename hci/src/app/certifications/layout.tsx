import { Metadata } from "next";
import { Navigation } from "./_components/navigation";

export const metadata: Metadata = {
  title: "Certifications",
};

export default function CertificationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="pt-16">
      <Navigation />
      {children}
    </section>
  );
}