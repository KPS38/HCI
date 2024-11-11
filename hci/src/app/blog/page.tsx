import type { Metadata } from "next";
import Link from "next/link";
import { getPosts, getPostsCount } from "./_lib/api";
import type { Post } from "./_lib/api";
import Pagination from "./_components/pagination";

type BlogPageProps = {
  searchParams: { page: string };
};

const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 6;

export const metadata: Metadata = {
  title: "Blog",
};

function processPost(post: Post) {
  const { id, title } = post;
  return (
    <li key={id} className="mb-4">
      <Link
        href={`/blog/${id}`}
        className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 transition-colors duration-200"
      >
        <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
          Post {id}: {title}
        </h2>
        <p className="font-normal text-gray-700">
          Click to read more about this fascinating topic...
        </p>
      </Link>
    </li>
  );
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const postsCount = await getPostsCount();
  const pagesCount = Math.ceil(postsCount / PAGE_SIZE);
  // Ensure the page number is a positive integer.
  const currentPage = Math.min(
    /^[1-9][0-9]*$/.test(searchParams.page) ? Number(searchParams.page) : 1,
    pagesCount
  );
  const _start = (currentPage - 1) * PAGE_SIZE;
  const _limit = PAGE_SIZE;

  const posts = await getPosts({ _start, _limit });
  return (
    <div className="content">
      <main className="flex min-h-screen max-w-3xl m-auto flex-col items-center p-10">
        <h1 className="text-6xl font-extrabold tracking-tight mb-10">Blog</h1>
        <Pagination currentPage={currentPage} pagesCount={pagesCount} />
        <ul className="w-full space-y-4">{posts.map(processPost)}</ul>
      </main>
    </div>
  );
}