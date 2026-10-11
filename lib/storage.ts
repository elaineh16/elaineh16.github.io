export function load<T>(key: string, fallback: T): T {
  try {
    const v = window.localStorage.getItem(key)
    return v ? (JSON.parse(v) as T) : fallback
  } catch {
    return fallback
  }
}

export function save(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Storage can be blocked (private mode); settings just won't persist.
  }
}
