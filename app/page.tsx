"use client"

import { useEffect, useState } from "react"
import {
  ArrowDown,
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  Code2,
  Download,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  Menu,
  Moon,
  Sun,
  Trophy,
  X,
} from "lucide-react"

const navItems = [
  ["Experience", "#experience"],
  ["Projects", "#projects"],
  ["About", "#about"],
  ["Skills", "#skills"],
  ["Contact", "#contact"],
]

const experiences = [
  {
    role: "Software Engineer Intern",
    company: "FinMD",
    period: "Jun - Aug 2026",
    summary:
      "Developed production underwriting and portfolio-management workflows using Next.js, TypeScript, Supabase, and PostgreSQL.",
    highlights: [
      "Built tenant-authenticated APIs and PostgreSQL RPCs that prefill 10+ fields and improved form completion speed by 40%.",
      "Implemented server-side pagination, filtering, and sorting for 1,000+ records, improving loading speed by 60%.",
    ],
  },
  {
    role: "Machine Learning Engineer Intern",
    company: "Anote AI",
    period: "Jun - Aug 2026",
    summary:
      "Built evaluation systems for financial-document question answering and product workflows for AI-powered outreach.",
    highlights: [
      "Tested RAG enhancements across 133 FinanceBench questions, measuring answer quality, numeric accuracy, latency, and cost.",
      "Developed React and Redux workflows plus OAuth integrations for email and Slack.",
    ],
  },
  {
    role: "Research Assistant",
    company: "Cornell Engineering Undergraduate Research",
    period: "Aug 2025 - Jun 2026",
    summary:
      "Evaluated how large language models reason about chess by benchmarking their decisions against Stockfish.",
    highlights: [
      "Built Python pipelines covering 1,000+ positions and 200+ games.",
      "Designed and evaluated 20+ prompting strategies to measure move quality and error rates.",
    ],
  },
]

const projects = [
  {
    title: "Algorithmic Trading System",
    eyebrow: "Trading infrastructure",
    description:
      "A modular trading backend with strategy execution, order management, real-time WebSocket market data, and portfolio updates.",
    tags: ["Python", "FastAPI", "MySQL", "Redis", "Docker", "WebSockets"],
  },
  {
    title: "IMC Prosperity 4",
    eyebrow: "Top 10% globally",
    description:
      "Market-making strategies developed and backtested across simulated products, adapting pricing and risk to changing conditions.",
    tags: ["Python", "Pandas", "NumPy", "Algorithmic Trading"],
  },
  {
    title: "Bear Escape",
    eyebrow: "BigRed//Hacks winner",
    description:
      "An AI-powered rhythm game built in 36 hours, winning Best Use of Gemini and Best UI among 200+ participants.",
    tags: ["React", "TypeScript", "Python", "Gemini API", "OpenCV", "SpaceTimeDB"],
  },
]

const skillGroups = [
  { label: "Languages", value: "Python, Java, C++, TypeScript, JavaScript, SQL, C" },
  { label: "Frameworks", value: "FastAPI, React, Next.js, Redux, LangChain, Pandas, NumPy, OpenCV" },
  { label: "Data & backend", value: "PostgreSQL, MySQL, Redis, Supabase, Firebase, SpaceTimeDB" },
  { label: "Infrastructure", value: "AWS EC2, Docker, REST APIs, WebSockets, OAuth, Git, GitHub" },
]

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    setDark(savedTheme ? savedTheme === "dark" : prefersDark)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark)
    window.localStorage.setItem("theme", dark ? "dark" : "light")
  }, [dark])

  return (
    <main>
      <header className="site-header">
        <div className="shell header-inner">
          <a href="#top" className="wordmark" aria-label="Elaine Hong, home">
            EH<span>.</span>
          </a>

          <nav className="desktop-nav" aria-label="Main navigation">
            {navItems.map(([label, href]) => (
              <a key={href} href={href}>{label}</a>
            ))}
          </nav>

          <div className="header-actions">
            <button
              className="icon-button"
              type="button"
              onClick={() => setDark((value) => !value)}
              aria-label={dark ? "Use light theme" : "Use dark theme"}
            >
              {dark ? <Sun /> : <Moon />}
            </button>
            <button
              className="icon-button menu-button"
              type="button"
              onClick={() => setMenuOpen((value) => !value)}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">
            {navItems.map(([label, href]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
            ))}
          </nav>
        )}
      </header>

      <section id="top" className="hero shell">
        <div className="hero-copy">
          <p className="kicker">Cornell engineer · Software & ML · NCAA athlete</p>
          <h1>I build systems that turn complex data into clear decisions.</h1>
          <p className="hero-intro">
            I&apos;m Elaine Hong, a Cornell Computer Science and Operations Research student working across
            full-stack engineering, machine learning, and quantitative systems.
          </p>
          <div className="button-row">
            <a className="primary-button" href="#projects">
              Explore my work <ArrowDown />
            </a>
            <a className="secondary-button" href="/Elaine_H_Resume.pdf" download>
              <Download /> Résumé
            </a>
          </div>
          <div className="social-row" aria-label="Social links">
            <a href="mailto:eh698@cornell.edu"><Mail /> eh698@cornell.edu</a>
            <a href="https://www.linkedin.com/in/elaine-hong-cornell" target="_blank" rel="noreferrer"><Linkedin /> LinkedIn</a>
            <a href="https://github.com/elaineh16" target="_blank" rel="noreferrer"><Github /> GitHub</a>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="portrait-frame">
            <img src="/IMG_9116.jpg" alt="" />
          </div>
          <div className="metric-card metric-one"><strong>Top 10%</strong><span>IMC Prosperity 4</span></div>
          <div className="metric-card metric-two"><strong>2× winner</strong><span>BigRed//Hacks</span></div>
        </div>
      </section>

      <section className="signal-strip" aria-label="Highlights">
        <div className="shell signal-grid">
          <div><BriefcaseBusiness /><span><strong>2 internships</strong> in software and ML</span></div>
          <div><GraduationCap /><span><strong>Cornell Engineering</strong> Class of 2028</span></div>
          <div><Trophy /><span><strong>NCAA Division I</strong> varsity fencer</span></div>
        </div>
      </section>

      <section id="experience" className="section shell">
        <div className="section-heading">
          <p className="eyebrow">Experience</p>
          <h2>Shipping real products, then measuring what works.</h2>
        </div>
        <div className="experience-list">
          {experiences.map((item, index) => (
            <article className="experience-card" key={item.company}>
              <div className="experience-index">0{index + 1}</div>
              <div>
                <div className="experience-title-row">
                  <div><h3>{item.role}</h3><p>{item.company}</p></div>
                  <time>{item.period}</time>
                </div>
                <p className="experience-summary">{item.summary}</p>
                <ul>{item.highlights.map((highlight) => <li key={highlight}><Check />{highlight}</li>)}</ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="projects" className="section projects-section">
        <div className="shell">
          <div className="section-heading split-heading">
            <div><p className="eyebrow">Selected projects</p><h2>Built from the engine room out.</h2></div>
            <a href="https://github.com/elaineh16" target="_blank" rel="noreferrer">More on GitHub <ArrowUpRight /></a>
          </div>
          <div className="project-grid">
            {projects.map((project, index) => (
              <article className="project-card" key={project.title}>
                <div className="project-topline"><span>0{index + 1}</span><Code2 /></div>
                <p className="project-eyebrow">{project.eyebrow}</p>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="tag-list">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="section shell about-grid">
        <div className="section-heading">
          <p className="eyebrow">About</p>
          <h2>Analytical by training. Competitive by nature.</h2>
        </div>
        <div className="about-copy">
          <p>
            I like problems where software, models, and people meet. Whether I&apos;m improving a production workflow,
            evaluating a retrieval system, or adapting a trading strategy, I care about building the right thing and
            proving that it performs.
          </p>
          <p>
            Outside the terminal, I compete on Cornell&apos;s Division I fencing team and serve as Conference Director
            for the Society of Women Engineers at Cornell.
          </p>
        </div>
      </section>

      <section id="skills" className="section skills-section">
        <div className="shell skills-grid">
          <div className="section-heading">
            <p className="eyebrow">Technical toolkit</p>
            <h2>Tools I use to move from idea to production.</h2>
          </div>
          <div className="skill-list">
            {skillGroups.map((group) => (
              <div key={group.label}><h3>{group.label}</h3><p>{group.value}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section shell">
        <p className="eyebrow">Let&apos;s connect</p>
        <h2>Have an interesting problem?</h2>
        <p>I&apos;m always happy to talk about software, machine learning, quantitative systems, and new opportunities.</p>
        <a className="primary-button" href="mailto:eh698@cornell.edu">Email me <ArrowUpRight /></a>
      </section>

      <footer>
        <div className="shell footer-inner">
          <p>© 2026 Elaine Hong</p>
          <div><a href="https://github.com/elaineh16">GitHub</a><a href="https://www.linkedin.com/in/elaine-hong-cornell">LinkedIn</a></div>
        </div>
      </footer>
    </main>
  )
}
