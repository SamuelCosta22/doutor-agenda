"use client";

import { Moon, Sun } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { useTheme } from "@/providers/theme-provider";

export function ThemeToggleSimple() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="outline" size="icon" className="h-9 w-9">
        <div className="h-4 w-4" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  const toggleTheme = () => {
    if (theme === "system") {
      setTheme(isDark ? "light" : "dark");
    } else if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("system");
    }
  };

  const getTooltipText = () => {
    if (theme === "system") {
      return `Sistema (${isDark ? "escuro" : "claro"})`;
    }
    return theme === "dark" ? "Tema escuro" : "Tema claro";
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      title={getTooltipText()}
      className="border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/60 hover:bg-accent hover:text-accent-foreground relative h-9 w-9 backdrop-blur transition-all duration-200"
    >
      <Sun className="h-4 w-4 scale-100 rotate-0 transition-all duration-300 dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute h-4 w-4 scale-0 rotate-90 transition-all duration-300 dark:scale-100 dark:rotate-0" />
      {theme === "system" && (
        <div className="border-background absolute -top-1 -right-1 h-2 w-2 rounded-full border bg-blue-500" />
      )}
      <span className="sr-only">{getTooltipText()}</span>
    </Button>
  );
}
