"use client"
// Faint pixel blocks drifting in the page margins: a quiet nod to the Minecraft version.
// Drawn on one fixed canvas behind the content; stops moving for visitors who prefer reduced motion.
import { useEffect, useRef } from "react"

const CELL = 12

type Cloud = { x: number; y: number; vx: number; cells: [number, number, number][] }

function makeCloud(seed: number, x: number, y: number, vx: number): Cloud {
  let s = seed
  const rnd = () => ((s = (s * 16807) % 2147483647), s / 2147483647)
  const cells: [number, number, number][] = []
  // A ragged blob: rows of blocks that taper at the ends, each with its own shade.
  const w = 10 + Math.floor(rnd() * 10)
  const h = 4 + Math.floor(rnd() * 5)
  for (let r = 0; r < h; r++) {
    const taper = Math.abs(r - h / 2) / (h / 2)
    const start = Math.floor(taper * w * 0.35 + rnd() * 2)
    const end = w - Math.floor(taper * w * 0.35 + rnd() * 2)
    for (let c = start; c < end; c++) if (rnd() > 0.12) cells.push([c, r, rnd()])
  }
  return { x, y, vx, cells }
}

export function PixelField() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const dark = window.matchMedia("(prefers-color-scheme: dark)")
    let W = 0
    let H = 0
    let clouds: Cloud[] = []

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      W = window.innerWidth
      H = window.innerHeight
      canvas.width = W * dpr
      canvas.height = H * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      clouds = [
        makeCloud(11, W * 0.02, H * 0.12, 0.05),
        makeCloud(29, W * 0.74, H * 0.3, -0.04),
        makeCloud(47, W * 0.06, H * 0.62, 0.035),
        makeCloud(83, W * 0.8, H * 0.78, -0.05),
      ]
    }

    // Stone greys with the odd Cornell-red block.
    const shade = (t: number) => {
      if (t > 0.86) return dark.matches ? "rgba(224,87,79,.22)" : "rgba(179,27,27,.13)"
      const a = (dark.matches ? 0.05 : 0.06) + t * (dark.matches ? 0.07 : 0.08)
      return dark.matches ? `rgba(255,255,255,${a.toFixed(3)})` : `rgba(60,60,70,${a.toFixed(3)})`
    }

    let raf = 0
    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      for (const cl of clouds) {
        const span = 22 * CELL
        if (cl.x > W + 40) cl.x = -span
        if (cl.x < -span - 40) cl.x = W
        for (const [c, r, t] of cl.cells) {
          ctx.fillStyle = shade(t)
          ctx.fillRect(Math.round(cl.x + c * CELL), Math.round(cl.y + r * CELL), CELL - 2, CELL - 2)
        }
        if (!still) cl.x += cl.vx
      }
      if (!still) raf = requestAnimationFrame(draw)
    }

    resize()
    draw()
    const onResize = () => {
      resize()
      if (still) draw()
    }
    window.addEventListener("resize", onResize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", onResize)
    }
  }, [])

  return <canvas ref={ref} aria-hidden="true" className="pixel-field" style={{ position: "fixed", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }} />
}
