"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Page = {
  title: string;
  path: `/${string}`;
};

const pages: Page[] = [
  { title: "Home", path: "/" },
  { title: "Services", path: "/services" },
  { title: "Certifications", path: "/certifications" },
  { title: "Blog", path: "/blog" },
  { title: "About us", path: "/about" },
  { title: "Sign in", path: "/signin" },
];

export function Navigation() {
  const pathname = usePathname();
  return (
    <nav className="bg-gray-800 fixed top-0 w-full px-4">
      <div className="max-w-screen-lg mx-auto flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/">
          <img src="/icon.png" alt="Logo" className="h-10 w-auto" />
        </Link>

        {/* Navigation Links */}
        <ul className="flex flex-1 justify-around items-center space-x-4">
          {pages.map((page, index) => (
            <li key={index}>
              <Link
                href={page.path}
                className={`${
                  pathname === page.path
                    ? "text-green-500 font-bold"
                    : "text-white"
                } hover:underline`}
              >
                {page.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
