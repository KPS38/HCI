import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
};

export default function ServicesLayout({
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