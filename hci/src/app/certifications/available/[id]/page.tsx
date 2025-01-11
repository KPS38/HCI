import Link from 'next/link';
import type { Metadata } from 'next';
import { getCertification } from '../_lib/api';

export const metadata: Metadata = {
  title: "Certification",
};

type CertificationProps = {
  params: { id: string };
};

export default async function CertificationPost({ params }: CertificationProps) {
  const post = await getCertification(params.id);

  if (!post) {
    return <h1 className="text-center mt-10 text-red-500">Certification Not Found</h1>;
  }

  const { name, provider, description, duration, price, image } = post;
  const imageUrl = image?.fields.file.url ?? '';

  return (
    <main className="flex min-h-screen flex-col items-center p-10">
      <article className="w-full max-w-2xl bg-white shadow-lg rounded-lg overflow-hidden p-6 mt-32">
        <Link
          href="/certifications/available"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200 mb-6"
        >
          Back to Certifications
        </Link>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 mb-4">
          {name}
        </h1>
        {imageUrl && (
          <img
            src={`https:${imageUrl}`}
            alt={name}
            className="w-40 h-34 object-cover mx-auto mb-4"
          />
        )}
        <p className="text-sm text-gray-400 mb-4">
          Provider: {provider}
        </p>
        <p className="text-gray-600 mb-4">{duration}</p>
        <p className="text-gray-600 mb-4">{price}</p>
        <p className="text-gray-600">{description}</p>
      </article>
    </main>
  );
}
