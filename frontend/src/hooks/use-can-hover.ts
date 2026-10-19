import { useSyncExternalStore } from "react"

const QUERY = "(hover: hover)"

function subscribe(onChange: () => void) {
  const mql = window.matchMedia(QUERY)
  mql.addEventListener("change", onChange)
  return () => mql.removeEventListener("change", onChange)
}

/** False on touch-first devices, where hover-only UI (tooltips) never opens. */
export function useCanHover() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => true
  )
}
