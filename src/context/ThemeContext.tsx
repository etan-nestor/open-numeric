"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Theme =
  | "light"
  | "light-blue"
  | "light-orange"
  | "dark"
  | "dark-blue"
  | "dark-orange";

export interface ThemeMeta {
  value: Theme;
  label: string;
  mode: "light" | "dark";
  /** Petit aperçu gradient utilisé dans le sélecteur */
  preview: string;
}

export const THEMES: ThemeMeta[] = [
  {
    value: "light",
    label: "Crème",
    mode: "light",
    preview: "linear-gradient(135deg, #fdf9f3 0%, #e85d2f 100%)",
  },
  {
    value: "light-blue",
    label: "Azur",
    mode: "light",
    preview: "linear-gradient(135deg, #f5faff 0%, #2563eb 100%)",
  },
  {
    value: "light-orange",
    label: "Pêche",
    mode: "light",
    preview: "linear-gradient(135deg, #fff8f0 0%, #f97316 100%)",
  },
  {
    value: "dark",
    label: "Chocolat",
    mode: "dark",
    preview: "linear-gradient(135deg, #1a120b 0%, #f59e0b 100%)",
  },
  {
    value: "dark-blue",
    label: "Nuit",
    mode: "dark",
    preview: "linear-gradient(135deg, #0a1128 0%, #3b82f6 100%)",
  },
  {
    value: "dark-orange",
    label: "Braise",
    mode: "dark",
    preview: "linear-gradient(135deg, #15100a 0%, #f97316 100%)",
  },
];

const DEFAULT_THEME: Theme = "light-orange";
const STORAGE_KEY = "open-numeric-theme";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleMode: () => void;
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(DEFAULT_THEME);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    const valid = THEMES.some((t) => t.value === stored);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    const initial: Theme = valid
      ? (stored as Theme)
      : prefersDark
        ? "dark-orange"
        : "light-orange";

    setThemeState(initial);
    document.documentElement.setAttribute("data-theme", initial);
    setMounted(true);
  }, []);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem(STORAGE_KEY, newTheme);
  }, []);

  const toggleMode = useCallback(() => {
    setThemeState((current) => {
      const [mode, accent] = current.split("-");
      const next: Theme =
        mode === "dark"
          ? ((accent ? `light-${accent}` : "light") as Theme)
          : ((accent ? `dark-${accent}` : "dark") as Theme);
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleMode, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme doit être utilisé dans un <ThemeProvider>");
  }
  return ctx;
}