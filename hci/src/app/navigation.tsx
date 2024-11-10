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
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="navbar">
      <div className="navbar-content">
        {/* Logo on the left side with consistent padding */}
        <div className="navbar-logo-container">
          <Link href="/">
            <img src="/icon.png" alt="Logo" className="navbar-logo" />
          </Link>
        </div>

        {/* Menu links and Sign In button on the right side */}
        <div className="navbar-links">
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