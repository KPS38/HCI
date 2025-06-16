"use client";

export const dynamic = "force-dynamic";

import { Suspense } from "react";
import SignInForm from "./SignInForm"; // adjust path if needed

export default function SignInPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignInForm />
    </Suspense>
  );
}
