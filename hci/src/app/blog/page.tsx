'use client'

import Link from 'next/link';
import { getPosts } from './_lib/api';
import type { Post } from './_lib/api';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Blog() {
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPosts({
      _start: 0,
      _limit: 4,
      sort: '-fields.date',
    }).then(posts => {
      setRecentPosts(posts);
      setLoading(false);
    });
  }, []);

  return (
    <div className="flex justify-center mx-auto bg-white dark:bg-[#1e1e1e] bg-opacity-90 min-h-screen">
      <div className="p-6 w-full max-w-6xl mx-auto py-12">
        <h1 className="text-4xl font-bold mb-8 text-center text-black dark:text-white">Latest News</h1>
        {loading ? (
          <div className="text-center text-gray-500 dark:text-gray-400 py-12">Loading...</div>
        ) : recentPosts.length > 0 ? (
          <div className="flex flex-col gap-8 mb-10">
            {/* First post - full width, image left */}
            {recentPosts[0] && (
              <div className="bg-white dark:bg-[#1e1e1e] border rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row min-h-[300px]">
                {recentPosts[0].image && (
                  <Image
                    src={`https:${recentPosts[0].image.fields.file.url}`}
                    alt={recentPosts[0].title}
                    width={600}
                    height={350}
                    className="w-full md:w-2/5 h-64 md:h-auto object-cover"
                    style={{ objectFit: "cover", minHeight: "300px" }}
                  />
                )}
                <div className="p-8 flex flex-col flex-1 justify-center">
                  <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">{recentPosts[0].title}</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-4">{recentPosts[0].brief}</p>
                  <p className="text-sm text-gray-400 dark:text-gray-300 mb-4">{new Date(recentPosts[0].date).toLocaleDateString()}</p>
                  <Link href={`/blog/${recentPosts[0].id}`} className="text-[#10B981] font-medium hover:underline mt-auto">
                    Read More
                  </Link>
                </div>
              </div>
            )}
            {/* Second post - full width, image right */}
            {recentPosts[1] && (
              <div className="bg-white dark:bg-[#1e1e1e] border rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row-reverse">
                {recentPosts[1].image && (
                  <Image
                    src={`https:${recentPosts[1].image.fields.file.url}`}
                    alt={recentPosts[1].title}
                    width={600}
                    height={350}
                    className="w-full md:w-2/5 h-64 md:h-auto object-cover"
                  />
                )}
                <div className="p-8 flex flex-col flex-1">
                  <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">{recentPosts[1].title}</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-4">{recentPosts[1].brief}</p>
                  <p className="text-sm text-gray-400 dark:text-gray-300 mb-4">{new Date(recentPosts[1].date).toLocaleDateString()}</p>
                  <Link href={`/blog/${recentPosts[1].id}`} className="text-[#10B981] font-medium hover:underline mt-auto">
                    Read More
                  </Link>
                </div>
              </div>
            )}
            {/* Next 2 posts - smaller cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {recentPosts.slice(2).map((post: Post) => (
                <div key={post.id} className="bg-white dark:bg-[#1e1e1e] border rounded-lg shadow-lg overflow-hidden flex flex-col">
                  {post.image && (
                    <Image
                      src={`https:${post.image.fields.file.url}`}
                      alt={post.title}
                      width={400}
                      height={250}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6 flex flex-col flex-1">
                    <h2 className="text-2xl font-semibold mb-3 text-gray-800 dark:text-white">{post.title}</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">{post.brief}</p>
                    <p className="text-sm text-gray-400 dark:text-gray-300 mb-4">{new Date(post.date).toLocaleDateString()}</p>
                    <Link href={`/blog/${post.id}`} className="text-[#10B981] font-medium hover:underline mt-auto">
                      Read More
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-center text-2xl text-white mt-10">No articles found.</p>
        )}
        <div className="flex justify-center mt-8">
          <Link
            href="/blog/search"
            className="bg-[#10B981] text-white font-bold px-6 py-3 rounded hover:bg-[#059669] transition-colors"
          >
            Search All News
          </Link>
        </div>
      </div>
    </div>
  );
}