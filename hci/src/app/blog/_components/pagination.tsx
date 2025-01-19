import Link from "next/link";

type PaginationProps = {
  currentPage: number;
  pagesCount: number;
};

export default function Pagination({ currentPage, pagesCount }: PaginationProps) {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === pagesCount;

  const previousPageUrl = isFirstPage ? "#" : `/blog?page=${currentPage - 1}`;
  const nextPageUrl = isLastPage ? "#" : `/blog?page=${currentPage + 1}`;

  return (
    <div className="w-full mb-6">
      <div className="bg-white dark:bg-[#1e1e1e] rounded-lg border border-gray-200 shadow-sm p-4 flex justify-between items-center">
        <Link
          href={previousPageUrl}
          className={`px-4 py-2 w-24 text-center rounded-md transition-colors duration-200 ${
            isFirstPage
              ? "bg-gray-100 text-gray-400 dark:bg-[#1e1e1e] dark:text-gray-700 border dark:border-gray-700 cursor-not-allowed"
              : "bg-gray-200 text-gray-700 dark:bg-[#1e1e1e] dark:text-white border dark:border-white hover:bg-gray-300"
          }`}
          aria-disabled={isFirstPage}
        >
          Previous
        </Link>
        <p className="text-gray-700 dark:text-gray-400 text-center">
          Page <span className="text-[#1e1e1e] dark:text-white">{currentPage}</span> of{" "}
          <span className="[#1e1e1e]">{pagesCount}</span>
        </p>
        <Link
          href={nextPageUrl}
          className={`px-4 py-2 w-24 text-center rounded-md transition-colors duration-200 ${
            isLastPage
              ? "bg-gray-100 text-gray-400 dark:bg-[#1e1e1e] dark:text-gray-700 border dark:border-gray-700 cursor-not-allowed"
              : "bg-gray-200 text-gray-700 dark:bg-[#1e1e1e] dark:text-white border dark:border-white hover:bg-gray-300"
          }`}
          aria-disabled={isLastPage}
        >
          Next
        </Link>
      </div>
    </div>
  );
}
