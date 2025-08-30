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
    <div className="bg-white dark:bg-[#18181b] bg-opacity-90 min-h-screen px-4 py-12">
      <video autoPlay muted loop className="backgroundVideo absolute inset-0 w-full h-full object-cover">
        <source src="/images/wallpaper.mp4" type="video/mp4" />
      </video>
      <div className="max-w-4xl mx-auto flex flex-col items-center pt-16">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-center text-[#232323] dark:text-white">
          Latest News
        </h1>
        {loading ? (
          <div className="text-center text-gray-500 dark:text-gray-400 py-12">Loading...</div>
        ) : recentPosts.length > 0 ? (
          <div className="flex flex-col gap-8 mb-10">
            {/* Custom layout: most recent post big block, next 2 left-to-right on mobile */}
            <div className="flex flex-col md:flex-row gap-8">
              {/* Most recent post - big block */}
              {recentPosts[0] && (
                <Link
                  href={`/blog/${recentPosts[0].id}`}
                  className="bg-white dark:bg-[#1e1e1e] border rounded-lg shadow-lg overflow-hidden flex flex-col md:w-2/3 min-h-[340px] cursor-pointer group"
                  style={{ textDecoration: "none" }}
                >
                  {recentPosts[0].image && (
                    <Image
                      src={`https:${recentPosts[0].image.fields.file.url}`}
                      alt={recentPosts[0].title}
                      width={600}
                      height={350}
                      className="w-full h-48 md:h-[340px] object-cover"
                      style={{ objectFit: "cover" }}
                    />
                  )}
                  <div className="p-4 md:p-8 flex flex-col flex-1 justify-center">
                    <h2 className="text-xl md:text-3xl font-bold mb-2 md:mb-4 text-gray-800 dark:text-white group-hover:text-[#10B981] transition-colors duration-200">{recentPosts[0].title}</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-2 md:mb-4 line-clamp-3 md:line-clamp-4 text-sm md:text-base">{recentPosts[0].brief}</p>
                    <p className="text-xs md:text-sm text-gray-400 dark:text-gray-300 mb-2 md:mb-4">{new Date(recentPosts[0].date).toLocaleDateString()}</p>
                  </div>
                </Link>
              )}
              {/* Next 2 posts - left-to-right on mobile, stacked on desktop */}
              <div className="flex flex-row md:flex-col gap-4 md:gap-8 md:w-1/3 mt-4 md:mt-0">
                {recentPosts[1] && (
                  <Link
                    href={`/blog/${recentPosts[1].id}`}
                    className="bg-white dark:bg-[#1e1e1e] border rounded-lg shadow-lg overflow-hidden flex flex-col w-1/2 md:w-full cursor-pointer group"
                    style={{ textDecoration: "none" }}
                  >
                    {recentPosts[1].image && (
                      <Image
                        src={`https:${recentPosts[1].image.fields.file.url}`}
                        alt={recentPosts[1].title}
                        width={400}
                        height={180}
                        className="w-full h-24 md:h-32 object-cover"
                      />
                    )}
                    <div className="p-2 md:p-4 flex flex-col flex-1">
                      <h2 className="text-sm md:text-lg font-bold mb-1 md:mb-2 text-gray-800 dark:text-white group-hover:text-[#10B981] transition-colors duration-200">{recentPosts[1].title}</h2>
                      <p className="text-xs md:text-sm text-gray-400 dark:text-gray-300 mb-1 md:mb-2">{new Date(recentPosts[1].date).toLocaleDateString()}</p>
                    </div>
                  </Link>
                )}
                {recentPosts[2] && (
                  <Link
                    href={`/blog/${recentPosts[2].id}`}
                    className="bg-white dark:bg-[#1e1e1e] border rounded-lg shadow-lg overflow-hidden flex flex-col w-1/2 md:w-full cursor-pointer group"
                    style={{ textDecoration: "none" }}
                  >
                    {recentPosts[2].image && (
                      <Image
                        src={`https:${recentPosts[2].image.fields.file.url}`}
                        alt={recentPosts[2].title}
                        width={400}
                        height={180}
                        className="w-full h-24 md:h-32 object-cover"
                      />
                    )}
                    <div className="p-2 md:p-4 flex flex-col flex-1">
                      <h2 className="text-sm md:text-lg font-bold mb-1 md:mb-2 text-gray-800 dark:text-white group-hover:text-[#10B981] transition-colors duration-200">{recentPosts[2].title}</h2>
                      <p className="text-xs md:text-sm text-gray-400 dark:text-gray-300 mb-1 md:mb-2">{new Date(recentPosts[2].date).toLocaleDateString()}</p>
                    </div>
                  </Link>
                )}
              </div>
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