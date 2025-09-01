import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  DollarSign,
  BarChart3,
  MessageSquare,
  Settings,
  Sparkles,
  Monitor,
  UserCog,
  X,
  Bot,
  Brain,
  Video,
  Target,
  Award,
  Layers,
  Palette,
  Package,
  MessageCircle,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";

const menuItems = [
  { icon: LayoutDashboard, label: "Overview", full: "Overview", path: "/dashboard" },
  { icon: LayoutDashboard, label: "Creator Dashboard", full: "Creator Dashboard", path: "/dashboard/course-creator" },
  { icon: BookOpen, label: "Courses", full: "My Courses", path: "/dashboard/courses" },
  { icon: Users, label: "Enrollments", full: "Enrollments", path: "/dashboard/enrollments" },
  { icon: UserCog, label: "Users", full: "User Management", path: "/dashboard/users" },
  { icon: DollarSign, label: "Earnings", full: "Earnings", path: "/dashboard/revenue" },
  { icon: BarChart3, label: "Analytics", full: "Analytics & Insights", path: "/dashboard/analytics" },
  { icon: MessageSquare, label: "Collab Hub", full: "Collaboration Hub", path: "/dashboard/collaboration" },
  { icon: Monitor, label: "Whiteboard", full: "Whiteboard", path: "/dashboard/whiteboard" },
  // AI Section
  { icon: Sparkles, label: "Course Gen", full: "AI Course Creator", path: "/dashboard/ai-course-creator" },
  { icon: Brain, label: "Lesson Gen", full: "AI Lesson Generator", path: "/dashboard/ai-lesson-generator" },
  { icon: Target, label: "Quiz Gen", full: "AI Quiz Generator", path: "/dashboard/ai-quiz-generator" },
  { icon: Video, label: "Video Gen", full: "AI Video Generator", path: "/dashboard/ai-video-generator" },
  { icon: Award, label: "Assessments", full: "AI Assessment Generator", path: "/dashboard/ai-assessment-generator" },
  { icon: Layers, label: "Designer", full: "Interactive Content Designer", path: "/dashboard/interactive-content-designer" },
  { icon: MessageCircle, label: "Chatbot", full: "Chatbot Trainer", path: "/dashboard/chatbot-trainer" },
  { icon: Palette, label: "Branding", full: "White Label & Branding", path: "/dashboard/white-label-branding" },
  { icon: Package, label: "SCORM", full: "SCORM Export", path: "/dashboard/scorm-export" },
  { icon: Sparkles, label: "AI Recs", full: "AI-Powered Recommendations", path: "/dashboard/recommendations" },
  { icon: Settings, label: "Settings", full: "Settings", path: "/dashboard/settings" },
];

const SIDEBAR_KEY = "dashboard_sidebar_open";

const DashboardSidebar = () => {
  const location = useLocation();
  const [open, setOpen] = useState(() => {
    const stored = localStorage.getItem(SIDEBAR_KEY);
    return stored === null ? true : stored === "true";
  });

  useEffect(() => {
    localStorage.setItem(SIDEBAR_KEY, open ? "true" : "false");
  }, [open]);

  return (
    <aside
      className={`fixed top-0 left-0 h-full z-30 bg-white text-[#0a1834] dark:bg-[#0a1834] dark:text-white border-r border-[#e5e7eb] dark:border-[#22305a] transition-all duration-300 ${open ? "w-64 p-6" : "w-16 p-2"} flex flex-col`}
      aria-label="Sidebar"
    >
      {/* Toggle button */}
      <div className={`flex items-center ${open ? "justify-between mb-8" : "justify-center mb-4"}`}>
        {open && <h2 className="text-2xl font-bold text-[#0a1834] dark:text-white">Instructor</h2>}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Collapse sidebar" : "Expand sidebar"}
          className="rounded-full p-1 hover:bg-[#e0e7ef] dark:hover:bg-white/10 transition-colors"
        >
          {open ? <ChevronLeft className="h-6 w-6 text-[#0a1834] dark:text-white" /> : <ChevronRight className="h-6 w-6 text-[#0a1834] dark:text-white" />}
        </button>
      </div>
      <nav className="space-y-2 flex-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path} tabIndex={0} title={!open ? item.full : undefined}>
              <Button
                variant={isActive ? "default" : "ghost"}
                className={`w-full flex items-center ${open ? "justify-start" : "justify-center"} ${isActive ? "bg-[#16203a] text-cyan-300 dark:bg-[#16203a] dark:text-cyan-300" : "text-[#0a1834] dark:text-white hover:bg-[#e0e7ef] dark:hover:bg-white/10 hover:text-cyan-600 dark:hover:text-cyan-300"} transition-all duration-200`}
                style={{ minHeight: 44 }}
              >
                <Icon className={`h-5 w-5 ${open ? "mr-3" : ""}`} />
                {open && <span className="truncate">{item.label}</span>}
              </Button>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default DashboardSidebar;