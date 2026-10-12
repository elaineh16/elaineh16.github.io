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
  { id: "redstone", name: "Redstone" },
  { id: "knight", name: "Chess Knight" },
  { id: "book", name: "Book" },
  { id: "epee", name: "Épée" },
  { id: "medal", name: "Medal" },
  { id: "passport", name: "Passport" },
  { id: "map", name: "Map" },
  { id: "camera", name: "Camera" },
  { id: "disc", name: "Music Disc" },
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
    id: "production",
    inputs: ["laptop", "redstone"],
    result: "Shipped to Production",
    icon: "laptop",
    fact: "At FinMD I built identity and analytics infrastructure that cut p50 page-load latency by 60%.",
  },
  {
    id: "chess",
    inputs: ["knight", "laptop"],
    result: "Research Rabbit Hole",
    icon: "knight",
    fact: "I benchmarked 5+ frontier LLMs across 10,000+ chess positions against Stockfish to see how they really reason.",
  },
  {
    id: "rag",
    inputs: ["book", "redstone"],
    result: "RAG Detective",
    icon: "book",
    fact: "At Anote AI I showed that ROUGE-L underestimated numeric accuracy by 10–16x, and kept weak pipelines out of production.",
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
    id: "travel",
    inputs: ["camera", "map"],
    result: "Travel Memories",
    icon: "camera",
    fact: "My favourite trips have been fencing trips. One of them is in the photo gallery in Singleplayer.",
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
