// The simple version of the site: one readable page, rendered at build time so all the text is in the HTML.
// It reads the same data as the Minecraft version (data/content.ts), so the two never drift apart.
import { EMAIL, GITHUB_URL, LINKEDIN_URL, PROFILE, PROJECT_GROUPS, PROJECTS, RESUME_URL, SKILLS, type Project } from "@/data/content"
import { Sprite } from "@/components/game/primitives"
import s from "./simple.module.css"

const byId = Object.fromEntries(PROJECTS.map((p) => [p.id, p])) as Record<string, Project>
const group = (label: string) => (PROJECT_GROUPS.find((g) => g.label === label)?.ids ?? []).map((id) => byId[id]).filter(Boolean)

function Links({ p }: { p: Project }) {
  if (!p.link && !p.github) return null
  return (
    <span className={s.links}>
      {p.link ? (
        <a href={p.link} target="_blank" rel="noreferrer">
          Live ↗
        </a>
      ) : null}
      {p.github ? (
        <a href={p.github} target="_blank" rel="noreferrer">
          GitHub ↗
        </a>
      ) : null}
    </span>
  )
}

function Entry({ p }: { p: Project }) {
  const research = p.type.startsWith("Research")
  return (
    <article className={s.entry}>
      <div className={s.entryHead}>
        <h3>
          {research ? p.name : (p.org ?? p.name)}
          {!research && p.org ? <span className={s.muted}> · {p.role}</span> : null}
        </h3>
        <span className={s.date}>{p.period}</span>
      </div>
      {research ? <p className={s.sub}>{p.role}{p.org ? `, ${p.org.replace("Cornell Engineering Undergraduate Research", "Cornell")}` : ""}</p> : p.org && p.name !== p.org ? <p className={s.sub}>{p.name}</p> : null}
      <ul>
        {(p.bullets.length ? p.bullets : [p.desc]).map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
      <p className={s.stack}>
        {p.stack}
        <Links p={p} />
      </p>
    </article>
  )
}

function Card({ p }: { p: Project }) {
  return (
    <article className={s.card}>
      <div className={s.cardHead}>
        <h3>{p.name}</h3>
        <span className={s.date}>{p.period || p.type}</span>
      </div>
      {p.result ? <p className={s.result}>{p.result}</p> : null}
      <p>{p.desc}</p>
      <p className={s.stack}>
        {p.stack}
        <Links p={p} />
      </p>
    </article>
  )
}

export function SimpleSite() {
  return (
    <div className={s.page}>
      <header className={s.top}>
        <a href="#" className={s.brand}>
          Elaine Hong
        </a>
        <nav aria-label="Sections">
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
          <a className={s.btn} href={RESUME_URL} target="_blank" rel="noreferrer">
            Résumé
          </a>
        </nav>
      </header>

      <main className={s.main}>
        <section className={s.hero}>
          <div className={s.avatar} aria-hidden="true">
            <Sprite scale={5} />
          </div>
          <div>
            <h1 className={s.name}>Elaine Hong</h1>
            <p className={s.lead}>Computer Science + Operations Research at Cornell · Class of 2028</p>
            <p className={s.tagline}>
              I build software, evaluate ML systems, and work on optimization research. I also fence épée for Cornell&apos;s NCAA Division I team.
            </p>
            <div className={s.ctas}>
              <a className={s.btn} href={RESUME_URL} target="_blank" rel="noreferrer">
                Résumé
              </a>
              <a className={s.ghost} href={`mailto:${EMAIL}`}>
                Email
              </a>
              <a className={s.ghost} href={LINKEDIN_URL} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a className={s.ghost} href={GITHUB_URL} target="_blank" rel="noreferrer">
                GitHub
              </a>
            </div>
          </div>
        </section>

        <section id="about" className={s.section}>
          <h2>About</h2>
          {PROFILE.about.map((t) => (
            <p key={t}>{t}</p>
          ))}
        </section>

        <section id="experience" className={s.section}>
          <h2>Experience</h2>
          {group("Experience").map((p) => (
            <Entry key={p.id} p={p} />
          ))}
          <h2 className={s.h2gap}>Research</h2>
          {group("Research").map((p) => (
            <Entry key={p.id} p={p} />
          ))}
        </section>

        <section id="projects" className={s.section}>
          <h2>Projects</h2>
          <div className={s.grid}>
            {group("Projects").map((p) => (
              <Card key={p.id} p={p} />
            ))}
          </div>
        </section>

        <section className={s.section}>
          <h2>Skills</h2>
          <dl className={s.skills}>
            {SKILLS.map((g) => (
              <div key={g.label}>
                <dt>{g.label}</dt>
                <dd>{g.items.join(" · ")}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section id="contact" className={s.section}>
          <h2>Contact</h2>
          <p>
            The best way to reach me is <a href={`mailto:${EMAIL}`}>{EMAIL}</a>. I&apos;m also on{" "}
            <a href={LINKEDIN_URL} target="_blank" rel="noreferrer">
              LinkedIn
            </a>{" "}
            and{" "}
            <a href={GITHUB_URL} target="_blank" rel="noreferrer">
              GitHub
            </a>
            .
          </p>
        </section>
      </main>

      <footer className={s.foot}>
        <span>© {new Date().getFullYear()} Elaine Hong</span>
        <a href="/play">Prefer games? Play the Minecraft version →</a>
      </footer>
    </div>
  )
}
