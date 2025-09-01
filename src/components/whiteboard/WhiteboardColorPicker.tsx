import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Palette } from "lucide-react";

interface WhiteboardColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

export const WhiteboardColorPicker = ({ color, onChange }: WhiteboardColorPickerProps) => {
  const presetColors = [
    "#000000", "#FFFFFF", "#FF0000", "#00FF00", "#0000FF",
    "#FFFF00", "#FF00FF", "#00FFFF", "#FFA500", "#800080",
    "#FFC0CB", "#A52A2A", "#808080", "#000080", "#008000",
    "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7"
  ];

  return (
    <div className="flex items-center space-x-2">
      <div
        className="w-8 h-8 rounded border-2 border-gray-300 cursor-pointer"
        style={{ backgroundColor: color }}
      />
      
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm">
            <Palette className="w-4 h-4 mr-1" />
            Colors
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="space-y-4">
            <div>
              <Label htmlFor="colorInput">Custom Color</Label>
              <div className="flex space-x-2 mt-1">
                <Input
                  id="colorInput"
                  type="color"
                  value={color}
                  onChange={(e) => onChange(e.target.value)}
                  className="w-16 h-10 p-1 border-2"
                />
                <Input
                  type="text"
                  value={color}
                  onChange={(e) => onChange(e.target.value)}
                  className="flex-1"
                  placeholder="#000000"
                />
              </div>
            </div>
            
            <div>
              <Label>Preset Colors</Label>
              <div className="grid grid-cols-10 gap-2 mt-2">
                {presetColors.map((presetColor) => (
                  <button
                    key={presetColor}
                    className={`w-6 h-6 rounded border-2 ${
                      color === presetColor ? "border-blue-500" : "border-gray-300"
                    }`}
                    style={{ backgroundColor: presetColor }}
                    onClick={() => onChange(presetColor)}
                  />
                ))}
              </div>
            </div>
            
            <div>
              <Label>Opacity</Label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                defaultValue="1"
                className="w-full mt-1"
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};