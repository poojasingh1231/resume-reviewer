"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { setTheme, theme, resolvedTheme } = useTheme();
  
  // To avoid hydration mismatch, we wait until mounted
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="w-16 h-8 rounded-full bg-muted/50 border border-border/50" />;
  }

  const currentTheme = theme === 'system' ? resolvedTheme : theme;

  return (
    <div className="flex items-center p-1 rounded-full bg-muted/50 border border-border/50 shadow-sm">
      <button
        onClick={() => setTheme("light")}
        className={`flex items-center justify-center rounded-full p-1.5 transition-all duration-200 ${
          currentTheme === "light"
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        }`}
        aria-label="Light mode"
      >
        <Sun className="h-4 w-4" />
      </button>
      <button
        onClick={() => setTheme("dark")}
        className={`flex items-center justify-center rounded-full p-1.5 transition-all duration-200 ${
          currentTheme === "dark"
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        }`}
        aria-label="Dark mode"
      >
        <Moon className="h-4 w-4" />
      </button>
    </div>
  );
}
