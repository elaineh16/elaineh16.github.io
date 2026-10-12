// All site content lives here. Edit this file to add projects, stories, or links.
// Anything still marked [TODO] renders in a muted colour so it is easy to spot.

import type { IconName } from "@/lib/pixel-art"
import { CATCHES } from "@/data/fishing"

export type ScreenId = "home" | "about" | "inventory" | "arcade" | "crafting" | "fishing" | "multiplayer" | "quick"

export type Category = "swe" | "ai" | "research" | "quant" | "hack"

export interface Project {
  id: string
  kind: "experience" | "project"
  icon: IconName
  name: string
  type: string
  period: string
  cats: Category[]
  role?: string
  org?: string
  desc: string
  bullets: string[]
  stack: string
  result?: string
  /** Source code on GitHub, shown next to `link`. */
  github?: string
  /** A real accomplishment. Items with a badge get the enchanted glow. */
  badge?: string
  link?: string
}

export const RESUME_URL = "/Elaine_H_Resume.pdf"
export const EMAIL = "eh698@cornell.edu"
export const GITHUB_URL = "https://github.com/elaineh16"
export const LINKEDIN_URL = "https://www.linkedin.com/in/elaine-hong-cornell"

export const PROFILE = {
  name: "Elaine Hong",
  classes: ["Engineer", "Fencer", "Builder"],
  stats: [
    ["Spawn", "Toronto"],
    ["Base", "Cornell University"],
    ["Class", "ORIE + CS, '28"],
    ["Main quest", "Build cool things"],
  ] as [string, string][],
  headline: "Analytical by training. Competitive by nature.",
  about: [
    "I'm Elaine Hong, a Cornell Computer Science and Operations Research dual-degree student working across full-stack engineering, machine learning, and quantitative systems.",
    "I like problems where software, models, and people meet. Whether I'm improving a production workflow, evaluating a retrieval system, or designing production analytics, I care about building the right thing and proving that it performs.",
    "Outside the terminal, I compete on Cornell's Division I fencing team and serve as Conference Director for the Society of Women Engineers at Cornell and Publicity Chair for the Cornell ORIE Club.",
  ],
  summaryLine: "Cornell Engineering '28 · B.S. Computer Science + Operations Research · NCAA Division I fencer",
}

export const PROJECTS: Project[] = [
  {
    id: "finmd",
    kind: "experience",
    badge: "Shipped to production",
    icon: "laptop",
    name: "FinMD Analytics & Identity",
    type: "Internship · Production",
    period: "Jun – Aug 2026",
    cats: ["swe"],
    role: "Software Engineer Intern",
    org: "FinMD",
    desc: "Architected production analytics and identity infrastructure across FinMD's SCOPE, PRISM, and RADAR products.",
    bullets: [
      "Migrated a live multi-product dashboard from mock data to tenant-scoped metrics with server-side aggregation.",
      "Built PostgreSQL identity-resolution functions, enforced row-level security and ownership validation, and reduced p50 page-load latency by 60%.",
    ],
    stack: "PostgreSQL · Row-level security",
    result: "60% lower p50 page-load latency",
  },
  {
    id: "chess",
    kind: "experience",
    badge: "10,000+ positions benchmarked",
    icon: "knight",
    name: "LLM Chess Reasoning",
    type: "Research",
    period: "Aug 2025 – Jun 2026",
    cats: ["ai", "research"],
    role: "Undergraduate Research Assistant",
    org: "Cornell Engineering Undergraduate Research",
    desc: "Built scalable infrastructure to evaluate how frontier language models reason about chess against Stockfish.",
    bullets: [
      "Benchmarked 5+ frontier models across 10,000+ chess positions.",
      "Designed ablation studies across 20+ prompting strategies over 200+ games to identify recurring failure modes.",
    ],
    stack: "Python · Stockfish · python-chess · OpenAI / Anthropic / Gemini APIs",
    result: "10,000+ positions evaluated",
  },
  {
    id: "rag",
    kind: "experience",
    badge: "Kept weak pipelines out of production",
    icon: "book",
    name: "Financial RAG Evaluation",
    type: "Internship · ML",
    period: "Jun – Aug 2025",
    cats: ["ai", "research"],
    role: "Machine Learning Engineer Intern",
    org: "Anote AI",
    desc: "Evaluated retrieval-augmented generation systems for financial question answering and built high-throughput outreach automation.",
    bullets: [
      "Ran a seven-condition RAG ablation across 133 FinanceBench questions and prevented underperforming pipelines from reaching production.",
      "Exposed a 10-16x underestimation of numeric accuracy in ROUGE-L, achieving 34.8% numerical Exact Match with semantic chunking.",
    ],
    stack: "RAG pipelines · LLM evaluation",
    result: "34.8% numerical Exact Match",
  },
  {
    id: "navidate",
    kind: "project",
    icon: "map",
    name: "Navidate",
    type: "Hackathon",
    period: "BigRed//Hacks 2026",
    cats: ["hack", "swe", "ai"],
    desc: "A date planner for Cornell and Ithaca. Tell it your vibe, budget and time, and it plans a little adventure with stops you can save and share with your partner.",
    bullets: [
      "Plans around a starting point, time window, budget for two, mood, dietary needs, and walking or driving.",
      "Builds a timed itinerary on a map from nearby places, then checks opening hours, budget, weather and walking routes.",
      "Navi, a voice assistant, talks through ideas, and an iMessage agent texts you the plan and answers questions about it.",
    ],
    stack: "Gemini API · Grok Voice API · Google Maps & Places · iMessage agent · Vercel",
    link: "https://www.navidate.us/",
    github: "https://github.com/elaineh16/NaviDate",
  },
  {
    id: "asset",
    kind: "project",
    icon: "redstone",
    name: "AI Asset Generation Platform",
    type: "Full-stack build",
    period: "",
    cats: ["swe", "ai"],
    desc: "A full-stack Stable Diffusion platform that automates art-production workflows with task batching, caching, and asynchronous request handling.",
    bullets: [],
    stack: "Python · Next.js · Stable Diffusion · REST APIs",
    result: "40% higher throughput",
  },
  {
    id: "bear",
    kind: "project",
    badge: "BigRed//Hacks winner",
    icon: "disc",
    name: "Bear Escape",
    type: "Hackathon · Winner",
    period: "BigRed//Hacks",
    cats: ["hack"],
    desc: "An AI-powered multiplayer rhythm game with Gemini-generated beatmaps, OpenCV motion controls, and synchronized gameplay.",
    bullets: [],
    stack: "React · TypeScript · Python · Gemini API · OpenCV · SpaceTimeDB",
    result: "BigRed//Hacks winner",
  },
  {
    id: "trade",
    kind: "project",
    icon: "chart",
    name: "Trading Backtester",
    type: "Side project",
    period: "2025",
    cats: ["quant"],
    desc: "A Python framework for backtesting and comparing algorithmic trading strategies on historical market data.",
    bullets: [
      "Pluggable strategy interface with moving-average, RSI and MACD strategies built in.",
      "Reports Sharpe ratio, drawdown and win rate, with charts and a performance dashboard.",
    ],
    stack: "Python · pandas · NumPy · yfinance · Matplotlib / Plotly",
    link: "https://github.com/elaineh16/trading_backtester",
  },
]

export const EXPERIENCE_ORDER = ["finmd", "rag", "chess"]

export const QUICK_PROJECTS = [
  ["AI Asset Generation Platform", "full-stack Stable Diffusion platform with task batching, caching, and async request handling (40% higher throughput)."],
  ["Bear Escape", "BigRed//Hacks winner. AI-powered multiplayer rhythm game with Gemini-generated beatmaps and OpenCV motion controls."],
]

export const CATEGORIES: [Category | "all", string][] = [
  ["all", "All"],
  ["swe", "Software Eng"],
  ["ai", "AI / ML"],
  ["research", "Research"],
  ["hack", "Hackathons"],
  ["quant", "Quant"],
]

export const SKILLS: { label: string; items: string[] }[] = [
  { label: "Languages", items: ["Python", "C++", "TypeScript", "JavaScript", "Java", "SQL", "C"] },
  { label: "Frameworks & AI", items: ["React", "Next.js", "FastAPI", "LangChain", "RAG pipelines", "LLM evaluation", "Pandas", "NumPy", "OpenCV"] },
  { label: "Data & infrastructure", items: ["PostgreSQL", "MySQL", "Supabase", "Docker", "AWS EC2", "REST APIs", "WebSockets", "OAuth", "Linux"] },
]

/* ---------- Singleplayer: personal items, each opens a story card ---------- */
export interface Story {
  key: string
  icon: IconName
  name: string
  type: string
  title: string
  body: string[]
  /** Extra live content shown under the text. */
  extra?: "gallery" | "music" | "map"
}

/* Photos live in public/photos (resized, location data removed). */
export const PHOTOS: { src: string; thumb: string; alt: string; caption: string }[] = [
  { src: "/photos/canada-games.jpg", thumb: "/photos/canada-games-thumb.jpg", alt: "Two épée fencers mid-bout at the Canada Games", caption: "Épée at the Canada Games" },
  { src: "/photos/bigredhacks.jpg", thumb: "/photos/bigredhacks-thumb.jpg", alt: "The Bear Escape team holding a laptop and a guitar controller at BigRed//Hacks", caption: "BigRed//Hacks with the Bear Escape team" },
  { src: "/photos/golden-hour.jpg", thumb: "/photos/golden-hour-thumb.jpg", alt: "Elaine in a grey flat cap at sunset on a stone bridge", caption: "Golden hour on a fencing trip" },
  { src: "/photos/cultural-night.jpg", thumb: "/photos/cultural-night-thumb.jpg", alt: "Elaine and a friend at a decorated table at a cultural night", caption: "Cultural night with friends" },
]

/*
 * Live "most played this week" from Last.fm (link Spotify to Last.fm first).
 * Fill in your Last.fm username and API key (https://www.last.fm/api/account/create).
 * The key is read-only, so it is fine to keep it in the site.
 */
export const LASTFM = { user: "elegantmaus", apiKey: "680b7006ac7a11c7ccc4158e8d6d5efe" }

export const STORIES: Story[] = [
  {
    key: "epee",
    icon: "epee",
    name: "Épée",
    type: "Fencing story",
    title: "En garde",
    body: [
      "I started fencing because my brother's friend invited us along: he got a discount if we signed up. I stayed long after the discount ran out.",
      "Making the Canadian National Team is still my proudest moment. Now I compete on Cornell's NCAA Division I varsity team.",
      "Fencing taught me to read people, stay calm under pressure, adjust fast after a mistake, and manage my time. It turns out that's most of engineering too.",
    ],
  },
  {
    key: "camera",
    icon: "camera",
    name: "Camera",
    type: "Photos",
    title: "Snapshots",
    body: ["A few snapshots from fencing, hackathons, travel and Cornell. Click one to see it bigger."],
    extra: "gallery",
  },
  {
    key: "disc",
    icon: "disc",
    name: "Music Disc",
    type: "Favourite music",
    title: "On repeat",
    body: ["Mostly indie, R&B and EDM. Here's what I've played most this week:"],
    extra: "music",
  },
  {
    key: "coffee",
    icon: "coffee",
    name: "Coffee",
    type: "Fun facts & hobbies",
    title: "Side quests",
    body: [
      "When I'm not fencing or in class, I'm usually playing poker, trying a new coffee shop, or playing Minecraft or Bloons TD 6.",
      "I'm also Conference Director for the Society of Women Engineers at Cornell and Publicity Chair for the Cornell ORIE Club.",
      "Fun fact: I was born in Toronto but grew up in Shanghai.",
    ],
  },
  {
    key: "map",
    icon: "map",
    name: "Map",
    type: "Travel & places",
    title: "Spawn points",
    body: [
      "Fencing has taken me all over North America. Here's every place I've logged so far. Hover a marker or pick a city below.",
    ],
    extra: "map",
  },
]

/* ---------- Mini-Games ---------- */
export const ARCADE: { id: string; icon: IconName; name: string; blurb: string; status: "soon" | "locked" | "ready" }[] = [
  { id: "fishing", icon: "puffer", name: "Gone Fishing", blurb: `Cast, wait for the splash, reel it in. ${CATCHES.length} catches to collect, including one legendary.`, status: "ready" },
  { id: "fencing", icon: "epee", name: "Fencing Duel", blurb: "Parry, riposte, first to 5 touches. How long can your streak go?", status: "soon" },
  { id: "crafting", icon: "book", name: "Crafting Elaine", blurb: "Combine items to unlock stories and fun facts. 6 recipes to find.", status: "ready" },
]

/* ---------- Multiplayer ---------- */
export interface Server {
  name: string
  desc: string
  icon: IconName
  href: string
  copy?: boolean
}

export const SERVERS: Server[] = [
  { name: "LinkedIn", desc: "elaine-hong-cornell · professional updates", icon: "sign", href: LINKEDIN_URL },
  { name: "GitHub", desc: "elaineh16 · code, hackathons, side projects", icon: "git", href: GITHUB_URL },
  { name: "Email", desc: `${EMAIL} · fastest way to reach me`, icon: "mail", href: `mailto:${EMAIL}`, copy: true },
  { name: "Résumé", desc: "One-page PDF", icon: "paper", href: RESUME_URL },
]

/* ---------- Navigation ---------- */
export const MENU: { label: string; sub: string; screen: ScreenId }[] = [
  { label: "Singleplayer", sub: "About Me", screen: "about" },
  { label: "Inventory", sub: "Projects & Experience", screen: "inventory" },
  { label: "Mini-Games", sub: "Arcade", screen: "arcade" },
  { label: "Multiplayer", sub: "Connect", screen: "multiplayer" },
]

export const HOTBAR: { label: string; icon: IconName; href?: string; action?: "achievements" }[] = [
  { label: "Résumé", icon: "paper", href: RESUME_URL },
  { label: "GitHub", icon: "git", href: GITHUB_URL },
  { label: "LinkedIn", icon: "sign", href: LINKEDIN_URL },
  { label: "Email", icon: "mail", href: `mailto:${EMAIL}` },
  { label: "Achievements", icon: "medal", action: "achievements" },
]

export const SCREEN_TITLES: Record<Exclude<ScreenId, "home">, string> = {
  about: "Singleplayer · About Me",
  inventory: "Inventory · Projects & Experience",
  arcade: "Mini-Games · Arcade",
  crafting: "Crafting Elaine",
  fishing: "Gone Fishing",
  multiplayer: "Multiplayer · Connect",
  quick: "Quick View",
}

export const SPLASHES = [
  "En garde!",
  "Touché!",
  "Now with 100% more épée!",
  "Spawned in Toronto!",
  "Powered by matcha!",
  "Also try Bloons TD 6!",
  "Don't stop believin'!",
  "Say my name!",
  "Read Harry Potter 7 times!",
  "Shin ramen enjoyer!",
  "Now in 4 languages!",
  "Works on my machine!",
  "Gone fishing!",
  "One more commit!",
]

/** Hidden splash: shows up about 1 time in 25. */
export const HIDDEN_SPLASH = "D1 Trollstar"

export function pickSplash(current?: string): string {
  if (Math.random() < 0.04 && current !== HIDDEN_SPLASH) return HIDDEN_SPLASH
  const pool = SPLASHES.filter((s) => s !== current)
  return pool[Math.floor(Math.random() * pool.length)]
}

/* ---------- Visitor achievements (saved in the visitor's browser) ---------- */
export interface Achievement {
  id: string
  title: string
  how: string
  icon: IconName
}

export const ACHIEVEMENTS: Achievement[] = [
  { id: "about", title: "Getting to Know Elaine", how: "Open Singleplayer", icon: "epee" },
  { id: "inventory", title: "The Builder", how: "Open the Inventory", icon: "laptop" },
  { id: "arcade", title: "Insert Coin", how: "Visit the arcade", icon: "disc" },
  { id: "multiplayer", title: "Party Up", how: "Open Multiplayer", icon: "sign" },
  { id: "quick", title: "Recruiter Mode", how: "Open Quick View", icon: "paper" },
  { id: "stories", title: "Story Time", how: "Read all five personal stories", icon: "book" },
  { id: "projects", title: "Window Shopping", how: "Open every project", icon: "redstone" },
  { id: "egg", title: "Easter Egg Hunter", how: "Click the title", icon: "medal" },
  { id: "weather", title: "Weather Watcher", how: "Turn on the weather", icon: "map" },
  { id: "seasons", title: "Four Seasons", how: "Try all four seasons", icon: "map" },
  { id: "firstcraft", title: "First Craft", how: "Craft your first recipe", icon: "book" },
  { id: "mastercrafter", title: "Master Crafter", how: "Find all 6 recipes", icon: "book" },
  { id: "firstcatch", title: "Gone Fishing", how: "Reel in your first catch", icon: "puffer" },
  { id: "goldcatch", title: "Gold Medal Catch", how: "Catch the legendary Golden Épée", icon: "goldepee" },
  { id: "fullbox", title: "Full Tackle Box", how: `Catch all ${CATCHES.length} items`, icon: "compass" },
  { id: "engarde", title: "En Garde!", how: "Win a fencing bout (coming soon)", icon: "epee" },
  { id: "hotstreak", title: "Hot Streak", how: "Win 3 bouts in a row (coming soon)", icon: "medal" },
]

export const ACHIEVEMENT_BY_ID: Record<string, Achievement> = Object.fromEntries(ACHIEVEMENTS.map((a) => [a.id, a]))
