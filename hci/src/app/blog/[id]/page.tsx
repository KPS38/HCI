// pages/blog/[id].tsx

import Link from "next/link";
import type { Metadata } from "next";
import type { Post } from "../_lib/api"; // Import the Post type from your shared module

export const metadata: Metadata = {
  title: "Blog",
};

type BlogPostProps = {
  params: { id: string };
};

// Access the environment variable directly
const BASE_API_URL = process.env.BASE_API_URL;

async function getPost(id: string): Promise<Post> {
  if (!BASE_API_URL) throw new Error("BASE_API_URL is not defined");

  const data = await fetch(`${BASE_API_URL}/posts/${id}`);
  return data.json();
}

export default async function BlogPost({ params }: BlogPostProps) {
  const post = await getPost(params.id);
  const { id, title, body } = post;

  return (
    <main className="flex min-h-screen flex-col items-center p-10">
      <article className="w-full max-w-2xl bg-white shadow-lg rounded-lg overflow-hidden p-6 mt-32">
        <Link
          href="/blog"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200 mb-6"
        >
          Back to Blog
        </Link>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 mb-4">
          Post {id}: {title}
        </h1>
        <p>{body}</p>
      </article>
    </main>
  );
}
