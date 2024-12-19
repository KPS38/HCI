import { createClient, EntrySkeletonType } from "contentful";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || "",
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || "",
});

export type Certification = {
  id: string;
  name: string;
  provider: string;
  description: string;
  duration: string;
  price: string;
};

type CertificationFields = EntrySkeletonType & {
  name: string;
  provider: string;
  description: string;
  duration: string;
  price: string;
};

export async function getCertifications(): Promise<Certification[]> {
  const entries = await client.getEntries<CertificationFields>({
    content_type: "certification",
    order: ["fields.name"] as const, // Sort by name
  });

  return entries.items.map((item) => {
    return {
      id: item.sys.id,
      name: typeof item.fields.name === "string" ? item.fields.name : "Untitled", // Fallback to "Untitled"
      provider: typeof item.fields.provider === "string" ? item.fields.provider : "Unknown",
      description: typeof item.fields.description === "string" ? item.fields.description : "No description available.",
      duration: typeof item.fields.duration === "string" ? item.fields.duration : "N/A",
      price: typeof item.fields.price === "string" ? item.fields.price : "N/A",
    };
  });
}

// Fetch a single certification by ID
export async function getCertification(id: string): Promise<Certification | null> {
  try {
    const entry = await client.getEntry<CertificationFields>(id);

    return {
      id: entry.sys.id,
      name: typeof entry.fields.name === "string" ? entry.fields.name : "",
      provider: typeof entry.fields.provider === "string" ? entry.fields.provider : "",
      description: typeof entry.fields.description === "string" ? entry.fields.description : "",
      duration: typeof entry.fields.duration === "string" ? entry.fields.duration : "",
      price: typeof entry.fields.price === "string" ? entry.fields.price : "",
    };
  } catch (error) {
    console.error(`Error fetching certification with ID: ${id}`, error);
    return null;
  }
}
