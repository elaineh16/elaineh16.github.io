"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { ACHIEVEMENTS, ACHIEVEMENT_BY_ID, HOTBAR, PROJECTS, SCREEN_TITLES, SPLASHES, STORIES, pickSplash, type ScreenId } from "@/data/content"
import { Background, Dialog, PixelIcon, Toast, Tooltip, ViewCount, Weather } from "@/components/game/primitives"
import { Home } from "@/components/screens/Home"
import { About, Arcade, Inventory, Multiplayer, QuickView } from "@/components/screens/Screens"
import { FortuneWheel } from "@/components/games/Fortune"
import { Fishing } from "@/components/games/Fishing"
import { Fencing } from "@/components/games/Fencing"
import { SEASON_LIST, WEATHER, currentSeason, type Season } from "@/lib/seasons"
import { playClick, playJingle } from "@/lib/sound"
import { load, save } from "@/lib/storage"

const SCREENS: ScreenId[] = ["home", "about", "inventory", "arcade", "fortune", "fishing", "fencing", "multiplayer", "quick"]

function screenFromHash(): ScreenId {
  const raw = window.location.hash.replace("#", "")
  // Old links to the retired crafting game open the fortune wheel instead.
  const h = (raw === "crafting" ? "fortune" : raw) as ScreenId
  return SCREENS.includes(h) ? h : "home"
}

type Progress = { stories: string[]; projects: string[]; seasons: string[] }
const EMPTY: Progress = { stories: [], projects: [], seasons: [] }

export default function Game() {
  const [screen, setScreen] = useState<ScreenId>("home")
  const [season, setSeasonState] = useState<Season>("fall")
  const [weather, setWeather] = useState(false)
  const [sound, setSound] = useState(true)
  const [seen, setSeen] = useState<Record<string, boolean>>({})
  const [progress, setProgress] = useState<Progress>(EMPTY)
  const [toast, setToast] = useState<string | null>(null)
  const [dialog, setDialog] = useState<"settings" | "achievements" | null>(null)
  const [selected, setSelected] = useState("finmd")
  const [splash, setSplash] = useState(SPLASHES[0])
  const [spinning, setSpinning] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const soundRef = useRef(sound)
  soundRef.current = sound

  // Load saved settings and progress on the client.
  useEffect(() => {
    setSeasonState(load<Season>("ec.season", currentSeason()))
    setWeather(load("ec.weather", false))
    setSound(load("ec.sound", true))
    setSeen(load("ec.seen", {}))
    setProgress({ ...EMPTY, ...load<Progress>("ec.progress", EMPTY) })
    setSplash((cur) => pickSplash(cur))
    setScreen(screenFromHash())
    setLoaded(true)
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

  // Hover and selection colours follow the season.
  useEffect(() => {
    document.documentElement.dataset.season = season
  }, [season])

  // Click sound for every button and link.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const hit = (e.target as HTMLElement).closest("button, a")
      if (hit && !(hit as HTMLButtonElement).disabled && soundRef.current) playClick()
    }
    document.addEventListener("click", onClick, true)
    return () => document.removeEventListener("click", onClick, true)
  }, [])

  const achieve = useCallback((id: string) => {
    setSeen((prev) => {
      if (prev[id] || !ACHIEVEMENT_BY_ID[id]) return prev
      const next = { ...prev, [id]: true }
      save("ec.seen", next)
      setToast(id)
      if (soundRef.current) setTimeout(playJingle, 60)
      if (toastTimer.current) clearTimeout(toastTimer.current)
      toastTimer.current = setTimeout(() => setToast(null), 3800)
      return next
    })
  }, [])

  // Track things visitors collect (stories read, projects opened, seasons tried).
  const collect = useCallback(
    (kind: keyof Progress, key: string) => {
      setProgress((prev) => {
        if (prev[kind].includes(key)) return prev
        const next = { ...prev, [kind]: [...prev[kind], key] }
        save("ec.progress", next)
        return next
      })
    },
    [],
  )

  useEffect(() => {
    if (!loaded) return
    if (progress.stories.length >= STORIES.length) achieve("stories")
    if (progress.projects.length >= PROJECTS.length) achieve("projects")
    if (progress.seasons.length >= SEASON_LIST.length) achieve("seasons")
  }, [progress, loaded, achieve])

  useEffect(() => {
    if (!loaded) return
    if (screen !== "home") achieve(screen)
    if (screen === "inventory") collect("projects", selected)
    document.title = screen === "home" ? "Elaine Hong - Elaine's Craft" : `${SCREEN_TITLES[screen]} · Elaine Hong - Elaine's Craft`
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen, loaded])

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

  const selectProject = (id: string) => {
    setSelected(id)
    collect("projects", id)
  }

  const setSeason = (s: Season) => {
    setSeasonState(s)
    save("ec.season", s)
    collect("seasons", s)
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
  const resetProgress = () => {
    setSeen({})
    setProgress(EMPTY)
    save("ec.seen", {})
    save("ec.progress", EMPTY)
    save("ec.fortunes", [])
    save("ec.fish", [])
    save("ec.fence", { rung: 0, streak: 0, best: 0, defences: 0 })
  }
  const resetAchievements = () => {
    setSeen({})
    setProgress(EMPTY)
    save("ec.seen", {})
    save("ec.progress", EMPTY)
  }
  const onTitle = () => {
    setSpinning(false)
    requestAnimationFrame(() => setSpinning(true))
    setTimeout(() => setSpinning(false), 400)
    setSplash((cur) => pickSplash(cur))
    achieve("egg")
  }

  const found = ACHIEVEMENTS.filter((a) => seen[a.id]).length

  return (
    <>
      <Background season={season} />
      <div id="shade" />
      {screen !== "home" ? <div id="dim" /> : null}
      <Weather season={season} on={weather} />
      {toast ? <Toast title={ACHIEVEMENT_BY_ID[toast].title} icon={ACHIEVEMENT_BY_ID[toast].icon} /> : null}
      <Tooltip />

      <button
        type="button"
        className="corner-btn wx"
        onClick={toggleWeather}
        aria-pressed={weather}
        aria-label={weather ? "Turn off the weather" : "Turn on the weather"}
        data-t1={weather ? `Weather: ${WEATHER[season].label}` : "Weather: off"}
      >
        <svg width="26" height="26" viewBox="0 0 7 7" shapeRendering="crispEdges" aria-hidden="true">
          <path d="M3 0h1v2H3zM1 2h2v1h1V2h2v2H5v1h1v2H4V6H3v1H1V5h1V4H1z" fill={weather ? "#E6A4B4" : "#9a8f96"} />
          <path d="M3 3h1v1H3z" fill="#ffff55" />
        </svg>
      </button>
      <button type="button" className="corner-btn" onClick={() => setDialog("settings")} aria-label="Settings" data-t1="Settings">
        <svg width="26" height="26" viewBox="0 0 13 13" shapeRendering="crispEdges" aria-hidden="true">
          <path d="M5 0h3v2h1V1h2v2h-1v1h2v3h-2v1h1v2h-2V9H8v2H5V9H4v1H2V8h1V7H0V4h2V3H1V1h2v1h2z" fill="#c6c6c6" />
          <path d="M5 4h3v1h1v3H8v1H5V8H4V5h1z" fill="#2a2730" />
        </svg>
      </button>

      <main className="wrap">
        {screen === "home" ? (
          <Home go={go} splash={splash} spinning={spinning} onTitle={onTitle} sound={sound} />
        ) : (
          <>
            <div className="sub-head">
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <span className="vt" style={{ fontSize: 15, color: "var(--pink)" }}>
                  ELAINE HONG
                </span>
                <h1>{SCREEN_TITLES[screen]}</h1>
              </div>
              <div className="back-wrap">
                {screen === "fortune" || screen === "fishing" || screen === "fencing" ? (
                  <button type="button" className="mc-btn small back-btn" onClick={() => go("arcade")}>
                    Back to Arcade
                  </button>
                ) : (
                  <button type="button" className="mc-btn small back-btn" onClick={() => go("home")}>
                    Back
                  </button>
                )}
              </div>
            </div>
            {screen === "about" ? <About onStory={(k) => collect("stories", k)} sound={sound} /> : null}
            {screen === "inventory" ? <Inventory selected={selected} onSelect={selectProject} /> : null}
            {screen === "arcade" ? <Arcade play={(id) => go(id as ScreenId)} /> : null}
            {screen === "fortune" ? (
              <FortuneWheel
                sound={sound}
                onFortune={(f, n, total) => {
                  achieve("firstcookie")
                  if (f.tier === "enchanted") achieve("enchantedcookie")
                  if (f.tier === "golden") achieve("goldencookie")
                  if (n >= total) achieve("fortunejar")
                }}
              />
            ) : null}
            {screen === "fishing" ? (
              <Fishing
                sound={sound}
                onCatch={(c, n, total) => {
                  achieve("firstcatch")
                  if (c.rarity === "legendary") achieve("goldcatch")
                  if (n >= total) achieve("fullbox")
                }}
              />
            ) : null}
            {screen === "fencing" ? (
              <Fencing
                sound={sound}
                onWin={({ streak, final }) => {
                  achieve("engarde")
                  if (streak >= 3) achieve("hotstreak")
                  if (final) achieve("champion")
                }}
              />
            ) : null}
            {screen === "multiplayer" ? <Multiplayer /> : null}
            {screen === "quick" ? <QuickView /> : null}
          </>
        )}
        <ViewCount />
        <p className="foot">Inspired by Minecraft · not affiliated with Mojang</p>
      </main>

      <nav className="hotbar" aria-label="Quick access">
        {HOTBAR.map((h) => {
          const inner = (
            <>
              <span className="slot">
                <PixelIcon name={h.icon} />
                {h.action === "achievements" ? <span className="count">{found}</span> : null}
              </span>
              <span className="lbl">{h.label}</span>
            </>
          )
          return h.href ? (
            <a key={h.label} className="hot" href={h.href} target={h.href.startsWith("mailto:") ? undefined : "_blank"} rel="noreferrer" aria-label={h.label}>
              {inner}
            </a>
          ) : (
            <button key={h.label} type="button" className="hot" aria-label={`${h.label}: ${found} of ${ACHIEVEMENTS.length}`} onClick={() => setDialog("achievements")}>
              {inner}
            </button>
          )
        })}
      </nav>

      {dialog === "settings" ? (
        <Dialog title="Settings" onClose={() => setDialog(null)}>
          <div className="stack-16">
            <div>
              <h3 className="px dlg-label">Season</h3>
              <div className="season-grid">
                {SEASON_LIST.map(([id, label]) => (
                  <button key={id} type="button" aria-pressed={season === id} className={"mc-btn small" + (season === id ? " on" : "")} onClick={() => setSeason(id)}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <button type="button" className="mc-btn" onClick={toggleWeather} aria-pressed={weather}>
              <span>Weather</span>
              <span className="sub">{weather ? `ON · ${WEATHER[season].label}` : "OFF"}</span>
            </button>
            <button type="button" className="mc-btn" onClick={toggleSound} aria-pressed={sound}>
              <span>Sound</span>
              <span className="sub">{sound ? "ON" : "OFF"}</span>
            </button>
            <button type="button" className="mc-btn" onClick={resetProgress}>
              <span>Reset progress</span>
              <span className="sub">
                {found} / {ACHIEVEMENTS.length}
              </span>
            </button>
            <p className="vt" style={{ margin: 0, fontSize: 14, color: "#4a4a4a" }}>
              Animations switch off automatically when your device asks for reduced motion.
            </p>
          </div>
        </Dialog>
      ) : null}

      {dialog === "achievements" ? (
        <Dialog title={`Achievements · ${found} / ${ACHIEVEMENTS.length}`} onClose={() => setDialog(null)}>
          <div className="ach-bar" aria-hidden="true">
            <span style={{ width: `${(found / ACHIEVEMENTS.length) * 100}%` }} />
          </div>
          <ul className="ach-list">
            {ACHIEVEMENTS.map((a) => (
              <li key={a.id} className={seen[a.id] ? "got" : ""}>
                <span className="slot static">{seen[a.id] ? <PixelIcon name={a.icon} size={30} /> : <span className="px lock">?</span>}</span>
                <span className="ach-text">
                  <strong className="px">{a.title}</strong>
                  <span>{a.how}</span>
                </span>
                <span className="vt ach-state">{seen[a.id] ? "Unlocked" : "Locked"}</span>
              </li>
            ))}
          </ul>
          {found ? (
            <button type="button" className="tab small" onClick={resetAchievements} style={{ marginTop: 12 }}>
              Reset achievements
            </button>
          ) : null}
        </Dialog>
      ) : null}
    </>
  )
}
