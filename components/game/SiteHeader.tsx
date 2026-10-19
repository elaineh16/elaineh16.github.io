"use client"

import { MENU, PROFILE, RESUME_URL, type ScreenId } from "@/data/content"
import { Sprite } from "@/components/game/primitives"

const GAMES: ScreenId[] = ["fortune", "fishing", "fencing"]

/**
 * A slim bar fixed to the top of every screen: name (back to the title screen), the main
 * pages, a quiet "Plain view" link and the résumé, so the facts are always one click away.
 */
export function SiteHeader({ screen, go }: { screen: ScreenId; go: (s: ScreenId) => void }) {
  const current = GAMES.includes(screen) ? "arcade" : screen
  return (
    <header className="site-head">
      <button type="button" className="sh-brand px" onClick={() => go("home")} aria-label={`${PROFILE.name}, back to the title screen`}>
        <Sprite scale={1} />
        <span>{PROFILE.name}</span>
      </button>
      <nav className="sh-nav" aria-label="Pages">
        {MENU.map((m) => (
          <button key={m.screen} type="button" className={"px" + (current === m.screen ? " on" : "")} aria-current={current === m.screen ? "page" : undefined} onClick={() => go(m.screen)}>
            {m.label}
          </button>
        ))}
      </nav>
      <div className="sh-right">
        <button type="button" className={"sh-plain" + (screen === "quick" ? " on" : "")} aria-current={screen === "quick" ? "page" : undefined} onClick={() => go("quick")}>
          Plain view
        </button>
        <a className="sh-resume px" href={RESUME_URL} target="_blank" rel="noreferrer">
          Résumé
        </a>
      </div>
    </header>
  )
}
