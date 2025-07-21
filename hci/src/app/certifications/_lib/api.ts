import { createClient, EntrySkeletonType, Asset } from "contentful";

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || "",
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN || "",
});

type Image = {
  fields: {
    file: {
      url: string;
      fileName: string;
      contentType: string;
    };
  };
};

export type Certification = {
  id: string;
  name: string;
  provider: string;
  description: string;
  short: string;
  duration: string;
  price: string;
  image: Image | null;
  difficulty: string; // Optional field for difficulty
};

type CertificationFields = EntrySkeletonType & {
  name: string;
  provider: string;
  description: string;
  duration: string;
  price: string;
  image: Asset | null;
};

export async function getCertifications(): Promise<Certification[]> {
  const entries = await client.getEntries<CertificationFields>({
    content_type: "certification",
    order: ["fields.name"] as const, // Sort by name
  });

  return entries.items.map((item) => {
    const image = item.fields.image && typeof item.fields.image === 'object' && 'fields' in item.fields.image ? { fields: { file: (item.fields.image as Asset).fields.file as { url: string; fileName: string; contentType: string; } } } : null;
    return {
      id: item.sys.id,
      name: typeof item.fields.name === "string" ? item.fields.name : "Untitled", // Fallback to "Untitled"
      provider: typeof item.fields.provider === "string" ? item.fields.provider : "Unknown",
      description: typeof item.fields.description === "string" ? item.fields.description : "No description available.",
      short: typeof item.fields.short === "string" ? item.fields.short : "No description available.",
      duration: typeof item.fields.duration === "string" ? item.fields.duration : "N/A",
      price: typeof item.fields.price === "string" ? item.fields.price : "N/A",
      image: image,
      difficulty: typeof item.fields.difficulty === "string" ? item.fields.difficulty : "N/A",
    };
  });
}

// Fetch a single certification by ID
export async function getCertification(id: string): Promise<Certification | null> {
  try {
    const entry = await client.getEntry<CertificationFields>(id);
    const image = entry.fields.image && typeof entry.fields.image === 'object' && 'fields' in entry.fields.image ? { fields: { file: (entry.fields.image as Asset).fields.file as { url: string; fileName: string; contentType: string; } } } : null;

    return {
      id: entry.sys.id,
      name: typeof entry.fields.name === "string" ? entry.fields.name : "",
      provider: typeof entry.fields.provider === "string" ? entry.fields.provider : "",
      description: typeof entry.fields.description === "string" ? entry.fields.description : "",
      short: typeof entry.fields.short === "string" ? entry.fields.short : "No description available.",
      duration: typeof entry.fields.duration === "string" ? entry.fields.duration : "",
      price: typeof entry.fields.price === "string" ? entry.fields.price : "",
      image: image,
      difficulty: typeof entry.fields.difficulty === "string" ? entry.fields.difficulty : "",
    };
  } catch (error) {
    console.error(`Error fetching certification with ID: ${id}`, error);
    return null;
  }
}
