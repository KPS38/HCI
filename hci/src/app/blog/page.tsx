import Link from 'next/link';
import { getPosts, getPostsCount } from './_lib/api';
import type { Post } from './_lib/api';
import Pagination from './_components/pagination';

export default async function Blog({ searchParams }: any) {
  const currentPage = parseInt(searchParams.page || '1', 10);
  const PAGE_SIZE = 6;
  const start = (currentPage - 1) * PAGE_SIZE;

  const [posts, totalPosts] = await Promise.all([
    getPosts({ _start: start, _limit: PAGE_SIZE }),
    getPostsCount(),
  ]);

  const pagesCount = Math.ceil(totalPosts / PAGE_SIZE);

  return (
    <div className="bg-white bg-opacity-90 text-[#1e1e1e] text-left w-full py-20 min-h-screen p-6 items-center">
      <div className="max-w-7xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-8 text-center">Latest Blog Posts</h1>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post: Post) => (
            <div
              key={post.id}
              className="bg-white border rounded-lg shadow-lg overflow-hidden"
            >
              <img
                src={post.image.fields.file.url}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-3 text-gray-800">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-3">{post.brief}</p> 
                <p className="text-sm text-gray-400 mb-4">
                  {new Date(post.date).toLocaleDateString()}
                </p>
                <Link
                  href={`/blog/${post.id}`}
                  className="text-[#10B981] font-medium hover:underline"
                >
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Pagination currentPage={currentPage} pagesCount={pagesCount} />
        </div>
      </div>
    </div>
  );
}
