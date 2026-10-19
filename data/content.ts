// All site content lives here. Edit this file to add projects, stories, or links.
// Anything still marked [TODO] renders in a muted colour so it is easy to spot.

import type { IconName } from "@/lib/pixel-art"
import { CATCHES } from "@/data/fishing"

export type ScreenId = "home" | "about" | "inventory" | "arcade" | "fortune" | "fishing" | "fencing" | "multiplayer" | "quick"

export type Category = "swe" | "ai" | "research" | "hack"

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
    "Hi! I'm Elaine Hong, a Computer Science and ORIE (Operations Research and Information Engineering) student at Cornell working across full-stack engineering, machine learning, and quantitative systems.",
    "I like problems where software, models, and people meet. Whether I'm improving a production workflow, evaluating a retrieval system, or designing production analytics, I care about building the right thing and proving that it performs.",
    "Outside the terminal, I compete on Cornell's Division I fencing team and serve as Conference Director for the Society of Women Engineers at Cornell and Publicity Chair for the Cornell ORIE Club :)",
  ],
  summaryLine: "Cornell Engineering '28 · B.S. Computer Science + Operations Research · NCAA Division I fencer",
}

export const PROJECTS: Project[] = [
  {
    id: "navidate",
    kind: "project",
    icon: "heart",
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
    id: "bear",
    kind: "project",
    badge: "BigRed//Hacks winner",
    icon: "disc",
    name: "Bear Escape",
    type: "Hackathon · Winner",
    period: "BigRed//Hacks 2025",
    cats: ["hack"],
    desc: "An AI-powered multiplayer rhythm game with Gemini-generated beatmaps, OpenCV motion controls, and synchronized gameplay.",
    bullets: [],
    stack: "React · TypeScript · Python · Gemini API · OpenCV · SpaceTimeDB",
    result: "BigRed//Hacks winner",
    github: "https://github.com/elaineh16/BigRedHack25",
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
  /** Hidden stories keep their text but don't get a tab (easy to bring back). */
  hidden?: boolean
  /** A button at the end of the story. */
  link?: { href: string; label: string }
}

/* Photos live in public/photos (resized, location data removed). */
export const PHOTOS: { src: string; thumb: string; alt: string; caption: string }[] = [
  { src: "/photos/canada-games.jpg", thumb: "/photos/canada-games-thumb.jpg", alt: "Two épée fencers mid-bout at the Canada Games", caption: "Épée at the Canada Games" },
  { src: "/photos/bigredhacks.jpg", thumb: "/photos/bigredhacks-thumb.jpg", alt: "Elaine and three teammates at BigRed//Hacks, holding a laptop showing their Save the Bear game and a guitar controller", caption: "BigRed//Hacks with the Bear Escape team" },
  { src: "/photos/golden-hour.jpg", thumb: "/photos/golden-hour-thumb.jpg", alt: "Elaine in a grey flat cap at sunset on a stone bridge", caption: "Golden hour on a fencing trip" },
  { src: "/photos/cultural-night.jpg", thumb: "/photos/cultural-night-thumb.jpg", alt: "Elaine and a friend at a decorated table at a cultural night", caption: "Cultural night with friends" },
]

/*
 * Live "most played this week" from Last.fm (link Spotify to Last.fm first).
 * Fill in your Last.fm username and API key (https://www.last.fm/api/account/create).
 * The key is read-only, so it is fine to keep it in the site.
 */
export const LASTFM = { user: "elegantmaus", apiKey: "680b7006ac7a11c7ccc4158e8d6d5efe" }

const ALL_STORIES: Story[] = [
  {
    key: "epee",
    icon: "epee",
    name: "Épée",
    type: "Fencing story",
    title: "En garde",
    body: [
      "I started fencing almost by accident. My brother’s friend invited us to try it because he got a discount if we signed up with him. I stayed long after the discount ran out.",
      "Over time, fencing became a huge part of my life. Making the Canadian National Team is still one of my proudest moments, and now I compete on Cornell’s NCAA Division I varsity fencing team.",
      "What I love most about fencing is how mental it is. You’re constantly reading your opponent, making decisions with incomplete information, and adjusting in real time.",
      "It’s also taught me a lot about discipline and time management. Balancing training, travel, classes, and everything else has forced me to be intentional with my time.",
      "It turns out a lot of that carries over to engineering too: read the situation, make a decision, learn from what failed, and adjust fast.",
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
    hidden: true, // Side quests tab is hidden for now; delete this line to show it again.
    icon: "coffee",
    name: "Coffee",
    type: "Fun facts & hobbies",
    title: "Side quests",
    body: [
      "When I’m not fencing or in class, I’m probably playing poker, watching youtube for a new Bloons TD 6 strategy, or finding an excuse to check out a new coffee shop.",
      "I’m technically a night owl, except I’m also terrible at actually staying up late.",
      "I also love collecting computer stickers. My laptop and my water bottle has basically become a archive of places, projects, clubs, and random things I liked enough to stick on something.",
      "I’m also a Conference Director for Cornell SWE and Publicity Chair for the Cornell ORIE Club, which means a decent amount of my time goes toward planning events, making things look good, and convincing engineers to show up to things.",
    ],
  },
  {
    key: "map",
    icon: "map",
    name: "Map",
    type: "Travel & places",
    title: "Spawn points",
    body: [
      "Fencing has taken me all over North America. Here's every place I've logged so far. Hover a marker or pick a city from the list.",
    ],
    extra: "map",
  },
]

/** Stories that get a tab in Singleplayer. */
export const STORIES: Story[] = ALL_STORIES.filter((s) => !s.hidden)

/* ---------- Mini-Games ---------- */
export const ARCADE: { id: string; icon: IconName; name: string; blurb: string; status: "soon" | "locked" | "ready" }[] = [
  { id: "fishing", icon: "puffer", name: "Gone Fishing", blurb: `Cast, wait for the splash, reel it in. ${CATCHES.length} catches to collect, including one legendary.`, status: "ready" },
  { id: "fencing", icon: "epee", name: "Fencing Duel", blurb: "Read the attack, parry, riposte. First to 3 touches. Climb from the pool to the final.", status: "ready" },
  { id: "fortune", icon: "cookie", name: "Fortune Cookie Wheel", blurb: "Spin the wheel, crack a cookie, read your fortune. Fill your jar and hunt for the golden cookie.", status: "ready" },
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
export const MENU: { label: string; screen: ScreenId }[] = [
  { label: "About Me", screen: "about" },
  { label: "Projects & Experience", screen: "inventory" },
  { label: "Connect", screen: "multiplayer" },
  { label: "Mini-Games", screen: "arcade" },
]

export const HOTBAR: { label: string; icon: IconName; href?: string; action?: "achievements" }[] = [
  { label: "Résumé", icon: "paper", href: RESUME_URL },
  { label: "GitHub", icon: "git", href: GITHUB_URL },
  { label: "LinkedIn", icon: "sign", href: LINKEDIN_URL },
  { label: "Email", icon: "mail", href: `mailto:${EMAIL}` },
]

export const SCREEN_TITLES: Record<Exclude<ScreenId, "home">, string> = {
  about: "About Me",
  inventory: "Projects & Experience",
  arcade: "Mini-Games",
  fortune: "Fortune Cookie Wheel",
  fishing: "Gone Fishing",
  fencing: "Fencing Duel",
  multiplayer: "Connect",
  quick: "Plain View",
}

export const SPLASHES = [
  "Now open to 2027 summer roles",
  "En garde!",
  "Currently side questing...",
  "Touché!",
  "Spawned in Toronto!",
  "Powered by matcha!",
  "Don't stop believin'!",
  "Say my name!",
  "Shin ramen enjoyer!",
  "Now in 4 languages!",
  "Works on my machine!",
  "Gone fishing!",
  "One more commit!",
  "Open sourcerer ✨",
  "Eh?",
  "Two twos my word",
  "Task failed successfully",
  "Hello World!",
  "All in!!!",
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
  { id: "about", title: "Getting to Know Elaine", how: "Open About Me", icon: "epee" },
  { id: "inventory", title: "The Builder", how: "Open Projects & Experience", icon: "laptop" },
  { id: "arcade", title: "Insert Coin", how: "Open Mini-Games", icon: "disc" },
  { id: "multiplayer", title: "Party Up", how: "Open Connect", icon: "sign" },
  { id: "quick", title: "Recruiter Mode", how: "Open Plain View", icon: "paper" },
  { id: "stories", title: "Story Time", how: "Read every About Me tab", icon: "book" },
  { id: "projects", title: "Window Shopping", how: "Open every project", icon: "redstone" },
  { id: "egg", title: "Easter Egg Hunter", how: "Click the title", icon: "medal" },
  { id: "weather", title: "Weather Watcher", how: "Turn on the weather", icon: "map" },
  { id: "seasons", title: "Four Seasons", how: "Try all four seasons", icon: "map" },
  { id: "firstcookie", title: "Fortune Teller", how: "Crack your first fortune cookie", icon: "cookie" },
  { id: "enchantedcookie", title: "Enchanted", how: "Land on an enchanted cookie", icon: "cookie" },
  { id: "goldencookie", title: "Golden Cookie", how: "Land on the golden cookie", icon: "cookie" },
  { id: "fortunejar", title: "Full Jar", how: "Collect every fortune", icon: "cookie" },
  { id: "firstcatch", title: "Gone Fishing", how: "Reel in your first catch", icon: "puffer" },
  { id: "goldcatch", title: "Gold Medal Catch", how: "Catch the legendary Golden Épée", icon: "goldepee" },
  { id: "fullbox", title: "Full Tackle Box", how: `Catch all ${CATCHES.length} items`, icon: "compass" },
  { id: "engarde", title: "En Garde!", how: "Win a fencing bout", icon: "epee" },
  { id: "hotstreak", title: "Hot Streak", how: "Win 3 bouts in a row", icon: "medal" },
  { id: "champion", title: "Olympic Champion", how: "Win the Final in Fencing Duel", icon: "goldepee" },
]

export const ACHIEVEMENT_BY_ID: Record<string, Achievement> = Object.fromEntries(ACHIEVEMENTS.map((a) => [a.id, a]))
