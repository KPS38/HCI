"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Page = {
  title: string;
  path: `/${string}`;
};

// We hardcode pages here, but you could get this information from some external source (e.g. CMS, DB, config file, etc).
const pages: Page[] = [
  { title: "Services", path: "/services" },
  { title: "Security_Testing", path: "/services/security-testing" },
  { title: "Vulnerability_Assessments", path: "/services/vulnerability-assessments" },
  { title: "Managed_Security_Services", path: "/services/managed-security-services" },
  { title: "Custom_Security_Solutions", path: "/services/custom-security-solutions" },
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
