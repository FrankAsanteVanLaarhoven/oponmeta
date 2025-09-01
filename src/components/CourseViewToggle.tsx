import { Button } from "@/components/ui/button";
import { Grid3X3, List as ListIcon } from "lucide-react";

interface CourseViewToggleProps {
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
}

const CourseViewToggle = ({ viewMode, setViewMode }: CourseViewToggleProps) => {
  return (
    <div className="flex justify-end mt-4">
      <div className="flex border border-white/20 rounded-md">
        <Button
          size="sm"
          variant={viewMode === "grid" ? "default" : "ghost"}
          className={viewMode === "grid" ? "bg-slate-900 text-white" : "text-slate-900 hover:bg-slate-100"}
          onClick={() => setViewMode("grid")}
        >
          <Grid3X3 className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          variant={viewMode === "list" ? "default" : "ghost"}
          className={viewMode === "list" ? "bg-slate-900 text-white" : "text-slate-900 hover:bg-slate-100"}
          onClick={() => setViewMode("list")}
        >
          <ListIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default CourseViewToggle;