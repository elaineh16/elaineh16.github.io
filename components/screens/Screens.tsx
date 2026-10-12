"use client"

import { useState } from "react"
import {
  ARCADE,
  CATEGORIES,
  EMAIL,
  EXPERIENCE_ORDER,
  GITHUB_URL,
  LINKEDIN_URL,
  PROFILE,
  PROJECTS,
  RESUME_URL,
  SERVERS,
  SKILLS,
  STORIES,
  type Category,
  type Project,
} from "@/data/content"
import { SalutingSprite, PixelIcon, Slot, StaticSlot, Todo } from "@/components/game/primitives"
import { Gallery, TopTracks } from "@/components/screens/Extras"
import { TravelMap } from "@/components/screens/TravelMap"

const projectById: Record<string, Project> = Object.fromEntries(PROJECTS.map((p) => [p.id, p]))

/* ---------------- Singleplayer ---------------- */
export function About({ onStory, sound = true }: { onStory: (key: string) => void; sound?: boolean }) {
  const [tab, setTab] = useState<string>("about")
  const story = STORIES.find((s) => s.key === tab)
  return (
    <div className="row">
      <section className="win profile-card" aria-labelledby="pdat">
        <div className="grass" style={{ alignSelf: "stretch", margin: "-20px -20px 0" }} />
        <div className="dirt" style={{ alignSelf: "stretch", margin: "0 -20px 4px" }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", alignSelf: "stretch" }}>
          <h2 id="pdat" className="px" style={{ margin: 0, fontSize: 17, color: "var(--ink)" }}>
            PLAYER.DAT
          </h2>
          <span className="vt online">
            <span aria-hidden="true" className="online-dot" />
            Online
          </span>
        </div>
        <div className="sprite-box" style={{ padding: "12px 16px" }}>
          <SalutingSprite scale={6} move="wave" sound={sound} outfit={tab === "epee" ? "fencing" : tab === "disc" ? "music" : "casual"} />
        </div>
        <span className="px" style={{ fontSize: 20, color: "var(--ink)" }}>
          {PROFILE.name}
        </span>
        <span className="vt" style={{ fontSize: 14, color: "var(--wine)" }}>
          {PROFILE.classes.join(" · ")}
        </span>
        <dl className="stats" style={{ alignSelf: "stretch" }}>
          {PROFILE.stats.map(([k, v]) => (
            <div key={k} style={{ display: "contents" }}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="win grow about-book" aria-label="About me">
        <div className="book-tabs" role="tablist" aria-label="About me sections">
          <button type="button" role="tab" aria-selected={tab === "about"} className={"book-tab" + (tab === "about" ? " on" : "")} onClick={() => setTab("about")}>
            <PixelIcon name="paper" size={24} />
            <span>About Me</span>
          </button>
          {STORIES.map((s) => (
            <button
              key={s.key}
              type="button"
              role="tab"
              aria-selected={tab === s.key}
              className={"book-tab" + (tab === s.key ? " on" : "")}
              onClick={() => {
                setTab(s.key)
                onStory(s.key)
              }}
            >
              <PixelIcon name={s.icon} size={24} />
              <span>{s.name}</span>
            </button>
          ))}
        </div>
        <article className={"paper prose book-page" + (story && story.body.join(" ").length > 600 ? " long" : "")} role="tabpanel" aria-live="polite">
          {story ? (
            <>
              <span className="book-kicker">{story.type}</span>
              <h2>{story.title}</h2>
              {story.body.map((b) => (
                <p key={b.slice(0, 24)}>
                  <Todo text={b} />
                </p>
              ))}
              {story.link ? (
                <a className="join" style={{ alignSelf: "flex-start" }} href={story.link.href} target="_blank" rel="noreferrer">
                  {story.link.label}
                </a>
              ) : null}
              {story.extra === "gallery" ? <Gallery /> : null}
              {story.extra === "music" ? <TopTracks /> : null}
              {story.extra === "map" ? <TravelMap /> : null}
            </>
          ) : (
            <>
              <span className="book-kicker">About me</span>
              <h2>{PROFILE.headline}</h2>
              {PROFILE.about.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
              <p className="book-hint">Pick a tab above to read more: fencing, photos, places, music and side quests.</p>
            </>
          )}
        </article>
      </section>
    </div>
  )
}

/* ---------------- Inventory ---------------- */
function ProjectDetail({ p }: { p: Project }) {
  return (
    <article className="paper project-card" aria-live="polite">
      <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
        <StaticSlot icon={p.icon} enchanted={!!p.badge} />
        <div style={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}>
          <span className="vt" style={{ fontSize: 13, color: "#6b5a50" }}>
            {p.kind === "experience" ? "EXPERIENCE" : "PROJECT"}
          </span>
          <h2 className="px" style={{ margin: 0, fontSize: 22, color: "var(--ink)" }}>
            {p.name}
          </h2>
          <span className="vt" style={{ fontSize: 15, color: "var(--wine)" }}>
            {p.type}
            {p.period ? <> · <Todo text={p.period} /></> : null}
          </span>
        </div>
      </div>
      {p.badge ? (
        <div className="badge-row">
          <span className="badge-chip">✦ {p.badge}</span>
        </div>
      ) : null}
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
      {p.link || p.github ? (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {p.link ? (
            <a className="join" href={p.link} target="_blank" rel="noreferrer">
              {p.link.includes("github.com") ? "View on GitHub" : "Visit site"}
            </a>
          ) : null}
          {p.github ? (
            <a className="join" href={p.github} target="_blank" rel="noreferrer">
              View on GitHub
            </a>
          ) : null}
        </div>
      ) : null}
    </article>
  )
}

// 2 rows of 9, so the grid never ends on a lone slot.
const INVENTORY_SLOTS = 18

export function Inventory({ selected, onSelect }: { selected: string; onSelect: (id: string) => void }) {
  const [tab, setTab] = useState<"items" | "skills">("items")
  const [view, setView] = useState<"grid" | "list">("grid")
  const [filter, setFilter] = useState<Category | "all">("all")
  const p = projectById[selected] || PROJECTS[0]
  const visible = (pr: Project) => filter === "all" || pr.cats.includes(filter)
  return (
    <div className="row">
      <section className="win" aria-label="Inventory" style={{ flex: "1 1 440px", minWidth: 0, padding: "18px 20px 20px" }}>
        <div className="inv-top">
          <div className="tabs" role="tablist" aria-label="Inventory tabs">
            {(
              [
                ["items", "Projects & Experience"],
                ["skills", "Skills"],
              ] as const
            ).map(([t, label]) => (
              <button key={t} type="button" role="tab" aria-selected={tab === t} className={"tab" + (tab === t ? " on" : "")} onClick={() => setTab(t)}>
                {label}
              </button>
            ))}
          </div>
          {tab === "items" ? (
            <div className="tabs" aria-label="View">
              {(["grid", "list"] as const).map((v) => (
                <button key={v} type="button" aria-pressed={view === v} className={"tab small" + (view === v ? " on" : "")} onClick={() => setView(v)}>
                  {v === "grid" ? "Grid" : "List"}
                </button>
              ))}
            </div>
          ) : null}
        </div>

        {tab === "items" ? (
          <div className="stack-16">
            <div className="tabs" aria-label="Filter by category">
              {CATEGORIES.map(([id, label]) => (
                <button key={id} type="button" aria-pressed={filter === id} className={"tab small" + (filter === id ? " on" : "")} onClick={() => setFilter(id)}>
                  {label}
                </button>
              ))}
            </div>

            {view === "grid" ? (
              <>
                <div className="grid-slots">
                  {PROJECTS.map((pr) => (
                    <Slot
                      key={pr.id}
                      icon={pr.icon}
                      label={pr.name}
                      tip={{ t1: pr.name, t2: pr.badge ? `✦ ${pr.badge}` : pr.type, t3: pr.stack }}
                      selected={selected === pr.id}
                      dim={!visible(pr)}
                      enchanted={!!pr.badge}
                      onClick={() => onSelect(pr.id)}
                    />
                  ))}
                  {Array.from({ length: Math.max(0, INVENTORY_SLOTS - PROJECTS.length) }, (_, i) => (
                    <div key={i} className="slot locked" aria-hidden="true">
                      ?
                    </div>
                  ))}
                </div>
                <p className="vt" style={{ margin: 0, fontSize: 14, color: "#4a4a4a" }}>
                  Glowing items carry a badge. Locked slots unlock as new projects ship.
                </p>
              </>
            ) : (
              <ul className="inv-list">
                {PROJECTS.filter(visible).map((pr) => (
                  <li key={pr.id}>
                    <button type="button" className={selected === pr.id ? "on" : ""} aria-pressed={selected === pr.id} onClick={() => onSelect(pr.id)}>
                      <StaticSlot icon={pr.icon} size={28} enchanted={!!pr.badge} />
                      <span className="inv-list-main">
                        <strong>{pr.name}</strong>
                        <span>
                          {pr.org ? `${pr.org} · ` : ""}
                          {pr.type}
                        </span>
                      </span>
                      <span className="inv-list-date">
                        <Todo text={pr.period} />
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
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

      {tab === "items" ? <ProjectDetail p={p} /> : null}
    </div>
  )
}

/* ---------------- Mini-Games ---------------- */
export function Arcade({ play }: { play: (id: string) => void }) {
  return (
    <div className="stack-16">
      <div className="arcade">
        {ARCADE.map((g) => (
          <section key={g.id} className={"cabinet win-dark" + (g.status === "locked" ? " locked" : "")} aria-labelledby={`g-${g.id}`}>
            <div className="screen">
              <PixelIcon name={g.icon} size={64} />
            </div>
            <h2 id={`g-${g.id}`} className="px">
              {g.name}
            </h2>
            <p className="vt">{g.blurb}</p>
            {g.status === "ready" ? (
              <button type="button" className="mc-btn small" onClick={() => play(g.id)}>
                Play
              </button>
            ) : (
              <button type="button" className="mc-btn small" disabled>
                {g.status === "locked" ? "Locked" : "Coming soon"}
              </button>
            )}
          </section>
        ))}
      </div>
    </div>
  )
}

/* ---------------- Multiplayer ---------------- */
function CopyButton({ label = "Copy Address", tiny }: { label?: string; tiny?: boolean }) {
  const [text, setText] = useState(label)
  return (
    <button
      type="button"
      className={"join" + (tiny ? " tiny" : "")}
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
    <section className="win-dark" aria-label="Server list" style={{ padding: 10, display: "flex", flexDirection: "column", gap: 6 }}>
      {SERVERS.map((s) => (
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
            <span className="vt" style={{ fontSize: 15, color: "#7fdc6a" }}>
              Online
            </span>
            <span className="ping" aria-hidden="true">
              {[4, 7, 10, 13, 16].map((h) => (
                <span key={h} style={{ height: h, background: "#3fbf3f" }} />
              ))}
            </span>
            {s.copy ? <CopyButton /> : null}
            <a className="join" href={s.href} target={s.href.startsWith("mailto:") ? undefined : "_blank"} rel="noreferrer" aria-label={`Join ${s.name}`}>
              Join Server
            </a>
          </div>
        </div>
      ))}
    </section>
  )
}

/* ---------------- Quick View ---------------- */
export function QuickView() {
  const experience = EXPERIENCE_ORDER.map((id) => projectById[id])
  const projects = PROJECTS.filter((p) => p.kind === "project")
  return (
    <article className="paper quick">
      <header className="q-head">
        <div className="q-id">
          <h2 className="px">{PROFILE.name}</h2>
          <p>{PROFILE.summaryLine}</p>
          <p className="q-contact">
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a> · Toronto · Ithaca, NY
          </p>
        </div>
        <nav className="q-links" aria-label="Résumé and profiles">
          <a className="join tiny" href={RESUME_URL} target="_blank" rel="noreferrer">
            Résumé
          </a>
          <a className="join tiny" href={LINKEDIN_URL} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a className="join tiny" href={GITHUB_URL} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <CopyButton label="Copy email" tiny />
        </nav>
      </header>

      <div className="q-cols">
        <div className="q-main">
          <section>
            <h3 className="q-h">Experience</h3>
            {experience.map((p) => (
              <div key={p.id} className="q-item">
                <div className="q-row">
                  <strong>{p.org}</strong>
                  <span className="q-date">{p.period}</span>
                </div>
                <div className="q-sub">{p.role}</div>
                <ul>
                  {p.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
          <section>
            <h3 className="q-h">Projects</h3>
            {projects.map((p) => (
              <div key={p.id} className="q-item">
                <div className="q-row">
                  <strong>{p.name}</strong>
                  {p.badge ? <span className="q-date">{p.badge}</span> : p.period ? <span className="q-date">{p.period}</span> : null}
                </div>
                <p>{p.desc}</p>
                <div className="q-stack">{p.stack}</div>
              </div>
            ))}
          </section>
        </div>

        <aside className="q-side">
          <section>
            <h3 className="q-h">Education</h3>
            <div className="q-item">
              <strong>Cornell University</strong>
              <div className="q-sub">Cornell Engineering, Class of 2028</div>
              <p>Dual B.S. in Computer Science and Operations Research</p>
            </div>
          </section>
          <section>
            <h3 className="q-h">Athletics</h3>
            <ul className="q-plain">
              <li>NCAA Division I varsity fencing, Cornell</li>
              <li>Canadian National Team</li>
            </ul>
          </section>
          <section>
            <h3 className="q-h">Leadership</h3>
            <ul className="q-plain">
              <li>Conference Director, Society of Women Engineers at Cornell</li>
              <li>Publicity Chair, Cornell ORIE Club</li>
            </ul>
          </section>
          <section>
            <h3 className="q-h">Skills</h3>
            {SKILLS.map((g) => (
              <div key={g.label} className="q-skill">
                <div className="q-sub">{g.label}</div>
                <p>{g.items.join(", ")}</p>
              </div>
            ))}
          </section>
        </aside>
      </div>
    </article>
  )
}
