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
  { title: "Forgot_Password", path: "/signin/forgot-password" },
  { title: "User_Dashboard", path: "/signin/dashboard" },
  { title: "Profile_Settings", path: "/signin/dashboard/profile-settings" },
  { title: "My_Certifications", path: "/signin/dashboard/my-certifications" },
  { title: "My_Services", path: "/signin/dashboard/my-services" },
  { title: "Order_History", path: "/signin/dashboard/order-history" },
  { title: "Logout", path: "/signin/dashboard/logout" },
];

function processPage(page: Page, index: number, pathname: string) {
  return (
    <li key={index}>
      <Link
        href={page.path}
        className={
          pathname === page.path ? "font-extrabold text-slate-600" : ""
        }
      >
        {page.title}
      </Link>
    </li>
  );
}

export function Navigation() {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <ul className="flex justify-center space-x-4 mt-8">
      {pages.map((page, index) => processPage(page, index, pathname))}
    </ul>
  );
}