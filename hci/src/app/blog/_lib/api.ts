import dotenv from "dotenv";
dotenv.config();

type PagingInfo = {
    _start?: number;
    _limit?: number;
};

export type Post = {
    userId: number;
    id: number;
    title: string;
    body: string;
};

const PAGE_SIZE = Number(process.env.PAGE_SIZE || 10);
const BASE_API_URL = process.env.BASE_API_URL;

if (!BASE_API_URL) {
    throw new Error("BASE_API_URL environment variable is not defined.");
}

async function getPostsCount(): Promise<number> {
    const data = await fetch(`${BASE_API_URL}/posts/?_limit=1`, {
        method: "HEAD",
    });
    let count: string | number = data.headers.get("x-total-count") || "1";
    count = parseInt(count, 10);
    return count;
}

async function getPosts({
    _start = 0,
    _limit = PAGE_SIZE,
}: PagingInfo): Promise<Post[]> {
    const data = await fetch(
        `${BASE_API_URL}/posts/?_start=${_start}&_limit=${_limit}`
    );
    return data.json();
}

export { getPosts, getPostsCount };
