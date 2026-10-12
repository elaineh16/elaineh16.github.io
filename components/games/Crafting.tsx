"use client"

import { useEffect, useState } from "react"
import { INGREDIENTS, RECIPES, matchRecipe, type Recipe } from "@/data/recipes"
import { PixelIcon } from "@/components/game/primitives"
import type { IconName } from "@/lib/pixel-art"
import { playCraft, playNope } from "@/lib/sound"
import { load, save } from "@/lib/storage"

const nameOf = (id: IconName) => INGREDIENTS.find((i) => i.id === id)?.name ?? id

export function Crafting({ sound, onCraft }: { sound: boolean; onCraft: (found: number, total: number) => void }) {
  const [grid, setGrid] = useState<(IconName | null)[]>([null, null, null, null])
  const [found, setFound] = useState<string[]>([])
  const [last, setLast] = useState<Recipe | null>(null)
  const [miss, setMiss] = useState(false)
  const [dragOver, setDragOver] = useState<number | null>(null)

  useEffect(() => {
    setFound(load<string[]>("ec.recipes", []).filter((id) => RECIPES.some((r) => r.id === id)))
  }, [])

  const filled = grid.filter(Boolean).length
  const match = matchRecipe(grid)
  const isNew = match ? !found.includes(match.id) : false

  const place = (item: IconName, at?: number) => {
    setMiss(false)
    setLast(null)
    setGrid((g) => {
      const next = [...g]
      const i = at ?? next.findIndex((x) => x === null)
      if (i < 0) return g
      next[i] = item
      return next
    })
  }
  const remove = (i: number) => {
    setMiss(false)
    setGrid((g) => g.map((x, j) => (j === i ? null : x)))
  }
  const clear = () => {
    setGrid([null, null, null, null])
    setMiss(false)
  }

  const craft = () => {
    if (!match) {
      if (filled >= 2) {
        setMiss(true)
        if (sound) playNope()
      }
      return
    }
    if (sound) playCraft()
    const next = found.includes(match.id) ? found : [...found, match.id]
    setFound(next)
    save("ec.recipes", next)
    setLast(match)
    setGrid([null, null, null, null])
    onCraft(next.length, RECIPES.length)
  }

  const reset = () => {
    setFound([])
    save("ec.recipes", [])
    setLast(null)
    clear()
  }

  return (
    <div className="crafting">
      <section className="win craft-table" aria-labelledby="ct">
        <div className="craft-headrow">
          <h2 id="ct" className="px">
            Crafting
          </h2>
          <span className="vt craft-count" aria-live="polite">
            {found.length} / {RECIPES.length} recipes
          </span>
        </div>

        <div className="craft-area">
          <div className="craft-grid" role="group" aria-label="Crafting grid">
            {grid.map((item, i) => (
              <button
                key={i}
                type="button"
                className={"slot craft-slot" + (dragOver === i ? " over" : "")}
                aria-label={item ? `${nameOf(item)} in slot ${i + 1}. Click to remove.` : `Empty slot ${i + 1}`}
                data-t1={item ? nameOf(item) : undefined}
                data-t2={item ? "Click to remove" : undefined}
                onClick={() => item && remove(i)}
                onDragOver={(e) => {
                  e.preventDefault()
                  setDragOver(i)
                }}
                onDragLeave={() => setDragOver(null)}
                onDrop={(e) => {
                  e.preventDefault()
                  setDragOver(null)
                  const id = e.dataTransfer.getData("text/plain") as IconName
                  if (id) place(id, i)
                }}
              >
                {item ? <PixelIcon name={item} /> : null}
              </button>
            ))}
          </div>

          <span className="craft-arrow" aria-hidden="true">
            →
          </span>

          <button
            type="button"
            className={"slot craft-out" + (match ? " ready" : "") + (miss ? " miss" : "")}
            onClick={craft}
            disabled={filled < 2}
            aria-label={match ? `Craft ${isNew ? "a new recipe" : match.result}` : filled < 2 ? "Add two items to craft" : "Try to craft"}
            data-t1={match ? (isNew ? "???" : match.result) : undefined}
            data-t2={match ? "Click to craft" : undefined}
          >
            {match ? isNew ? <span className="px craft-q">?</span> : <PixelIcon name={match.icon} /> : miss ? <span className="px craft-x">×</span> : null}
          </button>
        </div>

        <p className="vt craft-msg" aria-live="polite">
          {miss
            ? "Nothing crafts from that. Try a different pair."
            : match
              ? isNew
                ? "Something new! Click the output to craft it."
                : `Makes ${match.result}. You've found this one.`
              : filled === 0
                ? "Pick two items below to combine them."
                : filled === 1
                  ? "Add one more item."
                  : "Click the output slot to try it."}
        </p>

        <div className="craft-actions">
          <button type="button" className="tab small" onClick={clear} disabled={filled === 0}>
            Clear grid
          </button>
        </div>

        <h3 className="px craft-sub">Inventory</h3>
        <div className="craft-inv">
          {INGREDIENTS.map((it) => (
            <button
              key={it.id}
              type="button"
              className="slot"
              draggable
              onDragStart={(e) => e.dataTransfer.setData("text/plain", it.id)}
              onClick={() => place(it.id)}
              disabled={filled >= 4}
              aria-label={`Add ${it.name}`}
              data-t1={it.name}
              data-t2="Click or drag into the grid"
            >
              <PixelIcon name={it.id} />
            </button>
          ))}
        </div>
      </section>

      <div className="craft-side stack-16">
        <article className={"paper craft-result" + (last ? " show" : "")} aria-live="polite">
          {last ? (
            <>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <span className="slot static enchanted">
                  <PixelIcon name={last.icon} />
                </span>
                <div>
                  <span className="book-kicker">Crafted</span>
                  <h3 className="px" style={{ margin: 0, fontSize: 18 }}>
                    {last.result}
                  </h3>
                </div>
              </div>
              <p>{last.fact}</p>
            </>
          ) : (
            <>
              <span className="book-kicker">How to play</span>
              <p>Combine two items in the grid to unlock a story about me. There are {RECIPES.length} to find. The recipe book shows a hint for each one.</p>
            </>
          )}
        </article>

        <section className="win recipe-book" aria-labelledby="rb">
          <h2 id="rb" className="px">
            Recipe Book
          </h2>
          <div className="ach-bar" aria-hidden="true">
            <span style={{ width: `${(found.length / RECIPES.length) * 100}%` }} />
          </div>
          <ul>
            {RECIPES.map((r) => {
              const got = found.includes(r.id)
              return (
                <li key={r.id} className={got ? "got" : ""}>
                  {got ? (
                    <button type="button" onClick={() => setLast(r)} aria-label={`Read ${r.result}`}>
                      <span className="slot static">
                        <PixelIcon name={r.icon} size={26} />
                      </span>
                      <span className="rb-text">
                        <strong className="px">{r.result}</strong>
                        <span>
                          {nameOf(r.inputs[0])} + {nameOf(r.inputs[1])}
                        </span>
                      </span>
                    </button>
                  ) : (
                    <div className="rb-locked">
                      <span className="slot static">
                        <span className="px lock">?</span>
                      </span>
                      <span className="rb-text">
                        <strong className="px">???</strong>
                        <span>Hint: uses {nameOf(r.inputs[0])}</span>
                      </span>
                    </div>
                  )}
                </li>
              )
            })}
          </ul>
          {found.length ? (
            <button type="button" className="tab small" onClick={reset} style={{ marginTop: 10 }}>
              Reset recipe book
            </button>
          ) : null}
        </section>
      </div>
    </div>
  )
}
