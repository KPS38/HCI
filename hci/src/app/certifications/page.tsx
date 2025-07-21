'use client'
import Link from 'next/link';
import Image from 'next/image';
import { getCertifications, Certification } from "./_lib/api";
import CertificationFilter from "./_components/filter";
import { useState, useEffect } from "react";

export default function Certifications() {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCertifications().then(data => {
      setCertifications(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="text-lg text-gray-500">Loading...</span>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#1e1e1e] bg-opacity-90 text-[#1e1e1e] dark:text-white min-h-screen py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Certifications</h1>
        <CertificationsGrid certifications={certifications} />
      </div>
    </div>
  );
}

// Client Component for filtering and grid
function CertificationsGrid({ certifications }: { certifications: Certification[] }) {
  const [filtered, setFiltered] = useState<Certification[]>(certifications);

  // Adapter to ensure type compatibility between filter and api Certification types
  function handleFiltered(filteredList: Certification[]) {
    setFiltered(filteredList as Certification[]);
  }

  // Cast certifications to any[] to avoid type mismatch
  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="md:w-1/4 w-full max-w-xs">
        {/* Remove type assertion, just pass certifications directly */}
        <CertificationFilter certifications={certifications} onFiltered={handleFiltered} />
      </div>
      <div className="md:w-3/4 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filtered.map((cert) => (
            <div
              key={cert.id}
              className="bg-gray-100 dark:bg-[#1e1e1e] border rounded-lg overflow-hidden shadow-lg flex flex-col"
            >
              {cert.image && (
                <Image
                  src={`https:${cert.image.fields.file.url}`}
                  alt={cert.name}
                  width={270}
                  height={120}
                  className="w-[270px] h-[120px] object-contain mx-auto py-4"
                />
              )}
              <div className="p-6 flex flex-col flex-1 relative">
                <h2 className="text-2xl font-bold mb-2 text-center">{cert.name}</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-1">
                  <strong>Provider:</strong> {cert.provider}
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-1">
                  <strong>Difficulty:</strong> {cert.difficulty}
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-1">
                  <strong>Price:</strong> {cert.price}
                </p>
                <p className="text-gray-700 dark:text-gray-400 mt-4 line-clamp-3 mb-6">
                  {cert.description}
                </p>
                <Link
                  href={`/certifications/${cert.id}`}
                  className="text-[#10B981] font-medium hover:underline absolute left-6 bottom-6"
                >
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
