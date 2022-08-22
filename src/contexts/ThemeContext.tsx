import { ReactNode, createContext, useEffect, useState } from "react";

export type Theme = "light" | "dark";

const getInitialTheme: () => Theme = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    const storedPrefs = window.localStorage.getItem("color-theme");
    if (storedPrefs === "light" || storedPrefs === "dark") {
      return storedPrefs;
    }

    const userMedia = window.matchMedia("(prefers-color-scheme: dark)");
    if (userMedia.matches) {
      return "dark";
    }
  }

  return "light"; // light theme as the default;
};

type ThemeContextState = { theme: Theme; setTheme: (theme: Theme) => void };
const ThemeContext = createContext({} as ThemeContextState);
export default ThemeContext;

export const ThemeProvider = ({
  initialTheme,
  children,
}: {
  initialTheme?: Theme;
  children: ReactNode;
}) => {
  const [theme, setTheme] = useState(getInitialTheme);

  const rawSetTheme = (rawTheme: string) => {
    const root = window.document.documentElement;
    const isDark = rawTheme === "dark";

    root.classList.remove(isDark ? "light" : "dark");
    root.classList.add(rawTheme);

    localStorage.setItem("color-theme", rawTheme);
  };

  if (initialTheme) {
    rawSetTheme(initialTheme);
  }

  useEffect(() => {
    rawSetTheme(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
