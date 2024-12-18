"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Page = {
  title: string;
  path: `/${string}`;
};

// We hardcode pages here, but you could get this information from some external source (e.g. CMS, DB, config file, etc).
const pages: Page[] = [
  { title: "About_Us", path: "/about" },
  { title: "Company_Mission_and_Vision", path: "/about/mission" },
  { title: "Our_Team", path: "/about/team" },
  { title: "Careers", path: "/about/careers" },
  { title: "Partners_and_Clients", path: "/about/partners" },
  { title: "Contact_Us", path: "/about/contact" },
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
