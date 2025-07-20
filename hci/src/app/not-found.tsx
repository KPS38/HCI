'use client'

import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-[#18181b] px-4">
      <div className="max-w-md w-full bg-white dark:bg-[#232323] rounded-lg shadow-lg p-8 text-center">
        <h1 className="text-5xl font-extrabold text-[#10B981] mb-4">404</h1>
        <h2 className="text-2xl font-bold text-black mb-2">Page Not Found</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="bg-[#10B981] text-white font-bold py-2 px-6 rounded hover:bg-[#059669] transition-colors"
        >
          Go Home
        </Link>
      </div>
    </main>
  );
}
