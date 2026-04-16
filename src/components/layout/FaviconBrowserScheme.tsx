"use client";

import { useEffect } from "react";

function ensureThemeFaviconLink(): HTMLLinkElement {
  const existing = document.getElementById(
    "theme-favicon",
  ) as HTMLLinkElement | null;
  if (existing) return existing;
  document.querySelectorAll('link[rel*="icon"]').forEach((node) => {
    node.remove();
  });
  const el = document.createElement("link");
  el.id = "theme-favicon";
  el.rel = "icon";
  el.setAttribute("href", "/faviconLight.png");
  document.head.appendChild(el);
  return el;
}

export function FaviconBrowserScheme() {
  useEffect(() => {
    const el = ensureThemeFaviconLink();
    const darkMql = window.matchMedia("(prefers-color-scheme: dark)");

    const apply = () => {
      const path = darkMql.matches
        ? "/faviconDark.png"
        : "/faviconLight.png";
      el.setAttribute("href", path);
    };

    apply();
    darkMql.addEventListener("change", apply);
    return () => darkMql.removeEventListener("change", apply);
  }, []);

  return null;
}
