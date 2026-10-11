"use client"

import { useState } from "react"
import {
  CATEGORIES,
  CURRENTLY,
  EMAIL,
  EXPERIENCE_ORDER,
  GITHUB_URL,
  LINKEDIN_URL,
  PATHS,
  PERSONAL_ITEMS,
  PROFILE,
  PROJECTS,
  QUICK_PROJECTS,
  RESUME_URL,
  SCRAPBOOK,
  SERVERS,
  SKILLS,
  type Category,
} from "@/data/content"
import { SEASON_LIST, WEATHER, type Season } from "@/lib/seasons"
import { PixelIcon, Slot, Sprite, StaticSlot, Todo } from "@/components/game/primitives"

const projectById = Object.fromEntries(PROJECTS.map((p) => [p.id, p]))

/* ---------------- Singleplayer ---------------- */
export function About() {
  const [picked, setPicked] = useState<string | null>(null)
  const item = PERSONAL_ITEMS.find((p) => p.key === picked)
  return (
    <div className="row">
      <div className="win profile-card">
        <div className="sprite-box" style={{ padding: "14px 18px" }}>
          <Sprite scale={10} />
        </div>
        <span className="px" style={{ fontSize: 22, color: "var(--ink)" }}>
          {PROFILE.name}
        </span>
        <span className="vt" style={{ fontSize: 15, color: "var(--wine)" }}>
          {PROFILE.classes.join(" · ")}
        </span>
      </div>
      <div className="grow stack-20">
        <article className="paper prose">
          <h2 className="px">{PROFILE.headline}</h2>
          {PROFILE.about.map((p) => (
            <p key={p.slice(0, 20)}>{p}</p>
          ))}
        </article>
        <div className="win" style={{ padding: "16px 20px" }}>
          <h2 className="px" style={{ margin: "0 0 10px", fontSize: 18, color: "var(--ink)" }}>
            Personal Inventory
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {PERSONAL_ITEMS.map((p) => (
              <Slot
                key={p.key}
                icon={p.icon}
                label={p.name}
                tip={{ t1: p.name, t2: p.type }}
                selected={picked === p.key}
                onClick={() => setPicked(p.key)}
              />
            ))}
          </div>
          {item ? (
            <div className="paper" style={{ marginTop: 14, padding: "14px 18px" }} aria-live="polite">
              <span className="vt" style={{ fontSize: 15, color: "var(--wine)" }}>
                {item.type}
              </span>
              <h3 className="px" style={{ margin: "2px 0 6px", fontSize: 20, color: "var(--ink)" }}>
                {item.name}
              </h3>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.5 }}>
                <Todo text={item.line} />
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

/* ---------------- Inventory ---------------- */
export function Inventory({ selected, onSelect }: { selected: string; onSelect: (id: string) => void }) {
  const [tab, setTab] = useState<"projects" | "skills">("projects")
  const [filter, setFilter] = useState<Category | "all">("all")
  const p = projectById[selected] || PROJECTS[0]
  return (
    <div className="row">
      <section className="win" aria-label="Project inventory" style={{ flex: "1 1 440px", minWidth: 0, padding: "18px 20px 20px" }}>
        <div className="tabs" role="tablist" aria-label="Inventory tabs" style={{ marginBottom: 14 }}>
          {(["projects", "skills"] as const).map((t) => (
            <button key={t} type="button" role="tab" aria-selected={tab === t} className={"tab" + (tab === t ? " on" : "")} onClick={() => setTab(t)}>
              {t === "projects" ? "Projects" : "Skills"}
            </button>
          ))}
        </div>
        {tab === "projects" ? (
          <div>
            <div className="tabs" aria-label="Filter by category" style={{ marginBottom: 16 }}>
              {CATEGORIES.map(([id, label]) => (
                <button key={id} type="button" aria-pressed={filter === id} className={"tab" + (filter === id ? " on" : "")} onClick={() => setFilter(id)}>
                  {label}
                </button>
              ))}
            </div>
            <div className="grid-slots">
              {PROJECTS.map((pr) => (
                <Slot
                  key={pr.id}
                  icon={pr.icon}
                  label={pr.name}
                  tip={{ t1: pr.name, t2: pr.type, t3: pr.stack }}
                  selected={selected === pr.id}
                  dim={filter !== "all" && !pr.cats.includes(filter)}
                  onClick={() => onSelect(pr.id)}
                />
              ))}
              {Array.from({ length: 12 }, (_, i) => (
                <div key={i} className="slot locked" aria-hidden="true">
                  ?
                </div>
              ))}
            </div>
            <p className="vt" style={{ margin: "14px 0 0", fontSize: 14, color: "#4a4a4a" }}>
              Locked slots unlock as new projects ship.
            </p>
          </div>
        ) : (
          <div className="stack-16">
            {SKILLS.map((g) => (
              <div key={g.label}>
                <h3 className="px" style={{ margin: "0 0 8px", fontSize: 16, color: "var(--ink)" }}>
                  {g.label}
                </h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {g.items.map((s) => (
                    <span key={s} className="chip">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {tab === "projects" ? (
        <article className="paper project-card" aria-live="polite">
          <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <StaticSlot icon={p.icon} />
            <div style={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}>
              <h2 className="px" style={{ margin: 0, fontSize: 22, color: "var(--ink)" }}>
                {p.name}
              </h2>
              <span className="vt" style={{ fontSize: 15, color: "var(--wine)" }}>
                {p.type} · <Todo text={p.period} />
              </span>
            </div>
          </div>
          <p style={{ margin: 0, fontSize: 16, lineHeight: 1.55 }}>
            <Todo text={p.desc} />
          </p>
          {p.role ? (
            <p style={{ margin: 0, fontSize: 15 }}>
              <strong>Role:</strong> {p.role}, {p.org}
            </p>
          ) : null}
          {p.bullets.length ? (
            <ul className="bullets">
              {p.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          ) : null}
          <p style={{ margin: 0, fontSize: 15 }}>
            <strong>Stack:</strong> <Todo text={p.stack} />
          </p>
          {p.result ? <div className="badge">★ {p.result}</div> : null}
          {p.link ? (
            <a className="join" style={{ alignSelf: "flex-start" }} href={p.link} target="_blank" rel="noreferrer">
              View on GitHub
            </a>
          ) : null}
        </article>
      ) : null}
    </div>
  )
}

/* ---------------- Advancements ---------------- */
export function Advancements({ node, onNode, openProject }: { node: string; onNode: (id: string) => void; openProject: (id: string) => void }) {
  let current = PATHS[0].nodes[0]
  let currentPath = PATHS[0].label
  PATHS.forEach((p) =>
    p.nodes.forEach((n) => {
      if (n.id === node) {
        current = n
        currentPath = p.label
      }
    }),
  )
  return (
    <div className="stack-24">
      <section className="win-dark stack-22" aria-label="Advancement tree" style={{ padding: "22px 24px" }}>
        {PATHS.map((p) => (
          <div key={p.label} className="path-row">
            <div className="path-label">
              <h2 className="px" style={{ margin: 0, fontSize: 18, color: p.color }}>
                {p.label}
              </h2>
              <span className="vt" style={{ fontSize: 14, color: "var(--muted)" }}>
                {p.blurb}
              </span>
            </div>
            <div className="path-track">
              <div>
                {p.nodes.map((n, i) => (
                  <span key={n.id} style={{ display: "contents" }}>
                    {i ? <span className="bar" aria-hidden="true" /> : null}
                    <button
                      type="button"
                      className={"node" + (node === n.id ? " on" : "")}
                      aria-pressed={node === n.id}
                      aria-label={n.title}
                      data-t1={n.title}
                      data-t2={p.label}
                      data-t3={n.date}
                      onClick={() => onNode(n.id)}
                    >
                      <PixelIcon name={n.icon} />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>
      <article className="paper node-card" aria-live="polite">
        <div style={{ flex: "999 1 420px", minWidth: 0, display: "flex", flexDirection: "column", gap: 8, maxWidth: "72ch" }}>
          <span className="vt" style={{ fontSize: 15, color: "var(--wine)" }}>
            {currentPath} · <Todo text={current.date} />
          </span>
          <h2 className="px" style={{ margin: 0, fontSize: 24, color: "var(--ink)" }}>
            {current.title}
          </h2>
          <p style={{ margin: 0, fontSize: 16, lineHeight: 1.55 }}>
            <Todo text={current.desc} />
          </p>
          <p style={{ margin: 0, fontSize: 15, color: "#5a4a44" }}>
            <strong>What I learned:</strong> <Todo text={current.learned || "[TODO]"} />
          </p>
        </div>
        {current.rel ? (
          <div style={{ flex: "1 1 200px" }}>
            <button type="button" className="mc-btn small" onClick={() => openProject(current.rel as string)}>
              Open in Inventory
            </button>
          </div>
        ) : null}
      </article>
    </div>
  )
}

/* ---------------- Realms ---------------- */
export function Realms() {
  return (
    <div className="row">
      <section className="win-dark" style={{ flex: "1 1 300px", padding: "20px 22px" }}>
        <h2 className="px" style={{ margin: "0 0 12px", fontSize: 18, color: "var(--gold)" }}>
          CURRENTLY
        </h2>
        <dl className="vt currently">
          {CURRENTLY.map(([k, v]) => (
            <div key={k} style={{ display: "contents" }}>
              <dt>{k}</dt>
              <dd>
                <Todo text={v} />
              </dd>
            </div>
          ))}
        </dl>
      </section>
      <section className="win grow" style={{ padding: "20px 22px" }}>
        <h2 className="px" style={{ margin: "0 0 12px", fontSize: 18, color: "var(--ink)" }}>
          Scrapbook
        </h2>
        <div className="scrap">
          {SCRAPBOOK.map((t) => (
            <figure key={t} className="paper">
              <div className="vt">[Add photo]</div>
              <figcaption className="vt">{t}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    </div>
  )
}

/* ---------------- Multiplayer ---------------- */
function CopyButton({ label = "Copy Address" }: { label?: string }) {
  const [text, setText] = useState(label)
  return (
    <button
      type="button"
      className="join"
      onClick={() => {
        const done = () => {
          setText("Copied")
          setTimeout(() => setText(label), 1500)
        }
        try {
          navigator.clipboard.writeText(EMAIL).then(done, () => setText(EMAIL))
        } catch {
          setText(EMAIL)
        }
      }}
    >
      {text}
    </button>
  )
}

export function Multiplayer() {
  return (
    <div className="stack-16">
      <section className="win-dark" aria-label="Server list" style={{ padding: 10, display: "flex", flexDirection: "column", gap: 6 }}>
        {SERVERS.map((s) => {
          const online = !s.offline
          const bar = online ? "#3fbf3f" : "#5a5a5a"
          return (
            <div key={s.name} className="server">
              <StaticSlot icon={s.icon} />
              <div style={{ flex: "1 1 200px", minWidth: 0, display: "flex", flexDirection: "column", gap: 2 }}>
                <span className="px" style={{ fontSize: 18, color: "#fff" }}>
                  {s.name}
                </span>
                <span className="vt" style={{ fontSize: 15, color: "var(--muted)", overflowWrap: "anywhere" }}>
                  {s.desc}
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
                <span className="vt" style={{ fontSize: 15, color: online ? "#7fdc6a" : "#ff7b7b" }}>
                  {online ? "Online" : "Offline"}
                </span>
                <span className="ping" aria-hidden="true">
                  {[4, 7, 10, 13, 16].map((h) => (
                    <span key={h} style={{ height: h, background: bar }} />
                  ))}
                </span>
                {s.copy ? <CopyButton /> : null}
                {online && s.href ? (
                  <a className="join" href={s.href} target={s.href.startsWith("mailto:") ? undefined : "_blank"} rel="noreferrer" aria-label={`Join ${s.name}`}>
                    Join Server
                  </a>
                ) : null}
              </div>
            </div>
          )
        })}
      </section>
      <section className="chatlog">
        <p style={{ color: "var(--gold)" }}>[Server] The guestbook is offline for now.</p>
        <p>[Server] Coming soon: sign in with GitHub to leave a message.</p>
      </section>
    </div>
  )
}

/* ---------------- Options ---------------- */
export function Options({
  season,
  setSeason,
  weather,
  toggleWeather,
  sound,
  toggleSound,
  found,
  total,
  resetAchievements,
}: {
  season: Season
  setSeason: (s: Season) => void
  weather: boolean
  toggleWeather: () => void
  sound: boolean
  toggleSound: () => void
  found: number
  total: number
  resetAchievements: () => void
}) {
  return (
    <section className="win-dark stack-16" style={{ padding: "22px 24px", maxWidth: 640 }}>
      <h2 className="px" style={{ margin: 0, fontSize: 18, color: "var(--gold)" }}>
        Season
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))", gap: 10 }}>
        {SEASON_LIST.map(([id, label]) => (
          <button key={id} type="button" aria-pressed={season === id} className={"mc-btn small" + (season === id ? " on" : "")} onClick={() => setSeason(id)}>
            {label}
          </button>
        ))}
      </div>
      <button type="button" className="mc-btn" onClick={toggleWeather} aria-pressed={weather}>
        <span>Weather</span>
        <span className="sub">{weather ? `ON · ${WEATHER[season].label}` : "OFF"}</span>
      </button>
      <button type="button" className="mc-btn" onClick={toggleSound} aria-pressed={sound}>
        <span>Sound Effects</span>
        <span className="sub">{sound ? "ON" : "OFF"}</span>
      </button>
      <button type="button" className="mc-btn" onClick={resetAchievements}>
        <span>Reset Advancements</span>
        <span className="sub">
          {found} / {total} found
        </span>
      </button>
      <p className="vt" style={{ margin: 0, fontSize: 15, color: "var(--muted)" }}>
        Animations switch off automatically when your device asks for reduced motion.
      </p>
    </section>
  )
}

/* ---------------- Quick View ---------------- */
export function QuickView() {
  return (
    <article className="paper quick">
      <header>
        <div style={{ minWidth: 0 }}>
          <h2 className="px" style={{ margin: 0, fontSize: 30, color: "var(--ink)" }}>
            {PROFILE.name}
          </h2>
          <p style={{ margin: "4px 0 0" }}>{PROFILE.summaryLine}</p>
          <p style={{ margin: "4px 0 0", display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <CopyButton label="Copy" />
          </p>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          <a className="join" href={RESUME_URL} target="_blank" rel="noreferrer">
            Résumé PDF
          </a>
          <a className="join" href={LINKEDIN_URL} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a className="join" href={GITHUB_URL} target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
      </header>
      <section>
        <h3 className="px">Experience</h3>
        <div className="stack-14">
          {EXPERIENCE_ORDER.map((id) => {
            const p = projectById[id]
            return (
              <div key={id}>
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 8 }}>
                  <strong>
                    {p.role}, {p.org}
                  </strong>
                  <span style={{ color: "#6b5a50" }}>{p.period}</span>
                </div>
                <ul style={{ margin: "4px 0 0", paddingLeft: 20 }}>
                  {p.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </section>
      <section>
        <h3 className="px">Projects</h3>
        <ul style={{ margin: 0, paddingLeft: 20, display: "flex", flexDirection: "column", gap: 6 }}>
          {QUICK_PROJECTS.map(([n, d]) => (
            <li key={n}>
              <strong>{n}</strong>: {d}
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h3 className="px">Skills</h3>
        {SKILLS.map((g) => (
          <p key={g.label} style={{ margin: "0 0 4px" }}>
            <strong>{g.label}:</strong> {g.items.join(", ")}
          </p>
        ))}
      </section>
    </article>
  )
}
