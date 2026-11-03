"use client"

import type React from "react"
import type { Post } from "@/lib/blog"
import { PixelIcon } from "@/components/game/primitives"

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
function niceDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number)
  return y && m && d ? `${MONTHS[m - 1]} ${d}, ${y}` : iso
}

/* ---------------- A small Markdown reader (no raw HTML, so posts can't break the page) ---------------- */

function inline(text: string, key = ""): React.ReactNode[] {
  const out: React.ReactNode[] = []
  const re = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)\s]+\))/g
  let last = 0
  let m: RegExpExecArray | null
  let i = 0
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index))
    const t = m[0]
    const k = `${key}-${i++}`
    if (t.startsWith("**")) out.push(<strong key={k}>{t.slice(2, -2)}</strong>)
    else if (t.startsWith("`")) out.push(<code key={k}>{t.slice(1, -1)}</code>)
    else if (t.startsWith("[")) {
      const lm = t.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/)
      const href = lm?.[2] ?? ""
      const safe = /^(https?:|mailto:|#|\/)/.test(href)
      out.push(
        safe ? (
          <a key={k} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
            {lm?.[1]}
          </a>
        ) : (
          lm?.[1]
        ),
      )
    } else out.push(<em key={k}>{t.slice(1, -1)}</em>)
    last = m.index + t.length
  }
  if (last < text.length) out.push(text.slice(last))
  return out
}

function Markdown({ source }: { source: string }) {
  const blocks: React.ReactNode[] = []
  const lines = source.split("\n")
  let i = 0
  while (i < lines.length) {
    const line = lines[i]
    const k = `b${i}`
    if (!line.trim()) {
      i++
    } else if (line.startsWith("```")) {
      const code: string[] = []
      i++
      while (i < lines.length && !lines[i].startsWith("```")) code.push(lines[i++])
      i++
      blocks.push(
        <pre key={k}>
          <code>{code.join("\n")}</code>
        </pre>,
      )
    } else if (/^#{2,3} /.test(line)) {
      const level = line.startsWith("### ") ? 3 : 2
      const text = line.replace(/^#{2,3} /, "")
      blocks.push(level === 2 ? <h2 key={k}>{inline(text, k)}</h2> : <h3 key={k}>{inline(text, k)}</h3>)
      i++
    } else if (/^[-*] /.test(line)) {
      const items: string[] = []
      while (i < lines.length && /^[-*] /.test(lines[i])) items.push(lines[i++].slice(2))
      blocks.push(
        <ul key={k}>
          {items.map((t, j) => (
            <li key={j}>{inline(t, `${k}-${j}`)}</li>
          ))}
        </ul>,
      )
    } else if (/^\d+\. /.test(line)) {
      const items: string[] = []
      while (i < lines.length && /^\d+\. /.test(lines[i])) items.push(lines[i++].replace(/^\d+\. /, ""))
      blocks.push(
        <ol key={k}>
          {items.map((t, j) => (
            <li key={j}>{inline(t, `${k}-${j}`)}</li>
          ))}
        </ol>,
      )
    } else if (line.startsWith("> ")) {
      const q: string[] = []
      while (i < lines.length && lines[i].startsWith("> ")) q.push(lines[i++].slice(2))
      blocks.push(<blockquote key={k}>{inline(q.join(" "), k)}</blockquote>)
    } else {
      const p: string[] = []
      while (i < lines.length && lines[i].trim() && !/^(```|#{2,3} |[-*] |\d+\. |> )/.test(lines[i])) p.push(lines[i++])
      blocks.push(<p key={k}>{inline(p.join(" "), k)}</p>)
    }
  }
  return <>{blocks}</>
}

/* ---------------- Screens ---------------- */

export function Blog({ posts, slug, open }: { posts: Post[]; slug: string | null; open: (slug: string | null) => void }) {
  const post = slug ? posts.find((p) => p.slug === slug) : null

  if (slug && post) {
    const i = posts.indexOf(post)
    const newer = posts[i - 1]
    const older = posts[i + 1]
    return (
      <article className="paper blog-post">
        <header className="blog-post-head">
          <p className="blog-meta vt">
            {niceDate(post.date)} · {post.minutes} min read
            {post.tags.length ? <> · {post.tags.join(" · ")}</> : null}
          </p>
          <h2>{post.title}</h2>
        </header>
        <div className="blog-body">
          <Markdown source={post.body} />
        </div>
        <nav className="blog-pager" aria-label="More posts">
          {older ? (
            <button type="button" className="mc-btn small" onClick={() => open(older.slug)}>
              ← {older.title}
            </button>
          ) : (
            <span />
          )}
          {newer ? (
            <button type="button" className="mc-btn small" onClick={() => open(newer.slug)}>
              {newer.title} →
            </button>
          ) : null}
        </nav>
      </article>
    )
  }

  return (
    <section className="blog-list" aria-label="Posts">
      {slug && !post ? <p className="blog-missing vt">That post isn't here anymore. Here's everything else.</p> : null}
      {posts.length ? (
        posts.map((p) => (
          <button key={p.slug} type="button" className="paper blog-card" onClick={() => open(p.slug)}>
            <span className="blog-card-icon" aria-hidden="true">
              <PixelIcon name="openbook" size={36} />
            </span>
            <span className="blog-card-text">
              <span className="blog-meta vt">
                {niceDate(p.date)} · {p.minutes} min read
              </span>
              <span className="blog-card-title">{p.title}</span>
              {p.summary ? <span className="blog-card-sum">{p.summary}</span> : null}
            </span>
          </button>
        ))
      ) : (
        <div className="paper blog-empty">
          <span className="blog-card-icon big" aria-hidden="true">
            <PixelIcon name="openbook" size={48} />
          </span>
          <p className="px">The first page is still being written.</p>
          <p className="vt">Check back soon.</p>
        </div>
      )}
    </section>
  )
}
