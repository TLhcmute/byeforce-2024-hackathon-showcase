
import { useEffect, useState, useCallback } from "react";

type Theme = "dark" | "light" | "system";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem("theme") as Theme) || "system"
  );

  // Optimize theme application with useCallback
  const applyTheme = useCallback((newTheme: Theme) => {
    const root = window.document.documentElement;
    
    root.classList.remove("light", "dark");
    
    if (newTheme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      
      root.classList.add(systemTheme);
      return;
    }
    
    root.classList.add(newTheme);
  }, []);

  // Apply theme when changed
  useEffect(() => {
    applyTheme(theme);
  }, [theme, applyTheme]);

  // Listen for system theme changes
  useEffect(() => {
    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      
      const handleChange = () => {
        applyTheme("system");
      };
      
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [theme, applyTheme]);

  const setThemeAndStore = useCallback((newTheme: Theme) => {
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  }, []);

  return { theme, setTheme: setThemeAndStore };
}
