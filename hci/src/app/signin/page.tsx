'use client'
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data?.user ?? null);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      return;
    }

    setSuccess("Signed in successfully!");
    setEmail("");
    setPassword("");
    router.push("/account");
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    setUser(null);
    setSuccess(null);
    setError(null);
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-[#18181b] flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full bg-white dark:bg-[#232323] rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-black dark:text-white">Sign In</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSignIn}>
          <input
            type="email"
            placeholder="Email address"
            className="px-4 py-2 rounded border-2 border-white dark:border-white focus:outline-none focus:ring-2 focus:ring-[#10B981] text-black dark:text-white bg-white dark:bg-[#232323] placeholder:text-gray-500 dark:placeholder:text-gray-400"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="px-4 py-2 rounded border-2 border-white dark:border-white focus:outline-none focus:ring-2 focus:ring-[#10B981] text-black dark:text-white bg-white dark:bg-[#232323] w-full placeholder:text-gray-500 dark:placeholder:text-gray-400"
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
          <button
            type="submit"
            className="bg-[#10B981] text-white font-bold py-3 rounded hover:bg-[#059669] transition-colors mt-4"
          >
            Sign In
          </button>
        </form>
        {user && (
          <div className="flex flex-col items-center gap-4 mt-6">
            <p className="text-green-600 text-center">You are signed in as {user.email}</p>
            <button
              onClick={handleSignOut}
              className="bg-[#10B981] text-white font-bold py-2 px-6 rounded hover:bg-[#059669] transition-colors"
            >
              Sign Out
            </button>
            <Link href="/account" className="text-[#10B981] font-semibold hover:underline">
              Go to Account
            </Link>
          </div>
        )}
        {error && (
          <p className="text-red-600 text-center mt-4">{error}</p>
        )}
        {success && (
          <p className="text-green-600 text-center mt-4">{success}</p>
        )}
        {!user && (
          <div className="mt-6 text-center text-gray-600 dark:text-gray-400">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-[#10B981] font-semibold hover:underline">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}