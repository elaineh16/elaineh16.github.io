// Fortune Cookie Wheel: everything a cookie can say. Written by Elaine.
// tier: regular slices, rare "enchanted" (purple) slices, and the legendary golden slice.

export type Tier = "regular" | "enchanted" | "golden"

export interface Fortune {
  id: string
  text: string
  tier: Tier
}

export const FORTUNES: Fortune[] = [
  { id: "seek", text: "What you seek is also seeking you.", tier: "regular" },
  { id: "path", text: "An unexpected opportunity will change your path.", tier: "regular" },
  { id: "payoff", text: "Your hard work will soon pay off.", tier: "regular" },
  { id: "newopp", text: "A new opportunity is coming your way.", tier: "regular" },
  { id: "stars", text: "The stars favor those who create their own destiny.", tier: "regular" },
  { id: "loading", text: "You’re not behind. You’re loading.", tier: "regular" },
  { id: "aura", text: "+100000 Aura", tier: "enchanted" },
  { id: "grass", text: "Touch grass, then touch success.", tier: "regular" },
  { id: "engarde", text: "En garde. Life is about to lunge in your favour.", tier: "regular" },
  { id: "surprise", text: "A pleasant surprise is waiting for you", tier: "regular" },
  { id: "diamonds", text: "Diamonds are found under pressure. So are you.", tier: "regular" },
  { id: "crumbs", text: "Ate and left no crumbs", tier: "regular" },
  { id: "thinking", text: "Someone is thinking of you right now. (It’s me, the cookie.)", tier: "regular" },
  { id: "mouse", text: "The early bird gets the worm, but the second mouse gets the cheese.", tier: "regular" },
  { id: "plot", text: "Plot twist: it all works out.", tier: "regular" },
  { id: "built", text: "Respectfully, you’re built different.", tier: "regular" },
  { id: "deserve", text: "Good things are coming, and you deserve every one.", tier: "regular" },
  { id: "shark", text: "Ur a shark", tier: "enchanted" },
  { id: "thrill", text: "A thrilling time is in your immediate future.", tier: "regular" },
  { id: "gmi", text: "Ur gmi!", tier: "enchanted" },
  { id: "believin", text: "Don't stop believin", tier: "enchanted" },
  { id: "golden", text: "This is your golden cookie. Everything you’re chasing is chasing you back. ✨", tier: "golden" },
]

export const REGULAR = FORTUNES.filter((f) => f.tier === "regular")
export const ENCHANTED = FORTUNES.filter((f) => f.tier === "enchanted")
export const GOLDEN = FORTUNES.filter((f) => f.tier === "golden")

/** Chance a spin lands on the golden slice, and on one of the enchanted slices. */
export const GOLDEN_CHANCE = 0.05
export const ENCHANTED_CHANCE = 0.12

export interface Word {
  zh: string
  pinyin: string
  en: string
}

/** "Learn Chinese" words printed on the back of each slip. */
export const WORDS: Word[] = [
  { zh: "加油", pinyin: "jiāyóu", en: "you can do it!" },
  { zh: "好运", pinyin: "hǎoyùn", en: "good luck" },
  { zh: "开心", pinyin: "kāixīn", en: "happy" },
  { zh: "厉害", pinyin: "lìhai", en: "awesome, impressive" },
  { zh: "慢慢来", pinyin: "mànmàn lái", en: "take your time" },
  { zh: "没问题", pinyin: "méi wèntí", en: "no problem" },
  { zh: "冲", pinyin: "chōng", en: "go for it!" },
  { zh: "幸运", pinyin: "xìngyùn", en: "lucky" },
]

/** Six lucky numbers from 1–49, sorted, like the back of a real slip. */
export function luckyNumbers(rand = Math.random): number[] {
  const set = new Set<number>()
  while (set.size < 6) set.add(1 + Math.floor(rand() * 49))
  return [...set].sort((a, b) => a - b)
}

/** Pick a fortune from a tier, favouring ones not found yet (like Gone Fishing). */
export function pickFortune(found: string[], tier: Tier = "regular", rand = Math.random): Fortune {
  const all = FORTUNES.filter((f) => f.tier === tier)
  const fresh = all.filter((f) => !found.includes(f.id))
  const pool = fresh.length && rand() < 0.75 ? fresh : all
  return pool[Math.floor(rand() * pool.length)]
}
