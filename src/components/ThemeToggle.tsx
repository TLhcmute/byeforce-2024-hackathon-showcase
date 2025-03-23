
import { useState, useEffect } from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative overflow-hidden group"
        >
          <Sun
            className={`h-5 w-5 transition-all duration-500 ease-out-expo absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
              theme === "dark" ? "opacity-0 rotate-90" : "opacity-100 rotate-0"
            }`}
          />
          <Moon
            className={`h-5 w-5 transition-all duration-500 ease-out-expo absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
              theme === "dark" ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"
            }`}
          />
          <span className="sr-only">Toggle theme</span>
          <span className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 rounded-md transition-colors duration-300"></span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="glass-panel">
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className={theme === "light" ? "text-primary" : ""}
        >
          <Sun className="mr-2 h-4 w-4" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className={theme === "dark" ? "text-primary" : ""}
        >
          <Moon className="mr-2 h-4 w-4" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className={theme === "system" ? "text-primary" : ""}
        >
          <Monitor className="mr-2 h-4 w-4" />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeToggle;
