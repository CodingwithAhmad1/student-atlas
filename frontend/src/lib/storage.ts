/**
 * Web Storage can be unavailable (private mode, blocked site data) and then
 * throws on every access. These wrappers degrade to "nothing stored".
 */
type Store = "local" | "session";

function store(kind: Store): Storage | null {
  try {
    return kind === "local" ? window.localStorage : window.sessionStorage;
  } catch {
    return null;
  }
}

export function readStorage(key: string, kind: Store = "local"): string | null {
  try {
    return store(kind)?.getItem(key) ?? null;
  } catch {
    return null;
  }
}

export function writeStorage(key: string, value: string, kind: Store = "local"): void {
  try {
    store(kind)?.setItem(key, value);
  } catch {
    // Quota exceeded or storage blocked — preferences just won't persist.
  }
}

export function removeStorage(key: string, kind: Store = "local"): void {
  try {
    store(kind)?.removeItem(key);
  } catch {
    // ignore
  }
}
