// The simple version of the site: one quiet, readable page, rendered at build time so all the text is in the HTML.
// It reads the same data as the Minecraft version (data/content.ts), so the two never drift apart.
import { EMAIL, GITHUB_URL, LINKEDIN_URL, PHOTOS, PROJECT_GROUPS, PROJECTS, RESUME_URL, type Project } from "@/data/content"
import { PixelField } from "./PixelField"
import { Reveal } from "./Reveal"
import s from "./simple.module.css"

const CAL_URL = "https://calendly.com/eh698-cornell/30min"

const byId = Object.fromEntries(PROJECTS.map((p) => [p.id, p])) as Record<string, Project>
const group = (label: string) => (PROJECT_GROUPS.find((g) => g.label === label)?.ids ?? []).map((id) => byId[id]).filter(Boolean)

// Small coloured badges stand in for company logos.
const BADGE: Record<string, { mark: string; bg: string; fg: string }> = {
  finmd: { mark: "F", bg: "#e8f0ff", fg: "#2457c5" },
  rag: { mark: "A", bg: "#efe9ff", fg: "#5b3cc4" },
  makeaplay: { mark: "M", bg: "#fff1e0", fg: "#b45309" },
  combopt: { mark: "C", bg: "#fbe9e9", fg: "#b31b1b" },
  chess: { mark: "C", bg: "#fbe9e9", fg: "#b31b1b" },
}
const ORG: Record<string, string> = { combopt: "Cornell University", chess: "Cornell University" }
const NAME: Record<string, string> = { site: "This website, the Minecraft edition" }

const status = (p: Project) => p.type.toLowerCase().replace("side project · ", "").replace("full-stack build · ", "")
const tags = (p: Project) => p.stack.split(" · ").slice(0, 4).join(" · ")

function Badge({ id }: { id: string }) {
  const b = BADGE[id] ?? { mark: "•", bg: "#eee", fg: "#555" }
  return (
    <span className={s.badge} style={{ background: b.bg, color: b.fg }} aria-hidden="true">
      {b.mark}
    </span>
  )
}

function Job({ p }: { p: Project }) {
  const research = p.type.startsWith("Research")
  return (
    <li className={s.job} data-reveal="">
      <Badge id={p.id} />
      <div>
        <h3>{research ? p.name : p.org}</h3>
        <p className={s.role}>
          {research ? `${p.role}, ${ORG[p.id] ?? p.org}` : p.role?.replace(" (remote)", "")}, {p.period}
        </p>
        <p className={s.what}>{p.bullets[0] ?? p.desc}</p>
        {p.result ? <p className={s.win}>↳ {p.result}</p> : null}
      </div>
    </li>
  )
}

function Card({ p }: { p: Project }) {
  return (
    <article className={s.card} data-reveal="">
      <p className={s.status}>{status(p)}</p>
      <h3>{NAME[p.id] ?? p.name}</h3>
      <p className={s.what}>{p.desc}</p>
      {p.result ? <p className={s.win}>↳ {p.result}</p> : null}
      <div className={s.cardFoot}>
        <span className={s.tags}>{tags(p)}</span>
        <span className={s.cardLinks}>
          {p.link ? (
            <a href={p.link} target={p.link.startsWith("/") ? undefined : "_blank"} rel="noreferrer">
              {p.link.startsWith("/") ? "play" : "live"} ↗
            </a>
          ) : null}
          {p.github ? (
            <a href={p.github} target="_blank" rel="noreferrer">
              github ↗
            </a>
          ) : null}
        </span>
      </div>
    </article>
  )
}

export function SimpleSite() {
  return (
    <div className={s.page}>
      <PixelField />
      <Reveal />
      <div className={s.col}>
        <header className={s.hero} id="top">
          <figure className={s.polaroid}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/photos/elaine.jpg" alt="Elaine smiling in a grey flat cap on a sunny bridge" width={320} height={320} />
            <figcaption>that&apos;s me!</figcaption>
          </figure>
          <div className={s.heroText}>
            <p className={s.hello}>
              hi there, welcome! <span className={s.wave} aria-hidden="true">👋</span>
            </p>
            <h1 className={s.name}>
              elaine hong<span className={s.cursor} aria-hidden="true" />
            </h1>
            <p className={s.where}>cs + operations research @ cornell &apos;28 · toronto → ithaca</p>
            <p className={s.open}>
              <i aria-hidden="true" /> open to summer 2027 swe + quant internships
            </p>
            <nav className={s.nav} aria-label="Sections">
              <a href="#about">about</a>
              <a href="#experience">experience</a>
              <a href="#projects">projects</a>
              <a href="#life">life</a>
              <a href={RESUME_URL} target="_blank" rel="noreferrer">
                résumé ↗
              </a>
            </nav>
          </div>
        </header>

        <section id="about" className={s.section} data-reveal="">
          <p>
            thanks for stopping by! i&apos;m elaine, and i study computer science and operations research at{" "}
            <span className={s.chip}>
              <i style={{ background: "#b31b1b" }} />
              cornell
            </span>
            , where i also fence épée on the ncaa division i team.
          </p>
          <p className={s.kicker}>recently</p>
          <ul className={s.recent}>
            <li>
              ml engineer intern at{" "}
              <span className={s.chip}>
                <i style={{ background: "#5b3cc4" }} />
                anote ai
              </span>
              <span className={s.sub}>↳ showed ROUGE-L understated numeric accuracy 10–16× on FinanceBench</span>
            </li>
            <li>
              software engineer intern at{" "}
              <span className={s.chip}>
                <i style={{ background: "#2457c5" }} />
                finmd
              </span>
              <span className={s.sub}>↳ shipped analytics to production, cut p50 latency 60%</span>
            </li>
            <li>researching how llms can help mixed-integer solvers, at cornell</li>
            <li>
              winning <a href="#projects">bigred//hacks</a> with a rhythm game you play with your body
            </li>
          </ul>
          <p>
            i like problems where software, models and people meet, and building things people actually enjoy using.
          </p>
          <p className={s.links}>
            <a href={`mailto:${EMAIL}`}>email</a>
            <a href={LINKEDIN_URL} target="_blank" rel="noreferrer">
              linkedin
            </a>
            <a href={GITHUB_URL} target="_blank" rel="noreferrer">
              github
            </a>
            <a href={RESUME_URL} target="_blank" rel="noreferrer">
              résumé
            </a>
            <a href={CAL_URL} target="_blank" rel="noreferrer">
              cal
            </a>
          </p>
        </section>

        <section id="experience" className={s.section}>
          <h2 data-reveal="">experience</h2>
          <ul className={s.jobs}>
            {group("Experience").map((p) => (
              <Job key={p.id} p={p} />
            ))}
          </ul>
          <h2 className={s.h2gap} data-reveal="">research</h2>
          <ul className={s.jobs}>
            {group("Research").map((p) => (
              <Job key={p.id} p={p} />
            ))}
          </ul>
        </section>

        <section id="projects" className={s.section}>
          <h2 data-reveal="">projects</h2>
          <p className={s.lede} data-reveal="">things i&apos;ve built, and am building</p>
          <div className={s.cards}>
            {group("Projects").map((p) => (
              <Card key={p.id} p={p} />
            ))}
          </div>
        </section>

        <section id="life" className={s.section}>
          <h2 data-reveal="">life</h2>
          <p data-reveal="">
            épée is the heaviest of the three blades: the whole body is target and whoever lands first scores. i started because a friend got a discount
            if we signed up with him, made the canadian national team, and now compete for cornell. off the strip: swe conference director, orie club
            publicity chair, poker, bloons td 6 strategy videos, and any excuse to try a new coffee shop.
          </p>
          <div className={s.photos}>
            {PHOTOS.map((ph, i) => (
              <figure key={ph.src} className={s.snap} data-reveal="" style={{ rotate: `${[-3, 2, -1.5, 3][i % 4]}deg`, transitionDelay: `${i * 90}ms` }}>
                <a href={ph.src} target="_blank" rel="noreferrer">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={ph.thumb} alt={ph.alt} loading="lazy" />
                </a>
                <figcaption>{ph.caption.toLowerCase()}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <footer className={s.foot} id="contact" data-reveal="">
          <p className={s.footBig}>let&apos;s work together!</p>
          <p>whether it&apos;s an internship, a project, fencing, or a coffee chat, my inbox is always open. i&apos;d love to hear from you.</p>
          <p className={s.ctas}>
            <a className={s.btn} href={`mailto:${EMAIL}`}>
              say hi
            </a>
            <a className={s.ghost} href={CAL_URL} target="_blank" rel="noreferrer">
              book a 30 min chat
            </a>
          </p>
          <p className={s.fine}>
            <span>© {new Date().getFullYear()} elaine hong</span>
            <a href="/play">prefer games? play the minecraft version →</a>
          </p>
        </footer>
      </div>
    </div>
  )
}
