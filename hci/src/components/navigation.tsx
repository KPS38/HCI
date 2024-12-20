"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Page = {
  title: string;
  path: `/${string}`;
  subPages?: Page[];
};

const pages: Page[] = [
  { title: "Home", path: "/" },
  {
    title: "Services",
    path: "/services",
    subPages: [
      { title: "Security Testing", path: "/services/security-testing" },
      { title: "Vulnerability Assessments", path: "/services/vulnerability-assessments" },
      { title: "Managed Security Services", path: "/services/managed-security-services" },
      { title: "Custom Security Solutions", path: "/services/custom-security-solutions" },
    ],
  },
  {
    title: "Certifications",
    path: "/certifications",
    subPages: [
      { title: "Available Certifications", path: "/certifications/available" },
      { title: "Exam Scheduling and Pricing", path: "/certifications/exam" },
      { title: "Certification Success Stories", path: "/certifications/stories" },
    ],
  },
  { title: "Blog", path: "/blog" },
  {
    title: "About Us",
    path: "/about",
    subPages: [
      { title: "Our Team", path: "/about/team" },
      { title: "Careers", path: "/about/careers" },
      { title: "Contact Us", path: "/about/contact" },
    ],
  },
];

export function Navigation() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    // Reset all open sidebars when navigating to a new page
    setMenuOpen(false);
    setDropdownOpen({});
  }, [pathname]);

  const toggleDropdown = (title: string) => {
    setDropdownOpen((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <nav className="bg-gradient-to-r py-2 from-[#1e1e1e] to-[#333333] fixed top-0 left-0 w-full z-50">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-8 md:px-12">
        <div className="flex items-center space-x-2 h-16">
          <Link href="/">
            <img src="/images/icon.png" alt="Logo" className="h-12" />
          </Link>
        </div>

        {/* Hamburger Menu */}
        <button
          className="md:hidden text-white text-2xl items-center"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6 items-center">
          {pages.map((page, index) => (
            <div key={index} className="relative group">
              <Link
                href={page.path}
                className={`text-white text-base font-normal p-8 hover:text-[#10B981] transition duration-300`}
              >
                {page.title}
              </Link>
              {page.subPages && (
                <div className="absolute hidden group-hover:block bg-gradient-to-r from-[#1e1e1e] to-[#333333] text-white shadow-lg mt-6 rounded-b-md w-auto">
                  {page.subPages.map((subPage, subIndex) => (
                    <Link
                      key={subIndex}
                      href={subPage.path}
                      className="block px-4 py-2 border-t-2 border-[#10B981] hover:text-[#10B981] transition duration-300"
                    >
                      {subPage.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <Link
            href="/signin"
            className="text-[#10B981] border-2 border-[#10B981] px-4 py-2 rounded-md font-bold hover:bg-[#10B981] hover:text-white transition duration-300"
          >
            Sign In
          </Link>
        </div>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="bg-gradient-to-r from-[#1e1e1e] to-[#333333] text-white py-4 px-8 md:hidden relative">
          {pages.map((page, index) => (
            <div key={index} className="flex flex-col mb-4">
              {/* Main section */}
              <div className="flex items-center justify-between">
                <Link
                  href={page.path}
                  className={`text-base font-normal hover:text-[#10B981] ${
                    pathname === page.path ? "font-bold text-[#10B981]" : ""
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {page.title}
                </Link>
                {/* Toggle Dropdown */}
                {page.subPages && (
                  <button
                    className="text-white text-xl"
                    onClick={() => toggleDropdown(page.title)}
                  >
                    {dropdownOpen[page.title] ? "▾" : "▸"}
                  </button>
                )}
              </div>

              {/* Subpages Dropdown */}
              {dropdownOpen[page.title] && page.subPages && (
                <div className="pl-4 mt-2">
                  {page.subPages.map((subPage, subIndex) => (
                    <Link
                      key={subIndex}
                      href={subPage.path}
                      className="block text-base font-normal hover:text-[#10B981]"
                      onClick={() => setMenuOpen(false)}
                    >
                      {subPage.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
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
