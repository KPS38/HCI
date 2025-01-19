"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

type Page = {
  title: string;
  path: `/${string}`;
  subPages?: Page[];
};

const pages: Page[] = [
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
  const [menuOpen, setMenuOpen] = useState<{ [key: string]: boolean }>({});

  const toggleDropdown = (title: string) => {
    setMenuOpen((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const closeMobileMenu = () => {
    setMenuOpen({});
  };

  return (
    <nav className="bg-gradient-to-b from-black to-[#1e1e1e] border-b border-black fixed top-0 left-0 w-full z-50">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-8 md:px-12">
        <div className="flex items-center h-16">
          <Link href="/">
            <img src="/images/icon.png" alt="Logo" className="h-12" />
          </Link>
        </div>

        <button
          className="md:hidden text-white text-2xl items-center"
          onClick={() => setMenuOpen((prev) => ({ ...prev, mainMenu: !prev.mainMenu }))}
        >
          ☰
        </button>

        <div className="hidden md:flex items-center w-full justify-end relative">
          {pages.map((page, index) => (
            <div
              key={index}
              className="text-center relative group border-b-2 border-[#1e1e1e] hover:border-[#10B981] transition duration-300"
            >
              <Link
                href={page.path}
                className={`block text-white text-base w-40 py-8 font-normal hover:text-[#10B981] transition duration-300`}
              >
                {page.title}
              </Link>
              {page.subPages && (
                <div className="hidden group-hover:block absolute top-full left-0 w-full bg-[#1e1e1e] border-t-2 border-[#10B981] text-white transition duration-300 shadow-lg rounded-b-md z-10">
                  <div className="max-w-screen-xl mx-auto">
                    {page.subPages.map((subPage, subIndex) => (
                      <Link
                        key={subIndex}
                        href={subPage.path}
                        className="block px-4 py-2 hover:text-[#10B981] transition duration-300 w-full"
                      >
                        {subPage.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          <Link
            href="/signin"
            className="text-[#10B981] border-2 border-[#10B981] ml-2 px-4 py-2 rounded-md font-bold hover:bg-[#10B981] hover:text-white transition duration-300"
          >
            Sign In
          </Link>
        </div>

      </div>

      {/* Mobile Navigation */}
      {menuOpen.mainMenu && (
        <div className="absolute top-16 left-0 w-full bg-gradient-to-b from-black to-[#1e1e1e] text-white py-4 px-8 md:hidden">
          {pages.map((page, index) => (
            <div key={index} className="flex flex-col mb-4">
              {/* Main section */}
              <div className="flex items-center justify-between">
                <Link
                  href={page.path}
                  className={`block text-base font-normal hover:text-[#10B981] ${
                    pathname === page.path ? "font-bold text-[#10B981]" : ""
                  }`}
                  onClick={closeMobileMenu}
                >
                  {page.title}
                </Link>
                {/* Toggle Dropdown */}
                {page.subPages && (
                  <button
                    className="text-white text-xl"
                    onClick={() => toggleDropdown(page.title)}
                  >
                    {menuOpen[page.title] ? "▾" : "▸"}
                  </button>
                )}
              </div>

              {/* Subpages Dropdown */}
              {menuOpen[page.title] && page.subPages && (
                <div className="pl-4 mt-2">
                  {page.subPages.map((subPage, subIndex) => (
                    <Link
                      key={subIndex}
                      href={subPage.path}
                      className="block text-base font-normal hover:text-[#10B981] py-1"
                      onClick={closeMobileMenu}
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
            onClick={closeMobileMenu}
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
    <footer className="bg-gradient-to-b from-[#1e1e1e] to-black text-[#10B981] border-t border-black py-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div className="text-sm text-center">
          Copyright © {new Date().getFullYear()} cyOps, Inc. All rights reserved.
        </div>
        <div className="flex space-x-4 items-center">
          <a href="https://www.youtube.com/watch?v=xbS0tJ6S4Xg">
            <Image
              src="/images/facebook.png"
              alt="Facebook"
              width={16}
              height={16}
              className="h-4 w-3"
            />
          </a>
          <a href="https://www.youtube.com/watch?v=ctaipAQ_Sb0">
            <Image
              src="/images/instagram.png"
              alt="Instagram"
              width={16}
              height={16}
              className="h-4 w-4"
            />
          </a>
          <a href="https://www.youtube.com/watch?v=pgiN60dekIs">
            <Image
              src="/images/youtube.png"
              alt="YouTube"
              width={24}
              height={16}
              className="h-4 w-6"
            />
          </a>
          <a href="https://www.youtube.com/watch?v=OeLQOfb6IBU">
            <Image
              src="/images/linkedin.png"
              alt="LinkedIn"
              width={16}
              height={16}
              className="h-4 w-4"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
