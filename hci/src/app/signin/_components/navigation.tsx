"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Page = {
  title: string;
  path: `/${string}`;
};

// We hardcode pages here, but you could get this information from some external source (e.g. CMS, DB, config file, etc).
const pages: Page[] = [
  { title: "Sign_In", path: "/signin" },
  { title: "Sign_Up", path: "/signin/signup" },
  { title: "Forgot_Password?", path: "/signin/forgot-password" },
  { title: "User_Dashboard", path: "/signin/dashboard" },
];

function processPage(page: Page, index: number, pathname: string) {
  return (
    <li key={index} className="menu-item">
      <Link
        href={page.path}
        className={
          pathname === page.path ? "menu-item-selected" : ""
        }
      >
        {page.title}
      </Link>
    </li>
  );
}

export function Navigation() {
  const pathname = usePathname();

  return (
    <ul className="secondary-navbar">
      {pages.map((page, index) => processPage(page, index, pathname))}
    </ul>
  );
}
