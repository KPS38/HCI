import dotenv from 'dotenv';
import { createClient, Entry, EntrySkeletonType } from 'contentful';
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
  title: string;
  brief: string;
  story: string;
  date: string;
  writer: string;
};

type PostFields = EntrySkeletonType & {
  title: string;
  brief: string;
  story: string;
  date: string;
  writer: string;
};

export type PostEntry = Entry<PostFields>;

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
  const entries = await client.getEntries<PostFields>({
    content_type: 'post',
    skip: _start,
    limit: _limit,
    order: ['-fields.date'],
  });

  return entries.items.map((item) => {
    return {
      id: item.sys.id,
      title: item.fields.title as string,
      brief: item.fields.brief as string,
      story: item.fields.story as string,
      date: item.fields.date as string,
      writer: item.fields.writer as string,
    };
  });
}

export async function getPost(id: string): Promise<Post | null> {
  try {
    const entry = await client.getEntry<PostFields>(id);

    return {
      id: entry.sys.id,
      title: entry.fields.title as string,
      brief: entry.fields.brief as string,
      story: entry.fields.story as string,
      date: entry.fields.date as string,
      writer: entry.fields.writer as string,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}
