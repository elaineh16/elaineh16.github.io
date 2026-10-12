"use client"

import { MENU, PROFILE, type ScreenId } from "@/data/content"
import { Logo, Sprite } from "@/components/game/primitives"

export function Home({
  go,
  splash,
  spinning,
  onTitle,
}: {
  go: (s: ScreenId) => void
  splash: string
  spinning: boolean
  onTitle: () => void
}) {
  return (
    <section aria-label="Title screen" className="stack-32">
      <header className="head">
        <div className="title-wrap">
          <h1 style={{ margin: 0 }}>
            <button type="button" className={"title" + (spinning ? " spin" : "")} onClick={onTitle} aria-label="ELAINECRAFT">
              <Logo word="ELAINECRAFT" />
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
          <Sprite scale={7} />
          <div className="pedestal" aria-hidden="true" />
        </figure>

        <nav className="menu" aria-label="Main menu">
          {MENU.map((m) => (
            <button key={m.screen} type="button" className="mc-btn" onClick={() => go(m.screen)}>
              {m.label} <span className="sub-inline">· {m.sub}</span>
            </button>
          ))}
          <button type="button" className="quick-link vt" onClick={() => go("quick")}>
            In a hurry? Open Quick View →
          </button>
        </nav>
      </div>
    </section>
  )
}
