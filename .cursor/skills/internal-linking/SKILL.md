---
name: internal-linking-iprodan
description: Adds contextual internal links in blog and labs MDX bodies using natural anchor text and root-relative URLs. Use when editing src/content/blog or src/content/labs, improving discoverability, cross-linking posts and labs, or strengthening the site content graph for readers and SEO.
---

# Internal linking (iprodan.dev)

## Scope

| Content | Path | Where to link |
|--------|------|----------------|
| Blog | `src/content/blog/*.{md,mdx}` | Markdown/MDX body |
| Labs | `src/content/labs/*.{md,mdx}` | Markdown, JSX text nodes, or `<p>` content |
| Lab demos | `src/components/labs/*` | Only **reader-facing** prose inside components—not implementation comments or labels |

**Articles do not live under `src/components/labs`.** Almost all internal links belong in the parent MDX under `src/content/labs`. For lab structure, schema, and layout conventions, see [labs-article](../labs-article/SKILL.md).

## URL rules

Use **root-relative** paths. Slug **`id`** is the **filename without extension**.

| Collection | Pattern | Example |
|------------|---------|---------|
| Blog | `/blog/{id}` | `snipsco.mdx` → `/blog/snipsco` |
| Labs | `/l/{id}` | `width-stretch.mdx` → `/l/width-stretch` |

In MDX:

```md
We wrote more about that in [our Snipsco story](/blog/snipsco).
For the fill-available successor, see [CSS width: stretch](/l/width-stretch).
```

Match how listings and layouts build links (e.g. `src/pages/labs/index.astro`, `src/layouts/PostLayout.astro`).

## When to apply

- User asks for internal links, cross-linking, related content, or better in-article navigation.
- Editing or drafting blog posts or labs where another published piece is genuinely relevant.

## Workflow

1. **Candidates** — List non-draft entries from `src/content/blog` and `src/content/labs` (`draft: true` in `src/content.config.ts` → exclude from link targets).
2. **Map** — For each candidate, note `id`, `title`, and `summary` (blog) or `description` (labs) for topic matching.
3. **Place** — Read the piece being edited. Find sentences that **already** name a concept or product another entry covers.
4. **Link** — Wrap the **smallest natural phrase** in a markdown link: `[phrase](/blog/id)` or `[phrase](/l/id)`. Keep voice and reading flow; do not add new sentences just to host a link.
5. **Limits** — Do not link the current page to itself. Avoid the same target twice in adjacent sentences unless clarity needs it.

## Frontmatter vs body

- `related` (blog) and `furtherReading` (blog and labs) are for **curated** end-of-article lists.
- **Body links** are for **in-flow** context (a term, product, or technique the reader just encountered).

Use both when it helps; do not mirror every `furtherReading` row inline.

## Cross-linking blog and labs

Link blog ↔ labs when the connection is accurate (e.g. a post mentions a CSS technique a lab demonstrates, or a lab points to a narrative post). Skip forced or tangential links.

## Anti-patterns

- Keyword stuffing or paragraphs rewritten only to add anchors.
- Generic anchors: “this post”, “here”, “read more” (without a meaningful phrase).
- Linking drafts, wrong slugs, or unrelated pages.
- Breaking MDX/JSX: do not split JSX tags; link only plain markdown text or full text inside JSX children (e.g. `<p>…</p>`).

## Additional resources

- Lab authoring: [labs-article/SKILL.md](../labs-article/SKILL.md)
- Schemas: [src/content.config.ts](../../../src/content.config.ts)
