import dotenv from 'dotenv';
import { createClient, Entry } from 'contentful';
dotenv.config();

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

type PagingInfo = {
  _start?: number;
  _limit?: number;
};

type Image = {
  fields: {
    file: {
      url: string;
      fileName: string;
      contentType: string;
    };
  };
};

export type Post = {
  id: string;
  title: string;
  brief: string;
  story: string;
  date: string;
  image: Image;  // Changed from 'any' to a more specific type
  writer: string;
};

export async function getPostsCount(): Promise<number> {
  const entries = await client.getEntries({
    content_type: 'post',
    limit: 1,
  });
  return entries.total;
}

export async function getPosts({
  _start = 0,
  _limit = 10,
}: PagingInfo): Promise<Post[]> {
  const entries = await client.getEntries({
    content_type: 'post',
    skip: _start,
    limit: _limit,
    order: '-fields.date', // Order posts by date in descending order (latest first)
  });

  return entries.items.map((item: Entry<Post>) => ({
    id: item.sys.id,
    title: item.fields.title,
    brief: item.fields.brief,
    story: item.fields.story,
    date: item.fields.date,
    image: item.fields.image?.fields.file.url ?? null,  // Ensuring image is either a URL or null
    writer: item.fields.writer,
  }));
}

// Fetch a single post by ID
export async function getPost(id: string): Promise<Post | null> {
  try {
    const entry = await client.getEntry(id);

    return {
      id: entry.sys.id,
      title: entry.fields.title ?? "",
      brief: entry.fields.brief ?? "",
      story: entry.fields.story ?? "",
      date: entry.fields.date ?? "",
      image: entry.fields.image?.fields.file.url ?? null, // Ensuring image is either a URL or null
      writer: entry.fields.writer ?? "",
    };
  } catch (error) {
    console.error(`Error fetching post with ID: ${id}`, error);
    return null;
  }
}
