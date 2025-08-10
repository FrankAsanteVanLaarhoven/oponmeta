import { useEffect, useRef, useState } from "react";
import { Canvas as FabricCanvas, Circle, Rect, IText, FabricImage } from "fabric";
import { WhiteboardToolbar } from "./WhiteboardToolbar";
import { WhiteboardColorPicker } from "./WhiteboardColorPicker";
import { WhiteboardTemplates } from "./WhiteboardTemplates";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Save, Share, Download, Maximize, Settings } from "lucide-react";

export type Tool = "select" | "draw" | "rectangle" | "circle" | "text" | "image";

export const Whiteboard = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [activeColor, setActiveColor] = useState("#000000");
  const [activeTool, setActiveTool] = useState<Tool>("select");
  const [brushSize, setBrushSize] = useState(2);
  const [isTemplatesOpen, setIsTemplatesOpen] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new FabricCanvas(canvasRef.current, {
      width: 1200,
      height: 700,
      backgroundColor: "#ffffff",
    });

    // Initialize the freeDrawingBrush immediately after canvas creation
    if (canvas.freeDrawingBrush) {
      canvas.freeDrawingBrush.color = activeColor;
      canvas.freeDrawingBrush.width = brushSize;
    }

    setFabricCanvas(canvas);

    return () => {
      canvas.dispose();
    };
  }, []);

  useEffect(() => {
    if (!fabricCanvas) return;

    fabricCanvas.isDrawingMode = activeTool === "draw";
    
    if (activeTool === "draw" && fabricCanvas.freeDrawingBrush) {
      fabricCanvas.freeDrawingBrush.color = activeColor;
      fabricCanvas.freeDrawingBrush.width = brushSize;
    }
  }, [activeTool, activeColor, brushSize, fabricCanvas]);

  const handleToolClick = (tool: Tool) => {
    setActiveTool(tool);

    if (!fabricCanvas) return;

    if (tool === "rectangle") {
      const rect = new Rect({
        left: 100,
        top: 100,
        fill: activeColor,
        width: 100,
        height: 100,
        stroke: activeColor,
        strokeWidth: 2,
      });
      fabricCanvas.add(rect);
      fabricCanvas.setActiveObject(rect);
    } else if (tool === "circle") {
      const circle = new Circle({
        left: 100,
        top: 100,
        fill: "transparent",
        radius: 50,
        stroke: activeColor,
        strokeWidth: 2,
      });
      fabricCanvas.add(circle);
      fabricCanvas.setActiveObject(circle);
    } else if (tool === "text") {
      const text = new IText("Click to edit", {
        left: 100,
        top: 100,
        fill: activeColor,
        fontSize: 20,
        fontFamily: "Arial",
      });
      fabricCanvas.add(text);
      fabricCanvas.setActiveObject(text);
      text.enterEditing();
    }
  };

  const handleClear = () => {
    if (!fabricCanvas) return;
    fabricCanvas.clear();
    fabricCanvas.backgroundColor = "#ffffff";
    fabricCanvas.renderAll();
  };

  const handleSave = () => {
    if (!fabricCanvas) return;
    const json = fabricCanvas.toJSON();
    localStorage.setItem("whiteboard-data", JSON.stringify(json));
    alert("Whiteboard saved!");
  };

  const handleLoad = () => {
    if (!fabricCanvas) return;
    const saved = localStorage.getItem("whiteboard-data");
    if (saved) {
      fabricCanvas.loadFromJSON(JSON.parse(saved), () => {
        fabricCanvas.renderAll();
      });
    }
  };

  const handleExport = () => {
    if (!fabricCanvas) return;
    const dataURL = fabricCanvas.toDataURL({
      format: 'png',
      quality: 0.8,
      multiplier: 1
    });
    const link = document.createElement('a');
    link.download = 'whiteboard.png';
    link.href = dataURL;
    link.click();
  };

  const applyTemplate = (templateData: any) => {
    if (!fabricCanvas) return;
    fabricCanvas.loadFromJSON(templateData, () => {
      fabricCanvas.renderAll();
    });
    setIsTemplatesOpen(false);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white border-b">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold">Interactive Whiteboard</h1>
          <Badge variant="secondary" className="text-green-600 bg-green-50">
            <Users className="w-3 h-3 mr-1" />
            3 collaborators online
          </Badge>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={handleLoad}>
            <Download className="w-4 h-4 mr-1" />
            Load
          </Button>
          <Button variant="outline" size="sm" onClick={handleSave}>
            <Save className="w-4 h-4 mr-1" />
            Save
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Share className="w-4 h-4 mr-1" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Maximize className="w-4 h-4 mr-1" />
            Fullscreen
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Tools */}
        <div className="w-16 bg-white border-r flex flex-col items-center py-4 space-y-2">
          <WhiteboardToolbar 
            activeTool={activeTool} 
            onToolClick={handleToolClick}
            onClear={handleClear}
          />
        </div>

        {/* Canvas Area */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-center justify-between p-3 bg-white border-b">
            <div className="flex items-center space-x-4">
              <WhiteboardColorPicker 
                color={activeColor} 
                onChange={setActiveColor} 
              />
              {activeTool === "draw" && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Brush:</span>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={brushSize}
                    onChange={(e) => setBrushSize(Number(e.target.value))}
                    className="w-20"
                  />
                  <span className="text-sm text-gray-600">{brushSize}px</span>
                </div>
              )}
            </div>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsTemplatesOpen(!isTemplatesOpen)}
            >
              Templates ({isTemplatesOpen ? 'Hide' : 'Show'})
            </Button>
          </div>

          <div className="flex-1 relative overflow-auto bg-gray-100 p-4">
            <Card className="inline-block shadow-lg">
              <canvas 
                ref={canvasRef} 
                className="border border-gray-200 rounded"
              />
            </Card>
            
            {/* Floating collaborators */}
            <div className="absolute top-6 right-6 flex -space-x-2">
              <div className="w-8 h-8 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                <span className="text-xs text-white font-medium">JD</span>
              </div>
              <div className="w-8 h-8 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                <span className="text-xs text-white font-medium">AS</span>
              </div>
              <div className="w-8 h-8 bg-purple-500 rounded-full border-2 border-white flex items-center justify-center">
                <span className="text-xs text-white font-medium">MK</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Templates */}
        {isTemplatesOpen && (
          <div className="w-80 bg-white border-l">
            <WhiteboardTemplates onSelectTemplate={applyTemplate} />
          </div>
        )}
      </div>
    </div>
  );
};