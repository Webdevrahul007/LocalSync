import { useTheme } from "@/context/ThemeContext";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Laptop } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <ToggleGroup type="single" value={theme} onValueChange={(value) => {
      if (value) setTheme(value as 'light' | 'dark' | 'system');
    }}>
      <ToggleGroupItem value="light" aria-label="Light Mode">
        <Sun className="h-5 w-5" />
        <span className="ml-2">Light</span>
      </ToggleGroupItem>
      <ToggleGroupItem value="dark" aria-label="Dark Mode">
        <Moon className="h-5 w-5" />
        <span className="ml-2">Dark</span>
      </ToggleGroupItem>
      <ToggleGroupItem value="system" aria-label="System">
        <Laptop className="h-5 w-5" />
        <span className="ml-2">System</span>
      </ToggleGroupItem>
    </ToggleGroup>
  );
}