"use client"
// The life-section polaroids. Clicking one opens the same Minecraft-window gallery as the game version,
// with previous/next buttons and the arrow keys to flip through every photo.
/* eslint-disable @next/next/no-img-element */
import { useCallback, useEffect, useState } from "react"
import { PHOTOS } from "@/data/content"
import { Dialog } from "@/components/game/primitives"
import s from "./simple.module.css"

const TILT = [-3, 2, -1.5, 3]

export function Photos({ hide = [] }: { hide?: string[] }) {
  const [open, setOpen] = useState<number | null>(null)
  const n = PHOTOS.length
  const step = useCallback((d: number) => setOpen((o) => (o === null ? o : (o + d + n) % n)), [n])
  const close = useCallback(() => setOpen(null), [])

  useEffect(() => {
    if (open === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1)
      if (e.key === "ArrowLeft") step(-1)
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [open, step])

  const shown = PHOTOS.map((p, i) => ({ p, i })).filter(({ p }) => !hide.some((h) => p.src.includes(h)))
  const photo = open === null ? null : PHOTOS[open]

  return (
    <>
      <div className={s.photos}>
        {shown.map(({ p, i }, k) => (
          <figure key={p.src} className={s.snap} data-reveal="" style={{ rotate: `${TILT[k % TILT.length]}deg`, transitionDelay: `${k * 90}ms` }}>
            <button type="button" onClick={() => setOpen(i)} aria-label={`Open photo: ${p.caption}`}>
              <img src={p.thumb} alt={p.alt} loading="lazy" />
            </button>
            <figcaption>{p.caption}</figcaption>
          </figure>
        ))}
      </div>
      {photo ? (
        <Dialog title={photo.caption} onClose={close}>
          <div className="lightbox">
            <img src={photo.src} alt={photo.alt} />
            <div className="lightbox-nav">
              <button type="button" className="mc-btn small" onClick={() => step(-1)}>
                ← Previous
              </button>
              <span className="vt">
                {open! + 1} / {n}
              </span>
              <button type="button" className="mc-btn small" onClick={() => step(1)}>
                Next →
              </button>
            </div>
          </div>
        </Dialog>
      ) : null}
    </>
  )
}
