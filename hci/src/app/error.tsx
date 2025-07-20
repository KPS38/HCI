'use client'

import Link from "next/link";

export default function ErrorPage({ error }: { error: Error }) {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-[#18181b] px-4">
      <div className="max-w-md w-full bg-white dark:bg-[#232323] rounded-lg shadow-lg p-8 text-center">
        <h1 className="text-4xl font-extrabold text-[#10B981] mb-4">Something Went Wrong</h1>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          An unexpected error occurred. Please try again later.
        </p>
        <details className="mb-6 text-xs text-gray-500">
          <summary className="cursor-pointer">Error details</summary>
          <pre>{error?.message}</pre>
        </details>
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
