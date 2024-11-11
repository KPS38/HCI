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
    <nav className="navbar">
      <div className="navbar-content">
        {/* Logo on the left side */}
        <div className="navbar-logo-container">
          <Link href="/">
            <img src="/icon.png" alt="Logo" className="navbar-logo" />
          </Link>
        </div>

        {/* Toggle button for mobile only */}
        <button
          className="menu-toggle md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* Menu links with conditional visibility on mobile */}
        <div className={`navbar-links ${menuOpen ? "open" : ""} md:flex`}>
          {pages.map((page, index) => (
            <Link
              key={index}
              href={page.path}
              className={`menu-item ${
                pathname === page.path ? "menu-item-selected" : ""
              }`}
            >
              {page.title}
            </Link>
          ))}

          {/* Sign In Button */}
          <Link href="/signin" className="sign-in-button">
            Sign In
          </Link>
        </div>
      </div>
    </nav>
  );
}
