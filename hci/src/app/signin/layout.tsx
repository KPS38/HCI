import { Metadata } from "next";

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
      {children}
    </section>
  );
}