import Game from "@/components/Game"
import { loadPosts } from "@/lib/blog"

export default function Page() {
  // Blog posts are read from content/blog/*.md when the site is built.
  return <Game posts={loadPosts()} />
}
