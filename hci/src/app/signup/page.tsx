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
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

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
      setConfirmPassword("");
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-[#18181b] flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full bg-white dark:bg-[#232323] my-8 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-black dark:text-white">Sign Up</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSignUp}>
          <input
            type="text"
            placeholder="Name"
            className="px-4 py-2 rounded border-2 border-gray-300 dark:border-white focus:outline-none focus:ring-2 focus:ring-[#10B981] text-black dark:text-white bg-white dark:bg-[#232323] placeholder:text-gray-500 dark:placeholder:text-gray-400"
            required
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Surname"
            className="px-4 py-2 rounded border-2 border-gray-300 dark:border-white focus:outline-none focus:ring-2 focus:ring-[#10B981] text-black dark:text-white bg-white dark:bg-[#232323] placeholder:text-gray-500 dark:placeholder:text-gray-400"
            required
            value={surname}
            onChange={e => setSurname(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email address"
            className="px-4 py-2 rounded border-2 border-gray-300 dark:border-white focus:outline-none focus:ring-2 focus:ring-[#10B981] text-black dark:text-white bg-white dark:bg-[#232323] placeholder:text-gray-500 dark:placeholder:text-gray-400"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="px-4 py-2 rounded border-2 border-gray-300 dark:border-white focus:outline-none focus:ring-2 focus:ring-[#10B981] text-black dark:text-white bg-white dark:bg-[#232323] w-full placeholder:text-gray-500 dark:placeholder:text-gray-400"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#10B981] font-semibold focus:outline-none"
              onClick={() => setShowPassword(v => !v)}
              tabIndex={-1}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className="px-4 py-2 rounded border-2 border-gray-300 dark:border-white focus:outline-none focus:ring-2 focus:ring-[#10B981] text-black dark:text-white bg-white dark:bg-[#232323] w-full placeholder:text-gray-500 dark:placeholder:text-gray-400"
              required
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#10B981] font-semibold focus:outline-none"
              onClick={() => setShowConfirmPassword(v => !v)}
              tabIndex={-1}
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </button>
          </div>
          <button
            type="submit"
            className="bg-[#10B981] text-white font-bold py-3 rounded hover:bg-[#059669] transition-colors mt-4"
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
