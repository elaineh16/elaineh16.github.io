// The simple version of the site: one quiet, readable page, rendered at build time so all the text is in the HTML.
// It reads the same data as the Minecraft version (data/content.ts), so the two never drift apart.
import { EMAIL, GITHUB_URL, LINKEDIN_URL, PHOTOS, PROJECT_GROUPS, PROJECTS, RESUME_URL, type Project } from "@/data/content"
import { PixelIcon } from "@/components/game/primitives"
import type { IconName } from "@/lib/pixel-art"
import { Controls } from "./Controls"
import { Reveal } from "./Reveal"
import s from "./simple.module.css"

const CAL_URL = "https://calendly.com/eh698-cornell/30min"

const byId = Object.fromEntries(PROJECTS.map((p) => [p.id, p])) as Record<string, Project>
const group = (label: string) => (PROJECT_GROUPS.find((g) => g.label === label)?.ids ?? []).map((id) => byId[id]).filter(Boolean)

const ORG: Record<string, string> = { combopt: "Cornell University", chess: "Cornell University" }
const NAME: Record<string, string> = { site: "This website, the Minecraft edition" }

const status = (p: Project) => p.type.replace("Side project · ", "").replace("Full-stack build · ", "")
const tags = (p: Project) => p.stack.split(" · ").slice(0, 4).join(" · ")

// Each entry's pixel item from the game, in a Minecraft inventory slot.
function Slot({ icon, size = 30 }: { icon: IconName; size?: number }) {
  return (
    <span className={s.slot} aria-hidden="true">
      <PixelIcon name={icon} size={size} />
    </span>
  )
}

const HOTBAR: { label: string; icon: IconName; href: string }[] = [
  { label: "Résumé", icon: "paper", href: RESUME_URL },
  { label: "GitHub", icon: "git", href: GITHUB_URL },
  { label: "LinkedIn", icon: "sign", href: LINKEDIN_URL },
  { label: "Email", icon: "mail", href: `mailto:${EMAIL}` },
  { label: "Coffee chat", icon: "coffee", href: CAL_URL },
]

// Runs before first paint so a visitor's saved day/night choice never flashes the wrong theme.
const THEME_SCRIPT = `try{var t=localStorage.getItem("simple-theme");if(t)document.currentScript.parentElement.setAttribute("data-theme",t)}catch(e){}`

function Job({ p }: { p: Project }) {
  const research = p.type.startsWith("Research")
  return (
    <li className={s.job} data-reveal="">
      <Slot icon={p.icon} />
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
      <div className={s.cardHead}>
        <Slot icon={p.icon} size={24} />
        <div>
          <p className={s.status}>{status(p)}</p>
          <h3>{NAME[p.id] ?? p.name}</h3>
        </div>
      </div>
      <p className={s.what}>{p.desc}</p>
      {p.result ? <p className={s.win}>↳ {p.result}</p> : null}
      <div className={s.cardFoot}>
        <span className={s.tags}>{tags(p)}</span>
        <span className={s.cardLinks}>
          {p.link ? (
            <a href={p.link} target={p.link.startsWith("/") ? undefined : "_blank"} rel="noreferrer">
              {p.link.startsWith("/") ? "Play" : "Live"} ↗
            </a>
          ) : null}
          {p.github ? (
            <a href={p.github} target="_blank" rel="noreferrer">
              GitHub ↗
            </a>
          ) : null}
        </span>
      </div>
    </article>
  )
}

export function SimpleSite() {
  return (
    <div className={s.page} data-simple-page="" suppressHydrationWarning>
      <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      <div className={s.backdrop} aria-hidden="true">
        <span className={s.stars} />
      </div>
      <Reveal />
      <Controls />
      <div className={s.col}>
        <header className={s.hero} id="top">
          <figure className={s.polaroid}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/photos/elaine.jpg" alt="Elaine smiling in a grey flat cap on a sunny bridge" width={320} height={320} />
            <figcaption>That&apos;s me!</figcaption>
          </figure>
          <div className={s.heroText}>
            <p className={s.hello}>
              Hi there, welcome! <span className={s.wave} aria-hidden="true">👋</span>
            </p>
            <h1 className={s.name}>
              Elaine Hong<span className={s.cursor} aria-hidden="true" />
            </h1>
            <p className={s.where}>CS + Operations Research @ Cornell &apos;28 · Toronto → Ithaca</p>
            <p className={s.open}>
              <i aria-hidden="true" /> Open to Summer 2027 internships
            </p>
            <nav className={s.nav} aria-label="Sections">
              <a href="#about">About</a>
              <a href="#experience">Experience</a>
              <a href="#projects">Projects</a>
              <a href="#life">Life</a>
              <a href={RESUME_URL} target="_blank" rel="noreferrer">
                Résumé ↗
              </a>
            </nav>
          </div>
        </header>

        <section id="about" className={s.section} data-reveal="">
          <p>
            Thanks for stopping by! I&apos;m Elaine, and I study Computer Science and Operations Research at{" "}
            <span className={s.chip}>
              <i style={{ background: "#b31b1b" }} />
              Cornell
            </span>
            , where I also fence épée on the NCAA Division I team.
          </p>
          <p className={s.kicker}>Recently</p>
          <ul className={s.recent}>
            <li>
              ML engineer intern at{" "}
              <span className={s.chip}>
                <i style={{ background: "#5b3cc4" }} />
                Anote AI
              </span>
              <span className={s.sub}>↳ Showed ROUGE-L understated numeric accuracy 10–16× on FinanceBench</span>
            </li>
            <li>
              Software engineer intern at{" "}
              <span className={s.chip}>
                <i style={{ background: "#2457c5" }} />
                FinMD
              </span>
              <span className={s.sub}>↳ Shipped analytics to production and cut p50 latency 60%</span>
            </li>
            <li>Researching how LLMs can help mixed-integer solvers at Cornell</li>
            <li>
              Won <a href="#projects">BigRed//Hacks</a> with a rhythm game you play with your body
            </li>
          </ul>
          <p>
            I like problems where software, models and people meet, and building things people actually enjoy using.
          </p>
          <nav className={s.hotbar} aria-label="Links">
            {HOTBAR.map((h) => (
              <a key={h.label} href={h.href} target={h.href.startsWith("mailto:") ? undefined : "_blank"} rel="noreferrer">
                <Slot icon={h.icon} size={28} />
                <span>{h.label}</span>
              </a>
            ))}
          </nav>
        </section>

        <section id="experience" className={s.section}>
          <h2 data-reveal="">Experience</h2>
          <ul className={s.jobs}>
            {group("Experience").map((p) => (
              <Job key={p.id} p={p} />
            ))}
          </ul>
          <h2 className={s.h2gap} data-reveal="">Research</h2>
          <ul className={s.jobs}>
            {group("Research").map((p) => (
              <Job key={p.id} p={p} />
            ))}
          </ul>
        </section>

        <section id="projects" className={s.section}>
          <h2 data-reveal="">Projects</h2>
          <p className={s.lede} data-reveal="">Things I&apos;ve built, and am building</p>
          <div className={s.cards}>
            {group("Projects").map((p) => (
              <Card key={p.id} p={p} />
            ))}
          </div>
        </section>

        <section id="life" className={s.section}>
          <h2 data-reveal="">Life</h2>
          <p data-reveal="">
            Épée is the heaviest of the three blades: the whole body is target, and whoever lands first scores. I started because a friend got a
            discount if we signed up with him, went on to make the Canadian National Team, and now compete for Cornell. Off the strip, you&apos;ll find
            me as SWE conference director and ORIE Club publicity chair, playing poker, watching Bloons TD 6 strategy videos, or finding any excuse to
            try a new coffee shop.
          </p>
          <div className={s.photos}>
            {PHOTOS.filter((ph) => !ph.src.includes("golden-hour")).map((ph, i) => (
              <figure key={ph.src} className={s.snap} data-reveal="" style={{ rotate: `${[-3, 2, -1.5][i % 3]}deg`, transitionDelay: `${i * 90}ms` }}>
                <a href={ph.src} target="_blank" rel="noreferrer">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={ph.thumb} alt={ph.alt} loading="lazy" />
                </a>
                <figcaption>{ph.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <div className={s.grass} aria-hidden="true" />
        <footer className={s.foot} id="contact" data-reveal="">
          <p className={s.footBig}>Let&apos;s work together!</p>
          <p>Whether it&apos;s an internship, a project, fencing, or a coffee chat, my inbox is always open. I&apos;d love to hear from you.</p>
          <p className={s.ctas}>
            <a className={s.btn} href={`mailto:${EMAIL}`}>
              Say hi
            </a>
            <a className={s.ghost} href={CAL_URL} target="_blank" rel="noreferrer">
              Book a 30 min chat
            </a>
          </p>
          <p className={s.fine}>
            <span>© {new Date().getFullYear()} Elaine Hong</span>
            <a href="/play">Prefer games? Play the Minecraft version →</a>
          </p>
        </footer>
      </div>
    </div>
  )
}
