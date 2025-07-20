'use client'
import Link from "next/link";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          surname,
        },
      },
    });

    if (error) {
      setError(error.message);
    } else {
      setSuccess("Check your email for a confirmation link.");
      setName("");
      setSurname("");
      setEmail("");
      setPassword("");
    }
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-[#18181b] px-4">
      <div className="w-full max-w-md bg-white dark:bg-[#232323] rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-black">Sign Up</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSignUp}>
          <input
            type="text"
            placeholder="Name"
            className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#10B981] text-black  placeholder:text-gray-500"
            required
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Surname"
            className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#10B981] text-black placeholder:text-gray-500"
            required
            value={surname}
            onChange={e => setSurname(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email address"
            className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#10B981] text-black placeholder:text-gray-500"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#10B981] text-black placeholder:text-gray-500"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-[#10B981] text-white font-bold py-2 px-6 rounded hover:bg-[#059669] transition-colors"
          >
            Sign Up
          </button>
        </form>
        {error && (
          <p className="text-red-600 text-center mt-4">{error}</p>
        )}
        {success && (
          <p className="text-green-600 text-center mt-4">{success}</p>
        )}
        <div className="mt-6 text-center text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link href="/signin" className="text-[#10B981] font-semibold hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </main>
  );
}
