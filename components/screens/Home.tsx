"use client"

import { MENU, PROFILE, type ScreenId } from "@/data/content"
import { Logo, PixelIcon, SalutingSprite } from "@/components/game/primitives"

export function Home({
  go,
  splash,
  spinning,
  onTitle,
  sound,
}: {
  go: (s: ScreenId) => void
  splash: string
  spinning: boolean
  onTitle: () => void
  sound: boolean
}) {
  return (
    <section aria-label="Title screen" className="stack-32">
      <header className="head">
        <div className="title-wrap">
          <h1 style={{ margin: 0 }}>
            <button type="button" className={"title" + (spinning ? " spin" : "")} onClick={onTitle} aria-label="Elaine Hong">
              <Logo word="ELAINE HONG" />
            </button>
          </h1>
          <span className="splash" aria-hidden="true">
            {splash}
          </span>
        </div>
      </header>

      <div className="stage">
        <figure className="player" aria-label={`${PROFILE.name}: ${PROFILE.classes.join(", ")}`}>
          <div className="nametag px">{PROFILE.name}</div>
          <SalutingSprite scale={8} sound={sound} greet />
        </figure>

        <nav className="menu" aria-label="Main menu">
          {MENU.slice(0, 3).map((m) => (
            <button key={m.screen} type="button" className="mc-btn" onClick={() => go(m.screen)}>
              {m.icon ? <PixelIcon name={m.icon} size={26} /> : null}
              {m.label}
            </button>
          ))}
          {/* Like Minecraft's Options / Quit row: the last two share a line, so the menu stays four rows tall. */}
          <div className="menu-pair">
            {MENU.slice(3).map((m) => (
              <button key={m.screen} type="button" className="mc-btn" onClick={() => go(m.screen)}>
                {m.icon ? <PixelIcon name={m.icon} size={26} /> : null}
                {m.label}
              </button>
            ))}
          </div>
        </nav>
      </div>
    </section>
  )
}
