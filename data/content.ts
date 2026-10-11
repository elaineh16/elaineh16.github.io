// All site content lives here. Edit this file to add projects, stories, or links.
// Anything still marked [TODO] renders in a muted colour so it is easy to spot.

import type { IconName } from "@/lib/pixel-art"

export type ScreenId =
  | "home"
  | "about"
  | "inventory"
  | "advancements"
  | "realms"
  | "multiplayer"
  | "options"
  | "quick"

export type Category = "swe" | "ai" | "research" | "quant" | "hack"

export interface Project {
  id: string
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
    ["Spawn", "Toronto / Shanghai"],
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
    stack: "[TODO: add stack]",
    result: "10,000+ positions evaluated",
  },
  {
    id: "rag",
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
    icon: "redstone",
    name: "AI Asset Generation Platform",
    type: "Full-stack build",
    period: "[TODO: date]",
    cats: ["swe", "ai"],
    desc: "A full-stack Stable Diffusion platform that automates art-production workflows with task batching, caching, and asynchronous request handling.",
    bullets: [],
    stack: "Python · Next.js · Stable Diffusion · REST APIs",
    result: "40% higher throughput",
  },
  {
    id: "bear",
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
    icon: "chart",
    name: "Trading Backtester",
    type: "Side project",
    period: "[TODO: date]",
    cats: ["quant"],
    desc: "[TODO: one-line description from the trading_backtester README]",
    bullets: [],
    stack: "[TODO: add stack]",
    link: "https://github.com/elaineh16/trading_backtester",
  },
]

export const EXPERIENCE_ORDER = ["finmd", "rag", "chess"]

export const FEATURED = [
  ["FinMD", "−60% p50 latency"],
  ["LLM Chess", "10,000+ positions"],
  ["Bear Escape", "Hackathon win"],
]

export const QUICK_PROJECTS = [
  ["AI Asset Generation Platform", "full-stack Stable Diffusion platform with task batching, caching, and async request handling (40% higher throughput)."],
  ["Bear Escape", "BigRed//Hacks winner. AI-powered multiplayer rhythm game with Gemini-generated beatmaps and OpenCV motion controls."],
]

export const CATEGORIES: [Category | "all", string][] = [
  ["all", "All"],
  ["swe", "Software Eng"],
  ["ai", "AI / ML"],
  ["research", "Research"],
  ["quant", "Quant"],
  ["hack", "Hackathons"],
]

export type HomeAction = "project" | "epee" | "coffee" | "passport"

export interface HomeItem {
  key: string
  icon: IconName
  name: string
  type: string
  line: string
  action: HomeAction
}

export const HOME_ITEMS: HomeItem[] = [
  { key: "finmd", icon: "laptop", name: "FinMD Dashboard", type: "Production build", line: "PostgreSQL · Row-level security", action: "project" },
  { key: "chess", icon: "knight", name: "LLM Chess Reasoning", type: "Research", line: "10,000+ positions evaluated", action: "project" },
  { key: "rag", icon: "book", name: "Financial RAG Eval", type: "ML internship", line: "34.8% numerical Exact Match", action: "project" },
  { key: "asset", icon: "redstone", name: "AI Asset Generation", type: "Full-stack build", line: "Stable Diffusion · Next.js", action: "project" },
  { key: "bear", icon: "disc", name: "Bear Escape", type: "Hackathon winner", line: "Gemini · OpenCV · SpaceTimeDB", action: "project" },
  { key: "trade", icon: "chart", name: "Trading Backtester", type: "Quant side project", line: "Details coming soon", action: "project" },
  { key: "epee", icon: "epee", name: "Competitive Épée", type: "Main questline", line: "Cornell NCAA Division I", action: "epee" },
  { key: "coffee", icon: "coffee", name: "Mystery Coffee", type: "Hidden item", line: "Click to drink…", action: "coffee" },
  { key: "pass", icon: "passport", name: "Passport", type: "Spawn: Toronto / Shanghai", line: "Base: Cornell University", action: "passport" },
]

export interface PersonalItem {
  key: string
  icon: IconName
  name: string
  type: string
  line: string
}

export const PERSONAL_ITEMS: PersonalItem[] = [
  { key: "epee", icon: "epee", name: "Épée", type: "Fencing story", line: "Varsity fencer on Cornell's NCAA Division I team. [TODO: your fencing story]" },
  { key: "knight", icon: "knight", name: "Chess Knight", type: "AI + chess research", line: "Researching how frontier language models reason about chess against Stockfish." },
  { key: "laptop", icon: "laptop", name: "Laptop", type: "Programming journey", line: "[TODO: how you got into programming]" },
  { key: "camera", icon: "camera", name: "Camera", type: "Photo gallery", line: "[TODO: add photos]" },
  { key: "disc", icon: "disc", name: "Music Disc", type: "Favourite music", line: "[TODO: what you listen to]" },
  { key: "map", icon: "map", name: "Map", type: "Travel & places", line: "Spawned in Toronto / Shanghai. Base camp: Ithaca. [TODO: favourite places]" },
  { key: "coffee", icon: "coffee", name: "Coffee", type: "Fun facts", line: "[TODO: a few fun facts]" },
  { key: "cards", icon: "cards", name: "Playing Cards", type: "Poker & strategy", line: "[TODO: poker and strategy games]" },
  { key: "book", icon: "book", name: "Journal", type: "Personal thoughts", line: "[TODO: notes and reflections]" },
]

export interface AdvNode {
  id: string
  icon: IconName
  title: string
  date: string
  desc: string
  learned?: string
  rel?: string
}

export interface AdvPath {
  label: string
  color: string
  blurb: string
  nodes: AdvNode[]
}

export const PATHS: AdvPath[] = [
  {
    label: "Builder",
    color: "#E6A4B4",
    blurb: "Code → production",
    nodes: [
      { id: "b1", icon: "laptop", title: "Hello, World", date: "[TODO: year]", desc: "[TODO: how you started coding]" },
      { id: "b2", icon: "disc", title: "Hackathon Champion", date: "BigRed//Hacks", desc: "2× BigRed//Hacks winner, including Bear Escape: an AI-powered multiplayer rhythm game with Gemini-generated beatmaps and OpenCV motion controls.", rel: "bear" },
      { id: "b3", icon: "book", title: "ML in the Wild", date: "Jun – Aug 2025", desc: "Machine Learning Engineer Intern at Anote AI. Evaluated RAG systems for financial question answering.", rel: "rag" },
      { id: "b4", icon: "redstone", title: "Shipped to Production", date: "Jun – Aug 2026", desc: "Software Engineer Intern at FinMD. Architected production analytics and identity infrastructure across SCOPE, PRISM, and RADAR.", rel: "finmd" },
    ],
  },
  {
    label: "Scholar",
    color: "#ffff55",
    blurb: "Cornell & research",
    nodes: [
      { id: "s1", icon: "book", title: "Big Red", date: "Class of '28", desc: "Cornell Engineering, dual B.S. in Computer Science and Operations Research." },
      { id: "s2", icon: "knight", title: "Research Rabbit Hole", date: "Aug 2025 – Jun 2026", desc: "Built infrastructure to evaluate how frontier language models reason about chess against Stockfish: 5+ models, 10,000+ positions.", rel: "chess" },
      { id: "s3", icon: "coffee", title: "Community Builder", date: "[TODO: dates]", desc: "Conference Director for the Society of Women Engineers at Cornell, and Publicity Chair for the Cornell ORIE Club." },
    ],
  },
  {
    label: "Athlete",
    color: "#9cc27f",
    blurb: "Épée",
    nodes: [
      { id: "a1", icon: "epee", title: "En Garde", date: "[TODO: year]", desc: "[TODO: when and where you started fencing]" },
      { id: "a2", icon: "medal", title: "Team Canada", date: "[TODO: years]", desc: "Canadian National Team. [TODO: events and results]" },
      { id: "a3", icon: "medal", title: "Division I", date: "Cornell", desc: "Varsity fencer on Cornell's NCAA Division I team." },
    ],
  },
]

export const SKILLS: { label: string; items: string[] }[] = [
  { label: "Languages", items: ["Python", "C++", "TypeScript", "JavaScript", "Java", "SQL", "C"] },
  { label: "Frameworks & AI", items: ["React", "Next.js", "FastAPI", "LangChain", "RAG pipelines", "LLM evaluation", "Pandas", "NumPy", "OpenCV"] },
  { label: "Data & infrastructure", items: ["PostgreSQL", "MySQL", "Supabase", "Docker", "AWS EC2", "REST APIs", "WebSockets", "OAuth", "Linux"] },
]

export interface Server {
  name: string
  desc: string
  icon: IconName
  href?: string
  copy?: boolean
  offline?: boolean
}

export const SERVERS: Server[] = [
  { name: "LinkedIn", desc: "elaine-hong-cornell · professional updates", icon: "sign", href: LINKEDIN_URL },
  { name: "GitHub", desc: "elaineh16 · code, hackathons, side projects", icon: "stone", href: GITHUB_URL },
  { name: "Email", desc: `${EMAIL} · fastest way to reach me`, icon: "mail", href: `mailto:${EMAIL}`, copy: true },
  { name: "Résumé", desc: "One-page PDF", icon: "paper", href: RESUME_URL },
  { name: "Guestbook", desc: "Leave a message in chat", icon: "book", offline: true },
]

export const HOTBAR: { label: string; icon: IconName; href?: string; screen?: ScreenId }[] = [
  { label: "Résumé", icon: "paper", href: RESUME_URL },
  { label: "GitHub", icon: "stone", href: GITHUB_URL },
  { label: "LinkedIn", icon: "sign", href: LINKEDIN_URL },
  { label: "Email", icon: "mail", screen: "multiplayer" },
  { label: "Quick View", icon: "map", screen: "quick" },
]

export const SCRAPBOOK = ["Fencing memories", "Travel", "Cornell", "Hackathons", "Music", "Books"]

export const CURRENTLY: [string, string][] = [
  ["Building", "[TODO]"],
  ["Learning", "[TODO]"],
  ["Reading", "[TODO]"],
  ["On repeat", "[TODO]"],
]

export const SPLASHES = [
  "100% chance of side quests!",
  "Powered by coffee and curiosity!",
  "Professional side quest collector!",
  "Currently debugging life!",
  "Good ideas spawn here!",
  "One more project before bed!",
  "Now with épée!",
]

export const SCREEN_TITLES: Record<Exclude<ScreenId, "home">, string> = {
  about: "Singleplayer · About Me",
  inventory: "Inventory · Projects & Skills",
  advancements: "Advancements · My Journey",
  realms: "Realms · Adventure Log",
  multiplayer: "Multiplayer · Connect",
  options: "Options",
  quick: "Quick View",
}

export const MENU: { label: string; sub: string; screen: ScreenId }[] = [
  { label: "Singleplayer", sub: "About Me", screen: "about" },
  { label: "Inventory", sub: "Projects & Skills", screen: "inventory" },
  { label: "Advancements", sub: "My Journey", screen: "advancements" },
  { label: "Realms", sub: "Adventure Log", screen: "realms" },
  { label: "Multiplayer", sub: "Connect", screen: "multiplayer" },
]

export const ACHIEVEMENTS: Record<string, [string, IconName]> = {
  about: ["Getting to Know Elaine", "epee"],
  inventory: ["The Builder", "laptop"],
  advancements: ["The Long Road", "medal"],
  multiplayer: ["Party Up", "sign"],
  realms: ["Side Quest Discovered", "map"],
  coffee: ["Powered by Coffee", "coffee"],
  egg: ["Easter Egg Hunter", "medal"],
  weather: ["Weather Watcher", "map"],
}
