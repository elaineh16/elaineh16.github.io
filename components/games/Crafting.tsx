"use client"

import { useEffect, useRef, useState } from "react"
import { INGREDIENTS, RECIPES, matchRecipe, type Recipe } from "@/data/recipes"
import { PixelIcon } from "@/components/game/primitives"
import type { IconName } from "@/lib/pixel-art"
import { playCraft, playNope } from "@/lib/sound"
import { load, save } from "@/lib/storage"

const nameOf = (id: IconName) => INGREDIENTS.find((i) => i.id === id)?.name ?? id
const EMPTY: (IconName | null)[] = [null, null, null, null]

export function Crafting({ sound, onCraft }: { sound: boolean; onCraft: (found: number, total: number) => void }) {
  const [grid, setGrid] = useState<(IconName | null)[]>(EMPTY)
  const [found, setFound] = useState<string[]>([])
  const [last, setLast] = useState<Recipe | null>(null)
  const [justCrafted, setJustCrafted] = useState<Recipe | null>(null)
  const [miss, setMiss] = useState(false)
  const [dragOver, setDragOver] = useState<number | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const foundRef = useRef(found)
  foundRef.current = found

  useEffect(() => {
    setFound(load<string[]>("ec.recipes", []).filter((id) => RECIPES.some((r) => r.id === id)))
    return () => {
      if (timer.current) clearTimeout(timer.current)
    }
  }, [])

  const filled = grid.filter(Boolean).length

  // Craft automatically as soon as two items are in the grid.
  useEffect(() => {
    if (filled < 2) return
    const match = matchRecipe(grid)
    if (timer.current) clearTimeout(timer.current)
    if (match) {
      timer.current = setTimeout(() => {
        if (sound) playCraft()
        const prev = foundRef.current
        const next = prev.includes(match.id) ? prev : [...prev, match.id]
        setFound(next)
        save("ec.recipes", next)
        setLast(match)
        setJustCrafted(match)
        setGrid(EMPTY)
        onCraft(next.length, RECIPES.length)
        timer.current = setTimeout(() => setJustCrafted(null), 1200)
      }, 280)
    } else {
      setMiss(true)
      if (sound) playNope()
      timer.current = setTimeout(() => {
        setGrid(EMPTY)
        setMiss(false)
      }, 1100)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grid])

  const place = (item: IconName, at?: number) => {
    if (timer.current && miss) clearTimeout(timer.current)
    setJustCrafted(null)
    setGrid((g) => {
      const base = miss ? [...EMPTY] : [...g]
      const i = at !== undefined && base[at] === null ? at : base.findIndex((x) => x === null)
      if (i < 0 || base.filter(Boolean).length >= 2) return g
      base[i] = item
      return base
    })
    setMiss(false)
  }
  const remove = (i: number) => setGrid((g) => g.map((x, j) => (j === i ? null : x)))

  const recraft = (r: Recipe) => {
    setLast(r)
    setGrid([r.inputs[0], r.inputs[1], null, null])
  }

  const reset = () => {
    setFound([])
    save("ec.recipes", [])
    setLast(null)
    setGrid(EMPTY)
  }

  const message = miss
    ? "Those two don't make anything. Check the recipe book for hints!"
    : justCrafted
      ? `Crafted ${justCrafted.result}!`
      : filled === 1
        ? "Add one more item."
        : "Pick two items. A matching pair crafts on its own."

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
                className={"slot craft-slot" + (dragOver === i ? " over" : "") + (miss && item ? " shake" : "")}
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

          <div className={"slot static craft-out" + (justCrafted ? " ready enchanted" : "") + (miss ? " miss" : "")} aria-hidden="true">
            {justCrafted ? <PixelIcon name={justCrafted.icon} /> : miss ? <span className="px craft-x">×</span> : null}
          </div>
        </div>

        <p className="vt craft-msg" aria-live="polite">
          {message}
        </p>

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
        <article className={"paper craft-result" + (last ? " show" : "")} aria-live="polite" key={last?.id ?? "intro"}>
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
              <p>
                Put two items in the grid. If they make a recipe, it crafts on its own and unlocks a story about me. The recipe book shows the shapes of both
                ingredients for every recipe.
              </p>
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
                    <button type="button" onClick={() => recraft(r)} aria-label={`Craft ${r.result} again`} data-t1={r.result} data-t2="Click to craft again">
                      <span className="rb-ings">
                        <span className="slot static">
                          <PixelIcon name={r.inputs[0]} size={26} />
                        </span>
                        <span className="rb-plus">+</span>
                        <span className="slot static">
                          <PixelIcon name={r.inputs[1]} size={26} />
                        </span>
                      </span>
                      <span className="rb-text">
                        <strong className="px">{r.result}</strong>
                        <span>
                          {nameOf(r.inputs[0])} + {nameOf(r.inputs[1])}
                        </span>
                      </span>
                    </button>
                  ) : (
                    <div className="rb-locked" aria-label="Locked recipe: two hidden ingredients">
                      <span className="rb-ings silhouette" aria-hidden="true">
                        <span className="slot static">
                          <PixelIcon name={r.inputs[0]} size={26} />
                        </span>
                        <span className="rb-plus">+</span>
                        <span className="slot static">
                          <PixelIcon name={r.inputs[1]} size={26} />
                        </span>
                      </span>
                      <span className="rb-text">
                        <strong className="px">???</strong>
                        <span>Match the shapes</span>
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
