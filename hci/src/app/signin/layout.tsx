import { Metadata } from "next";
import { Navigation } from "./_components/navigation";

export const metadata: Metadata = {
  title: "Sign In",
};

export default function SignInLayout({
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