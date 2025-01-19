import Link from 'next/link';
import { getCertifications, Certification } from "./_lib/api";

export default async function Certifications() {
  const certifications: Certification[] = await getCertifications();

  return (
    <div className="bg-white dark:bg-[#1e1e1e] bg-opacity-90 text-[#1e1e1e] dark:text-white min-h-screen py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Certifications</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="bg-gray-100 dark:bg-[#1e1e1e] border rounded-lg overflow-hidden shadow-lg "
            >
              {cert.image && (
                <img
                  src={`https:${cert.image.fields.file.url}`}
                  alt={cert.name}
                  className="w-30 h-32 object-cover mx-auto py-4"
                />
              )}
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2 text-center">{cert.name}</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-1">
                  <strong>Provider:</strong> {cert.provider}
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-1">
                  <strong>Duration:</strong> {cert.duration}
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-1">
                  <strong>Price:</strong> {cert.price}
                </p>
                <p className="text-gray-700 dark:text-gray-400 mt-4 line-clamp-3">
                  {cert.description}
                </p>
                <Link
                  href={`/certifications/available/${cert.id}`}
                  className="text-[#10B981] font-medium hover:underline"
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
