'use client'

import Link from 'next/link';
import { getPosts, getPostsCount } from './_lib/api';
import type { Post } from './_lib/api';
import Pagination from './_components/pagination';
import FilterMenu from './_components/FilterMenu';
import { useState, useEffect } from 'react';

type BlogProps = {
  searchParams: {
    page?: string;
  };
};

export default function Blog({ searchParams }: BlogProps) {
  const [filters, setFilters] = useState({ startDate: '', endDate: '', sort: 'newest' });
  const [posts, setPosts] = useState<Post[]>([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const currentPage = parseInt(searchParams.page || '1', 10);
  const PAGE_SIZE = 6;
  const start = (currentPage - 1) * PAGE_SIZE;

  useEffect(() => {
    async function fetchData() {
      const [fetchedPosts, fetchedTotalPosts] = await Promise.all([
        getPosts({
          _start: start,
          _limit: PAGE_SIZE,
          startDate: filters.startDate,
          endDate: filters.endDate,
          sort: filters.sort === 'newest' ? '-fields.date' : 'fields.date',
        }),
        getPostsCount({
          startDate: filters.startDate,
          endDate: filters.endDate,
        }),
      ]);
      setPosts(fetchedPosts);
      setTotalPosts(fetchedTotalPosts);
    }
    fetchData();
  }, [filters, start]);
  
  const pagesCount = Math.ceil(totalPosts / PAGE_SIZE);

  return (
    <div className="flex justify-center mx-auto bg-white dark:bg-[#1e1e1e] bg-opacity-90 min-h-screen">
      <div className="p-6">
        <div className="max-w-6xl mx-auto mb-auto py-12">
          <div>
            <FilterMenu onFilterChange={(filters) => setFilters(prev => ({ ...prev, ...filters }))} />
          </div>
          {posts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {posts.map((post: Post) => (
                    <div key={post.id} className="bg-white dark:bg-[#1e1e1e] border rounded-lg shadow-lg overflow-hidden">
                      {post.image && (
                        <img
                          src={`https:${post.image.fields.file.url}`}
                          alt={post.title}
                          className="w-full h-48 object-cover"
                        />
                      )}
                      <div className="p-6">
                        <h2 className="text-2xl font-semibold mb-3 text-gray-800 dark:text-white">{post.title}</h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">{post.brief}</p>
                        <p className="text-sm text-gray-400 dark:text-gray-300 mb-4">{new Date(post.date).toLocaleDateString()}</p>
                        <Link href={`/blog/${post.id}`} className="text-[#10B981] font-medium hover:underline">
                          Read More
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-2xl text-white mt-10">No articles found.</p>
              )}
              {pagesCount > 1 && posts.length > 0 && (
                <div className="mt-10">
                  <Pagination currentPage={currentPage} pagesCount={pagesCount} />
                </div>
              )}
        </div>
      </div>
    </div> 
  );
}
