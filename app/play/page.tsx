import type { Metadata } from "next"
import Game from "@/components/Game"
import { loadPosts } from "@/lib/blog"

export const metadata: Metadata = { title: "Elaine Hong · Minecraft edition" }

export default function Play() {
  // The Minecraft-inspired version of the site. Blog posts are read from content/blog/*.md at build time.
  return <Game posts={loadPosts()} />
}
