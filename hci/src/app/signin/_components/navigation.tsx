"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Page = {
  title: string;
  path: `/${string}`;
};

const pages: Page[] = [
  { title: "Sign_In", path: "/signin" },
  { title: "Sign_Up", path: "/signin/signup" },
  { title: "Forgot_Password?", path: "/signin/forgot-password" },
  { title: "User_Dashboard", path: "/signin/dashboard" },
];

function processPage(page: Page, index: number, pathname: string) {
  return (
    <li key={index} className="text-white hover:text-[#10B981]">
      <Link
        href={page.path}
        className={`text-base font-normal hover:underline ${
          pathname === page.path ? "font-bold text-[#10B981]" : ""
        }`}
      >
        {page.title}
      </Link>
    </li>
  );
}

export function Navigation() {
  const pathname = usePathname();

  return (
    <ul className="flex justify-center gap-8 py-8 bg-[#1e1e1e] bg-opacity-50">
      {pages.map((page, index) => processPage(page, index, pathname))}
    </ul>
  );
}
