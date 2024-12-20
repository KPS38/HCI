import { Metadata } from "next";

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
      {children}
    </section>
  );
}