// Fortune Cookie Wheel: everything a cookie can say.
// PLACEHOLDERS: Elaine is writing the final list. Edit freely; ids just need to stay unique.

export interface Fortune {
  id: string
  text: string
  golden?: boolean
}

export const FORTUNES: Fortune[] = [
  { id: "surprise", text: "A pleasant surprise is waiting for you." },
  { id: "payoff", text: "Your hard work is about to pay off." },
  { id: "hungry", text: "You will be hungry again in one hour." },
  { id: "prisoner", text: "Help! I'm being held prisoner in a fortune cookie factory." },
  { id: "ignore", text: "Ignore previous cookie." },
  { id: "smile", text: "You will read this and smile." },
  { id: "loading", text: "You're not behind. You're loading." },
  { id: "era", text: "Your next era is your best era." },
  { id: "plot", text: "Plot twist: it all works out." },
  { id: "aura", text: "Your aura points just went up +1000." },
  { id: "mainquest", text: "Rest is not a side quest. It's the main quest." },
  { id: "manifest", text: "Manifesting: an offer letter, 8 hours of sleep, and a matcha." },
  { id: "sign", text: "This is your sign to text them back." },
  { id: "redirect", text: "Rejection is just redirection, bestie." },
  { id: "logoff", text: "It's okay to log off. The group chat will survive." },
  { id: "compile", text: "Your code will compile on the second try. The first one doesn't count." },
  { id: "snack", text: "Your bug will fix itself after a snack break." },
  { id: "gentle", text: "Be gentle with yourself. You're doing something hard." },
  { id: "proud", text: "The you from five years ago would be so proud." },
  { id: "home", text: "You make people feel at home without even trying." },
  { id: "parry", text: "Parry the bad days. Riposte with a good nap." },
  { id: "allin", text: "Fortune favours the all-in." },
  { id: "believin", text: "Don't stop believin'." },
  { id: "patient", text: "Like fishing: be patient, the good catch is coming." },
  { id: "golden", text: "This is your golden cookie. Everything you're chasing is chasing you back.", golden: true },
]

export const REGULAR = FORTUNES.filter((f) => !f.golden)
export const GOLDEN = FORTUNES.filter((f) => f.golden)

/** Chance a spin lands on the golden cookie slice. */
export const GOLDEN_CHANCE = 0.06

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

/** Pick a regular fortune, favouring ones not found yet (like Gone Fishing). */
export function pickFortune(found: string[], rand = Math.random): Fortune {
  const fresh = REGULAR.filter((f) => !found.includes(f.id))
  const pool = fresh.length && rand() < 0.75 ? fresh : REGULAR
  return pool[Math.floor(rand() * pool.length)]
}
