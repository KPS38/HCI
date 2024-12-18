"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Page = {
  title: string;
  path: `/${string}`;
};

// We hardcode pages here, but you could get this information from some external source (e.g. CMS, DB, config file, etc).
const pages: Page[] = [
  { title: "Certifications", path: "/certifications" },
  { title: "Available_Certifications", path: "/certifications/available" },
  { title: "Exam_Scheduling_and_Pricing", path: "/certifications/exam" },
  { title: "Certification_Success_Stories", path: "/certifications/stories" },
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
