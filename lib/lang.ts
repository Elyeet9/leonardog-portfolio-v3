import { useSyncExternalStore } from "react";
import type { Lang } from "./content";

const STORAGE_KEY = "language";
const listeners = new Set<() => void>();
let current: Lang | undefined;

function read(): Lang {
  if (current === undefined) {
    try {
      current = localStorage.getItem(STORAGE_KEY) === "es" ? "es" : "en";
    } catch {
      current = "en";
    }
  }
  return current;
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
  };
}

export function setLang(lang: Lang) {
  current = lang;
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    // Storage unavailable: the choice still applies for this visit.
  }
  listeners.forEach((notify) => notify());
}

/** Current language. Renders "en" on the server, then the saved choice on the client. */
export function useLang(): Lang {
  return useSyncExternalStore(subscribe, read, () => "en");
}
