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

  // Close the hamburger menu when the page changes
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <nav className="bg-gradient-to-r from-[#1e1e1e] to-[#333333] fixed top-0 left-0 w-full z-50 py-3 px-8 md:px-12">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between">
        {/* Logo on the left side */}
        <div className="flex items-center space-x-2 h-16">
          <Link href="/">
            <img src="/images/icon.png" alt="Logo" className="h-16" />
          </Link>
        </div>

        {/* Toggle button for mobile only */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* Menu links with conditional visibility on mobile */}
        <div
          className={`md:flex space-x-6 ${menuOpen ? "block" : "hidden"} md:block`}
        >
          {pages.map((page, index) => (
            <Link
              key={index}
              href={page.path}
              className={`text-white text-base font-normal hover:text-[#10B981] hover:underline ${
                pathname === page.path ? "font-bold text-[#10B981]" : ""
              }`}
            >
              {page.title}
            </Link>
          ))}

          {/* Sign In Button */}
          <Link
            href="/signin"
            className="text-[#10B981] border-2 border-[#10B981] px-4 py-2 rounded-md font-bold hover:bg-[#10B981] hover:text-white transition duration-300"
          >
            Sign In
          </Link>
        </div>
      </div>
    </nav>
  );
}
