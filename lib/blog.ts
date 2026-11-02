// Blog posts live as Markdown files in content/blog/. Each starts with a small header:
//
//   ---
//   title: My first post
//   date: 2026-11-02
//   summary: One line shown on the blog list.
//   tags: fencing, cornell
//   draft: true            (optional; drafts stay off the site)
//   ---
//
// The file name (without .md) becomes the link: /#blog/<file-name>.
// Files starting with "_" (like _template.md) are ignored.
// This runs at build time only (it reads the file system), from app/page.tsx.

import fs from "node:fs"
import path from "node:path"

export interface Post {
  slug: string
  title: string
  date: string
  summary: string
  tags: string[]
  body: string
  minutes: number
}

const DIR = path.join(process.cwd(), "content", "blog")

function parse(slug: string, raw: string): (Post & { draft: boolean }) | null {
  const m = raw.replace(/\r\n/g, "\n").match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)
  if (!m) return null
  const meta: Record<string, string> = {}
  for (const line of m[1].split("\n")) {
    const i = line.indexOf(":")
    if (i > 0) meta[line.slice(0, i).trim().toLowerCase()] = line.slice(i + 1).trim()
  }
  if (!meta.title || !meta.date) return null
  const body = m[2].trim()
  const words = body.split(/\s+/).filter(Boolean).length
  return {
    slug,
    title: meta.title,
    date: meta.date,
    summary: meta.summary ?? "",
    tags: (meta.tags ?? "").split(",").map((t) => t.trim()).filter(Boolean),
    body,
    minutes: Math.max(1, Math.round(words / 200)),
    draft: /^(true|yes)$/i.test(meta.draft ?? ""),
  }
}

/** Every published post, newest first. */
export function loadPosts(): Post[] {
  if (!fs.existsSync(DIR)) return []
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".md") && !f.startsWith("_"))
    .map((f) => parse(f.replace(/\.md$/, ""), fs.readFileSync(path.join(DIR, f), "utf8")))
    .filter((p): p is Post & { draft: boolean } => !!p && !p.draft)
    .map(({ draft: _draft, ...p }) => p)
    .sort((a, b) => b.date.localeCompare(a.date))
}
