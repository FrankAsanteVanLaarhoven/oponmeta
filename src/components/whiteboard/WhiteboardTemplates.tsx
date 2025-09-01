import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { 
  Presentation, 
  Users, 
  Target, 
  GitBranch, 
  Calendar,
  Layout,
  Lightbulb,
  TrendingUp
} from "lucide-react";

interface WhiteboardTemplatesProps {
  onSelectTemplate: (templateData: any) => void;
}

export const WhiteboardTemplates = ({ onSelectTemplate }: WhiteboardTemplatesProps) => {
  const templates = [
    {
      id: "blank",
      name: "Blank Canvas",
      description: "Start with a clean whiteboard",
      icon: Layout,
      category: "Basic",
      data: { objects: [], background: "#ffffff" }
    },
    {
      id: "brainstorm",
      name: "Brainstorming Session",
      description: "Structured space for idea generation",
      icon: Lightbulb,
      category: "Collaboration",
      data: {
        objects: [
          {
            type: "textbox",
            left: 100,
            top: 50,
            width: 200,
            height: 50,
            text: "💡 Ideas",
            fontSize: 24,
            fontWeight: "bold",
            fill: "#333"
          },
          {
            type: "rect",
            left: 50,
            top: 120,
            width: 300,
            height: 150,
            fill: "transparent",
            stroke: "#e0e0e0",
            strokeWidth: 2,
            strokeDashArray: [5, 5]
          }
        ],
        background: "#fafafa"
      }
    },
    {
      id: "meeting",
      name: "Meeting Notes",
      description: "Organised layout for meeting discussions",
      icon: Users,
      category: "Meeting",
      data: {
        objects: [
          {
            type: "textbox",
            left: 50,
            top: 30,
            width: 300,
            height: 40,
            text: "Meeting Agenda",
            fontSize: 20,
            fontWeight: "bold",
            fill: "#2563eb"
          },
          {
            type: "textbox",
            left: 50,
            top: 90,
            width: 150,
            height: 30,
            text: "Action Items:",
            fontSize: 16,
            fontWeight: "bold",
            fill: "#333"
          },
          {
            type: "textbox",
            left: 250,
            top: 90,
            width: 150,
            height: 30,
            text: "Decisions:",
            fontSize: 16,
            fontWeight: "bold",
            fill: "#333"
          }
        ],
        background: "#ffffff"
      }
    },
    {
      id: "flowchart",
      name: "Process Flow",
      description: "Template for creating flowcharts",
      icon: GitBranch,
      category: "Diagram",
      data: {
        objects: [
          {
            type: "rect",
            left: 100,
            top: 100,
            width: 120,
            height: 60,
            fill: "#dbeafe",
            stroke: "#2563eb",
            strokeWidth: 2,
            rx: 10,
            ry: 10
          },
          {
            type: "textbox",
            left: 110,
            top: 120,
            width: 100,
            height: 20,
            text: "Start",
            fontSize: 14,
            textAlign: "center",
            fill: "#2563eb"
          }
        ],
        background: "#ffffff"
      }
    },
    {
      id: "kanban",
      name: "Kanban Board",
      description: "Task management board layout",
      icon: Calendar,
      category: "Planning",
      data: {
        objects: [
          {
            type: "rect",
            left: 50,
            top: 50,
            width: 150,
            height: 300,
            fill: "#fef3c7",
            stroke: "#f59e0b",
            strokeWidth: 1
          },
          {
            type: "textbox",
            left: 60,
            top: 60,
            width: 130,
            height: 30,
            text: "To Do",
            fontSize: 16,
            fontWeight: "bold",
            textAlign: "center",
            fill: "#92400e"
          },
          {
            type: "rect",
            left: 220,
            top: 50,
            width: 150,
            height: 300,
            fill: "#dbeafe",
            stroke: "#3b82f6",
            strokeWidth: 1
          },
          {
            type: "textbox",
            left: 230,
            top: 60,
            width: 130,
            height: 30,
            text: "In Progress",
            fontSize: 16,
            fontWeight: "bold",
            textAlign: "center",
            fill: "#1e40af"
          },
          {
            type: "rect",
            left: 390,
            top: 50,
            width: 150,
            height: 300,
            fill: "#dcfce7",
            stroke: "#22c55e",
            strokeWidth: 1
          },
          {
            type: "textbox",
            left: 400,
            top: 60,
            width: 130,
            height: 30,
            text: "Done",
            fontSize: 16,
            fontWeight: "bold",
            textAlign: "center",
            fill: "#15803d"
          }
        ],
        background: "#ffffff"
      }
    }
  ];

  const categories = ["All", "Basic", "Collaboration", "Meeting", "Diagram", "Planning"];

  return (
    <div className="p-4 h-full overflow-y-auto">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Templates</h3>
        <p className="text-sm text-gray-600">Choose a template to get started quickly</p>
      </div>

      <div className="space-y-4">
        {templates.map((template) => {
          const IconComponent = template.icon;
          return (
            <Card key={template.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                    <IconComponent className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-sm">{template.name}</h4>
                      <Badge variant="outline" className="text-xs">
                        {template.category}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 mb-3">{template.description}</p>
                    <Button 
                      size="sm" 
                      className="w-full"
                      onClick={() => onSelectTemplate(template.data)}
                    >
                      Use Template
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-6 pt-4 border-t">
        <Button variant="outline" className="w-full">
          <TrendingUp className="w-4 h-4 mr-2" />
          Request New Template
        </Button>
      </div>
    </div>
  );
};