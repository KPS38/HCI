import Link from 'next/link';
import type { Metadata } from 'next';
import { getPost } from '../_lib/api';

export const metadata: Metadata = {
  title: "Blog Post",
};

type BlogPostProps = {
  params: { id: string };
};

export default async function BlogPost({ params }: BlogPostProps) {
  const post = await getPost(params.id);

  if (!post) {
    return <h1 className="text-center mt-10 text-red-500">Post Not Found</h1>;
  }

  const { title, image, brief, date, story, writer } = post;
  const imageUrl = image?.fields.file.url ?? '';

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
          {title}
        </h1>
        {imageUrl && (
          <img
            src={`https:${imageUrl}`}
            alt={title}
            className="w-full h-48 object-cover rounded-md mb-4"
          />
        )}
        <p className="text-sm text-gray-400 mb-4">
          By: {writer}
        </p>
        <p className="text-sm text-gray-400 mb-4">
          {date ? new Date(date).toLocaleDateString() : "No date available"}
        </p>
        <p className="text-gray-600 mb-4">{brief}</p>
        <p className="text-gray-600">{story}</p>
      </article>
    </main>
  );
}
