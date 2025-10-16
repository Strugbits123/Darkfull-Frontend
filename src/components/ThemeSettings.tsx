"use client";

import { useTheme } from "@/lib/hooks/use-theme";
import { themes } from "@/lib/theme-config";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Sun, Moon, Monitor, Palette } from "lucide-react";

export function ThemeSettings() {
  const { theme, setTheme, isDark, isSystem, mounted } = useTheme();

  if (!mounted) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Theme Settings
          </CardTitle>
          <CardDescription>
            Choose your preferred theme and color scheme for the application.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* System Theme Options */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium">System Themes</h4>
            <div className="flex gap-2">
              <Button
                variant={theme === "light" ? "default" : "outline"}
                size="sm"
                onClick={() => setTheme("light")}
                className="flex items-center gap-2"
              >
                <Sun className="h-4 w-4" />
                Light
              </Button>
              <Button
                variant={theme === "dark" ? "default" : "outline"}
                size="sm"
                onClick={() => setTheme("dark")}
                className="flex items-center gap-2"
              >
                <Moon className="h-4 w-4" />
                Dark
              </Button>
              <Button
                variant={theme === "system" ? "default" : "outline"}
                size="sm"
                onClick={() => setTheme("system")}
                className="flex items-center gap-2"
              >
                <Monitor className="h-4 w-4" />
                System
              </Button>
            </div>
          </div>

          <Separator />

          {/* Color Schemes */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Color Schemes</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
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
                      <CardTitle className="text-xs font-medium">
                        {themeConfig.name}
                      </CardTitle>
                      {theme === key && (
                        <Badge variant="secondary" className="text-xs">
                          Active
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="p-3 pt-0">
                    <div className="space-y-2">
                      <div
                        className="h-6 rounded border"
                        style={{ backgroundColor: themeConfig.colors.background }}
                      />
                      <div className="flex space-x-1">
                        <div
                          className="h-3 w-3 rounded-full border"
                          style={{ backgroundColor: themeConfig.colors.primary }}
                        />
                        <div
                          className="h-3 w-3 rounded-full border"
                          style={{ backgroundColor: themeConfig.colors.accent }}
                        />
                        <div
                          className="h-3 w-3 rounded-full border"
                          style={{ backgroundColor: themeConfig.colors.secondary }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Current Theme Info */}
          <Separator />
          
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Current Theme Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="space-y-1">
                <p className="text-muted-foreground">Selected Theme</p>
                <p className="font-medium">{themes[theme as keyof typeof themes]?.name || "Unknown"}</p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground">Mode</p>
                <p className="font-medium">
                  {isSystem() ? "System" : isDark() ? "Dark" : "Light"}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground">Color Scheme</p>
                <p className="font-medium">{theme}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
