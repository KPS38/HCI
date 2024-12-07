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
    <li key={index} className="text-white hover:text-[#10B981]">
      <Link
        href={page.path}
        className={`text-base font-normal hover:underline ${
          pathname === page.path ? "font-bold text-[#10B981]" : ""
        }`}
      >
        {page.title}
      </Link>
    </li>
  );
}

export function Navigation() {
  const pathname = usePathname();

  return (
    <ul className="flex justify-center gap-8 py-8 bg-[#1e1e1e] bg-opacity-50">
      {pages.map((page, index) => processPage(page, index, pathname))}
    </ul>
  );
}
