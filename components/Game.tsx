"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { ACHIEVEMENTS, HOTBAR, SCREEN_TITLES, SPLASHES, type HomeItem, type ScreenId } from "@/data/content"
import { Background, PixelIcon, Toast, Tooltip, Weather } from "@/components/game/primitives"
import { Home } from "@/components/screens/Home"
import { About, Advancements, Inventory, Multiplayer, Options, QuickView, Realms } from "@/components/screens/Screens"
import { currentSeason, type Season } from "@/lib/seasons"
import { playClick } from "@/lib/sound"
import { load, save } from "@/lib/storage"

const SCREENS: ScreenId[] = ["home", "about", "inventory", "advancements", "realms", "multiplayer", "options", "quick"]

function screenFromHash(): ScreenId {
  const h = window.location.hash.replace("#", "") as ScreenId
  return SCREENS.includes(h) ? h : "home"
}

export default function Game() {
  const [screen, setScreen] = useState<ScreenId>("home")
  const [season, setSeasonState] = useState<Season>("fall")
  const [weather, setWeather] = useState(false)
  const [sound, setSound] = useState(true)
  const [seen, setSeen] = useState<Record<string, boolean>>({})
  const [toast, setToast] = useState<string | null>(null)
  const [selected, setSelected] = useState("finmd")
  const [node, setNode] = useState("b2")
  const [splash, setSplash] = useState(SPLASHES[0])
  const [spinning, setSpinning] = useState(false)
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const soundRef = useRef(sound)
  soundRef.current = sound

  // Load saved settings on the client.
  useEffect(() => {
    setSeasonState(load<Season>("ec.season", currentSeason()))
    setWeather(load("ec.weather", false))
    setSound(load("ec.sound", true))
    setSeen(load("ec.seen", {}))
    setSplash(SPLASHES[Math.floor(Math.random() * SPLASHES.length)])
    setScreen(screenFromHash())
    const onHash = () => {
      setScreen(screenFromHash())
      window.scrollTo(0, 0)
    }
    window.addEventListener("hashchange", onHash)
    window.addEventListener("popstate", onHash)
    return () => {
      window.removeEventListener("hashchange", onHash)
      window.removeEventListener("popstate", onHash)
    }
  }, [])

  // Click sound for every button and link.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const hit = (e.target as HTMLElement).closest("button, a")
      if (hit && !(hit as HTMLButtonElement).disabled && soundRef.current) playClick()
    }
    document.addEventListener("click", onClick, true)
    return () => document.removeEventListener("click", onClick, true)
  }, [])

  const achieve = useCallback((key: string) => {
    setSeen((prev) => {
      if (prev[key] || !ACHIEVEMENTS[key]) return prev
      const next = { ...prev, [key]: true }
      save("ec.seen", next)
      setToast(key)
      if (toastTimer.current) clearTimeout(toastTimer.current)
      toastTimer.current = setTimeout(() => setToast(null), 3800)
      return next
    })
  }, [])

  useEffect(() => {
    achieve(screen)
    document.title = screen === "home" ? "ELAINECRAFT · Elaine Hong" : `${SCREEN_TITLES[screen]} · ELAINECRAFT`
  }, [screen, achieve])

  const go = (s: ScreenId) => {
    if (s === "home") {
      history.pushState(null, "", window.location.pathname + window.location.search)
      setScreen("home")
      window.scrollTo(0, 0)
    } else if (window.location.hash === `#${s}`) {
      setScreen(s)
    } else {
      window.location.hash = s
    }
  }

  const openProject = (id: string) => {
    setSelected(id)
    go("inventory")
  }

  const onHomeItem = (it: HomeItem) => {
    if (it.action === "project") openProject(it.key)
    else if (it.action === "epee") {
      setNode("a3")
      go("advancements")
    } else if (it.action === "passport") go("about")
    else if (it.action === "coffee") achieve("coffee")
  }

  const setSeason = (s: Season) => {
    setSeasonState(s)
    save("ec.season", s)
  }
  const toggleWeather = () => {
    const next = !weather
    setWeather(next)
    save("ec.weather", next)
    if (next) achieve("weather")
  }
  const toggleSound = () => {
    const next = !sound
    setSound(next)
    save("ec.sound", next)
  }
  const onTitle = () => {
    setSpinning(false)
    requestAnimationFrame(() => setSpinning(true))
    setTimeout(() => setSpinning(false), 950)
    setSplash(SPLASHES[Math.floor(Math.random() * SPLASHES.length)])
    achieve("egg")
  }

  return (
    <>
      <Background season={season} />
      <div id="shade" />
      {screen !== "home" ? <div id="dim" /> : null}
      <Weather season={season} on={weather} />
      {toast ? <Toast title={ACHIEVEMENTS[toast][0]} icon={ACHIEVEMENTS[toast][1]} /> : null}
      <Tooltip />

      <button
        type="button"
        className="wx-btn"
        onClick={toggleWeather}
        aria-pressed={weather}
        aria-label={weather ? "Stop the seasonal weather" : "Start the seasonal weather"}
      >
        <svg width="28" height="28" viewBox="0 0 7 7" shapeRendering="crispEdges" aria-hidden="true">
          <path d="M3 0h1v2H3zM1 2h2v1h1V2h2v2H5v1h1v2H4V6H3v1H1V5h1V4H1z" fill="#E6A4B4" />
          <path d="M3 3h1v1H3z" fill="#ffff55" />
        </svg>
      </button>

      <main className="wrap">
        {screen === "home" ? (
          <Home go={go} splash={splash} spinning={spinning} onTitle={onTitle} onItem={onHomeItem} />
        ) : (
          <>
            <div className="sub-head">
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <span className="vt" style={{ fontSize: 15, color: "var(--pink)" }}>
                  ELAINECRAFT
                </span>
                <h1>{SCREEN_TITLES[screen]}</h1>
              </div>
              <div style={{ width: 240, maxWidth: "100%" }}>
                <button type="button" className="mc-btn small" onClick={() => go("home")}>
                  Back to Title Screen
                </button>
              </div>
            </div>
            {screen === "about" ? <About /> : null}
            {screen === "inventory" ? <Inventory selected={selected} onSelect={setSelected} /> : null}
            {screen === "advancements" ? <Advancements node={node} onNode={setNode} openProject={openProject} /> : null}
            {screen === "realms" ? <Realms /> : null}
            {screen === "multiplayer" ? <Multiplayer /> : null}
            {screen === "options" ? (
              <Options
                season={season}
                setSeason={setSeason}
                weather={weather}
                toggleWeather={toggleWeather}
                sound={sound}
                toggleSound={toggleSound}
                found={Object.keys(seen).length}
                total={Object.keys(ACHIEVEMENTS).length}
                resetAchievements={() => {
                  setSeen({})
                  save("ec.seen", {})
                }}
              />
            ) : null}
            {screen === "quick" ? <QuickView /> : null}
          </>
        )}
        <p className="foot">Inspired by Minecraft. Not affiliated with Mojang or Microsoft. Original art.</p>
      </main>

      <nav className="hotbar" aria-label="Quick access">
        {HOTBAR.map((h) => {
          const inner = (
            <>
              <span className="slot">
                <PixelIcon name={h.icon} />
              </span>
              <span className="lbl">{h.label}</span>
            </>
          )
          return h.href ? (
            <a key={h.label} className="hot" href={h.href} target="_blank" rel="noreferrer" aria-label={h.label}>
              {inner}
            </a>
          ) : (
            <button key={h.label} type="button" className="hot" aria-label={h.label} onClick={() => go(h.screen as ScreenId)}>
              {inner}
            </button>
          )
        })}
      </nav>
    </>
  )
}
