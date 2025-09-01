import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { 
  MousePointer, 
  Pencil, 
  Square, 
  Circle, 
  Type, 
  Image, 
  Eraser,
  Trash2
} from "lucide-react";
import type { Tool } from "./Whiteboard";

interface WhiteboardToolbarProps {
  activeTool: Tool;
  onToolClick: (tool: Tool) => void;
  onClear: () => void;
}

export const WhiteboardToolbar = ({ activeTool, onToolClick, onClear }: WhiteboardToolbarProps) => {
  const tools = [
    { id: "select" as Tool, icon: MousePointer, label: "Select" },
    { id: "draw" as Tool, icon: Pencil, label: "Draw" },
    { id: "rectangle" as Tool, icon: Square, label: "Rectangle" },
    { id: "circle" as Tool, icon: Circle, label: "Circle" },
    { id: "text" as Tool, icon: Type, label: "Text" },
    { id: "image" as Tool, icon: Image, label: "Image" },
  ];

  return (
    <TooltipProvider>
      <div className="flex flex-col space-y-2">
        {tools.map((tool) => {
          const IconComponent = tool.icon;
          return (
            <Tooltip key={tool.id}>
              <TooltipTrigger asChild>
                <Button
                  variant={activeTool === tool.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => onToolClick(tool.id)}
                  className={`w-12 h-12 p-0 ${
                    activeTool === tool.id 
                      ? "bg-blue-600 text-white" 
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>{tool.label}</p>
              </TooltipContent>
            </Tooltip>
          );
        })}
        
        <div className="h-px bg-gray-200 my-2" />
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClear}
              className="w-12 h-12 p-0 text-red-600 hover:bg-red-50"
            >
              <Trash2 className="w-5 h-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Clear All</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};