'use client'

import Link from 'next/link';
import { getPosts } from '../_lib/api'; // Removed getPostsCount import
import type { Post } from '../_lib/api';
import Pagination from '../_components/pagination';
import FilterMenu from '../_components/FilterMenu';
import { useState, useEffect } from 'react';
import Image from 'next/image';

type BlogSearchProps = {
  searchParams?: {
    page?: string;
  };
};

export default function BlogSearch({ searchParams }: BlogSearchProps) {
  const [filters, setFilters] = useState({ startDate: '', endDate: '', sort: 'newest', search: '' });
  const [posts, setPosts] = useState<Post[]>([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const currentPage = parseInt(searchParams?.page || '1', 10);
  const PAGE_SIZE = 6;
  const start = (currentPage - 1) * PAGE_SIZE;

  useEffect(() => {
    async function fetchData() {
      // Fetch all posts for search, then paginate after filtering
      const allPosts = await getPosts({
        _start: 0,
        _limit: 1000, // Large enough to get all posts
        startDate: filters.startDate,
        endDate: filters.endDate,
        sort: filters.sort === 'newest' ? '-fields.date' : 'fields.date',
      });

      // Filter by search (name or description) on client side
      const searchTerm = filters.search?.toLowerCase().trim() || "";
      const filteredPosts = searchTerm
        ? allPosts.filter(
            post =>
              post.title.toLowerCase().includes(searchTerm) ||
              post.brief.toLowerCase().includes(searchTerm) ||
              (post.story && post.story.toLowerCase().includes(searchTerm))
          )
        : allPosts;

      setTotalPosts(filteredPosts.length);

      // Paginate after filtering
      const paginatedPosts = filteredPosts.slice(start, start + PAGE_SIZE);
      setPosts(paginatedPosts);
    }
    fetchData();
  }, [filters, start]);
  
  const pagesCount = Math.ceil(totalPosts / PAGE_SIZE);

  return (
    <div className="flex justify-center mx-auto bg-white dark:bg-[#1e1e1e] bg-opacity-90 min-h-screen">
      <video autoPlay muted loop className="backgroundVideo absolute inset-0 w-full h-full object-cover">
        <source src="/images/wallpaper.mp4" type="video/mp4" />
      </video>
      <div className="p-6">
        <div className="max-w-6xl mx-auto mb-auto py-12">
          <div>
            <FilterMenu onFilterChange={(filters) => setFilters(prev => ({ ...prev, ...filters }))} />
          </div>
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post: Post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.id}`}
                  className="bg-white dark:bg-[#1e1e1e] border rounded-lg shadow-lg flex flex-col h-full relative hover:shadow-xl transition-shadow duration-200 group"
                  style={{ minHeight: "420px", display: "flex", textDecoration: "none" }}
                >
                  {post.image && (
                    <Image
                      src={`https:${post.image.fields.file.url}`}
                      alt={post.title}
                      width={400}
                      height={250}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6 flex flex-col flex-1 relative">
                    <h2 className="text-2xl font-semibold mb-3 text-gray-800 dark:text-white group-hover:text-[#10B981]">{post.title}</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-8 line-clamp-3">{post.brief}</p>
                    <div className="flex-1" />
                    <div className="absolute left-6 bottom-6">
                      <span className="text-[#10B981] font-medium hover:underline">
                        Read More
                      </span>
                    </div>
                    <div className="absolute right-6 bottom-6">
                      <span className="text-sm text-gray-400 dark:text-gray-300">
                        {new Date(post.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-2xl text-white mt-10">No articles found.</p>
          )}
          {pagesCount > 1 && (
            <div className="mt-10">
              {/* Remove onPageChange prop if Pagination does not accept it */}
              <Pagination
                currentPage={currentPage}
                pagesCount={pagesCount}
              />
            </div>
          )}
        </div>
      </div>
    </div> 
  );
}
