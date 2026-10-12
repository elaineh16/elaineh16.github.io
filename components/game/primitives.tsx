"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { ICONS, SPRITE, SPRITE_FRAMES, blinkFrame, drawBlockLogo, drawPixelMap, type IconName, type SpriteFrame } from "@/lib/pixel-art"
import { playClick, playSwish } from "@/lib/sound"
import { WEATHER, paintSeason, type Season } from "@/lib/seasons"

export function PixelIcon({ name, size = 40 }: { name: IconName; size?: number }) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    if (ref.current) drawPixelMap(ref.current, ICONS[name])
  }, [name])
  return <canvas ref={ref} className="pixel" width={10} height={10} style={{ width: size, height: size }} aria-hidden="true" />
}

export function Sprite({ scale = 5 }: { scale?: number }) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    if (ref.current) drawPixelMap(ref.current, SPRITE)
  }, [])
  return (
    <canvas
      ref={ref}
      className="pixel"
      width={16}
      height={32}
      style={{ width: 16 * scale, height: 32 * scale }}
      role="img"
      aria-label="Pixel-art Elaine in a red varsity jacket holding an épée"
    />
  )
}

/**
 * Clickable avatar. At rest she faces you and now and then glances to one side.
 * Clicking her plays a fencing salute: épée up to the face, then swept down.
 */
/** The animated avatar: blinks, glances around, and does a move when clicked (a fencing salute or a wave). */
export function SalutingSprite({ scale = 7, sound = true, onSalute, move = "salute" }: { scale?: number; sound?: boolean; onSalute?: () => void; move?: "salute" | "wave" }) {
  const ref = useRef<HTMLCanvasElement>(null)
  const [frame, setFrame] = useState<SpriteFrame>("front")
  const [blink, setBlink] = useState(false)
  const busy = useRef(false)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => {
    if (ref.current) drawPixelMap(ref.current, blink ? blinkFrame(SPRITE_FRAMES[frame]) : SPRITE_FRAMES[frame])
  }, [frame, blink])

  // Blink every 2 seconds.
  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return
    let off: ReturnType<typeof setTimeout>
    const iv = setInterval(() => {
      setBlink(true)
      off = setTimeout(() => setBlink(false), 150)
    }, 2000)
    return () => {
      clearInterval(iv)
      clearTimeout(off)
    }
  }, [])

  // Idle: every 3–7 seconds, glance left or right for about a second.
  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return
    let t: ReturnType<typeof setTimeout>
    const loop = () => {
      t = setTimeout(() => {
        if (!busy.current) {
          setFrame(Math.random() < 0.5 ? "idle" : "lookleft")
          t = setTimeout(() => {
            if (!busy.current) setFrame("front")
            loop()
          }, 900 + Math.random() * 600)
        } else loop()
      }, 3000 + Math.random() * 4000)
    }
    loop()
    return () => clearTimeout(t)
  }, [])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const salute = () => {
    if (busy.current) return
    busy.current = true
    onSalute?.()
    const at = (ms: number, fn: () => void) => timers.current.push(setTimeout(fn, ms))
    if (move === "wave") {
      if (sound) playClick()
      ;["waveA", "waveB", "waveA", "waveB", "waveA"].forEach((f, i) => at(i * 220, () => setFrame(f as SpriteFrame)))
      at(1150, () => {
        setFrame("front")
        busy.current = false
      })
      return
    }
    setFrame("front")
    at(120, () => setFrame("up"))
    at(700, () => {
      setFrame("down")
      if (sound) playSwish()
    })
    at(1300, () => {
      setFrame("front")
      busy.current = false
    })
  }

  return (
    <button type="button" className="salute-btn" onClick={salute} aria-label={move === "wave" ? "Elaine: click to say hi" : "Elaine: click for a fencing salute"}>
      <canvas ref={ref} className="pixel" width={20} height={32} style={{ width: 20 * scale, height: 32 * scale }} aria-hidden="true" />
    </button>
  )
}

export function Logo({ word }: { word: string }) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    if (ref.current) drawBlockLogo(ref.current, word)
  }, [word])
  return <canvas ref={ref} className="logo pixel" aria-hidden="true" />
}

/** Renders text, dimming any [TODO …] placeholders so they are easy to spot. */
export function Todo({ text }: { text: string }) {
  const parts = text.split(/(\[TODO[^\]]*\])/g)
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith("[TODO") ? (
          <span key={i} className="todo">
            {p}
          </span>
        ) : (
          p
        ),
      )}
    </>
  )
}

export interface TipData {
  t1: string
  t2?: string
  t3?: string
}

export function Slot({
  icon,
  tip,
  label,
  selected,
  dim,
  enchanted,
  onClick,
}: {
  icon: IconName
  tip: TipData
  label: string
  selected?: boolean
  dim?: boolean
  enchanted?: boolean
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      className={"slot" + (selected ? " sel" : "") + (dim ? " dim" : "") + (enchanted ? " enchanted" : "")}
      aria-label={label}
      aria-pressed={selected}
      data-t1={tip.t1}
      data-t2={tip.t2 || ""}
      data-t3={tip.t3 || ""}
      onClick={onClick}
    >
      <PixelIcon name={icon} />
    </button>
  )
}

export function StaticSlot({ icon, size, enchanted }: { icon: IconName; size?: number; enchanted?: boolean }) {
  return (
    <span className={"slot static" + (enchanted ? " enchanted" : "")}>
      <PixelIcon name={icon} size={size} />
    </span>
  )
}

/** One shared tooltip for every element with data-t1, so it never gets clipped by a panel. */
export function Tooltip() {
  const [tip, setTip] = useState<(TipData & { x: number; y: number }) | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const pending = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const show = (el: HTMLElement) => {
      pending.current = el
      setTip({ t1: el.dataset.t1 || "", t2: el.dataset.t2, t3: el.dataset.t3, x: -9999, y: -9999 })
    }
    const hide = () => {
      pending.current = null
      setTip(null)
    }
    const over = (e: Event) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>("[data-t1]")
      if (el) show(el)
    }
    const out = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>("[data-t1]")
      if (el && !el.contains(e.relatedTarget as Node)) hide()
    }
    document.addEventListener("mouseover", over)
    document.addEventListener("mouseout", out)
    document.addEventListener("focusin", over)
    document.addEventListener("focusout", hide)
    document.addEventListener("click", hide)
    window.addEventListener("scroll", hide, { passive: true })
    window.addEventListener("hashchange", hide)
    return () => {
      document.removeEventListener("mouseover", over)
      document.removeEventListener("mouseout", out)
      document.removeEventListener("focusin", over)
      document.removeEventListener("focusout", hide)
      document.removeEventListener("click", hide)
      window.removeEventListener("scroll", hide)
      window.removeEventListener("hashchange", hide)
    }
  }, [])

  // Position once the tooltip has rendered and we know its size.
  useEffect(() => {
    const el = pending.current
    const box = ref.current
    if (!tip || !el || !box || tip.x !== -9999) return
    const b = el.getBoundingClientRect()
    const tw = box.offsetWidth
    const th = box.offsetHeight
    const x = Math.min(Math.max(8, b.left + b.width / 2 - tw / 2), window.innerWidth - tw - 8)
    let y = b.top - th - 10
    if (y < 8) y = b.bottom + 10
    setTip({ ...tip, x, y })
  }, [tip])

  if (!tip) return null
  return (
    <div id="tip" ref={ref} style={{ left: tip.x, top: tip.y }} role="tooltip">
      <span className="t1">{tip.t1}</span>
      {tip.t2 ? <span className="t2">{tip.t2}</span> : null}
      {tip.t3 ? <span className="t3">{tip.t3}</span> : null}
    </div>
  )
}

export function Background({ season }: { season: Season }) {
  const ref = useRef<HTMLCanvasElement>(null)
  const [img, setImg] = useState<HTMLImageElement | null>(null)
  useEffect(() => {
    const i = new Image()
    i.onload = () => setImg(i)
    i.src = "/backgrounds/campus.png"
  }, [])
  useEffect(() => {
    if (img && ref.current) paintSeason(ref.current, img, season)
  }, [img, season])
  return (
    <div id="bg" aria-hidden="true">
      <canvas ref={ref} className="pixel" />
    </div>
  )
}

export function Weather({ season, on }: { season: Season; on: boolean }) {
  if (!on) return null
  const w = WEATHER[season]
  return (
    <div id="weather" aria-hidden="true">
      {Array.from({ length: 18 }, (_, i) => (
        <span
          key={i}
          className="petal"
          style={{
            left: `${(i * 37 + 11) % 100}%`,
            animationDelay: `-${((i * 1.7) % 9).toFixed(1)}s`,
            animationDuration: `${(7 + (i % 5) * 1.6).toFixed(1)}s`,
            background: w.p1,
            boxShadow: `4px 4px 0 ${w.p2}`,
          }}
        />
      ))}
    </div>
  )
}

export function Toast({ title, icon }: { title: string; icon: IconName }) {
  return (
    <div id="toast" role="status">
      <StaticSlot icon={icon} size={30} />
      <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <span className="px" style={{ fontSize: 15, color: "var(--gold)" }}>
          Advancement Made!
        </span>
        <span className="px" style={{ fontSize: 17, color: "#fff" }}>
          {title}
        </span>
      </span>
    </div>
  )
}

/** Minecraft-style modal window. Esc or the close button dismisses it. */
export function Dialog({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null
    ref.current?.querySelector<HTMLElement>("button")?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("keydown", onKey)
      prev?.focus()
    }
  }, [onClose])
  // Render at the end of <body> so no panel's stacking order can cover it.
  return createPortal(
    <div className="dialog-backdrop" onClick={onClose}>
      <div className="win dialog" role="dialog" aria-modal="true" aria-label={title} ref={ref} onClick={(e) => e.stopPropagation()}>
        <div className="dialog-head">
          <h2 className="px">{title}</h2>
          <button type="button" className="dialog-x" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        <div className="dialog-body">{children}</div>
      </div>
    </div>,
    document.body,
  )
}

/**
 * Site-wide view counter (free Abacus counter, no account needed).
 * Counts once per browser session; hides itself if the service can't be reached.
 */
export function ViewCount() {
  const [views, setViews] = useState<number | null>(null)
  useEffect(() => {
    let counted = false
    try {
      counted = sessionStorage.getItem("ec.counted") === "1"
    } catch {}
    const action = counted ? "get" : "hit"
    let alive = true
    fetch(`https://abacus.jasoncameron.dev/${action}/elaineh16-github-io/views`)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((j: { value?: number }) => {
        if (typeof j.value === "number" && j.value >= 0 && alive) setViews(j.value)
        try {
          sessionStorage.setItem("ec.counted", "1")
        } catch {}
      })
      .catch(() => {})
    return () => {
      alive = false
    }
  }, [])
  if (views === null) return null
  return (
    <p className="views" aria-label={`${views.toLocaleString()} views`}>
      <svg width="14" height="10" viewBox="0 0 7 5" shapeRendering="crispEdges" aria-hidden="true">
        <path d="M2 0h3v1h1v1h1v1H6v1H5v1H2V4H1V3H0V2h1V1h1z" fill="#cfc6cc" />
        <path d="M3 1h1v1h1v1H4v1H3V3H2V2h1z" fill="#2a2730" />
      </svg>
      {views.toLocaleString()} views
    </p>
  )
}
