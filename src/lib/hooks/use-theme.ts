"use client";

import { useTheme as useNextTheme } from "next-themes";
import { useEffect, useState } from "react";
import { themes, type ThemeName } from "@/lib/theme-config";

export function useTheme() {
  const { theme, setTheme: setNextTheme, resolvedTheme, systemTheme } = useNextTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const setTheme = (newTheme: string) => {
    setNextTheme(newTheme);
  };

  const getCurrentTheme = (): ThemeName => {
    if (!mounted) return "light";
    
    // If theme is system, use resolvedTheme or systemTheme
    const actualTheme = theme === "system" ? (resolvedTheme || systemTheme) : theme;
    
    // Check if the theme exists in our themes config
    if (actualTheme && actualTheme in themes) {
      return actualTheme as ThemeName;
    }
    
    return "light";
  };

  const getThemeConfig = () => {
    const currentTheme = getCurrentTheme();
    return themes[currentTheme];
  };

  const isDark = () => {
    if (!mounted) return false;
    return theme === "dark" || (theme === "system" && systemTheme === "dark");
  };

  const isSystem = () => {
    return theme === "system";
  };

  return {
    theme,
    setTheme,
    resolvedTheme,
    systemTheme,
    mounted,
    getCurrentTheme,
    getThemeConfig,
    isDark,
    isSystem,
  };
}
