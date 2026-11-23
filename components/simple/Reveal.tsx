"use client"
// Fades sections in as they scroll into view, and turns on smooth scrolling for the page's anchor links.
// Without JavaScript (or with reduced motion) everything is simply shown.
import { useEffect } from "react"

export function Reveal() {
  useEffect(() => {
    const root = document.documentElement
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!still) root.style.scrollBehavior = "smooth"
    const items = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"))
    if (still || !("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-in"))
      return () => {
        root.style.scrollBehavior = ""
      }
    }
    root.classList.add("reveal-armed")
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue
          e.target.classList.add("is-in")
          io.unobserve(e.target)
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    )
    items.forEach((el) => io.observe(el))
    return () => {
      io.disconnect()
      root.classList.remove("reveal-armed")
      root.style.scrollBehavior = ""
    }
  }, [])
  return null
}
