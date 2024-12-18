"use client";

import { useState, useEffect } from "react";
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
  { title: "About_Us", path: "/about" },
];

export function Navigation() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <nav className="bg-gradient-to-r from-[#1e1e1e] to-[#333333] fixed top-0 left-0 w-full z-50 border-b-2 border-[#1e1e1e]">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-8 md:px-12">
        <div className="flex items-center space-x-2 h-16">
          <Link href="/">
            <img src="/images/icon.png" alt="Logo" className="h-12" />
          </Link>
        </div>

        <button
          className="md:hidden text-white text-2xl items-center"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        <div className="hidden md:flex space-x-6 items-center">
          {pages.map((page, index) => (
            <Link
              key={index}
              href={page.path}
              className={`text-white text-base font-normal p-6 border-b-2 border-[#1e1e1e] hover:text-[#10B981] hover:border-[#10B981] transition duration-300}`}
            >
              {page.title}
            </Link>
          ))}

          <Link
            href="/signin"
            className="text-[#10B981] border-2 border-[#10B981] px-4 py-2 rounded-md font-bold hover:bg-[#10B981] hover:text-white transition duration-300"
          >
            Sign In
          </Link>
        </div>
      </div>

      {menuOpen && (
        <div className="bg-gradient-to-r from-[#1e1e1e] to-[#333333] text-white flex flex-col space-y-4 py-4 px-8 md:hidden">
          {pages.map((page, index) => (
            <Link
              key={index}
              href={page.path}
              className={`text-base font-normal hover:text-[#10B981] ${
                pathname === page.path ? "font-bold text-[#10B981]" : ""
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {page.title}
            </Link>
          ))}

          <Link
            href="/signin"
            className="text-[#10B981] border-2 border-[#10B981] px-4 py-2 rounded-md font-bold hover:bg-[#10B981] hover:text-white transition duration-300"
            onClick={() => setMenuOpen(false)}
          >
            Sign In
          </Link>
        </div>
      )}
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#1e1e1e] text-white py-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div className="text-sm text-gray-400">
          Copyright © {new Date().getFullYear()} cyOps, Inc. All rights reserved.
        </div>
        <div className="flex space-x-4 text-green-500">
          <a href="#">Facebook</a>
          <a href="#">LinkedIn</a>
          <a href="#">YouTube</a>
        </div>
      </div>
    </footer>
  );
}
