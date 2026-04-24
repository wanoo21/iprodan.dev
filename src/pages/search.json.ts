import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

function byDateDesc(
  a: { date: string },
  b: { date: string },
): number {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
}

export const GET: APIRoute = async () => {
  const [posts, labs] = await Promise.all([
    getCollection("blog", ({ data }) => !data.draft),
    getCollection("labs", ({ data }) => !data.draft),
  ]);

  const fromBlog = posts.map((post) => ({
    kind: "blog" as const,
    id: post.id,
    title: post.data.title,
    summary: post.data.summary,
    content: post.body,
    date: post.data.date.toISOString(),
    tags: post.data.tags.map((tag) => (typeof tag === "string" ? tag : tag.id)),
  }));

  const fromLabs = labs.map((lab) => ({
    kind: "lab" as const,
    id: lab.id,
    title: lab.data.title,
    summary: lab.data.description,
    content: lab.body,
    date: lab.data.published_date.toISOString(),
    tags: lab.data.badge ? [lab.data.badge] : [],
  }));

  const searchData = [...fromBlog, ...fromLabs].sort(byDateDesc);

  return new Response(JSON.stringify(searchData), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
