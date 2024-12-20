import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
};

export default function AboutLayout({
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