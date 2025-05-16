import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative w-12 h-12 rounded-full glass-panel border-gray-400/40
      bg-gray-200/70 dark:bg-gray-800/40
      flex items-center justify-center transition-all duration-300"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <Moon className="text-foreground h-5 w-5 animate-fade-in" />
      ) : (
        <Sun className="text-foreground h-5 w-5 animate-fade-in" />
      )}
      <span className="absolute -bottom-6 text-xs font-medium 
      opacity-0 group-hover:opacity-100 transition-opacity">
        {theme === "light" ? "Dark Mode" : "Light Mode"}
      </span>
    </button>
  );
};

export default ThemeToggle;
