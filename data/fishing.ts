// Gone Fishing: everything a visitor can reel in, each with a fun fact.
// Rarity sets the odds: common ~75% of casts, rare ~20%, legendary ~5%, tilted toward items not caught yet.

import type { IconName } from "@/lib/pixel-art"

export type Rarity = "common" | "rare" | "legendary"

export interface Catch {
  id: string
  icon: IconName
  name: string
  rarity: Rarity
  fact: string
}

export const CATCHES: Catch[] = [
  { id: "code", icon: "cod", name: "Raw Code", rarity: "common", fact: "My first programming language was Python." },
  { id: "matcha", icon: "matcha", name: "Matcha Latte", rarity: "common", fact: "My go-to order: matcha with oat milk." },
  { id: "banana", icon: "banana", name: "Banana", rarity: "common", fact: "In Bloons TD 6, I run a Druid farm." },
  { id: "nametag", icon: "nametag", name: "Name Tag", rarity: "common", fact: "I speak English, Mandarin, French and Shanghainese, and I'm learning Russian on Duolingo." },
  { id: "lounge", icon: "banner", name: "Study Lounge Banner", rarity: "common", fact: "My favourite spot at Cornell is the Cocktail Lounge in Uris Library. It's a study space, I promise!" },
  { id: "chip", icon: "chip", name: "Poker Chip", rarity: "common", fact: "I play poker for fun." },
  { id: "compass", icon: "compass", name: "Compass", rarity: "common", fact: "I've logged 34 places across North America. Check the Map tab in Singleplayer." },
  { id: "soup", icon: "stew", name: "Bowl of Soup", rarity: "common", fact: "Soup is my comfort food. Any kind." },
  { id: "violin", icon: "violin", name: "Violin", rarity: "common", fact: "I played violin for 10 years." },
  { id: "salmon", icon: "salmon", name: "Raw Salmon", rarity: "common", fact: "Cats love these. I can't pick between cats and dogs, so I love both." },
  { id: "boot", icon: "boot", name: "Old Boot", rarity: "common", fact: "Just an old boot. Even the best anglers catch these." },
  { id: "believin", icon: "disc2", name: "Music Disc: Don't Stop Believin'", rarity: "rare", fact: "I listened to \"Don't Stop Believin'\" before my most important tournament, and I won." },
  { id: "maple", icon: "maple", name: "Maple Leaf", rarity: "rare", fact: "I've fenced for the Canadian National Team." },
  { id: "goldepee", icon: "goldepee", name: "Golden Épée", rarity: "legendary", fact: "LEGENDARY CATCH! Only 1 in 20 casts. En garde, champion." },
]

const TIER_ODDS: Record<Rarity, number> = { common: 0.75, rare: 0.2, legendary: 0.05 }

/** How often a cast lands on something you haven't caught yet, when the tier still has one. */
const NEW_CHANCE = 0.75

/**
 * Pick a catch. Tiers keep their odds, but a tier you've finished is skipped in favour of
 * tiers that still have new items, and within a tier new items come up 75% of the time.
 */
export function rollCatch(caught: string[], rand = Math.random): Catch {
  const tiers: Rarity[] = ["legendary", "rare", "common"]
  const open = tiers.filter((t) => CATCHES.some((c) => c.rarity === t && !caught.includes(c.id)))
  const pickFrom = open.length ? open : tiers
  const total = pickFrom.reduce((a, t) => a + TIER_ODDS[t], 0)
  let r = rand() * total
  let tier = pickFrom[pickFrom.length - 1]
  for (const t of pickFrom) {
    r -= TIER_ODDS[t]
    if (r < 0) {
      tier = t
      break
    }
  }
  const pool = CATCHES.filter((c) => c.rarity === tier)
  const fresh = pool.filter((c) => !caught.includes(c.id))
  const from = fresh.length && rand() < NEW_CHANCE ? fresh : pool
  return from[Math.floor(rand() * from.length)]
}
