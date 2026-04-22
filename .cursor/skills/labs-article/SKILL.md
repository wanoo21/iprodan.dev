---
name: labs-article
description: Creates or edits interactive Labs articles for iprodan.dev (Astro content collection, MDX, optional demos). Use when adding a lab, writing src/content/labs content, or building components under src/components/labs.
---

# Labs article (iprodan.dev)

## What a lab is

Labs live in the `labs` content collection. Each file becomes a page at **`/l/{slug}`**, where **`slug` is the filename without extension** (e.g. `flexbox-align.mdx` → `/l/flexbox-align`).

Rendered with `LabLayout`: sets `<title>` to `{title} | Labs`, OG/meta from `description` and optional `cover`, JSON-LD `TechArticle`, published date above the body, optional Giscus comments if enabled in site config.

## Frontmatter (required schema)

Path: `src/content/labs/**/*.{md,mdx}` — schema is defined in `src/content.config.ts`.

| Field | Required | Notes |
|--------|----------|--------|
| `title` | yes | String; also used in layout `<title>`. |
| `description` | yes | Meta/OG description; keep concise. |
| `published_date` | yes | `YYYY-MM-DD`; coerced to date. |
| `cover` | no | Optional; use `image()` paths (e.g. under `src/assets/...`) for OG/social. |
| `badge` | no | Short label (e.g. `"CSS"`) shown on home and listing cards. |
| `draft` | no | Default `false`; drafts excluded from `/l/*` and listings. |

**Do not invent fields** not in the schema (labs are not blog posts: no `tags`, `authors`, `summary`, etc.).

## File and URL

- Prefer **`.mdx`** when using imports, JSX, or interactive components.
- Choose a **kebab-case filename**; it is the public slug.

## Content structure (match existing labs)

1. **Imports** at the top (after frontmatter): lab components from `@/components/labs/...`, `astro:assets` if using `<Image>` or local images.
2. **Root wrapper**: `<div class="max-w-5xl mx-auto space-y-10">` (or consistent variant).
3. **Header block**: centered `h1` + lead paragraph. Title in frontmatter can be shorter; the visible `h1` can be more expressive. Use existing typography patterns:
   - Headings: `text-neutral-900 dark:text-neutral-100`, `font-semibold` / `font-bold`
   - Body: `text-neutral-600 dark:text-neutral-400 leading-relaxed`
   - Inline code accent: `text-purple-600 dark:text-purple-300 bg-purple-50 dark:bg-purple-900/50 px-1.5 py-0.5 rounded` (and larger variant on hero `code` spans)
4. **Sections**: `space-y-6 max-w-3xl mx-auto` for prose columns; `h2` as `text-2xl font-semibold`.
5. **Interactive demos**: place in a **grid section** with `aria-label="Interactive Labs"` where it helps; hydrate with `client:idle` unless a different directive is required.

Reference implementations: `src/content/labs/flexbox-align.mdx`, `css-layer.mdx`, `safe-alignment.mdx`.

## Interactive components

- Put React (or framework) demo components under **`src/components/labs/`**.
- Import in MDX: `import FooDemo from "@/components/labs/FooDemo"`.
- Default hydration for demos: **`client:idle`** (see existing labs).
- Scoped `<style>` blocks in MDX are acceptable when demo CSS must be colocated (see `css-layer.mdx`).

## Images

- **Cover / OG**: set `cover` in frontmatter to an image the schema accepts (project assets).
- **In-body images**: prefer `astro:assets` imports + `<Image>` with `widths`, `sizes`, and `alt` (see `safe-alignment.mdx`).

## Checklist before shipping

- [ ] Frontmatter matches schema; `published_date` set.
- [ ] Slug (filename) is intentional and stable.
- [ ] If not ready to publish: `draft: true`.
- [ ] Visual hierarchy and classes align with other labs (neutral/purple code treatment, dark mode).
- [ ] Demos are accessible (labels, contrast, keyboard where relevant).
- [ ] Run project build or `astro check` if types/content changed.

## Related code (read when editing behavior)

- Collection + schema: `src/content.config.ts` (`labs` collection)
- Route: `src/pages/l/[...slug].astro`
- Layout: `src/layouts/LabLayout.astro`
- Listing: `src/pages/labs/index.astro`, home section in `src/pages/index.astro`
