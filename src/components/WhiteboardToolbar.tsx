import React from 'react';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { 
  PenTool, 
  Square, 
  Circle, 
  Type, 
  Image as ImageIcon, 
  Undo, 
  Redo, 
  Trash2, 
  Download, 
  Share2, 
  Users, 
  Settings,
  Save,
  Layers,
  Grid,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Palette,
  Eye,
  EyeOff
} from 'lucide-react';

interface WhiteboardToolbarProps {
  currentTool: 'pen' | 'rectangle' | 'circle' | 'text' | 'image';
  onToolChange: (tool: 'pen' | 'rectangle' | 'circle' | 'text' | 'image') => void;
  onAddRectangle: () => void;
  onAddCircle: () => void;
  onAddText: () => void;
  onAddImage: () => void;
  onUndo: () => void;
  onClear: () => void;
  onDownload: () => void;
}

const WhiteboardToolbar: React.FC<WhiteboardToolbarProps> = ({
  currentTool,
  onToolChange,
  onAddRectangle,
  onAddCircle,
  onAddText,
  onAddImage,
  onUndo,
  onClear,
  onDownload
}) => {
  return (
    <div className="bg-white border-b border-gray-200 px-4 py-2">
      <div className="flex items-center justify-between">
        {/* Left side - Drawing Tools */}
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700 mr-2">Tools:</span>
          
          <Button
            variant={currentTool === 'pen' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onToolChange('pen')}
            className="h-8 w-8 p-0"
            title="Pen Tool"
          >
            <PenTool className="w-4 h-4" />
          </Button>
          
          <Button
            variant={currentTool === 'rectangle' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onToolChange('rectangle')}
            className="h-8 w-8 p-0"
            title="Rectangle Tool"
          >
            <Square className="w-4 h-4" />
          </Button>
          
          <Button
            variant={currentTool === 'circle' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onToolChange('circle')}
            className="h-8 w-8 p-0"
            title="Circle Tool"
          >
            <Circle className="w-4 h-4" />
          </Button>
          
          <Button
            variant={currentTool === 'text' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onToolChange('text')}
            className="h-8 w-8 p-0"
            title="Text Tool"
          >
            <Type className="w-4 h-4" />
          </Button>
          
          <Button
            variant={currentTool === 'image' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onToolChange('image')}
            className="h-8 w-8 p-0"
            title="Image Tool"
          >
            <ImageIcon className="w-4 h-4" />
          </Button>
        </div>

        <Separator orientation="vertical" className="h-6" />

        {/* Center - Quick Actions */}
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700 mr-2">Quick Add:</span>
          
          <Button
            onClick={onAddRectangle}
            size="sm"
            variant="outline"
            className="h-8 px-3"
            title="Add Rectangle"
          >
            <Square className="w-4 h-4 mr-1" />
            Rectangle
          </Button>
          
          <Button
            onClick={onAddCircle}
            size="sm"
            variant="outline"
            className="h-8 px-3"
            title="Add Circle"
          >
            <Circle className="w-4 h-4 mr-1" />
            Circle
          </Button>
          
          <Button
            onClick={onAddText}
            size="sm"
            variant="outline"
            className="h-8 px-3"
            title="Add Text"
          >
            <Type className="w-4 h-4 mr-1" />
            Text
          </Button>
          
          <Button
            onClick={onAddImage}
            size="sm"
            variant="outline"
            className="h-8 px-3"
            title="Add Image"
          >
            <ImageIcon className="w-4 h-4 mr-1" />
            Image
          </Button>
        </div>

        <Separator orientation="vertical" className="h-6" />

        {/* Right side - Actions & Settings */}
        <div className="flex items-center space-x-2">
          <Button
            onClick={onUndo}
            size="sm"
            variant="outline"
            className="h-8 w-8 p-0"
            title="Undo"
          >
            <Undo className="w-4 h-4" />
          </Button>
          
          <Button
            onClick={onClear}
            size="sm"
            variant="outline"
            className="h-8 w-8 p-0"
            title="Clear Canvas"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
          
          <Button
            onClick={onDownload}
            size="sm"
            variant="outline"
            className="h-8 w-8 p-0"
            title="Download"
          >
            <Download className="w-4 h-4" />
          </Button>
          
          <Separator orientation="vertical" className="h-6" />
          
          <Button
            size="sm"
            variant="outline"
            className="h-8 w-8 p-0"
            title="Share"
          >
            <Share2 className="w-4 h-4" />
          </Button>
          
          <Button
            size="sm"
            variant="outline"
            className="h-8 w-8 p-0"
            title="Collaboration"
          >
            <Users className="w-4 h-4" />
          </Button>
          
          <Button
            size="sm"
            variant="outline"
            className="h-8 w-8 p-0"
            title="Settings"
          >
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WhiteboardToolbar;
