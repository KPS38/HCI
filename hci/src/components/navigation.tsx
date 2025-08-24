"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
  path: "/account",
  subPages: [
    { title: "Account", path: "/account" },
    { title: "Orders", path: "/orders" },
    { title: "Sign Out", path: "/signout" }, // We'll handle sign out with a button
  ],
};

export function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState<{ [key: string]: boolean }>({});
  const [user, setUser] = useState<User | null>(null);
  const [basketCount, setBasketCount] = useState(0);
  const [userLoading, setUserLoading] = useState(true); // Add loading state

  useEffect(() => {
    setUserLoading(true);
    supabase.auth.getUser().then(({ data }) => {
      setUser(data?.user ?? null);
      setUserLoading(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setUserLoading(false);
    });
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    function updateBasketCount() {
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem("basket");
        if (stored) {
          try {
            const data = JSON.parse(stored);
            // Support both old and new basket formats
            let items: unknown[] = [];
            if (Array.isArray(data)) {
              items = data;
            } else if (Array.isArray(data.items)) {
              items = data.items;
            }
            setBasketCount(
              items.reduce((sum: number, item) => {
                if (typeof item === 'object' && item !== null && 'quantity' in item) {
                  return sum + ((item as { quantity?: number }).quantity || 1);
                }
                return sum + 1;
              }, 0)
            );
          } catch {
            setBasketCount(0);
          }
        } else {
          setBasketCount(0);
        }
      }
    }
    updateBasketCount();
    window.addEventListener("storage", updateBasketCount);
    const interval = setInterval(updateBasketCount, 1000);
    return () => {
      window.removeEventListener("storage", updateBasketCount);
      clearInterval(interval);
    };
  }, []);

  async function handleSignOut() {
    await supabase.auth.signOut();
    setUser(null);
    // Clear all session data (basket, discount, etc.)
    if (typeof window !== "undefined") {
      localStorage.removeItem("basket");
      localStorage.removeItem("basket_discount");
      // Add any other session keys you want to clear here
    }
    router.push("/");
  }

  const toggleDropdown = (title: string) => {
    setMenuOpen((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const closeMobileMenu = () => {
    setMenuOpen({});
  };

  return (
    <nav className="bg-gradient-to-b from-black to-[#1e1e1e] border-b border-black fixed top-0 left-0 w-full z-50 h-16">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-8 md:px-12 h-16">
        <div className="flex items-center h-16">
          <Link href="/">
            <Image src="/images/icon.png" alt="Logo" width={32} height={32} className="h-8 w-8" />
          </Link>
        </div>

        {/* Basket icon - only show on mobile */}
        <div className="flex items-center md:hidden">
          <Link
            href="/basket"
            className="flex items-center justify-center mr-2 relative"
            title="Basket"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-7 w-7 ${basketCount > 0 ? "text-[#10B981]" : "text-white"} hover:text-[#10B981] transition-colors`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7a1 1 0 00.9 1.3h12.2a1 1 0 00.9-1.3L17 13M7 13V6a1 1 0 011-1h9a1 1 0 011 1v7" />
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
            </svg>
            {basketCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#10B981] text-white text-xs font-bold rounded-full px-2 py-0.5 shadow">
                {basketCount}
              </span>
            )}
          </Link>
          <button
            className={`md:hidden text-2xl items-center transition-colors ${
              menuOpen.mainMenu ? "text-[#10B981]" : "text-white"
            }`}
            onClick={() => setMenuOpen((prev) => ({ ...prev, mainMenu: !prev.mainMenu }))}
          >
            ☰
          </button>
        </div>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center flex-1 justify-end relative max-w-2xl ml-auto">
          <div className="flex flex-1 justify-end h-16">
            {pages.map((page, index) => (
              <div
                key={index}
                className="relative group border-b border-[#1e1e1e] hover:border-[#10B981] transition duration-300 flex-1 flex flex-col items-center cursor-pointer min-w-0"
                style={{
                  height: "64px",
                  alignSelf: "center",
                  display: "flex",
                  justifyContent: "center",
                  borderBottomWidth: "2px"
                }}
                onClick={() => window.location.href = page.path}
                tabIndex={0}
                role="button"
              >
                <div className="flex items-center justify-center w-full h-full">
                  <button
                    type="button"
                    className="block text-white text-base w-full py-4 hover:text-[#10B981] transition duration-300 text-center bg-transparent border-none"
                    style={{
                      width: "100%",
                      height: "100%",
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      minWidth: 0
                    }}
                    tabIndex={-1}
                  >
                    {page.title}
                  </button>
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
          </div>
          {/* Basket icon for desktop */}
          <Link
            href="/basket"
            className="flex items-center justify-center mx-4 px-4 relative"
            title="Basket"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-7 w-7 ${basketCount > 0 ? "text-[#10B981]" : "text-white"} hover:text-[#10B981] transition-colors`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7a1 1 0 00.9 1.3h12.2a1 1 0 00.9-1.3L17 13M7 13V6a1 1 0 011-1h9a1 1 0 011 1v7" />
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
            </svg>
            {basketCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#10B981] text-white text-xs font-bold rounded-full px-2 py-0.5 shadow">
                {basketCount}
              </span>
            )}
          </Link>
        </div>
        {/* User account and sign in button - only show on desktop */}
        <div className="hidden md:flex items-center">
          <div style={{ minWidth: "160px", maxWidth: "160px", width: "160px", display: "flex", justifyContent: "center" }}>
            {userLoading ? (
              <button
                type="button"
                className="block text-white text-base w-full py-4 bg-transparent border-none cursor-default"
                style={{ width: "100%", opacity: 0 }}
                disabled
                tabIndex={-1}
              >
                Dashboard
              </button>
            ) : user ? (
              <div
                className="relative group border-b border-[#1e1e1e] hover:border-[#10B981] transition duration-300 flex flex-col items-center cursor-pointer"
                style={{
                  minWidth: "160px",
                  maxWidth: "160px",
                  width: "160px",
                  height: "64px",
                  alignSelf: "center",
                  display: "flex",
                  justifyContent: "center",
                  borderBottomWidth: "2px"
                }}
                tabIndex={0}
              >
                <div className="flex items-center justify-center w-full h-full">
                  <button
                    type="button"
                    className="block text-white text-base w-full py-4 hover:text-[#10B981] transition duration-300 text-center bg-transparent border-none"
                    style={{
                      width: "100%",
                      height: "100%",
                      background: "transparent",
                      border: "none",
                      cursor: "pointer"
                    }}
                    tabIndex={-1}
                    onClick={() => router.push('/account')}
                  >
                    {dashboardMenu.title}
                  </button>
                </div>
                <div
                  className="hidden group-hover:flex flex-col items-center absolute top-full left-0 w-full bg-[#1e1e1e] border-t-2 border-[#10B981] text-white transition duration-300 shadow-lg rounded-b-md z-10"
                  style={{
                    minWidth: "160px",
                    maxWidth: "160px",
                    width: "160px",
                    padding: "12px 0",
                    whiteSpace: "nowrap",
                  }}
                >
                  <div className="w-full flex flex-col items-center">
                    {dashboardMenu.subPages?.map((subPage, subIndex) =>
                      subPage.title === "Sign Out" ? (
                        <button
                          key={subIndex}
                          onClick={handleSignOut}
                          className="block px-6 py-2 w-full text-center hover:text-[#10B981] transition duration-300 bg-transparent border-none text-base"
                          style={{ whiteSpace: "nowrap" }}
                        >
                          {subPage.title}
                        </button>
                      ) : (
                        <button
                          key={subIndex}
                          onClick={() => router.push(subPage.path)}
                          className="block px-6 py-2 hover:text-[#10B981] transition duration-300 w-full text-center text-base bg-transparent border-none"
                          style={{ whiteSpace: "nowrap" }}
                        >
                          {subPage.title}
                        </button>
                      )
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                href="/signin"
                className="text-[#10B981] border-2 border-[#10B981] px-4 py-2 rounded-md font-bold hover:bg-[#10B981] hover:text-white transition duration-300 w-full text-center"
                style={{ minWidth: "160px", maxWidth: "160px", width: "160px", display: "inline-block" }}
              >
                Sign In
              </Link>
            )}
          </div>
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