"use client"

import { useEffect, useRef, useState } from "react"
import { MAP_VIEWS, type MapGrid } from "@/data/map-grid"
import { PLACES, type Place } from "@/data/places"

type ViewId = keyof typeof MAP_VIEWS

const VIEW_LABEL: Record<ViewId, string> = { na: "North America", east: "Great Lakes & East Coast" }

// Minecraft-map-like palette: [main, shade]
const COLOURS: Record<string, [string, string]> = {
  ".": ["#5b7fbf", "#5276b6"],
  "~": ["#6a8fcc", "#6086c4"],
  U: ["#8fb35a", "#86aa52"],
  C: ["#a6c070", "#9bb666"],
  M: ["#d2bc7a", "#c8b270"],
  L: ["#b9a874", "#ae9d6a"],
}

function drawMap(canvas: HTMLCanvasElement, g: MapGrid) {
  canvas.width = g.width
  canvas.height = g.height
  const ctx = canvas.getContext("2d")
  if (!ctx) return
  const at = (r: number, c: number) => (r < 0 || r >= g.height || c < 0 || c >= g.width ? "." : g.rows[r][c])
  for (let r = 0; r < g.height; r++) {
    for (let c = 0; c < g.width; c++) {
      const ch = at(r, c)
      const water = ch === "." || ch === "~"
      const pal = COLOURS[ch] || COLOURS.L
      let col = (r * 7 + c * 13 + ((r * c) % 5)) % 3 === 0 ? pal[1] : pal[0]
      if (!water) {
        const n = [at(r - 1, c), at(r + 1, c), at(r, c - 1), at(r, c + 1)]
        if (n.some((x) => x === "." || x === "~")) col = ch === "M" ? "#a8925a" : "#6d8c41"
        else if (n.some((x) => x !== ch && x !== "." && x !== "~") && (r + c) % 2 === 0) col = "#6b5a3e"
      } else if ((r + c * 3) % 11 === 0) {
        col = "#7896d0"
      }
      ctx.fillStyle = col
      ctx.fillRect(c, r, 1, 1)
    }
  }
}

function project(g: MapGrid, p: Place) {
  const x = (p.lon - g.lonMin) / (g.lonMax - g.lonMin)
  const y = (g.latMax - p.lat) / (g.latMax - g.latMin)
  return { x, y, inside: x >= 0 && x <= 1 && y >= 0 && y <= 1 }
}

const kindLabel = (p: Place) => (p.kind === "spawn" ? "Spawn point" : p.kind === "base" ? "Current base" : "Visited")

export function TravelMap() {
  const [view, setView] = useState<ViewId>("na")
  const [picked, setPicked] = useState<string | null>(null)
  const ref = useRef<HTMLCanvasElement>(null)
  const g = MAP_VIEWS[view]

  useEffect(() => {
    if (ref.current) drawMap(ref.current, g)
  }, [g])

  const countries = ["Canada", "United States", "Mexico"] as const
  const choose = (p: Place) => {
    setPicked(p.name)
    // Zoom in when the place is in the crowded north-east.
    const east = project(MAP_VIEWS.east, p).inside
    setView(east ? "east" : "na")
  }

  return (
    <div className="travel">
      <div className="map-tabs" role="tablist" aria-label="Map view">
        {(Object.keys(MAP_VIEWS) as ViewId[]).map((v) => (
          <button key={v} type="button" role="tab" aria-selected={view === v} className={"tab small" + (view === v ? " on" : "")} onClick={() => setView(v)}>
            {VIEW_LABEL[v]}
          </button>
        ))}
      </div>

      <div className="travel-body">
        <div className="travel-main">
        <div className="mc-map">
          <div className="mc-map-inner" style={{ aspectRatio: `${g.width} / ${g.height}` }}>
            <canvas ref={ref} className="pixel" role="img" aria-label={`Pixel map of ${VIEW_LABEL[view]} with ${PLACES.length} places marked`} />
            {PLACES.map((p) => {
              const { x, y, inside } = project(g, p)
              if (!inside) return null
              return (
                <button
                  key={p.name}
                  type="button"
                  className={"pin " + (p.kind || "visited") + (picked === p.name ? " picked" : "")}
                  style={{ left: `${x * 100}%`, top: `${y * 100}%` }}
                  aria-label={`${p.name}, ${p.region}: ${kindLabel(p)}`}
                  data-t1={p.name}
                  data-t2={`${p.region} · ${p.country}`}
                  data-t3={kindLabel(p)}
                  onClick={() => setPicked(p.name)}
                />
              )
            })}
          </div>
        </div>

        <div className="map-legend vt">
          <span>
            <i className="pin spawn static" /> Spawn
          </span>
          <span>
            <i className="pin base static" /> Base
          </span>
          <span>
            <i className="pin visited static" /> Visited
          </span>
          <span className="map-total">
            {PLACES.length} places · {countries.filter((c) => PLACES.some((p) => p.country === c)).length} countries
          </span>
        </div>
        </div>
        <aside className="place-log" aria-label="Places visited">
          {countries.map((c) => {
            const list = PLACES.filter((p) => p.country === c)
            if (!list.length) return null
            return (
              <div key={c}>
                <h4 className="px">
                  {c} <span>({list.length})</span>
                </h4>
                <div className="place-chips">
                  {list.map((p) => (
                    <button key={p.name} type="button" className={"place-chip" + (picked === p.name ? " on" : "")} aria-pressed={picked === p.name} onClick={() => choose(p)}>
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>
            )
          })}
        </aside>
      </div>
    </div>
  )
}
