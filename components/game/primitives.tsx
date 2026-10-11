"use client"

import { useEffect, useRef, useState } from "react"
import { ICONS, SPRITE, drawBlockLogo, drawPixelMap, type IconName } from "@/lib/pixel-art"
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
  onClick,
}: {
  icon: IconName
  tip: TipData
  label: string
  selected?: boolean
  dim?: boolean
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      className={"slot" + (selected ? " sel" : "") + (dim ? " dim" : "")}
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

export function StaticSlot({ icon, size }: { icon: IconName; size?: number }) {
  return (
    <span className="slot static">
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
    window.addEventListener("scroll", hide, { passive: true })
    window.addEventListener("hashchange", hide)
    return () => {
      document.removeEventListener("mouseover", over)
      document.removeEventListener("mouseout", out)
      document.removeEventListener("focusin", over)
      document.removeEventListener("focusout", hide)
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
