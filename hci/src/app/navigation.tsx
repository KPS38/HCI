"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Page = {
  title: string;
  path: `/${string}`;
};

// Define the pages in the navigation
const pages: Page[] = [
  { title: "Home", path: "/" },
  { title: "Services", path: "/services" },
  { title: "Certifications", path: "/certifications" },
  { title: "Blog", path: "/blog" },
  { title: "About us", path: "/about" },
  { title: "Sign in", path: "/signin" },
];

function processPage(page: Page, index: number, pathname: string) {
  const isSelected = page.path === "/"
    ? pathname === page.path
    : pathname.startsWith(page.path);

  return (
    <li key={index}>
      <Link
        href={page.path}
        className={`menu-item ${isSelected ? "menu-item-selected" : ""}`}
      >
        {page.title}
      </Link>
    </li>
  );
}

export function Navigation() {
  const pathname = usePathname();
  return (
    <nav className="navbar">
      <div className="flex items-center space-x-8">
        {/* Logo on the left side */}
        <Link href="/">
          <img src="/logo.jpg"/> {/* Adjust height as needed */}
        </Link>
        {/* Navigation Links */}
        <ul className="flex space-x-4">
          {pages.map((page, index) => processPage(page, index, pathname))}
        </ul>
      </div>
    </nav>
  );
}
