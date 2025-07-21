"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

type Page = {
  title: string;
  path: `/${string}`;
  subPages?: Page[];
};

const pages: Page[] = [
  {
    title: "Services",
    path: "/services",
  },
  {
    title: "Certifications",
    path: "/certifications",
  },
  { title: "Blog", path: "/blog" },
  {
    title: "About Us",
    path: "/about",
  },
];

const dashboardMenu: Page = {
  title: "Dashboard",
  path: "/dashboard",
  subPages: [
    { title: "Account", path: "/account" },
    { title: "Orders", path: "/orders" },
    { title: "Sign Out", path: "/signout" }, // We'll handle sign out with a button
  ],
};

export function Navigation() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState<{ [key: string]: boolean }>({});
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data?.user ?? null);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  async function handleSignOut() {
    await supabase.auth.signOut();
    setUser(null);
  }

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
            <Image src="/images/icon.png" alt="Logo" width={48} height={48} className="h-12 w-12" />
          </Link>
        </div>

        <button
          className={`md:hidden text-2xl items-center transition-colors ${
            menuOpen.mainMenu ? "text-[#10B981]" : "text-white"
          }`}
          onClick={() => setMenuOpen((prev) => ({ ...prev, mainMenu: !prev.mainMenu }))}
        >
          ☰
        </button>

        <div className="hidden md:flex items-center w-full justify-center relative">
          {pages.map((page, index) => (
            <div
              key={index}
              className="relative group border-b-2 border-[#1e1e1e] hover:border-[#10B981] transition duration-300 flex-1 flex flex-col items-center"
              style={{ minWidth: 0 }}
            >
              <div className="flex items-center justify-center">
                <Link
                  href={page.path}
                  className={`block text-white text-center w-full py-8 font-normal hover:text-[#10B981] transition duration-300`}
                >
                  {page.title}
                </Link>
                {page.subPages && (
                  <button
                    type="button"
                    className="text-white text-xl ml-2"
                    style={{ background: "none", border: "none", cursor: "pointer" }}
                    tabIndex={-1}
                  >
                    ▸
                  </button>
                )}
              </div>
              {page.subPages && (
                <div className="hidden group-hover:flex flex-col items-center absolute top-full left-0 w-full bg-[#1e1e1e] border-t-2 border-[#10B981] text-white transition duration-300 shadow-lg rounded-b-md z-10">
                  <div className="w-full flex flex-col items-center">
                    {page.subPages.map((subPage, subIndex) => (
                      <Link
                        key={subIndex}
                        href={subPage.path}
                        className="block px-4 py-2 hover:text-[#10B981] transition duration-300 w-full text-center"
                      >
                        {subPage.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          {user && (
            <div
              className="relative group border-b-2 border-[#1e1e1e] hover:border-[#10B981] transition duration-300 flex-1 flex flex-col items-center"
              style={{ minWidth: 0 }}
            >
              <div className="flex items-center justify-center w-full">
                <button
                  type="button"
                  className="block text-white text-base w-full py-8 hover:text-[#10B981] transition duration-300 text-center bg-transparent border-none"
                >
                  {dashboardMenu.title}
                </button>
              </div>
              <div className="hidden group-hover:flex flex-col items-center absolute top-full left-0 w-full bg-[#1e1e1e] border-t-2 border-[#10B981] text-white transition duration-300 shadow-lg rounded-b-md z-10">
                <div className="w-full flex flex-col items-center">
                  {dashboardMenu.subPages?.map((subPage, subIndex) =>
                    subPage.title === "Sign Out" ? (
                      <button
                        key={subIndex}
                        onClick={handleSignOut}
                        className="block px-4 py-2 w-full text-center hover:text-[#10B981] transition duration-300 bg-transparent border-none"
                      >
                        {subPage.title}
                      </button>
                    ) : (
                      <Link
                        key={subIndex}
                        href={subPage.path}
                        className="block px-4 py-2 hover:text-[#10B981] transition duration-300 w-full text-center"
                      >
                        {subPage.title}
                      </Link>
                    )
                  )}
                </div>
              </div>
            </div>
          )}
          {!user && (
            <Link
              href="/signin"
              className="text-[#10B981] border-2 border-[#10B981] ml-2 px-4 py-2 rounded-md font-bold hover:bg-[#10B981] hover:text-white transition duration-300"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      {menuOpen.mainMenu && (
        <div className="absolute top-16 left-0 w-full bg-gradient-to-b from-[#1e1e1e] to-black text-white py-4 px-8 md:hidden flex flex-col items-center">
          {pages.map((page, index) => (
            <div key={index} className="flex flex-col mb-4 items-center">
              {/* Main section */}
              <div className="flex flex-col items-center justify-center w-full">
                <Link
                  href={page.path}
                  className={`block text-base font-normal hover:text-[#10B981] ${
                    pathname === page.path ? "font-bold text-[#10B981]" : ""
                  } text-center`}
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
                <div className="pl-4 mt-2 flex flex-col items-center w-full bg-transparent">
                  {page.subPages.map((subPage, subIndex) => (
                    <Link
                      key={subIndex}
                      href={subPage.path}
                      className="block text-base font-normal hover:text-[#10B981] py-1 text-center w-full"
                      onClick={closeMobileMenu}
                    >
                      {subPage.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          {user && (
            <div className="flex flex-col mb-4 items-center w-full">
              <button
                className={`block text-[#10B981] text-base py-2 px-4 font-bold transition duration-300 text-center w-full border-b-2 ${
                  menuOpen.Dashboard ? "border-[#10B981]" : "border-transparent"
                } bg-transparent`}
                onClick={() => setMenuOpen((prev) => ({ ...prev, Dashboard: !prev.Dashboard }))}
                type="button"
                style={{ borderRadius: 0 }}
              >
                {dashboardMenu.title} {menuOpen.Dashboard ? "▾" : "▸"}
              </button>
              {menuOpen.Dashboard && (
                <div className="pl-2 mt-2 flex flex-col items-center w-full">
                  {dashboardMenu.subPages?.map((subPage, subIndex) =>
                    subPage.title === "Sign Out" ? (
                      <button
                        key={subIndex}
                        onClick={() => { handleSignOut(); closeMobileMenu(); }}
                        className="block text-base font-normal hover:text-[#10B981] py-1 text-center bg-transparent border-none w-full"
                      >
                        {subPage.title}
                      </button>
                    ) : (
                      <Link
                        key={subIndex}
                        href={subPage.path}
                        className="block text-base font-normal hover:text-[#10B981] py-1 text-center w-full"
                        onClick={closeMobileMenu}
                      >
                        {subPage.title}
                      </Link>
                    )
                  )}
                </div>
              )}
            </div>
          )}
          {!user && (
            <Link
              href="/signin"
              className="text-[#10B981] border-2 border-[#10B981] px-4 py-2 rounded-md font-bold hover:bg-[#10B981] hover:text-white transition duration-300"
              onClick={closeMobileMenu}
            >
              Sign In
            </Link>
          )}
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
