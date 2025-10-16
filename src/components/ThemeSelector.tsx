"use client";

import { useTheme } from "@/lib/hooks/use-theme";
import { themes, } from "@/lib/theme-config";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

interface ThemeSelectorProps {
  className?: string;
}

export function ThemeSelector({ className }: ThemeSelectorProps) {
  const { theme, setTheme, mounted } = useTheme();

  if (!mounted) {
    return null;
  }

  return (
    <div className={className}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(themes).map(([key, themeConfig]) => (
          <Card
            key={key}
            className={`cursor-pointer transition-all hover:shadow-md ${
              theme === key ? "ring-2 ring-primary" : ""
            }`}
            onClick={() => setTheme(key)}
          >
            <CardHeader className="p-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">
                  {themeConfig.name}
                </CardTitle>
                {theme === key && (
                  <Check className="h-4 w-4 text-primary" />
                )}
              </div>
            </CardHeader>
            <CardContent className="p-3 pt-0">
              <div className="space-y-2">
                <div
                  className="h-8 rounded-md border"
                  style={{ backgroundColor: themeConfig.colors.background }}
                />
                <div className="flex space-x-1">
                  <div
                    className="h-4 w-4 rounded-full border"
                    style={{ backgroundColor: themeConfig.colors.primary }}
                  />
                  <div
                    className="h-4 w-4 rounded-full border"
                    style={{ backgroundColor: themeConfig.colors.accent }}
                  />
                  <div
                    className="h-4 w-4 rounded-full border"
                    style={{ backgroundColor: themeConfig.colors.secondary }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
