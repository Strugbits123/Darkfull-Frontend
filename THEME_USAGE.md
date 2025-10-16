# Multiple Theme Support

This project now includes comprehensive multiple theme support with 8 different color schemes.

## Available Themes

1. **Light** - Default light theme
2. **Dark** - Dark theme
3. **Ocean Blue** - Blue color scheme
4. **Forest Green** - Green color scheme  
5. **Royal Purple** - Purple color scheme
6. **Sunset Orange** - Orange color scheme
7. **Rose Pink** - Pink color scheme
8. **Slate Gray** - Gray color scheme

## How to Use

### 1. Theme Toggle Component
The `ModeToggle` component provides a dropdown menu to switch between themes:

```tsx
import { ModeToggle } from "@/components/ModeToggle";

// Use in your header/navigation
<ModeToggle />
```

### 2. Theme Settings Component
For a comprehensive theme selection interface:

```tsx
import { ThemeSettings } from "@/components/ThemeSettings";

// Use in settings pages
<ThemeSettings />
```

### 3. Custom Theme Hook
Use the custom hook for theme management:

```tsx
import { useTheme } from "@/lib/hooks/use-theme";

function MyComponent() {
  const { theme, setTheme, isDark, getCurrentTheme } = useTheme();
  
  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={() => setTheme("blue")}>
        Switch to Blue
      </button>
    </div>
  );
}
```

### 4. Theme Configuration
Themes are defined in `src/lib/theme-config.ts`:

```tsx
import { themes, type ThemeName } from "@/lib/theme-config";

// Access theme configuration
const blueTheme = themes.blue;
console.log(blueTheme.colors.primary); // #0c4a6e
```

## Demo Page

Visit `/theme-demo` to see all themes in action with component examples.

## CSS Variables

Each theme defines CSS custom properties that are automatically applied:

```css
.blue {
  --background: #f0f8ff;
  --foreground: #0c4a6e;
  --primary: #0c4a6e;
  --secondary: #e0f2fe;
  --accent: #0284c7;
  /* ... more variables */
}
```

## Adding New Themes

1. Add theme configuration to `src/lib/theme-config.ts`
2. Add CSS variables to `src/app/globals.css`
3. Add custom variant to globals.css
4. Update theme arrays in layout.tsx and ThemeProvider.tsx

## Features

- ✅ 8 predefined color schemes
- ✅ Light/Dark/System mode support
- ✅ Smooth theme transitions
- ✅ TypeScript support
- ✅ Responsive theme selector
- ✅ Theme persistence
- ✅ CSS custom properties
- ✅ Tailwind CSS integration
