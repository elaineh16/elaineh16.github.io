// Crafting Elaine: combine two items to unlock a fact or story.
// Ingredient order doesn't matter. Edit freely: add, remove or reword recipes.

import type { IconName } from "@/lib/pixel-art"

export interface Ingredient {
  id: IconName
  name: string
}

export const INGREDIENTS: Ingredient[] = [
  { id: "coffee", name: "Coffee" },
  { id: "laptop", name: "Laptop" },
  { id: "epee", name: "Épée" },
  { id: "medal", name: "Medal" },
  { id: "book", name: "Book" },
  { id: "passport", name: "Passport" },
  { id: "map", name: "Map" },
  { id: "disc", name: "Music Disc" },
  { id: "knight", name: "Chess Knight" },
  { id: "cards", name: "Playing Cards" },
]

export interface Recipe {
  id: string
  inputs: [IconName, IconName]
  result: string
  icon: IconName
  fact: string
}

export const RECIPES: Recipe[] = [
  {
    id: "hackathon",
    inputs: ["coffee", "laptop"],
    result: "Hackathon Project",
    icon: "disc",
    fact: "Bear Escape won BigRed//Hacks: an AI-powered multiplayer rhythm game with Gemini-generated beatmaps and OpenCV motion controls.",
  },
  {
    id: "canada",
    inputs: ["epee", "medal"],
    result: "Team Canada",
    icon: "medal",
    fact: "Making the Canadian National Team is still my proudest fencing moment.",
  },
  {
    id: "athlete",
    inputs: ["epee", "book"],
    result: "Student-Athlete",
    icon: "epee",
    fact: "I fence on Cornell's NCAA Division I team while doing a dual degree in Computer Science and Operations Research.",
  },
  {
    id: "spawn",
    inputs: ["passport", "map"],
    result: "Spawn Points",
    icon: "passport",
    fact: "Born in Toronto, raised in Shanghai, now based in Ithaca for Cornell.",
  },
  {
    id: "playlist",
    inputs: ["disc", "coffee"],
    result: "Study Playlist",
    icon: "disc",
    fact: "Indie, R&B and EDM are always on repeat. The Music Disc tab shows what I've played most this week.",
  },
  {
    id: "strategy",
    inputs: ["knight", "cards"],
    result: "Strategy Brain",
    icon: "cards",
    fact: "I play poker for fun and study how AI plays chess. Both reward thinking a few moves ahead.",
  },
]

/** Find the recipe made by exactly these items (order-insensitive). */
export function matchRecipe(items: (IconName | null)[]): Recipe | null {
  const used = items.filter((x): x is IconName => !!x).sort()
  if (used.length !== 2) return null
  return RECIPES.find((r) => [...r.inputs].sort().join("+") === used.join("+")) || null
}
