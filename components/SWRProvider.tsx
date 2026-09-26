"use client";

import { SWRConfig, Cache } from "swr";
import { useRef } from "react";

const STORAGE_KEY = "airfare-index:swr-cache:v1";

/** A real cache implementing SWR's Cache interface, persisted to
 * localStorage. On first paint, previously-fetched data renders instantly
 * (no skeleton, no spinner) while SWR revalidates in the background — this
 * is the actual mechanism behind "loaded from cache, stays instant on
 * repeat visits," not a fake badge with no cache behind it. */
function localStorageProvider(): Cache {
  let map: Map<string, any>;
  try {
    map = new Map(JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"));
  } catch {
    map = new Map();
  }

  if (typeof window !== "undefined") {
    window.addEventListener("beforeunload", () => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(map.entries())));
      } catch {
        // localStorage can throw (private browsing, quota) — caching is a
        // nice-to-have, never something a page should break over.
      }
    });
  }

  return map as unknown as Cache;
}

export function SWRProvider({ children }: { children: React.ReactNode }) {
  const providerRef = useRef<() => Cache>();
  if (!providerRef.current) {
    providerRef.current = () =>
      typeof window !== "undefined" ? localStorageProvider() : (new Map() as unknown as Cache);
  }

  return (
    <SWRConfig
      value={{
        provider: providerRef.current,
        revalidateOnFocus: false,
        dedupingInterval: 60_000,
      }}
    >
      {children}
    </SWRConfig>
  );
}
