export const themes = {
  light: {
    name: "Light",
    class: "light",
    colors: {
      background: "#f5f7fa",
      foreground: "#0b2f4a",
      primary: "#0b2f4a",
      secondary: "#f5f7fa",
      accent: "#1ab7a5",
      destructive: "#f4a261",
    }
  },
  dark: {
    name: "Dark", 
    class: "dark",
    colors: {
      background: "#0b2f4a",
      foreground: "#f5f7fa",
      primary: "#f5f7fa",
      secondary: "#1a2332",
      accent: "#26c4b8",
      destructive: "#ff8c69",
    }
  },
  blue: {
    name: "Ocean Blue",
    class: "blue",
    colors: {
      background: "#f0f8ff",
      foreground: "#0c4a6e",
      primary: "#0c4a6e",
      secondary: "#e0f2fe",
      accent: "#0284c7",
      destructive: "#dc2626",
    }
  },
  green: {
    name: "Forest Green",
    class: "green",
    colors: {
      background: "#f0fdf4",
      foreground: "#14532d",
      primary: "#14532d",
      secondary: "#dcfce7",
      accent: "#16a34a",
      destructive: "#dc2626",
    }
  },
  purple: {
    name: "Royal Purple",
    class: "purple",
    colors: {
      background: "#faf5ff",
      foreground: "#581c87",
      primary: "#581c87",
      secondary: "#e9d5ff",
      accent: "#9333ea",
      destructive: "#dc2626",
    }
  },
  orange: {
    name: "Sunset Orange",
    class: "orange",
    colors: {
      background: "#fff7ed",
      foreground: "#9a3412",
      primary: "#9a3412",
      secondary: "#fed7aa",
      accent: "#ea580c",
      destructive: "#dc2626",
    }
  },
  pink: {
    name: "Rose Pink",
    class: "pink",
    colors: {
      background: "#fdf2f8",
      foreground: "#831843",
      primary: "#831843",
      secondary: "#fce7f3",
      accent: "#e11d48",
      destructive: "#dc2626",
    }
  },
  gray: {
    name: "Slate Gray",
    class: "gray",
    colors: {
      background: "#f8fafc",
      foreground: "#334155",
      primary: "#334155",
      secondary: "#f1f5f9",
      accent: "#64748b",
      destructive: "#dc2626",
    }
  }
} as const;

export type ThemeName = keyof typeof themes;

export const themeNames: ThemeName[] = Object.keys(themes) as ThemeName[];

export const defaultTheme: ThemeName = "light";
