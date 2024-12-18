import { createClient } from "contentful";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || "",
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || "",
});

export type Certification = {
  id: string;
  name: string;
  provider: string;
  description: string;
  image: string;
  duration: string;
  price: string;
};

export async function getCertifications(): Promise<Certification[]> {
    const entries = await client.getEntries({
      content_type: "certification",
      order: ["fields.name"] as const, // Sort by name
    });
  
    return entries.items.map((item) => ({
      id: item.sys.id,
      name: typeof item.fields.name === "string" ? item.fields.name : "Untitled", // Fallback to "Untitled"
      provider: typeof item.fields.provider === "string" ? item.fields.provider : "Unknown",
      description:
        typeof item.fields.description === "string"
          ? item.fields.description
          : "No description available.",
      image: item.fields.image?.fields?.file?.url || "",
      duration: typeof item.fields.duration === "string" ? item.fields.duration : "N/A",
      price: typeof item.fields.price === "string" ? item.fields.price : "N/A",
    }));
  }
  
// Fetch a single post by ID
export async function getCertification(id: string): Promise<Certification | null> {
    try {
      const entry = await client.getEntry(id);
  
      return {
        id: entry.sys.id,
        name: entry.fields.name ?? "",
        provider: entry.fields.provider ?? "",
        description: entry.fields.description ?? "",
        image: entry.fields.image?.fields.file.url ?? null,
        duration: entry.fields.writer ?? "",
        duration: entry.fields.writer ?? "",
      };
    } catch (error) {
      console.error(`Error fetching post with ID: ${id}`, error);
      return null;
    }
  }  
