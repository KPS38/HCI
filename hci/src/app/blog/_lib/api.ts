import dotenv from 'dotenv';
import { createClient } from 'contentful';
dotenv.config();

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

type PagingInfo = {
  _start?: number;
  _limit?: number;
};

export type Post = {
    id: string;
    title: string | null;
    brief: string | null;
    story: string | null;
    date: string | null;
    image: any;
    writer: string | null;
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
  
    return entries.items.map((item: any) => ({
      id: item.sys.id,
      title: item.fields.title,
      brief: item.fields.brief,
      story: item.fields.story,
      date: item.fields.date,
      image: item.fields.image,
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
        image: entry.fields.image?.fields.file.url ?? null,
        writer: entry.fields.writer ?? "",
      };
    } catch (error) {
      console.error(`Error fetching post with ID: ${id}`, error);
      return null;
    }
  }