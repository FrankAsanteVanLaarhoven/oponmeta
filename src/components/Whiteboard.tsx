import React, { useState, useRef, useEffect } from 'react';
import * as fabric from 'fabric';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
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
  Plus,
  Minus,
  RotateCw,
  Palette,
  Layers,
  Eye,
  EyeOff
} from 'lucide-react';
import WhiteboardToolbar from './WhiteboardToolbar';
import { WhiteboardColorPicker } from './whiteboard/WhiteboardColorPicker';
import { WhiteboardTemplates } from './whiteboard/WhiteboardTemplates';

interface WhiteboardUser {
  id: string;
  name: string;
  avatar: string;
  color: string;
  isOnline: boolean;
  lastActive: Date;
}

interface WhiteboardSession {
  id: string;
  name: string;
  participants: WhiteboardUser[];
  createdAt: Date;
  lastModified: Date;
  isPublic: boolean;
}

const Whiteboard = () => {
  const { t } = useAppContext();
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
  
  const [currentTool, setCurrentTool] = useState<'pen' | 'rectangle' | 'circle' | 'text' | 'image'>('pen');
  const [currentColor, setCurrentColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(2);
  const [isDrawing, setIsDrawing] = useState(false);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [zoom, setZoom] = useState(100);
  const [showGrid, setShowGrid] = useState(true);
  const [showLayers, setShowLayers] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [sessionName, setSessionName] = useState('My Whiteboard Session');
  const [isCollaborative, setIsCollaborative] = useState(false);
  const [collaborators, setCollaborators] = useState<WhiteboardUser[]>([]);
  const [showTemplates, setShowTemplates] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);

  // Initialize Fabric.js canvas
  useEffect(() => {
    if (canvasRef.current && !fabricCanvasRef.current) {
      const canvas = new fabric.Canvas(canvasRef.current, {
        width: window.innerWidth - 400,
        height: window.innerHeight - 200,
        backgroundColor: '#ffffff',
        selection: true,
        preserveObjectStacking: true,
      });

      fabricCanvasRef.current = canvas;

      // Set up event listeners
      canvas.on('path:created', handlePathCreated);
      canvas.on('object:added', handleObjectAdded);
      canvas.on('object:removed', handleObjectRemoved);
      canvas.on('object:modified', handleObjectModified);

      // Wait for canvas to be fully initialized before setting drawing mode
      setTimeout(() => {
        // Ensure canvas is rendered first
        canvas.renderAll();
        setDrawingMode();
      }, 100);

      // Add grid
      if (showGrid) {
        addGrid();
      }

      return () => {
        canvas.dispose();
      };
    }
  }, []);

  // Handle canvas size changes
  useEffect(() => {
    const handleResize = () => {
      if (fabricCanvasRef.current && fabricCanvasRef.current.width && fabricCanvasRef.current.height) {
        const newWidth = Math.max(100, window.innerWidth - 400);
        const newHeight = Math.max(100, window.innerHeight - 200);
        
        try {
          fabricCanvasRef.current.setDimensions({
            width: newWidth,
            height: newHeight
          });
        } catch (error) {
          console.warn('Error setting canvas dimensions:', error);
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const setDrawingMode = () => {
    if (!fabricCanvasRef.current) return;

    fabricCanvasRef.current.isDrawingMode = currentTool === 'pen';
    
    // Check if freeDrawingBrush is available before accessing its properties
    if (fabricCanvasRef.current.freeDrawingBrush) {
      fabricCanvasRef.current.freeDrawingBrush.width = brushSize;
      fabricCanvasRef.current.freeDrawingBrush.color = currentColor;
    } else {
      // If brush is not available, try to initialize it
      try {
        // In Fabric.js v6, we might need to use a different approach
        if (fabric.PencilBrush) {
          fabricCanvasRef.current.freeDrawingBrush = new fabric.PencilBrush(fabricCanvasRef.current);
          fabricCanvasRef.current.freeDrawingBrush.width = brushSize;
          fabricCanvasRef.current.freeDrawingBrush.color = currentColor;
        } else {
          // Fallback for v6
          fabricCanvasRef.current.freeDrawingBrush = new fabric.BaseBrush();
          fabricCanvasRef.current.freeDrawingBrush.width = brushSize;
          fabricCanvasRef.current.freeDrawingBrush.color = currentColor;
        }
      } catch (error) {
        console.warn('Could not initialize drawing brush:', error);
      }
    }
  };

  const addGrid = () => {
    if (!fabricCanvasRef.current) return;

    const gridSize = 20;
    const width = fabricCanvasRef.current.width || 800;
    const height = fabricCanvasRef.current.height || 600;

    for (let i = 0; i < width; i += gridSize) {
      const line = new fabric.Line([i, 0, i, height], {
        stroke: '#e5e7eb',
        strokeWidth: 0.5,
        selectable: false,
        evented: false,
      });
      fabricCanvasRef.current.add(line);
    }

    for (let i = 0; i < height; i += gridSize) {
      const line = new fabric.Line([0, i, width, i], {
        stroke: '#e5e7eb',
        strokeWidth: 0.5,
        selectable: false,
        evented: false,
      });
      fabricCanvasRef.current.add(line);
    }
  };

  const handlePathCreated = () => {
    updateUndoRedoState();
  };

  const handleObjectAdded = () => {
    updateUndoRedoState();
  };

  const handleObjectRemoved = () => {
    updateUndoRedoState();
  };

  const handleObjectModified = () => {
    updateUndoRedoState();
  };

  const updateUndoRedoState = () => {
    if (!fabricCanvasRef.current) return;
    
    setCanUndo(fabricCanvasRef.current._objects.length > 0);
    setCanRedo(false); // Fabric.js doesn't have built-in redo
  };

  const addRectangle = () => {
    if (!fabricCanvasRef.current) return;

    const rect = new fabric.Rect({
      left: 100,
      top: 100,
      width: 100,
      height: 100,
      fill: currentColor,
      stroke: currentColor,
      strokeWidth: 2,
    });

    fabricCanvasRef.current.add(rect);
    fabricCanvasRef.current.setActiveObject(rect);
    fabricCanvasRef.current.renderAll();
  };

  const addCircle = () => {
    if (!fabricCanvasRef.current) return;

    const circle = new fabric.Circle({
      left: 100,
      top: 100,
      radius: 50,
      fill: currentColor,
      stroke: currentColor,
      strokeWidth: 2,
    });

    fabricCanvasRef.current.add(circle);
    fabricCanvasRef.current.setActiveObject(circle);
    fabricCanvasRef.current.renderAll();
  };

  const addText = () => {
    if (!fabricCanvasRef.current) return;

    const text = new fabric.IText('Double click to edit', {
      left: 100,
      top: 100,
      fontSize: 20,
      fill: currentColor,
      fontFamily: 'Arial',
    });

    fabricCanvasRef.current.add(text);
    fabricCanvasRef.current.setActiveObject(text);
    fabricCanvasRef.current.renderAll();
  };

  const addImage = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file && fabricCanvasRef.current) {
        const reader = new FileReader();
        reader.onload = (event) => {
          fabric.Image.fromURL(event.target?.result as string, (img) => {
            img.scaleToWidth(200);
            fabricCanvasRef.current?.add(img);
            fabricCanvasRef.current?.renderAll();
          });
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const undo = () => {
    if (!fabricCanvasRef.current) return;
    
    const objects = fabricCanvasRef.current.getObjects();
    if (objects.length > 0) {
      fabricCanvasRef.current.remove(objects[objects.length - 1]);
      fabricCanvasRef.current.renderAll();
    }
  };

  const clearCanvas = () => {
    if (!fabricCanvasRef.current || !fabricCanvasRef.current.getContext()) return;
    
    try {
      fabricCanvasRef.current.clear();
      fabricCanvasRef.current.backgroundColor = '#ffffff';
      fabricCanvasRef.current.renderAll();
      
      if (showGrid) {
        addGrid();
      }
    } catch (error) {
      console.warn('Error clearing canvas:', error);
    }
  };

  const downloadCanvas = () => {
    if (!fabricCanvasRef.current) return;
    
    const dataURL = fabricCanvasRef.current.toDataURL({
      format: 'png',
      quality: 1
    });
    
    const link = document.createElement('a');
    link.download = 'whiteboard.png';
    link.href = dataURL;
    link.click();
  };

  const zoomIn = () => {
    if (!fabricCanvasRef.current) return;
    
    const newZoom = Math.min(zoom + 25, 200);
    setZoom(newZoom);
    fabricCanvasRef.current.setZoom(newZoom / 100);
  };

  const zoomOut = () => {
    if (!fabricCanvasRef.current) return;
    
    const newZoom = Math.max(zoom - 25, 25);
    setZoom(newZoom);
    fabricCanvasRef.current.setZoom(newZoom / 100);
  };

  const resetZoom = () => {
    if (!fabricCanvasRef.current) return;
    
    setZoom(100);
    fabricCanvasRef.current.setZoom(1);
  };

  const toggleGrid = () => {
    setShowGrid(!showGrid);
    if (!showGrid) {
      addGrid();
    } else {
      // Remove grid lines
      if (fabricCanvasRef.current) {
        const objects = fabricCanvasRef.current.getObjects();
        const gridObjects = objects.filter(obj => 
          obj.type === 'line' && 
          (obj as fabric.Line).stroke === '#e5e7eb'
        );
        gridObjects.forEach(obj => fabricCanvasRef.current?.remove(obj));
        fabricCanvasRef.current.renderAll();
      }
    }
  };

  const saveSession = () => {
    if (!fabricCanvasRef.current) return;
    
    const sessionData = {
      name: sessionName,
      canvasData: fabricCanvasRef.current.toJSON(),
      timestamp: new Date().toISOString(),
    };
    
    localStorage.setItem(`whiteboard-session-${Date.now()}`, JSON.stringify(sessionData));
    alert('Session saved successfully!');
  };

  const loadTemplate = (templateData: any) => {
    if (!fabricCanvasRef.current) return;
    
    fabricCanvasRef.current.loadFromJSON(templateData, () => {
      fabricCanvasRef.current?.renderAll();
      setShowTemplates(false);
    });
  };

  useEffect(() => {
    // Only call setDrawingMode if canvas is initialized
    if (fabricCanvasRef.current) {
      setDrawingMode();
    }
  }, [currentTool, currentColor, brushSize]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        {/* Left Sidebar - Tools */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h1 className="text-xl font-semibold text-gray-900">Whiteboard</h1>
            <p className="text-sm text-gray-600">Interactive drawing and collaboration</p>
          </div>

          {/* Session Info */}
          <div className="p-4 border-b border-gray-200">
            <Input
              value={sessionName}
              onChange={(e) => setSessionName(e.target.value)}
              placeholder="Session name"
              className="mb-2"
            />
            <div className="flex space-x-2">
              <Button onClick={saveSession} size="sm" variant="outline">
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button onClick={() => setShowTemplates(true)} size="sm" variant="outline">
                <Layers className="w-4 h-4 mr-2" />
                Templates
              </Button>
            </div>
          </div>

          {/* Drawing Tools */}
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Drawing Tools</h3>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant={currentTool === 'pen' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCurrentTool('pen')}
                className="justify-start"
              >
                <PenTool className="w-4 h-4 mr-2" />
                Pen
              </Button>
              <Button
                variant={currentTool === 'rectangle' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCurrentTool('rectangle')}
                className="justify-start"
              >
                <Square className="w-4 h-4 mr-2" />
                Rectangle
              </Button>
              <Button
                variant={currentTool === 'circle' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCurrentTool('circle')}
                className="justify-start"
              >
                <Circle className="w-4 h-4 mr-2" />
                Circle
              </Button>
              <Button
                variant={currentTool === 'text' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCurrentTool('text')}
                className="justify-start"
              >
                <Type className="w-4 h-4 mr-2" />
                Text
              </Button>
              <Button
                variant={currentTool === 'image' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCurrentTool('image')}
                className="justify-start"
              >
                <ImageIcon className="w-4 h-4 mr-2" />
                Image
              </Button>
            </div>
          </div>

          {/* Color Picker */}
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Colors</h3>
            <div className="flex items-center space-x-2">
              <div
                className="w-8 h-8 rounded border cursor-pointer"
                style={{ backgroundColor: currentColor }}
                onClick={() => setShowColorPicker(!showColorPicker)}
              />
              <span className="text-sm text-gray-600">{currentColor}</span>
            </div>
            {showColorPicker && (
              <WhiteboardColorPicker
                currentColor={currentColor}
                onColorChange={setCurrentColor}
                onClose={() => setShowColorPicker(false)}
              />
            )}
          </div>

          {/* Brush Size */}
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Brush Size: {brushSize}px</h3>
            <input
              type="range"
              min="1"
              max="20"
              value={brushSize}
              onChange={(e) => setBrushSize(parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Actions */}
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Actions</h3>
            <div className="space-y-2">
              <Button
                onClick={undo}
                disabled={!canUndo}
                size="sm"
                variant="outline"
                className="w-full justify-start"
              >
                <Undo className="w-4 h-4 mr-2" />
                Undo
              </Button>
              <Button
                onClick={clearCanvas}
                size="sm"
                variant="outline"
                className="w-full justify-start"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear
              </Button>
              <Button
                onClick={downloadCanvas}
                size="sm"
                variant="outline"
                className="w-full justify-start"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </div>

          {/* Zoom Controls */}
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Zoom: {zoom}%</h3>
            <div className="flex space-x-2">
              <Button onClick={zoomOut} size="sm" variant="outline">
                <Minus className="w-4 h-4" />
              </Button>
              <Button onClick={resetZoom} size="sm" variant="outline">
                Reset
              </Button>
              <Button onClick={zoomIn} size="sm" variant="outline">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* View Options */}
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-3">View</h3>
            <div className="space-y-2">
              <Button
                onClick={toggleGrid}
                variant={showGrid ? 'default' : 'outline'}
                size="sm"
                className="w-full justify-start"
              >
                {showGrid ? <Eye className="w-4 h-4 mr-2" /> : <EyeOff className="w-4 h-4 mr-2" />}
                {showGrid ? 'Hide Grid' : 'Show Grid'}
              </Button>
            </div>
          </div>

          {/* Collaboration */}
          <div className="p-4 flex-1">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Collaboration</h3>
            <Button
              onClick={() => setIsCollaborative(!isCollaborative)}
              variant={isCollaborative ? 'default' : 'outline'}
              size="sm"
              className="w-full justify-start"
            >
              <Users className="w-4 h-4 mr-2" />
              {isCollaborative ? 'Collaborative Mode' : 'Enable Collaboration'}
            </Button>
            
            {isCollaborative && (
              <div className="mt-3">
                <Button size="sm" variant="outline" className="w-full">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Session
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Main Canvas Area */}
        <div className="flex-1 flex flex-col">
          {/* Top Toolbar */}
          <WhiteboardToolbar
            currentTool={currentTool}
            onToolChange={setCurrentTool}
            onAddRectangle={addRectangle}
            onAddCircle={addCircle}
            onAddText={addText}
            onAddImage={addImage}
            onUndo={undo}
            onClear={clearCanvas}
            onDownload={downloadCanvas}
          />

          {/* Canvas */}
          <div className="flex-1 bg-gray-100 p-4 overflow-auto">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 inline-block">
              <canvas
                ref={canvasRef}
                className="border border-gray-300"
              />
            </div>
          </div>
        </div>

        {/* Right Sidebar - Layers & Properties */}
        {showLayers && (
          <div className="w-64 bg-white border-l border-gray-200 p-4">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Layers</h3>
            <div className="space-y-2">
              <p className="text-xs text-gray-500">Layer management coming soon...</p>
            </div>
          </div>
        )}
      </div>

      {/* Templates Modal */}
      {showTemplates && (
        <WhiteboardTemplates
          onSelectTemplate={loadTemplate}
          onClose={() => setShowTemplates(false)}
        />
      )}
    </div>
  );
};

export default Whiteboard;
