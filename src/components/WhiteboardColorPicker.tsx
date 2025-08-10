import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Palette, X } from 'lucide-react';

interface WhiteboardColorPickerProps {
  currentColor: string;
  onColorChange: (color: string) => void;
  onClose: () => void;
}

const WhiteboardColorPicker: React.FC<WhiteboardColorPickerProps> = ({
  currentColor,
  onColorChange,
  onClose
}) => {
  const [customColor, setCustomColor] = useState(currentColor);

  const predefinedColors = [
    '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#FFFF00',
    '#FF00FF', '#00FFFF', '#FFA500', '#800080', '#008000', '#FFC0CB',
    '#A52A2A', '#808080', '#000080', '#800000', '#808000', '#008080',
    '#FFD700', '#FF69B4', '#32CD32', '#FF4500', '#9370DB', '#20B2AA',
    '#F0E68C', '#FF6347', '#7B68EE', '#00CED1', '#FF1493', '#32CD32'
  ];

  const handleColorSelect = (color: string) => {
    onColorChange(color);
    setCustomColor(color);
  };

  const handleCustomColorChange = (color: string) => {
    setCustomColor(color);
    onColorChange(color);
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-80">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-700">Color Picker</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClose}
          className="h-6 w-6 p-0"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Current Color Display */}
      <div className="mb-4">
        <label className="block text-xs font-medium text-gray-600 mb-2">
          Current Color
        </label>
        <div className="flex items-center space-x-3">
          <div
            className="w-12 h-12 rounded border-2 border-gray-300"
            style={{ backgroundColor: currentColor }}
          />
          <div className="flex-1">
            <Input
              value={currentColor}
              onChange={(e) => handleCustomColorChange(e.target.value)}
              placeholder="#000000"
              className="text-sm"
            />
          </div>
        </div>
      </div>

      {/* Predefined Colors */}
      <div className="mb-4">
        <label className="block text-xs font-medium text-gray-600 mb-2">
          Predefined Colors
        </label>
        <div className="grid grid-cols-8 gap-2">
          {predefinedColors.map((color) => (
            <button
              key={color}
              className={`w-8 h-8 rounded border-2 transition-all hover:scale-110 ${
                currentColor === color ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-300'
              }`}
              style={{ backgroundColor: color }}
              onClick={() => handleColorSelect(color)}
              title={color}
            />
          ))}
        </div>
      </div>

      {/* Custom Color Input */}
      <div className="mb-4">
        <label className="block text-xs font-medium text-gray-600 mb-2">
          Custom Color
        </label>
        <div className="flex items-center space-x-2">
          <Input
            type="color"
            value={customColor}
            onChange={(e) => handleCustomColorChange(e.target.value)}
            className="w-12 h-10 p-1 border border-gray-300 rounded"
          />
          <Input
            value={customColor}
            onChange={(e) => handleCustomColorChange(e.target.value)}
            placeholder="#000000"
            className="flex-1 text-sm"
          />
        </div>
      </div>

      {/* Color Categories */}
      <div className="mb-4">
        <label className="block text-xs font-medium text-gray-600 mb-2">
          Color Categories
        </label>
        <div className="space-y-2">
          {/* Reds */}
          <div className="flex space-x-1">
            {['#FF0000', '#FF4444', '#FF6666', '#FF8888', '#FFAAAA'].map((color) => (
              <button
                key={color}
                className={`w-6 h-6 rounded border ${
                  currentColor === color ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-300'
                }`}
                style={{ backgroundColor: color }}
                onClick={() => handleColorSelect(color)}
                title={color}
              />
            ))}
          </div>
          
          {/* Greens */}
          <div className="flex space-x-1">
            {['#00FF00', '#44FF44', '#66FF66', '#88FF88', '#AAFFAA'].map((color) => (
              <button
                key={color}
                className={`w-6 h-6 rounded border ${
                  currentColor === color ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-300'
                }`}
                style={{ backgroundColor: color }}
                onClick={() => handleColorSelect(color)}
                title={color}
              />
            ))}
          </div>
          
          {/* Blues */}
          <div className="flex space-x-1">
            {['#0000FF', '#4444FF', '#6666FF', '#8888FF', '#AAAAFF'].map((color) => (
              <button
                key={color}
                className={`w-6 h-6 rounded border ${
                  currentColor === color ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-300'
                }`}
                style={{ backgroundColor: color }}
                onClick={() => handleColorSelect(color)}
                title={color}
              />
            ))}
          </div>
          
          {/* Grays */}
          <div className="flex space-x-1">
            {['#000000', '#333333', '#666666', '#999999', '#CCCCCC', '#FFFFFF'].map((color) => (
              <button
                key={color}
                className={`w-6 h-6 rounded border ${
                  currentColor === color ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-300'
                }`}
                style={{ backgroundColor: color }}
                onClick={() => handleColorSelect(color)}
                title={color}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Recent Colors */}
      <div className="mb-4">
        <label className="block text-xs font-medium text-gray-600 mb-2">
          Recent Colors
        </label>
        <div className="flex space-x-1">
          {[currentColor, '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF'].map((color, index) => (
            <button
              key={`${color}-${index}`}
              className={`w-8 h-8 rounded border-2 ${
                currentColor === color ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-300'
              }`}
              style={{ backgroundColor: color }}
              onClick={() => handleColorSelect(color)}
              title={color}
            />
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex space-x-2">
        <Button
          onClick={handleClose}
          variant="outline"
          size="sm"
          className="flex-1"
        >
          Cancel
        </Button>
        <Button
          onClick={handleClose}
          size="sm"
          className="flex-1"
        >
          Apply
        </Button>
      </div>
    </div>
  );
};

export default WhiteboardColorPicker;
