// All site content lives here. Edit this file to add projects, stories, or links.
// Anything still marked [TODO] renders in a muted colour so it is easy to spot.

import type { IconName } from "@/lib/pixel-art"
import { CATCHES } from "@/data/fishing"

export type ScreenId = "home" | "about" | "inventory" | "arcade" | "fortune" | "fishing" | "fencing" | "multiplayer" | "quick" | "blog"

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
      "A Gemini pipeline sequences venues into timed itineraries and retries with validation feedback; Google Places and Routes supply venues and walking times.",
    ],
    stack: "Gemini API · Grok Voice API · Google Maps & Places · iMessage agent · Vercel",
    result: "One planner behind web, voice and iMessage",
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
    role: "Software Engineer Intern (remote)",
    org: "FinMD",
    desc: "Shipped production underwriting, portfolio-management and analytics features across FinMD's SCOPE, PRISM, and RADAR products, using Next.js, Supabase, and PostgreSQL.",
    bullets: [
      "Built a live metrics dashboard for 3 products, replacing mock data with tenant-scoped, server-side SQL aggregation.",
      "Modeled physician identity resolution, stage derivation, and status history as PostgreSQL functions on 4 surfaces.",
      "Wrote tenant-authenticated PostgreSQL RPCs that prefilled 10+ fields, speeding form completion by 40%.",
      "Cut p50 latency by 60% on 1,000+ records by moving filtering server-side and enforcing row-level data security.",
    ],
    stack: "Next.js · Supabase · PostgreSQL · Row-level security",
    result: "60% lower p50 page-load latency",
  },
  {
    id: "rag",
    kind: "experience",
    badge: "Kept weak pipelines out of production",
    icon: "book",
    name: "Financial RAG Evaluation",
    type: "Internship · ML",
    period: "Jun – Aug 2026",
    cats: ["ai", "research"],
    role: "Machine Learning Engineer Intern",
    org: "Anote AI",
    desc: "Evaluated retrieval-augmented generation pipelines for financial question answering, and built OAuth integrations for AI outreach campaigns.",
    bullets: [
      "Built Python and LangChain evaluation pipelines comparing 7 RAG setups on 133 FinanceBench questions.",
      "Tracked answer quality, numeric accuracy, latency, and cost per setup to keep weak pipelines out of production.",
      "Found ROUGE-L understated numeric accuracy 10–16×, and that no standard retrieval strategy beat the baseline; semantic chunking reached 34.8% numeric Exact Match.",
      "Built React and Redux outreach workflows with email and Slack OAuth, token-lifecycle and rate-limit handling.",
    ],
    stack: "Python · LangChain · RAG evaluation · React · Redux · OAuth",
    result: "ROUGE-L understated numeric accuracy 10–16×",
    github: "https://github.com/elaineh16/Research-FinancialDocumentRetrieval",
  },
  {
    id: "makeaplay",
    kind: "experience",
    icon: "banner",
    name: "Winter Investments Fellowship",
    type: "Fellowship · Finance",
    period: "Nov 2025 – Feb 2026",
    cats: ["research"],
    role: "Winter Investments Fellow",
    org: "Make A Play Foundation",
    desc: "A 10-week investment-banking fellowship for NCAA athletes, sponsored by Bank of America.",
    bullets: [
      "Selected as 1 of 20 NCAA athletes from 200+ applicants.",
      "Completed training in accounting, DCF valuation, and M&A analysis, and ranked in the top 10% of the cohort.",
    ],
    stack: "Accounting · DCF valuation · M&A analysis",
    result: "1 of 20 picked from 200+",
  },
  {
    id: "combopt",
    kind: "experience",
    icon: "compass",
    name: "AI for Combinatorial Optimization",
    type: "Research · In progress",
    period: "Aug 2026 – Present",
    cats: ["ai", "research"],
    role: "Undergraduate Researcher",
    org: "Cornell Engineering Undergraduate Research",
    desc: "Research at the meeting point of large language models and combinatorial optimization.",
    bullets: [
      "Applying LLM reasoning to open problems in antimatroid convexity and exploring structural conjectures.",
      "Analyzing large-scale mixed-integer programming datasets to identify drivers of solver runtime variability.",
    ],
    stack: "LLMs · Mixed-integer programming · Data analysis",
    result: "What drives MIP solver runtime variability?",
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
    badge: "Best Use of Gemini + Best UI",
    icon: "disc",
    name: "Bear Escape",
    type: "Hackathon · Winner",
    period: "BigRed//Hacks 2025",
    cats: ["hack"],
    desc: "An AI-powered multiplayer rhythm game, built in 36 hours: Gemini turns a song into a beatmap, and you play it with your body.",
    bullets: [
      "Won Best Use of Gemini and Best UI among 200+ participants.",
      "Built synchronized multiplayer on SpaceTimeDB with Gemini-generated beatmaps and OpenCV motion controls.",
    ],
    stack: "React · TypeScript · Python · Gemini API · OpenCV · SpaceTimeDB",
    result: "Best Use of Gemini + Best UI, out of 200+ participants",
    link: "https://bearly-running.vercel.app",
    github: "https://github.com/elaineh16/BigRedHack25",
  },
  {
    id: "prosperity",
    kind: "project",
    badge: "Top 1% of 18,803 teams",
    icon: "chip",
    name: "IMC Prosperity 4",
    type: "Trading competition",
    period: "",
    cats: ["research"],
    desc: "IMC's global algorithmic trading competition, played on simulated order books across several products.",
    bullets: [
      "Analyzed simulated order-book data in Pandas to build and backtest market-making, statistical-arbitrage, and pairs-trading strategies.",
      "Priced options on simulated underlyings and traded deviations between market prices and estimated fair value.",
    ],
    stack: "Python · Pandas · NumPy",
    result: "Top 1% of 18,803 teams worldwide",
  },
  {
    id: "trading",
    kind: "project",
    icon: "chart",
    name: "Algorithmic Trading System",
    type: "Side project · Quant",
    period: "",
    cats: ["swe"],
    desc: "A trading system that backtests strategies and streams live strategy signals and portfolio updates.",
    bullets: [
      "Cached portfolio state in Redis and streamed strategy signals and portfolio updates over WebSockets.",
      "Backtested market-making and momentum strategies to compare their performance.",
    ],
    stack: "Python · Redis · WebSockets",
    result: "Live signals over WebSockets",
  },
  {
    id: "wardrobe",
    kind: "project",
    icon: "hat",
    name: "TheWardrobeDB",
    type: "Full-stack build · Club tool",
    period: "",
    cats: ["swe"],
    desc: "A rental system for Cornell's Wardrobe club that replaced several manual Google Sheets with one live platform.",
    bullets: [
      "Students browse the catalog by category, size, color and brand, and request rentals for specific dates.",
      "Staff approve requests, log returns and manage inventory from a dashboard; availability updates as items go out and come back.",
    ],
    stack: "FastAPI · SQLAlchemy · Next.js · TypeScript · Tailwind",
    result: "Replaced the club's manual spreadsheets",
    github: "https://github.com/elaineh16/TheWardrobeDB",
  },
  {
    id: "site",
    kind: "project",
    icon: "stone",
    name: "ELAINECRAFT (this website)",
    type: "Side project · Ongoing",
    period: "",
    cats: ["swe"],
    desc: "This portfolio, built as a Minecraft-style game with no game engine.",
    bullets: [
      "Every sprite and icon is drawn to a canvas from code, and every sound is synthesized with the Web Audio API.",
      "Three mini-games (Gone Fishing, Fencing Duel, Fortune Cookie Wheel) with weighted odds, collections and achievements.",
    ],
    stack: "Next.js · TypeScript · Canvas · Web Audio · GitHub Pages",
    result: "3 games, every sprite drawn from code",
    github: "https://github.com/elaineh16/elaineh16.github.io",
  },
  {
    id: "asset",
    kind: "project",
    icon: "redstone",
    name: "AI Asset Generation Platform",
    type: "Full-stack build",
    period: "",
    cats: ["swe", "ai"],
    desc: "A full-stack Stable Diffusion platform that automates art-production workflows.",
    bullets: [
      "Built the platform in Python and Next.js, raising art-production throughput by 40%.",
      "Added task batching, caching, and asynchronous request handling to the generation pipelines, cutting render time by 30%.",
    ],
    stack: "Python · Next.js · Stable Diffusion · REST APIs",
    result: "40% higher throughput",
  },
]

export const EXPERIENCE_ORDER = ["finmd", "rag", "makeaplay", "combopt", "chess"]

/** How the Projects & Experience page groups its cards, newest first within each group. */
export const PROJECT_GROUPS: { label: string; ids: string[] }[] = [
  { label: "Experience", ids: ["finmd", "rag", "makeaplay"] },
  { label: "Research", ids: ["combopt", "chess"] },
  { label: "Projects", ids: ["prosperity", "trading", "navidate", "bear", "asset", "wardrobe", "site"] },
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
export const MENU: { label: string; screen: ScreenId; icon?: IconName }[] = [
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
  blog: "Blog",
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
  { id: "blog", title: "Bookworm", how: "Open the Blog", icon: "openbook" },
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
