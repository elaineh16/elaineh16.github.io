"use client"
// The little Minecraft touches that need JavaScript: day/night and petal toggles (remembered per visitor),
// an XP bar that fills as you scroll, and a one-time "Advancement Made!" welcome toast.
import { useEffect, useState } from "react"
import { PixelIcon } from "@/components/game/primitives"
import s from "./simple.module.css"

type Theme = "light" | "dark"

const read = (k: string) => {
  try {
    return localStorage.getItem(k)
  } catch {
    return null
  }
}
const write = (k: string, v: string) => {
  try {
    localStorage.setItem(k, v)
  } catch {}
}

const page = () => document.querySelector<HTMLElement>("[data-simple-page]")

// Pixel sun and moon, drawn on a 9×9 grid so they match the pixel font.
const SUN = ["....#....", ".#.....#.", "...###...", "..#####..", "#.#####.#", "..#####..", "...###...", ".#.....#.", "....#...."]
const MOON = ["...####..", "..##.....", ".##......", ".##......", ".##......", ".##......", ".##......", "..##.....", "...####.."]
const PETAL = [".........", "...##....", "..####...", ".######..", ".#######.", "..######.", "...####..", ".....#...", "........."]

function Pix({ rows, color }: { rows: string[]; color: string }) {
  return (
    <svg viewBox="0 0 9 9" width="18" height="18" shapeRendering="crispEdges" aria-hidden="true">
      {rows.flatMap((r, y) => r.split("").map((c, x) => (c === "#" ? <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={color} /> : null)))}
    </svg>
  )
}

export function Controls() {
  const [theme, setTheme] = useState<Theme | null>(null)
  const [petals, setPetals] = useState(false)
  const [toast, setToast] = useState(false)
  const [xp, setXp] = useState(0)

  useEffect(() => {
    const saved = read("simple-theme") as Theme | null
    const system: Theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    setTheme(saved ?? system)
    setPetals(read("simple-petals") === "on")

    // Welcome toast, once per visit.
    let seen = false
    try {
      seen = sessionStorage.getItem("simple-welcomed") === "1"
      sessionStorage.setItem("simple-welcomed", "1")
    } catch {}
    const timers: ReturnType<typeof setTimeout>[] = []
    if (!seen) {
      timers.push(setTimeout(() => setToast(true), 1400))
      timers.push(setTimeout(() => setToast(false), 6900))
    }

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setXp(max > 0 ? Math.min(1, window.scrollY / max) : 0)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      timers.forEach(clearTimeout)
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  const flipTheme = () => {
    const next: Theme = theme === "dark" ? "light" : "dark"
    setTheme(next)
    write("simple-theme", next)
    page()?.setAttribute("data-theme", next)
  }
  const flipPetals = () => {
    setPetals((on) => {
      write("simple-petals", on ? "off" : "on")
      return !on
    })
  }

  return (
    <>
      <div className={s.xp} aria-hidden="true">
        <div className={s.xpFill} style={{ width: `${xp * 100}%` }} />
      </div>

      <div className={s.controls}>
        <button
          type="button"
          className={s.mcBtn}
          onClick={flipTheme}
          aria-label={theme === "dark" ? "Switch to day mode" : "Switch to night mode"}
          title={theme === "dark" ? "day mode" : "night mode"}
        >
          {theme === "dark" ? <Pix rows={SUN} color="#f4c542" /> : <Pix rows={MOON} color="#3b3f6b" />}
        </button>
        <button
          type="button"
          className={s.mcBtn}
          onClick={flipPetals}
          aria-pressed={petals}
          aria-label={petals ? "Turn petals off" : "Turn petals on"}
          title={petals ? "petals off" : "petals on"}
          data-on={petals ? "" : undefined}
        >
          <Pix rows={PETAL} color="#e6a4b4" />
        </button>
      </div>

      {petals ? (
        <div className={s.petals} aria-hidden="true">
          {Array.from({ length: 22 }, (_, i) => (
            <span
              key={i}
              style={{
                left: `${(i * 37 + 11) % 100}%`,
                animationDelay: `-${((i * 1.7) % 11).toFixed(1)}s`,
                animationDuration: `${(8 + (i % 5) * 1.8).toFixed(1)}s`,
              }}
            />
          ))}
        </div>
      ) : null}

      {toast ? (
        <div className={s.toast} role="status">
          <span className={s.slot}>
            <PixelIcon name="heart" size={28} />
          </span>
          <span>
            <span className={s.toastTop}>Advancement Made!</span>
            <span className={s.toastTitle}>Found Elaine&apos;s page</span>
          </span>
        </div>
      ) : null}
    </>
  )
}
