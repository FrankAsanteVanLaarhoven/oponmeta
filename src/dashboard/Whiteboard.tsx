import Whiteboard from "@/components/Whiteboard";
import DashboardBackButton from "@/components/ui/DashboardBackButton";

const WhiteboardPage = () => {
  return (
    <div className="space-y-6">
      <DashboardBackButton />
      <Whiteboard />
    </div>
  );
};

export default WhiteboardPage;