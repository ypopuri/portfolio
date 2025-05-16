
import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";
type FontFamily = "outfit" | "inter" | "poppins" | "roboto";

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
  primaryColor: string;
  setPrimaryColor: (color: string) => void;
  font: FontFamily;
  setFont: (font: FontFamily) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") as Theme;
      return savedTheme || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    }
    return "light";
  });
  
  const [primaryColor, setPrimaryColor] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("primaryColor") || "#7400ff";
    }
    return "#7400ff";
  });
  
  const [font, setFont] = useState<FontFamily>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("font") as FontFamily) || "outfit";
    }
    return "outfit";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Apply theme
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    
    localStorage.setItem("theme", theme);
  }, [theme]);
  
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Apply primary color
    root.style.setProperty("--primary-color", primaryColor);
    
    // Update HSL variables for shadcn UI
    const hexToRgb = (hex: string) => {
      // Remove the # if present
      hex = hex.replace(/^#/, '');
      
      // Parse the hex values
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      
      return { r, g, b };
    };
    
    const rgbToHsl = (r: number, g: number, b: number) => {
      r /= 255;
      g /= 255;
      b /= 255;
      
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      let h = 0, s = 0, l = (max + min) / 2;
      
      if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        
        switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
        }
        
        h = Math.round(h * 60);
      }
      
      s = Math.round(s * 100);
      l = Math.round(l * 100);
      
      return { h, s, l };
    };
    
    const rgb = hexToRgb(primaryColor);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    
    root.style.setProperty("--primary", `${hsl.h} ${hsl.s}% ${hsl.l}%`);
    root.style.setProperty("--accent", `${hsl.h} ${hsl.s}% ${Math.min(hsl.l + 10, 100)}%`);
    
    // Calculate darker/lighter variants
    const mildColor = adjustBrightness(primaryColor, 20);
    const lightColor = adjustBrightness(primaryColor, 40);
    const darkColor = adjustBrightness(primaryColor, -20);
    
    root.style.setProperty("--color-primary", primaryColor);
    root.style.setProperty("--color-primary-mild", mildColor);
    root.style.setProperty("--color-primary-light", lightColor);
    root.style.setProperty("--color-primary-dark", darkColor);
    
    localStorage.setItem("primaryColor", primaryColor);
  }, [primaryColor]);
  
  useEffect(() => {
    const root = window.document.documentElement;
    root.style.setProperty("--font-family", font);
    document.body.className = document.body.className.replace(/font-\w+/g, `font-${font}`);
    localStorage.setItem("font", font);
  }, [font]);
  
  // Helper function to adjust color brightness
  function adjustBrightness(hex: string, percent: number) {
    hex = hex.replace(/^#/, '');
    
    // Parse the hex values
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    // Adjust brightness
    const adjustR = Math.max(Math.min(255, r + (r * percent / 100)), 0);
    const adjustG = Math.max(Math.min(255, g + (g * percent / 100)), 0);
    const adjustB = Math.max(Math.min(255, b + (b * percent / 100)), 0);
    
    // Convert back to hex
    return '#' + 
      Math.round(adjustR).toString(16).padStart(2, '0') +
      Math.round(adjustG).toString(16).padStart(2, '0') +
      Math.round(adjustB).toString(16).padStart(2, '0');
  }

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, primaryColor, setPrimaryColor, font, setFont }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
