
import { useEffect, useState } from "react";
import { X, Settings, Palette, Type } from "lucide-react"; // Replace Font with Type
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { useTheme } from "@/context/ThemeContext";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useIsMobile } from "@/hooks/use-mobile"; // Fix import to use useIsMobile
import { Button } from "@/components/ui/button";

// Available font options
const fontOptions = [
  { value: "outfit", label: "Outfit" },
  { value: "inter", label: "Inter" },
  { value: "poppins", label: "Poppins" },
  { value: "roboto", label: "Roboto" },
];

const SettingsPanel = () => {
  const { theme, toggleTheme, primaryColor, setPrimaryColor, font, setFont } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile(); // Use the correct hook
  const [tempColor, setTempColor] = useState(primaryColor); // Store temporary color

  // Load Google Fonts
  useEffect(() => {
    // Create link for Inter
    let interLink = document.createElement("link");
    interLink.href = "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap";
    interLink.rel = "stylesheet";
    document.head.appendChild(interLink);
    
    // Create link for Poppins
    let poppinsLink = document.createElement("link");
    poppinsLink.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap";
    poppinsLink.rel = "stylesheet";
    document.head.appendChild(poppinsLink);
    
    // Create link for Roboto
    let robotoLink = document.createElement("link");
    robotoLink.href = "https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap";
    robotoLink.rel = "stylesheet";
    document.head.appendChild(robotoLink);
    
    return () => {
      // Clean up links when component unmounts
      document.head.removeChild(interLink);
      document.head.removeChild(poppinsLink);
      document.head.removeChild(robotoLink);
    };
  }, []);

  // Update tempColor state when primaryColor changes
  useEffect(() => {
    setTempColor(primaryColor);
  }, [primaryColor]);

  const handleColorInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempColor(e.target.value);
  };

  const handleApplyColor = () => {
    setPrimaryColor(tempColor);
  };

  const handleFontChange = (value: string) => {
    // Cast the string to FontFamily type to fix the type error
    setFont(value as "outfit" | "inter" | "poppins" | "roboto");
  };

  const SettingsContent = () => (
    <div className="space-y-6 p-2">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Palette size={18} className="text-primary" />
          <h3 className="text-sm font-medium">Primary Color</h3>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Input
              type="color"
              value={tempColor}
              onChange={handleColorInputChange}
              className="h-8 w-12 cursor-pointer p-0 border-0"
            />
            <Input
              type="text"
              value={tempColor}
              onChange={handleColorInputChange}
              className="h-8 text-xs"
            />
          </div>
          <Button 
            onClick={handleApplyColor} 
            size="sm" 
            className="w-full mt-1"
          >
            Apply Color
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Type size={18} className="text-primary" />
          <h3 className="text-sm font-medium">Font Style</h3>
        </div>
        <RadioGroup
          value={font}
          onValueChange={handleFontChange}
          className="flex flex-col space-y-1"
        >
          {fontOptions.map((option) => (
            <div
              key={option.value}
              className="flex items-center space-x-2"
            >
              <RadioGroupItem value={option.value} id={option.value} />
              <label htmlFor={option.value} className={`text-sm cursor-pointer font-${option.value}`}>
                {option.label}
              </label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );

  return (
    <div className="fixed left-4 bottom-4 z-50">
      {isMobile ? (
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          <DrawerTrigger asChild>
            <button
              className="bg-background border border-border shadow-md rounded-full p-3 hover:bg-secondary transition-colors"
              aria-label="Settings"
            >
              <Settings size={20} className="text-foreground" />
            </button>
          </DrawerTrigger>
          <DrawerContent className="max-h-[85vh]">
            <DrawerHeader>
              <DrawerTitle>Appearance Settings</DrawerTitle>
              <DrawerDescription>
                Customize the look and feel of the website.
              </DrawerDescription>
            </DrawerHeader>
            <div className="px-4">
              <SettingsContent />
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <button className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md hover:opacity-90 transition-opacity">
                  Done
                </button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ) : (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <button
              className="bg-background border border-border shadow-md rounded-full p-3 hover:bg-secondary transition-colors"
              aria-label="Settings"
            >
              <Settings size={20} className="text-foreground" />
            </button>
          </PopoverTrigger>
          <PopoverContent
            side="top"
            className="w-72 p-4 rounded-lg shadow-lg"
          >
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium">Appearance Settings</h4>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-1 hover:bg-secondary transition-colors"
              >
                <X size={16} className="text-foreground" />
              </button>
            </div>
            <SettingsContent />
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
};

export default SettingsPanel;
